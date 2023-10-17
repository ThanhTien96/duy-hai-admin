import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
} from "antd";
import { TextEditor } from "components/shared";
import { useFormik } from "formik";
import * as yup from "yup";
import SliderInput from "./SliderInput";
import { CURRENCY } from "constants";
import TextArea from "antd/es/input/TextArea";
import { ISubCategoriesFormBE } from "types/Menu";

export type TProductFormProps = {
  subCategories: ISubCategoriesFormBE[];
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const ProductForm = ({ subCategories }: TProductFormProps) => {
  const formik = useFormik({
    initialValues: {
      tenSanPham: "",
      giaGoc: 0,
      giaGiam: 0,
      tongSoLuong: 0,
      moTa: "",
      moTaNgan: "",
      maDanhMucNho: "",
      seoTitle: "",
      seoDetail: "",
      youtubeVideo: "",
      hot: false,
      seo: false,
    },
    onSubmit: (value) => {
      console.log(value);
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values } = formik;

  return (
    <Form onSubmitCapture={handleSubmit} {...layout}>
      <Row gutter={[32, 32]}>
        {/* Form left */}
        <Col span={24} xxl={12}>
          {/* product name */}
          <Form.Item required label="Tên Sản phẩm">
            <Input
              onChange={handleChange}
              name="tenSanPham"
              placeholder="Nhập Tên sản phẩm"
            />
          </Form.Item>

          {/* original price  */}
          <Form.Item required label="Giá Gốc">
            <InputNumber
              addonAfter={CURRENCY.vnd}
              onChange={(value) => {
                setFieldValue("giaGoc", value);
              }}
              name="giaGoc"
              placeholder="Nhập giá gốc"
              className="w-full"
            />
          </Form.Item>

          {/* overwrite price */}
          <Form.Item required label="Giá Giảm">
            <SliderInput
              onChange={(value: number) => {
                setFieldValue("giaGiam", value);
              }}
              defaultVal={formik.values.giaGoc}
            />
          </Form.Item>
          {/* total count  */}
          <Form.Item required label="Tổng Số Lượng">
            <InputNumber
              addonAfter={CURRENCY.vnd}
              onChange={(value) => {
                setFieldValue("tongSoLuong", value);
              }}
              name="giaGoc"
              placeholder="Nhập giá gốc"
              className="w-full"
            />
          </Form.Item>

          {/* categories */}
          <Form.Item required label="Danh Mục">
            <Select
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
          </Form.Item>

          {/* sort description */}
          <Form.Item required label="Mô Tả Ngắn">
            <TextArea
              onChange={handleChange}
              name="moTaNgan"
              rows={5}
              placeholder="Nhập mô tả"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Divider className="my-4" />
          </Form.Item>

          {/* No Required Field*/}
          <Form.Item label="Tiêu Đề SEO">
            <Input
              onChange={handleChange}
              name="seoTitle"
              placeholder="Nhập tiêu đề SEO"
            />
          </Form.Item>

          {/* SEO Description */}
          <Form.Item label="Mô Tả SEO">
            <TextArea
              onChange={handleChange}
              name="seoDetail"
              rows={3}
              placeholder="Nhập mô tả SEO"
            />
          </Form.Item>

          {/* video link */}
          <Form.Item label="Video Youtube">
            <Input
              onChange={handleChange}
              name="youtubeVideo"
              placeholder="https://www.youtube.com/embed/example"
            />
          </Form.Item>

          {/* HOT */}
          <Form.Item label="Sản phẩm HOT">
            <Switch
              onChange={(e) => setFieldValue("hot", e)}
              checkedChildren="Có"
              unCheckedChildren="Không"
              defaultChecked={values.hot}
            />
          </Form.Item>

          {/* SEO */}
          <Form.Item label="Sản phẩm HOT">
            <Switch
              onChange={(e) => setFieldValue("seo",e)}
              checkedChildren="Có"
              unCheckedChildren="Không"
              defaultChecked={values.hot}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Button htmlType="submit" type="primary">
              Thêm Sản Phẩm
            </Button>
          </Form.Item>
        </Col>

        {/* form right */}
        <Col span={24} xxl={12}>
          {/* markdown editor */}
          <Form.Item wrapperCol={{ span: 24 }}>
            <TextEditor
              onChange={(value: any) => setFieldValue("moTa", value)}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductForm;
