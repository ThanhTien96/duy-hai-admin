import { Avatar, Button, Flex, Form, Input } from "antd";
import { TextEditor, UploadImage } from "components/shared";
import { useFormik } from "formik";
import { IBaseMedia } from "types/Auth";
import { IFixPost, IFixPostPayload } from "types/Blog";
import * as yup from "yup";

type TFixPostFormProps = {
  onSubmit: (value: IFixPostPayload) => void;
  defaultVal?: IFixPost;
};

const FixPostForm = ({ onSubmit, defaultVal }: TFixPostFormProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tieuDe: defaultVal ? defaultVal.tieuDe : "",
      noiDung: defaultVal ? defaultVal.noiDung : "",
      tenKySu: defaultVal && defaultVal.tenKySu ? defaultVal.tenKySu : "",
      hinhAnh: null,
    },
    validationSchema: yup.object({
      tieuDe: yup.string().required("*tiêu đề buộc nhập"),
      noiDung: yup.string().required("*nội dung buộc nhập"),
    }),
    onSubmit: (value: IFixPostPayload) => {
      onSubmit(value);
      formik.resetForm();
    },
  });

  const { handleSubmit, handleChange, errors, touched, setFieldValue, values } =
    formik;

  return (
    <Form
      wrapperCol={{ span: 18 }}
      labelCol={{ span: 6 }}
      onSubmitCapture={handleSubmit}
    >
      {/* title */}
      <Form.Item label="Tiêu Đề">
        <Input
          name="tieuDe"
          value={values.tieuDe}
          placeholder="Nhập Tiêu Đề"
          onChange={handleChange}
        />
        {errors.tieuDe && touched.tieuDe && (
          <span className="text-red-500">{errors.tieuDe}</span>
        )}
      </Form.Item>
      <Form.Item label="Người Hướng Dẫn">
        <Input
          name="tenKySu"
          value={values.tenKySu}
          placeholder="Nhập Tên Người Hướng Dẫn"
          onChange={handleChange}
        />
        {errors.tenKySu && touched.tenKySu && (
          <span className="text-red-500">{errors.tenKySu}</span>
        )}
      </Form.Item>
      {/* image */}
      <Form.Item label="Hình Ảnh">
        <UploadImage
          filesQuantity={4}
          getfiles={(file) => setFieldValue("hinhAnh", file)}
        />
        {defaultVal &&
          defaultVal.hinhAnh &&
          Array.isArray(defaultVal.hinhAnh) && (
            <Flex gap={8}>
              {defaultVal.hinhAnh.map((ele: IBaseMedia) => {
                return <Avatar  shape="square" key={ele.id} src={ele.hinhAnh} size={80} />;
              })}
            </Flex>
          )}
      </Form.Item>
      {/* content */}
      <Form.Item wrapperCol={{ span: 24 }}>
        <TextEditor
          defaultValue={values.noiDung}
          height={700}
          onChange={(value) => setFieldValue("noiDung", value)}
        />
        {errors.noiDung && touched.noiDung && (
          <span className="text-red-500">{errors.noiDung}</span>
        )}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} className="sticky bottom-0 right-0">
        <Button
          htmlType="submit"
          type="primary"
          className="w-full rounded-none"
        >
          {defaultVal ? "Cập Nhật" : "Đăng Bài"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FixPostForm;
