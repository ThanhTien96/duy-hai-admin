import { Button, Card, Popconfirm, Space, Typography } from "antd";
import {
  PlayCircleOutlined,
  EllipsisOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { IYoutubePostFromBE } from "types/YoutubeBanner";
import { Popover } from "antd/lib";

const { Title } = Typography;

type TYoutubePostCardProps = {
  data: IYoutubePostFromBE;
  watchVideo?: () => void;
  onDelete?: () => void;
  onOpenUpdate?: () => void;
};

const YoutubePostCard = ({
  data,
  watchVideo,
  onDelete,
  onOpenUpdate,
}: TYoutubePostCardProps) => {
  return (
    <Card
      bodyStyle={{ padding: 0 }}
      className="overflow-hidden border border-solid border-gray-400 h-[250px] rounded-sm"
    >
      <div className="relative">
        <Popover
          placement="bottomRight"
          content={
            <Space
              direction="vertical"
              className="w-[150px] justify-end"
              size="small"
            >
              <Button
                onClick={onOpenUpdate}
                icon={<FormOutlined />}
                type="primary"
                className="w-full"
                size="small"
              >
                Sửa
              </Button>
              <Popconfirm
                onConfirm={onDelete}
                okText="Có"
                cancelText="Không"
                title="Có chắc bạn muốn xoá"
              >
                <Button
                  icon={<DeleteOutlined />}
                  type="primary"
                  className="w-full"
                  danger
                  size="small"
                >
                  Xoá
                </Button>
              </Popconfirm>
            </Space>
          }
          trigger="hover"
        >
          <div className="flex items-center justify-center absolute top-2 right-2 p-1 rounded-md bg-gray-400/50 transition-all duration-150 hover:bg-gray-400 cursor-pointer">
            <EllipsisOutlined className="text-xl" />
          </div>
        </Popover>
        <PlayCircleOutlined
          onClick={watchVideo}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-3xl cursor-pointer transition-all duration-150 hover:scale-125"
        />
        <img
          className="w-full h-[180px] object-cover"
          src={data.hinhAnh}
          alt={data.tieuDe}
        />
      </div>
      <Title className="!text-[14px] line-clamp-2 p-2" level={4}>
        {data.tieuDe}
      </Title>
    </Card>
  );
};

export default YoutubePostCard;
