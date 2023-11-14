import {
  Button,
  Card,
  Empty,
  Flex,
  Form,
  Image,
  Input,
  Radio,
  Select,
  Space,
} from "antd";
import Meta from "antd/es/card/Meta";
import { UploadImage } from "components/shared";
import { useFormik } from "formik";
import { UserContext } from "pages/UserPage/UserPage";
import { useContext, useEffect } from "react";
import { CirclePicker } from "react-color";
import { IUserFromBe, IUserTypeFromBe } from "types/User";
import * as yup from "yup";

export type TUserFormValue = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  theme: "dark" | "default";
  primaryColor: string;
  maLoaiNguoiDung: string;
  hinhAnh: File[] | any;
};

type TUserFormProps = {
    onSubmit?: (value: TUserFormValue) => void;
    resetForm?: boolean;
    defaultValue?: IUserFromBe;
};

const layout = {
  wrapperCol: { span: 18 },
  labelCol: { span: 6 },
};

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

const UserForm = ({onSubmit, resetForm = false, defaultValue}: TUserFormProps) => {
    const {state} = useContext(UserContext);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: defaultValue ? defaultValue.taiKhoan : "",
      matKhau: "",
      hoTen: defaultValue ? defaultValue.hoTen : "",
      email: defaultValue ? defaultValue.email : "",
      soDT: defaultValue ? defaultValue.soDT : "",
      theme: defaultValue ? defaultValue.theme : "dark",
      primaryColor: defaultValue ? defaultValue.primaryColor : "#03a9f4",
      maLoaiNguoiDung: defaultValue ? defaultValue.loaiNguoiDung.maLoaiNguoiDung :"",
      hinhAnh: null,
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("*Tài khoản không được bỏ trống"),
      hoTen: yup.string().required("*Họ tên Không được bỏ trống"),
      email: yup.string().required("*email Không được bỏ trống"),
      maLoaiNguoiDung: yup.string().required("*loại người dùng Không được bỏ trống"),
    }),
    onSubmit: (value: TUserFormValue) => {
        onSubmit && onSubmit(value);
        formik.resetForm();
    },
  });

  useEffect(() => {
    if(resetForm) {
        formik.resetForm();
    }
  }, [resetForm])

  const { handleChange, handleSubmit, values, setFieldValue, errors, touched } =
    formik;

  return (
    <Form onSubmitCapture={handleSubmit} {...layout}>
      {/* user name */}
      <Form.Item required label="Tài Khoản">
        <Input
        value={values.taiKhoan}
          onChange={handleChange}
          placeholder="Nhập tài Khoản"
          name="taiKhoan"
        />
        {errors.taiKhoan && touched.taiKhoan && (
          <p className="text-red-500">{errors.taiKhoan}</p>
        )}
      </Form.Item>

      {/* password */}
      <Form.Item name="matKhau" hasFeedback required label="Mật Khẩu">
        <Input.Password
        value={values.matKhau}
          onChange={handleChange}
          placeholder="Nhập mật khẩu"
          name="matKhau"
        />
        {errors.matKhau && touched.matKhau && (
          <p className="text-red-500">{errors.matKhau}</p>
        )}
      </Form.Item>
      {/* retype password */}
      {
        !defaultValue && <Form.Item
        name="confirm"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("matKhau") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Nhập lại mật sai!"));
            },
          }),
        ]}
        hasFeedback
        required
        label="Nhập Lại Mật Khẩu"
      >
        <Input.Password placeholder="Nhập lại mật khẩu" />
      </Form.Item>
      }

      {/* full name */}
      <Form.Item required label="Họ Tên">
        <Input 
        value={values.hoTen}
        placeholder="Nhập họ tên" onChange={handleChange} name="hoTen" />
        {errors.hoTen && touched.hoTen && (
          <p className="text-red-500">{errors.hoTen}</p>
        )}
      </Form.Item>

      {/* email */}
      <Form.Item required label="Email">
        <Input value={values.email} type="email" placeholder="Nhập email" onChange={handleChange} name="email" />
        {errors.email && touched.email && (
          <p className="text-red-500">{errors.email}</p>
        )}
      </Form.Item>

      {/* user type */}
      <Form.Item required label="Loại Người Dùng">
        <Select 
        value={values.maLoaiNguoiDung.length > 0 ? values.maLoaiNguoiDung : undefined}
        placeholder="chọn loại người dùng"
        notFoundContent={<Empty />}
        onChange={(e) => setFieldValue('maLoaiNguoiDung', e)}
        options={
            state.userType && state.userType.length > 0 ? 
            state.userType.map((ele: IUserTypeFromBe) => ({
                label: ele.loaiNguoiDung,
                value: ele.maLoaiNguoiDung
            })) : undefined
        }
        />
        {errors.maLoaiNguoiDung && touched.maLoaiNguoiDung && (
          <p className="text-red-500">{errors.maLoaiNguoiDung}</p>
        )}
      </Form.Item>

      {/* phone */}
      <Form.Item label="Số Điện Thoại">
        <Input
            value={values.soDT}
          placeholder="Nhập số điện thoại"
          onChange={handleChange}
          name="soDT"
        />
      </Form.Item>

      {/* theme */}
      <Form.Item label="Theme">
        <Flex gap={16}>
          {themeList.map((theme) => (
            <Card
              key={theme.key}
              size="small"
              hoverable
              style={{ width: 180 }}
              onClick={() => setFieldValue("theme", theme.key)}
              cover={
                <Image
                  height={100}
                  alt={`${theme.key}-theme`}
                  preview={false}
                  src={theme.img}
                />
              }
            >
              <div className="flex items-center justify-between">
                <Meta title={theme.name} />
                <Radio checked={theme.key === values.theme} />
              </div>
            </Card>
          ))}
        </Flex>
      </Form.Item>

      {/* phone */}
      <Form.Item required label="Màu Ứng Dụng">
        <Space>
          <CirclePicker
            color={values.primaryColor}
            onChange={(e) => setFieldValue("primaryColor", e.hex)}
          />
        </Space>
      </Form.Item>

      {/* phone */}
      <Form.Item required label="Ảnh Đại Diện">
        <UploadImage
          filesQuantity={1}
          getfiles={(files: any) =>
            setFieldValue("hinhAnh", files)
          }
        />
          {defaultValue && !values.hinhAnh && <Image src={defaultValue?.hinhAnh} width={100} height={100} alt="..." />}
      </Form.Item>

      <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
        <Button htmlType="submit" type="primary">{defaultValue ? "Cập nhật" : "Thêm Tài Khoản"}</Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
