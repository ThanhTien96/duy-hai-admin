import { Form, Input, Select, Typography } from "antd";
import { TextEditor, UploadImage } from "components/shared";
import { useContext } from "react";
import { PostContext } from "../PostPage";

const { Text } = Typography;
const { TextArea } = Input;

type TNewsFormProps = {};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const NewsForm = (props: TNewsFormProps) => {
  const [post, setPost] = useContext(PostContext);

  return (
    <Form {...layout}>
      <Form.Item label="Tiêu Đề">
        <Input placeholder="Nhập tiêu đề" />
      </Form.Item>
      <Form.Item label="Nội Dung Ngắn">
        <TextArea cols={5} placeholder="Nhập tiêu đề" />
      </Form.Item>
      <Form.Item label="Hình Ảnh">
        <UploadImage />
      </Form.Item>
      <Form.Item label="Hình Ảnh">
        <Select
          options={
            post.newsTypeList &&
            post.newsTypeList.map((ele) => ({
              label: ele.loaiTinTuc,
              value: ele.maLoaiTinTuc,
            }))
          }
        />
      </Form.Item>
      <div>
        <Text className="!mb-8">Mô Tả Ngắn:</Text>
        <TextEditor onChange={(value) => console.log(value)} />
      </div>
    </Form>
  );
};

export default NewsForm;
