import { Card, Image, Radio, Space, Switch, Typography } from "antd";
import { SettingSection } from "pages/SettingPage/partials";
import React from "react";
import { useAppDispatch, useAppSelector } from "store";
import { changeColorPrimary, changeTheme } from "store/app/theme";
import { CirclePicker, ColorResult } from "react-color";
import UserService from "services/userRequester";
import { STATUS_CODE } from "constants";
import { setAlert } from "store/app/alert";
import { thunkFetchProfile } from "store/common/auth/authAsyncThunk";
import { STORE_STATUS } from "constants/apiMessage";

const { Text } = Typography;
const { Meta } = Card;

export interface IAppearencePageProps {}

const themeList = [
  {
    key: "dark",
    name: "Dark",
    img: "/images/themes/dark-theme.png",
  },
  {
    key: "default",
    name: "Light",
    img: "/images/themes/light-theme.png",
  },
];

const AppearencePage: React.FC<IAppearencePageProps> = () => {
  const { selected, colorPrimary } = useAppSelector((state) => state.app.theme);
  const { profile } = useAppSelector((state) => state.common.auth);
  const dispatch = useAppDispatch();

  const handleChangeColorPrimary = async (color: ColorResult) => {
    if(!profile) return;
    dispatch(changeColorPrimary(color.hex));
    try{
      const res = await UserService.changeThemeColor(profile?.maNguoiDung, {primaryColor: color.hex});

      if(res.status === STATUS_CODE.success) {
        dispatch(setAlert({message: "Thay đổi màu thành công", status: STORE_STATUS.success}));
        dispatch(thunkFetchProfile());
      }
    } catch(err: Error | any) {
      dispatch(setAlert({message: "Thay đổi màu thất bại", status: STORE_STATUS.error}))
    }
  };

  
  // handle Change Theme
  const handleChangeTheme = async (theme: string) => {
    dispatch(changeTheme(theme));
    if(!profile) return;
    try{
      const res = await UserService.changeThemeColor(profile?.maNguoiDung, {theme: theme});

      if(res.status === STATUS_CODE.success) {
        dispatch(setAlert({message: "Thay đổi theme thành công", status: STORE_STATUS.success}));
        dispatch(thunkFetchProfile());
      }
    } catch(err: Error | any) {
      dispatch(setAlert({message: "Thay đổi theme thất bại", status: STORE_STATUS.error}))
    }
  }

  return (
    <Space direction="vertical" className="w-full">
      {/* theme control */}
      <SettingSection title="Theme Setting" className="w-full mb-8">
        <Text>Customize your UI theme</Text>
        <Space direction="horizontal">
          {themeList.map((theme) => (
            <Card
              key={theme.key}
              size="small"
              hoverable
              style={{ width: 240 }}
              onClick={() => handleChangeTheme(theme.key)}
              cover={
                <Image
                  height={180}
                  alt={`${theme.key}-theme`}
                  preview={false}
                  src={theme.img}
                />
              }
            >
              <div className="flex items-center justify-between">
                <Meta title={theme.name} />
                <Radio checked={selected === theme.key} />
              </div>
            </Card>
          ))}
        </Space>
      </SettingSection>
      {/* color control */}
      <SettingSection title="Accent color" className="w-full mb-8">
        <div className="flex items-center justify-between">
          <Text>Choose your accent color</Text>
          <Space>
            <CirclePicker
              color={colorPrimary}
              onChange={handleChangeColorPrimary}
            />
          </Space>
        </div>
      </SettingSection>
      {/* compact style */}
      <SettingSection title='Compact style' className='w-full mb-8'>
        <div className='flex items-start justify-between'>
          <Text>Choose your application style is compact or not</Text>
          <Space>
            <Switch />
          </Space>
        </div>
      </SettingSection>
    </Space>
  );
};

export default AppearencePage;
