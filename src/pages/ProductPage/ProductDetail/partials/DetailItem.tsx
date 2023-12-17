import { Card, Divider, Typography } from "antd";
import MediaBox, { TImageMediaBox } from "pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox";
import { IProductMediaType } from "types/Product";
import rehypeRaw from "rehype-raw";
import Markdown from 'react-markdown';

const { Title} = Typography;

type DetailItemProps = {
  media?: IProductMediaType[];
  markdownContent?: string;
  onUpload?: (files: FileList) => void;
};

const DetailItem = ({ media, markdownContent, onUpload }: DetailItemProps) => {
  return (
    <div>
      <div>
        <MediaBox
        onUpload={onUpload}
          direction="horizontal"
          media={
            media
              ? media?.map<TImageMediaBox>((ele: IProductMediaType) => ({
                  id: ele.id,
                  src: ele.hinhAnh,
                  mainImage: ele.hinhChinh
                }))
              : []
          }
        />
      </div>
      <Card className="mt-8 rounded-none">
        <Title level={5}>Chi Tiết Sản Phẩm</Title>
        <Divider className="my-2" />
        <Markdown rehypePlugins={[rehypeRaw]}>{markdownContent}</Markdown>
      </Card>
    </div>
  );
};

export default DetailItem;
