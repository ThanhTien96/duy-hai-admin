import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import { TextEditor, UploadImage } from "components/shared";
import { useFormik } from "formik";
import * as yup from "yup";
import SliderInput from "./SliderInput";
import { CURRENCY } from "constants";
import TextArea from "antd/es/input/TextArea";
import { ISubCategoriesFormBE } from "types/Menu";
import { IProductFromBE, IProductMediaType } from "types/Product";

export type TProductFormProps = {
  subCategories: ISubCategoriesFormBE[];
  getFormValue: (value: TProductFormValue) => void;
  defaultValue?: IProductFromBE;
};

export type TProductFormValue = {
  tenSanPham: string;
  giaGoc: number;
  giaGiam: number;
  tongSoLuong: number;
  moTa: string;
  moTaNgan: string;
  maDanhMucNho: string;
  seoTitle: string;
  seoDetail: string;
  youtubeVideo: string;
  hinhAnh: File[] | null;
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const ProductForm = ({
  subCategories,
  getFormValue,
  defaultValue,
}: TProductFormProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenSanPham:
        defaultValue && defaultValue.tenSanPham ? defaultValue.tenSanPham : "",
      giaGoc: defaultValue && defaultValue.giaGoc ? defaultValue.giaGoc : 0,
      giaGiam: defaultValue && defaultValue.giaGiam ? defaultValue.giaGiam : 0,
      tongSoLuong:
        defaultValue && defaultValue.tongSoLuong ? defaultValue.tongSoLuong : 0,
      moTa: defaultValue && defaultValue.moTa ? defaultValue.moTa : "",
      moTaNgan:
        defaultValue && defaultValue.moTaNgan ? defaultValue.moTaNgan : "",
      maDanhMucNho: defaultValue && defaultValue.maDanhMucNho ? defaultValue.maDanhMucNho : "",
      seoTitle: defaultValue && defaultValue.seoTitle ? defaultValue.seoTitle : "",
      seoDetail: defaultValue && defaultValue.seoDetail ? defaultValue.seoDetail : "",
      youtubeVideo: defaultValue && defaultValue.youtubeVideo ? defaultValue.youtubeVideo : "",
      hinhAnh: null,
    },
    validationSchema: yup.object({
      tenSanPham: yup.string().required("*Tên sản phẩm bắt buộc!"),
      giaGiam: yup.number().min(1, "*Giá bán buộc nhập!").required(),
      tongSoLuong: yup.number().min(1, "*Tổng số lượng buộc nhập!").required(),
      moTaNgan: yup.string().required("*Mô tả ngắn buộc nhập!"),
      maDanhMucNho: yup.string().required("*Danh mục buộc nhập!"),
      seoTitle: yup.string().required("*Tiêu đề SEO buộc nhập!"),
      seoDetail: yup.string().required("*Tiêu đề SEO buộc nhập!"),
    }),
    onSubmit: (values: TProductFormValue) => {
      getFormValue(values);
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } =
    formik;

  return (
    <Form onSubmitCapture={handleSubmit} {...layout}>
      <Row gutter={[32, 32]}>
        {/* Form left */}
        <Col span={24} xxl={12}>
          {/* product name */}
          <Form.Item required label="Tên Sản phẩm">
            <Input
            value={values.tenSanPham}
              onChange={handleChange}
              name="tenSanPham"
              placeholder="Nhập Tên sản phẩm"
            />
            {errors.tenSanPham && touched.tenSanPham && (
              <p className="text-red-500">{errors.tenSanPham}</p>
            )}
          </Form.Item>

          {/* original price  */}
          <Form.Item required label="Giá Gốc">
            <InputNumber
            value={values.giaGoc && values.giaGoc > 0 ? values.giaGoc : undefined}
              addonAfter={CURRENCY.vnd}
              onChange={(value) => {
                setFieldValue("giaGoc", value);
                !defaultValue && setFieldValue("giaGiam", value);
              }}
              name="giaGoc"
              placeholder="Nhập giá gốc"
              className="w-full"
            />
          </Form.Item>

          {/* overwrite price */}
          <Form.Item required label="Giá Bán">
            <SliderInput
              onChange={(value: number) => {
                setFieldValue("giaGiam", value);
              }}
              defaultVal={defaultValue && values.giaGiam > 0 ? values.giaGiam : values.giaGoc }
            />
            {errors.giaGiam && touched.giaGiam && (
              <p className="text-red-500">{errors.giaGiam}</p>
            )}
          </Form.Item>
          {/* total count  */}
          <Form.Item required label="Tổng Số Lượng">
            <InputNumber
            value={values.tongSoLuong && values.tongSoLuong > 0 ? values.tongSoLuong : undefined}
              addonAfter={CURRENCY.vnd}
              onChange={(value) => {
                setFieldValue("tongSoLuong", value);
              }}
              placeholder="Nhập tổng số lượng"
              className="w-full"
            />
            {errors.tongSoLuong && touched.tongSoLuong && (
              <p className="text-red-500">{errors.tongSoLuong}</p>
            )}
          </Form.Item>

          {/* categories */}
          <Form.Item required label="Danh Mục">
            <Select
              value={values.maDanhMucNho}
              onChange={(value) => setFieldValue("maDanhMucNho", value)}
              options={
                subCategories &&
                subCategories.map((subCate: ISubCategoriesFormBE) => ({
                  label: subCate.tenDanhMucNho,
                  value: subCate.maDanhMucNho,
                }))
              }
              placeholder="Chọn danh mục sản phẩm"
            />
            {errors.maDanhMucNho && touched.maDanhMucNho && (
              <p className="text-red-500">{errors.maDanhMucNho}</p>
            )}
          </Form.Item>

          {/* sort description */}
          <Form.Item required label="Mô Tả Ngắn">
            <TextArea
            value={values.moTaNgan}
              onChange={handleChange}
              name="moTaNgan"
              rows={5}
              placeholder="Nhập mô tả"
            />
            {errors.moTaNgan && touched.moTaNgan && (
              <p className="text-red-500">{errors.moTaNgan}</p>
            )}
          </Form.Item>

          {/* upload media */}
          <Form.Item label="Hình Ảnh" required>
            
            <UploadImage
              getfiles={(files) => {
                setFieldValue("hinhAnh", files);
              }}
              filesQuantity={6}
            />
            {
              !values.hinhAnh && defaultValue && (
                <Space className="mb-4">
                  {defaultValue.hinhAnh.map((img: IProductMediaType) => <Image key={img.id} width={100} height={100} src={img.hinhAnh} alt={defaultValue.tenSanPham}/>)}
                </Space>
              )
            }
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Divider className="my-4" />
          </Form.Item>

          {/* SEO*/}
          <Form.Item required label="Tiêu Đề SEO">
            <Input
            value={values.seoTitle}
              onChange={handleChange}
              name="seoTitle"
              placeholder="Nhập tiêu đề SEO"
            />
            {errors.seoTitle && touched.seoTitle && (
              <p className="text-red-500">{errors.seoTitle}</p>
            )}
          </Form.Item>

          {/* SEO Description */}
          <Form.Item required label="Mô Tả SEO">
            <TextArea
            value={values.seoDetail}
              onChange={handleChange}
              name="seoDetail"
              rows={3}
              placeholder="Nhập mô tả SEO"
            />
            {errors.seoDetail && touched.seoDetail && (
              <p className="text-red-500">{errors.seoDetail}</p>
            )}
          </Form.Item>

          {/* video link */}
          <Form.Item label="Video Youtube">
            <Input
            value={values.youtubeVideo}
              onChange={handleChange}
              name="youtubeVideo"
              placeholder="https://www.youtube.com/embed/example"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Button htmlType="submit" type="primary">
              {defaultValue ? "Cập Nhật" : "Thêm Sản Phẩm"}
            </Button>
          </Form.Item>
        </Col>

        {/* form right */}
        <Col span={24} xxl={12}>
          {/* markdown editor */}
          <Form.Item wrapperCol={{ span: 24 }}>
            <TextEditor
              defaultValue={defaultValue?.moTa}
              height={900}
              onChange={(value: any) => setFieldValue("moTa", value)}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductForm;
