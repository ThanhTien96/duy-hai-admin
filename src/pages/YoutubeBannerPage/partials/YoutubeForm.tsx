import { Button, Form, Image, Input } from "antd";
import { UploadImage } from "components/shared";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import { IYoutubePostFromBE } from "types/YoutubeBanner";

export interface IYoutubeFormValue {
  tieuDe: string;
  url: string;
  embedLink: string;
  hinhAnh: File[] | null;
}

type TYoutubeFormProps = {
  onSubmit: (value: IYoutubeFormValue) => void;
  resetForm?: boolean;
  defaultValue?: IYoutubePostFromBE;
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const YoutubeForm = ({
  onSubmit,
  resetForm = false,
  defaultValue,
}: TYoutubeFormProps) => {
  const formik = useFormik({
    initialValues: {
      tieuDe: defaultValue ? defaultValue.tieuDe : "",
      url: defaultValue ? defaultValue.url : "",
      embedLink:
        defaultValue && defaultValue.embedLink ? defaultValue.embedLink : "",
      hinhAnh: null,
    },
    validationSchema: yup.object({
      tieuDe: yup.string().required("*Tiêu đề buộc nhập"),
      url: yup
        .string()
        .required("*URL youtube buộc nhập")
        .matches(
          /^https:\/\/www\.youtube\.com\/embed\//,
          'URL phải bắt đầu bằng: "https://www.youtube.com/embed/"'
        ),
      embedLink: yup
        .string()
        .required("*Link youtube buộc nhập")
        .matches(
          /^https:\/\/www\.youtube\.com\/embed\//,
          'Link phải bắt đầu bằng: "https://www.youtube.com/embed/"'
        ),
      hinhAnh: yup
        .array()
        .test("at-least-one-item", "*Chọn hình ảnh", (value) => {
          return value && value.length > 0;
        }),
    }),
    onSubmit: (value: IYoutubeFormValue) => {
      onSubmit(value);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (resetForm) {
      formik.resetForm();
    }
  }, []);

  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } =
    formik;

  return (
    <Form onSubmitCapture={handleSubmit} {...layout}>
      <Form.Item label="Tiêu Đề">
        <Input
          onChange={handleChange}
          value={values.tieuDe}
          name="tieuDe"
          placeholder="Nhập tiêu đề"
        />
        {errors.tieuDe && touched.tieuDe && (
          <p className="text-red-500">{errors.tieuDe}</p>
        )}
      </Form.Item>

      <Form.Item label="Link Youtube">
        <Input
          value={values.url}
          onChange={handleChange}
          name="url"
          placeholder="https://www.youtube.com/embed/example..."
        />
        {errors.url && touched.url && (
          <p className="text-red-500">{errors.url}</p>
        )}
      </Form.Item>

      <Form.Item label="Link nhúng youtube">
        <Input
          value={values.embedLink}
          onChange={handleChange}
          name="embedLink"
          placeholder="https://www.youtube.com/embed/example..."
        />
        {errors.embedLink && touched.embedLink && (
          <p className="text-red-500">{errors.embedLink}</p>
        )}
      </Form.Item>

      <Form.Item label="Ảnh Bìa">
        <UploadImage
          resetFile={resetForm}
          filesQuantity={1}
          getfiles={(files) => setFieldValue("hinhAnh", files)}
        />
        {errors.hinhAnh && touched.hinhAnh && (
          <p className="text-red-500">{errors.hinhAnh}</p>
        )}
        {defaultValue && !values.hinhAnh && (
          <Image
            width={100}
            height={100}
            src={defaultValue.hinhAnh}
            alt="..."
          />
        )}
      </Form.Item>

      <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
        <Button htmlType="submit" type="primary">
          Thêm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default YoutubeForm;
