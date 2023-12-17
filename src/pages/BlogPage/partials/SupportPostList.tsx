import { Button, Popconfirm, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ISupportPost } from 'types/Blog';
import rehypeRaw from "rehype-raw";
import Markdown from 'react-markdown';
import moment from 'moment';
import {EditFilled, DeleteFilled} from "@ant-design/icons"
const {Title} = Typography;

type TSupportPostListProps = {
  postList?: ISupportPost[];
  onDelete?: (id: string) => void;
  onUpdate?: (id: string) => void;
};

interface DataType {
  key: string;
  tieuDe: string;
  noiDung: string;
  createAt: string;
  slug: string;
}


const SupportPostList = ({postList, onDelete, onUpdate}: TSupportPostListProps) => {

  const columns: ColumnsType<DataType> = [
    {
      title: "Tiêu Đề",
      dataIndex: "tieuDe",
      width: "20%",
      key: "tieuDe",
      render: (text) => <Title level={5} className='capitalize'>{text}</Title>,
    },
    {
      title: "Nội Dung",
      width: "45%",
      dataIndex: "noiDung",
      key: "noiDung",
      render: (text) => <Markdown rehypePlugins={[rehypeRaw]}>{text}</Markdown>,
    },
    {
      title: "Link",
      width: "10%",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Ngày Đăng",
      width: "10%",
      key: "createAt",
      dataIndex: "createAt",
      render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Tương Tác",
      width: "15%",
      key: "id",
      dataIndex: "key",
      render: (id) => (
        <Space size="middle">
          <Button onClick={() => onUpdate && onUpdate(id)} icon={<EditFilled className='text-green-500'/>} />
          <Popconfirm okText="xoá" cancelText="huỷ" title="Xoá Bài Viết" description="xác nhận xoá" onConfirm={() => onDelete && onDelete(id)}>
          <Button icon={<DeleteFilled className='text-red-500' />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  const data: DataType[] = postList ? postList.map((ele: ISupportPost) => ({
    key: ele.id,
    tieuDe: ele.tieuDe,
    noiDung: ele.noiDung,
    slug:ele.slug,
    createAt: ele.createAt
  })) : [];
  
  return (
    <div>
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};

export default SupportPostList;
