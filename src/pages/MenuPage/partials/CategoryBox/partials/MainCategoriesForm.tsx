import { Button, Form, Image, Input, Tag, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { EMPTY_IMAGE } from "constants";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { IMainCategoriesFromBE } from "types/Menu";
import * as yup from "yup";
const { Text } = Typography;

export type TCategoriesFormValue = {
  tenDanhMuc: string;
  icon: string;
  role?: string;
};

type TMainCategoriesFormProps = {
  getForm: (value: TCategoriesFormValue) => void;
  defaultValue?: IMainCategoriesFromBE;
  resetForm?: boolean;
  roleList?: number[];
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const MainCategoriesForm = ({
  defaultValue,
  getForm,
  resetForm = false,
  roleList,
}: TMainCategoriesFormProps) => {
  const [imgSrc, setImgSrc] = useState<string | ArrayBuffer | null>(null);
  const formik = useFormik({
    enableReinitialize:  true,
    initialValues: {
      tenDanhMuc: defaultValue ? defaultValue.tenDanhMuc : "",
      icon: defaultValue ? defaultValue.icon : "",
      role: defaultValue ? defaultValue.role.toString() : "",
    },
    validationSchema: yup.object({
      tenDanhMuc: yup.string().required("*Tên danh mục bắt buộc nhập!"),
      icon: yup.string().required("*Icon bắt buộc nhập!"),
      role: yup
        .string()
        .required("*Role bắt buộc nhập!")
        .matches(/^\d+$/, "Chỉ cho phép nhập số"),
    }),
    onSubmit: (value: TCategoriesFormValue) => {
      getForm && getForm(value);
      formik.resetForm();
      setImgSrc(null);
    },
  });

  useEffect(() => {
    if (resetForm === true) {
      formik.resetForm();
      setImgSrc(null);
    }
    if (defaultValue && defaultValue.icon) {
      setImgSrc(defaultValue.icon);
    }
  }, [resetForm, defaultValue]);

  return (
    <Content>
      {roleList && (
        <div className="mb-4">
          <Text>Role đã có: </Text>
          <div className="mt-4">
            {roleList.map((ele: number, index: number) => (
              <Tag color="magenta" key={index} className="mr-1">
                {ele}
              </Tag>
            ))}
          </div>
        </div>
      )}
      <Form {...layout} onSubmitCapture={formik.handleSubmit}>
        <Form.Item required label="Tên Danh Mục">
          <Input
            value={formik.values.tenDanhMuc}
            onChange={formik.handleChange}
            name="tenDanhMuc"
            placeholder="Nhập tên danh mục"
          ></Input>
          {formik.errors.tenDanhMuc && formik.touched.tenDanhMuc && (
            <p className="text-red-500">{formik.errors.tenDanhMuc}</p>
          )}
        </Form.Item>
        {!defaultValue && <Form.Item required label="Role">
          <Input
            value={formik.values.role}
            onChange={formik.handleChange}
            name="role"
            placeholder="Nhập role chưa tồn tại"
          ></Input>
          {formik.errors.role && formik.touched.role && (
            <p className="text-red-500">{formik.errors.role}</p>
          )}
        </Form.Item>
}
        <Form.Item required label="Icon">
          {imgSrc && (
            <div className="mb-4">
              <Image
                preview={false}
                width={40}
                height={40}
                src={imgSrc?.toString() ?? EMPTY_IMAGE}
                alt="..."
              />
            </div>
          )}
          <input
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files && e.target.files[0];
              if (selectedFile) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const base64Data = event.target && event.target.result;
                  setImgSrc(base64Data);
                  formik.setFieldValue("icon", base64Data);
                };

                reader.readAsDataURL(selectedFile);
              }
            }}
            accept="image/png, image/jpg, image/jpeg"
          />
          {formik.errors.icon && formik.touched.icon && (
            <p className="text-red-500">{formik.errors.icon}</p>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button htmlType="submit" type="primary">
            {defaultValue ? "Cập Nhật" : "Thêm Danh Mục"}
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default MainCategoriesForm;
