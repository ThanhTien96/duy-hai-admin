import { Button, Form, Input } from "antd";
import { TextEditor } from "components/shared";
import { useFormik } from "formik";
import { ISupportPost, ISupportPostPayload } from "types/Blog";
import { stringToSlug } from "utils/stringToSlug";
import * as yup from "yup";



type TSupportFormProps = {
    onSubmit: (value: ISupportPostPayload) => void;
    defaultVal?: ISupportPost;
};

const SupportForm = ({onSubmit, defaultVal}: TSupportFormProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tieuDe: defaultVal ? defaultVal.tieuDe : "",
      noiDung: defaultVal ? defaultVal.noiDung : "",
      slug: defaultVal ? defaultVal.slug : "",
    },
    validationSchema: yup.object({
      tieuDe: yup.string().required("*tiêu đề buộc nhập"),
      noiDung: yup.string().required("*nội dung buộc nhập"),
    }),
    onSubmit: (value: ISupportPostPayload) => {
        const payload = {
            ...value,
            slug: stringToSlug(value.tieuDe)
        };
        onSubmit(payload);
        formik.resetForm();
    },
  });

  const { handleSubmit, handleChange, errors, touched, setFieldValue, values } = formik;

  return (
    <Form onSubmitCapture={handleSubmit}>
      {/* title */}
      <Form.Item label="Tiêu Đề">
        <Input
          name="tieuDe"
          value={values.tieuDe}
          placeholder="Nhập Tiêu Đề"
          onChange={handleChange}
        />
        {errors.tieuDe && touched.tieuDe && <span className="text-red-500">{errors.tieuDe}</span>}
      </Form.Item>
      {/* content */}
      <Form.Item>
        <TextEditor defaultValue={values.noiDung} height={700} onChange={(value) => setFieldValue("noiDung", value) } />
        {errors.noiDung && touched.noiDung && <span className="text-red-500">{errors.noiDung}</span>}
      </Form.Item>
      <Form.Item className="sticky bottom-0 right-0">
        <Button htmlType="submit" type="primary" className="w-full rounded-none">{defaultVal ? "Cập Nhật" : "Đăng Bài"}</Button>
      </Form.Item>
    </Form>
  );
};

export default SupportForm;
