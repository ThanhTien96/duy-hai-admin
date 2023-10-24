import { Button, Card, Empty, Input } from "antd";
import { useContext, useState } from "react";
import { PostContext } from "../PostPage";
import { PlusOutlined } from "@ant-design/icons";

type NewsTypeProps = {
  onCreateNewsType?: (data: { loaiTinTuc: string }) => void;
};

const NewsType = ({ onCreateNewsType }: NewsTypeProps) => {
  const [post, setPost] = useContext(PostContext);
  const [addType, setAddType] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Card 
    size="small"
    title={"Loại Tin Tức"}
    className="w-full">
      {post && post.newsTypeList && post.newsTypeList.length > 0 ? (
        post.newsTypeList?.map((ele) => (
          <Button
            key={ele.maLoaiTinTuc}
            className="mt-4 first-of-type:mt-0 w-full shadow-none capitalize"
          >
            {ele.loaiTinTuc}
          </Button>
        ))
      ) : (
        <Empty />
      )}
      {addType && (
        <div className="flex items-center justify-between gap-4 mt-4">
          <Input
            suffix={
              <Button
                size="small"
                type="primary"
                onClick={(e) => {
                  inputValue &&
                    onCreateNewsType &&
                    onCreateNewsType({ loaiTinTuc: inputValue });
                    setInputValue('');
                    setAddType(false);
                }}
              >
                Thêm
              </Button>
            }
            onChange={(value) => setInputValue(value.target.value)}
            placeholder="Nhập tên loại tin tức"
          />
          <Button onClick={() => setAddType(false)}>Hủy</Button>
        </div>
      )}
      {!addType && (
        <Button
          onClick={() => setAddType(true)}
          type="dashed"
          className="border border-dashed border-gray-300 shadow-none !w-full mt-4 first-of-type:mt-0"
        >
          <PlusOutlined />
          Thêm
        </Button>
      )}
    </Card>
  );
};

export default NewsType;
