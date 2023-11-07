import { Button, Popconfirm, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { EMPTY_IMAGE } from "constants";
import { truncateText } from "utils/truncateText";

const { Text, Title } = Typography;

type NewsItemProps = {
  media?: string;
  title?: string;
  content?: string;
  date?: string;
  onClick?: () => void;
  onDelete?: () => void;
};

const NewsItem = ({
  title,
  content,
  media,
  date,
  onClick,
  onDelete,
}: NewsItemProps) => {
  return (
    <div className="h-[200px] overflow-hidden flex gap-4 border border-solid border-gray-300 rounded-md cursor-pointer hover:shadow-md">
      <div onClick={onClick} className="h-full w-1/3 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-all duration-150 hover:scale-105"
          src={media ?? EMPTY_IMAGE}
          alt={title}
        />
      </div>
      <div className="p-4 pl-0 w-2/3 flex flex-col justify-between">
        <div onClick={onClick}>
          <Title level={4}>{truncateText(title ?? "", 40)}</Title>
          <Text>{truncateText(content ?? "", 150)}</Text>
          <Meta className="text-right" description={date} />
        </div>
        <div className="flex gap-2 justify-end z-50">
          <Popconfirm
          title="Có chắc muốn xoá"
          onConfirm={onDelete}
          okText="Có"
          cancelText="Không"
          >
            <Button size="small" danger>
              Xoá
            </Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
