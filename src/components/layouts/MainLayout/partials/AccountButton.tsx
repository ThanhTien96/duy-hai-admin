import React, { useState } from "react";
import {
  ProfileOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Popover, Space, Typography } from "antd";
import { useNavigate } from "react-router";
import { pagePaths } from "constants";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "store";
import { userLogout } from "store/common/auth/authSlice";

const { Text } = Typography;

interface MenuItemProps {
  key: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

interface MenuProps {
  items: (MenuItemProps | null)[];
  onClick?: () => void;
}

const Menu = ({ items, onClick }: MenuProps) => {
  return (
    <Space onClick={onClick} direction="vertical" className="w-full">
      {items &&
        items.map((ele, index: React.Key) => {
          if (!ele) {
            return <Divider key={index} className="my-0" />;
          }
          return (
            <Button
              type="text"
              icon={ele.icon}
              onClick={ele.onClick}
              key={ele.key}
              className={clsx(ele.className, "w-full text-start")}
            >
              {ele.label}
            </Button>
          );
        })}
    </Space>
  );
};

const AccountButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openAccount, setOpenAccount] = useState<boolean>(false);
  const { profile } = useAppSelector((state) => state.common.auth);

  // handle navigate
  const handleNavigate = (slug: string) => {
    navigate(slug);
  };

  const menuItems: (MenuItemProps | null)[] = [
    {
      key: "profile",
      label: "Tài Khoản",
      icon: <ProfileOutlined />,
      onClick: () => handleNavigate(pagePaths.profile),
    },
    null,
    {
      key: "setting",
      label: "Cài Đặt",
      icon: <SettingOutlined />,
      onClick: () =>
        handleNavigate(`${pagePaths.setting}/${pagePaths.account}`),
    },
    {
      key: "help",
      label: "Hỗ Trợ",
      icon: <InfoCircleOutlined />,
    },
    null,
    {
      key: "logout",
      label: "Đăng Xuất",
      icon: <LogoutOutlined />,
      className: "text-red-500",
      onClick: () => dispatch(userLogout()),
    },
  ];

  return (
    <Popover
      placement="bottomRight"
      title={"Thông Tin Tài Khoản"}
      content={<Menu onClick={() => setOpenAccount(false)} items={menuItems} />}
      trigger="click"
      open={openAccount}
      onOpenChange={() => setOpenAccount((current) => !current)}
    >
      <Button type="text" className="h-[45px] px-2">
        <div className="flex flex-row gap-4 items-center">
          {!profile && <Avatar icon={<UserOutlined />} />}
          {profile && profile?.hinhAnh && <Avatar src={profile?.hinhAnh} />}
          <Text>{profile?.hoTen}</Text>
        </div>
      </Button>
    </Popover>
  );
};

export default AccountButton;
