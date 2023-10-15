import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Typography,
} from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppSelector } from "store";
import { TNavLinkFromBE } from "types/Menu";
import { Content } from "antd/es/layout/layout";
import Meta from "antd/es/card/Meta";
const { Text } = Typography;

export type TFormValue = {
  tenNavLink: string;
  url: string;
  role: number;
  maMenu: string;
};

type TNavLinkFormProps = {
  getForm?: (value: TFormValue) => void;
  defaultValue?: TNavLinkFromBE;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const NavLinkForm = (props: TNavLinkFormProps) => {
  const { getForm, defaultValue } = props;
  const { menu } = useAppSelector((state) => state.common.menu);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenNavLink: defaultValue ? defaultValue.tenNavLink : "",
      url: defaultValue ? defaultValue.url : "",
      role: defaultValue ? defaultValue.role : 0,
      maMenu: defaultValue ? defaultValue.maMenu : "",
    },
    validationSchema: yup.object({
      tenNavLink: yup.string().required("*Tên menu bắt buộc"),
      url: yup
        .string()
        .matches(/^\/.*/, "Vui lòng bắt đầu bằng dấu gạch chéo ngược (/)")
        .required("*url bắt buộc"),
      role: yup.number().min(1, "*vui lòng nhập role").required("*role bắt buộc"),
      maMenu: yup.string().required("*ma menu bắt buộc chọn"),
    }),
    onSubmit: (value: TFormValue) => {
      getForm && getForm(value);
      formik.resetForm();
    },
  });


  return (
    <Content>
      <div className="mb-4">
        <Text>Role đã có: </Text>
        <div className="mt-4">
          {menu?.navlink.map((ele: TNavLinkFromBE) => (
            <Tag color="magenta" key={ele.role} className="mr-1">
              {ele.role}
            </Tag>
          ))}
        </div>
      </div>
      <Form
        onReset={() => formik.resetForm}
        className="pt-2"
        {...layout}
        onSubmitCapture={formik.handleSubmit}
      >
        <Form.Item label="Tên Thẻ Menu" required>
          <Input
            value={formik.values.tenNavLink}
            onChange={formik.handleChange}
            name="tenNavLink"
            placeholder="Nhập tên menu"
          />
          {formik.errors.tenNavLink && formik.touched.tenNavLink && (
            <p className="text-red-500">{formik.errors.tenNavLink}</p>
          )}
        </Form.Item>
        <Form.Item label="link" required>
          <Input
            value={formik.values.url}
            onChange={formik.handleChange}
            name="url"
            placeholder="Nhập link bắt đầu dấu /"
          />
          {formik.errors.url && formik.touched.url && (
            <p className="text-red-500">{formik.errors.url}</p>
          )}
        </Form.Item>
        <Form.Item label="role" required>
          <Meta className="mb-2" description="chọn 1 role chưa có"/>
          <InputNumber
            value={formik.values.role > 0 ? formik.values.role : undefined}
            className="w-full"
            onChange={(e) => formik.setFieldValue("role", e)}
            name="role"
            placeholder="Chọn role chưa có"
          />
          {formik.errors.role && formik.touched.role && (
            <p className="text-red-500">{formik.errors.role}</p>
          )}
        </Form.Item>
        <Form.Item label="Chọn Menu" required>
          <Select
            value={formik.values.maMenu.length > 0 ? formik.values.maMenu : undefined}
            onChange={(e) => formik.setFieldValue("maMenu", e)}
            placeholder="Chọn menu"
            options={[
              {
                label: "menu 1",
                value: menu?.maMenu,
              },
            ]}
          />
          {formik.errors.maMenu && formik.touched.maMenu && (<p className="text-red-500">{formik.errors.maMenu}</p>)}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" type="primary">
            {defaultValue ? "Cập Nhật" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default NavLinkForm;
