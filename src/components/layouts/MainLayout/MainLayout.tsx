import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import {
  NotificationButton,
  SearchEngine,
  menus,
  QuestionButton,
  AccountButton,
} from "./partials";
import { useLocation, useNavigate } from "react-router";
const { Header, Sider, Content } = Layout;
import "./AppLayout.style.less";
import { pagePaths } from "constants";
import { thunkFetchProfile } from "store/common/auth/authAsyncThunk";
import { useAppDispatch, useAppSelector } from "store";
import { changeColorPrimary, changeTheme } from "store/app/theme";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();
  const {profile} = useAppSelector(state => state.common.auth);
  const {selected} = useAppSelector(state => state.app.theme);

  // auto login if local exist token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if(token) {
      dispatch(thunkFetchProfile())
    } 
    if(profile && profile.theme !== selected) {
      dispatch(changeTheme(profile.theme))
      dispatch(changeColorPrimary(profile.primaryColor))
    }
  },[])
  
  // handle navigate
  const handleNavigate = ({ key: path }: { key: React.Key }) => {
    navigate(path as string);
  };

  const handleToggle = (value: boolean) => setCollapsed(value);

  return (
    <Layout hasSider className="h-screen flex-row">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          background: token?.Layout?.siderBg,
        }}
        onCollapse={handleToggle}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu
          className="border-none"
          mode="inline"
          onClick={handleNavigate}
          defaultSelectedKeys={[
            location && location.pathname
              ? location.pathname.replace("/", "")
              : pagePaths.home,
          ]}
          items={menus}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header">
          {/* right items */}
          <div className="flex items-center justify-around gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 32,
                height: 32,
              }}
            />
            <SearchEngine onSearch={(value: string) => console.log(value)} />
          </div>
          {/* left items */}
          <div className="flex justify-end items-center gap-4">
            <QuestionButton />
            <NotificationButton />
            <AccountButton />
          </div>
        </Header>
        <Content className="flex flex-col px-4">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
