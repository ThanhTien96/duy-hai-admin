import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Layout,
  Typography,
  Input,
  Button,
  Form,
  Tabs,
  Space,
  Checkbox,
  Divider,
  Spin,
} from "antd";
import {
  GithubOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TUserLoginValue } from "types/Auth";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "store";
import { setAlert } from "store/app/alert";
import { STORE_STATUS } from "constants/apiMessage";
import { AuthService } from "services";
import { STATUS_CODE, pagePaths } from "constants";
import { thunkFetchProfile } from "store/common/auth/authAsyncThunk";
import { IS_AUTH } from "constants/auth.constant";
import { useEffect } from "react";

const { Content } = Layout;
const { Text, Title, Link } = Typography;

function DefaultLoginForm({
  onSubmit,
}: {
  onSubmit?: (value: TUserLoginValue) => void;
}) {
  const formik = useFormik({
    initialValues: {
      taiKhoan: "duyhaiserver",
      matKhau: "duyhaiserver",
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("Vui lòng nhập tài khoản!"),
      matKhau: yup.string().required("Vui lòng nhập mật khẩu!"),
    }),
    onSubmit: (value: TUserLoginValue) => {
      onSubmit && onSubmit(value);
    },
  });

  const { handleChange, handleSubmit, errors, touched } = formik;

  return (
    <Form
      onSubmitCapture={handleSubmit}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true, username: "admin", password: "admin" }}
    >
      <Form.Item>
        <Input
        defaultValue={formik.values.taiKhoan}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Tài Khoản"
          name="taiKhoan"
          onChange={handleChange}
        />
        {errors.taiKhoan && touched.taiKhoan && (
          <p className="text-red-500">{errors.taiKhoan}</p>
        )}
      </Form.Item>
      <Form.Item>
        <Input
        defaultValue={formik.values.matKhau}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật Khẩu"
          name="matKhau"
          onChange={handleChange}
        />
        {errors.matKhau && touched.matKhau && (
          <p className="text-red-500">{errors.matKhau}</p>
        )}
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Nhớ Tài Khoản</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" href="">
          Quên mật khẩu
        </Link>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form-butto w-full">
          Đăng Nhập
        </Button>
      </Form.Item>
    </Form>
  );
}

export interface LoginPageProps {}

const Page: React.FC<LoginPageProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, profile, status } = useAppSelector(
    (state) => state.common.auth
  );
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (status === IS_AUTH.auth && profile) {
      navigate("/home");
    } else if (token) {
      dispatch(thunkFetchProfile());
    }
  }, [profile]);

  // handle login
  const handleLogin = async (value: TUserLoginValue) => {
    try {
      const res = await AuthService.userLogin(value);
      if (res.status === STATUS_CODE.success) {
        localStorage.setItem("access_token", res.data.data.token);
        localStorage.setItem("refresh_token", res.data.data.refreshToken);
        localStorage.setItem("expired_at", res.data.data.expiredAt);
        if (localStorage.getItem("access_token")) {
          await dispatch(thunkFetchProfile());
          dispatch(
            setAlert({
              message: "Đăng Nhập Thành Công!",
              status: STORE_STATUS.success,
            })
          );
          navigate(`/${pagePaths.home}`);
        }
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? "Đăng Nhập Thất Bại!",
          status: STORE_STATUS.error,
        })
      );
    }
  };
  return (
    <Layout className="flex items-center h-screen w-full justify-center">
      <Spin spinning={loading}>
        <Content className="flex items-center ">
          <Space direction="vertical" className="p-8">
            <Title level={2} className="text-center">
              Quản Lý Hệ Thống
            </Title>
            <Divider className="my-0">
              <Text type="secondary" className="text-center">
                Duy Hải
              </Text>
            </Divider>
            <Tabs
              defaultActiveKey="1"
              centered
              className="h-[280px] w-[450px]"
              items={[
                {
                  key: "1",
                  label: (
                    <span>
                      <LoginOutlined />
                      Mặc Định
                    </span>
                  ),
                  children: <DefaultLoginForm onSubmit={handleLogin} />,
                },
                {
                  key: "2",
                  label: (
                    <span>
                      <GithubOutlined />
                      Github
                    </span>
                  ),
                  children: <>Sắp Ra Mắt...</>,
                },
              ]}
            />
            <Divider className="my-0">
              <Text type="secondary" className="text-center">
                Địa chỉ liên hệ của chúng tôi
              </Text>
            </Divider>
            <div className="flex flex-row items-center gap-4 justify-center">
              <Button shape="circle" icon={<GithubOutlined />} />
              <Button shape="circle" icon={<TwitterOutlined />} />
              <Button shape="circle" icon={<FacebookOutlined />} />
            </div>
          </Space>
        </Content>
      </Spin>
    </Layout>
  );
};

export default Page;
