import { Button, Form, Image, Input, Select, Typography } from "antd";
import { TextEditor, UploadImage } from "components/shared";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useAppSelector } from "store";
import { INewsPostFromBE, INewsTypeFormBE } from "types/Post";

const { Text } = Typography;
const { TextArea } = Input;

export type TPostFormValue = {
  tieuDe: string;
  noiDung: string;
  noiDungNgan: string;
  maLoaiTinTuc: string;
  hinhAnh: File[] | null;
};

type TNewsFormProps = {
  onSubmit?: (value: TPostFormValue) => void;
  resetForm?: boolean;
  defaultValue?: INewsPostFromBE;
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
  className: "relative",
};

const NewsForm = ({
  onSubmit,
  resetForm = false,
  defaultValue,
}: TNewsFormProps) => {
  const { newsType } = useAppSelector((state) => state.common.news);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tieuDe: defaultValue ? defaultValue.tieuDe : "",
      noiDungNgan: defaultValue ? defaultValue.noiDungNgan : "",
      maLoaiTinTuc: defaultValue ? defaultValue.maLoaiTinTuc : "",
      noiDung: defaultValue ? defaultValue.noiDung : "",
      hinhAnh: null,
    },
    onSubmit: (value: TPostFormValue) => {
      onSubmit && onSubmit(value);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (resetForm) {
      formik.resetForm();
    }
  }, [resetForm]);

  const { handleChange, handleSubmit, setFieldValue, values } =
    formik;

  return (
    <Form onSubmitCapture={handleSubmit} {...layout}>
      <Form.Item label="Tiêu Đề">
        <Input
          value={values.tieuDe}
          onChange={handleChange}
          name="tieuDe"
          placeholder="Nhập tiêu đề"
        />
      </Form.Item>
      <Form.Item label="Nội Dung Ngắn">
        <TextArea
          value={values.noiDungNgan}
          name="noiDungNgan"
          onChange={handleChange}
          cols={5}
          placeholder="Nhập tiêu đề"
        />
      </Form.Item>
      <Form.Item label="Hình Ảnh">
        <UploadImage
          resetFile={resetForm}
          filesQuantity={4}
          getfiles={(files) => setFieldValue("hinhAnh", files)}
        />
        {defaultValue && !values.hinhAnh && (
          <div className="flex items-center gap-4 mb-4">
            {defaultValue.hinhAnh.length > 0 &&
              defaultValue.hinhAnh.map((ele) => (
                <Image
                  width={100}
                  height={100}
                  src={ele.hinhAnh}
                  alt="nông cơ hải trà tân"
                />
              ))}
          </div>
        )}
      </Form.Item>
      <Form.Item label="Loại Tin Tức">
        <Select
          value={
            !values.maLoaiTinTuc || values.maLoaiTinTuc.length <= 0
              ? undefined
              : values.maLoaiTinTuc
          }
          placeholder="Chọn loại tin tức"
          onChange={(value) => setFieldValue("maLoaiTinTuc", value)}
          options={
            newsType && newsType.length > 0
              ? newsType.map((ele: INewsTypeFormBE) => ({
                  label: ele.loaiTinTuc,
                  value: ele.maLoaiTinTuc,
                }))
              : []
          }
        />
      </Form.Item>
      <div>
        <Text className="!mb-8">Nội Dung:</Text>
        <TextEditor
          defaultValue={values.noiDung}
          className="mt-4"
          onChange={(value) => {
            setFieldValue("noiDung", value)
          }}
        />

        <div className="sticky -bottom-6">
          <Button
            htmlType="submit"
            className="mt-8 w-full rounded-sm"
            type="primary"
          >
            {defaultValue ? "Cập Nhật Tin Tức" : " Thêm Tin Tức"}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default NewsForm;
