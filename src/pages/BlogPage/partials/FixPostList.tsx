import { Avatar, Button, Popconfirm, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IFixPost } from 'types/Blog';
import moment from 'moment';
import {EditFilled, DeleteFilled} from "@ant-design/icons"
import { IBaseMedia } from 'types/Auth';
import { EMPTY_IMAGE } from 'constants';
const {Title} = Typography;

type TFixPostListProps = {
  postList?: IFixPost[];
  onDelete?: (id: string) => void;
  onUpdate?: (id: string) => void;
};

interface DataType {
  key: string;
  tieuDe: string;
  noiDung: string;
  tenKySu: string;
  hinhAnh: IBaseMedia;
  createAt: string;
}


const FixPostList = ({postList, onDelete, onUpdate}: TFixPostListProps) => {

  const columns: ColumnsType<DataType> = [
    {
        title: "Hình Ảnh",
        width: "15%",
        dataIndex: "hinhAnh",
        key: "hinhAnh",
        render: (_, media) => {
            return <Avatar size={100} shape='square'  src={media.hinhAnh.hinhAnh ?? EMPTY_IMAGE} />
        },
      },
    {
      title: "Tiêu Đề",
      dataIndex: "tieuDe",
      width: "20%",
      key: "tieuDe",
      render: (text) => <Title level={5} className='capitalize'>{text}</Title>,
    },
    {
      title: "Kỹ Sư",
      width: "15%",
      dataIndex: "tenKySu",
      key: "tenKySu",
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
  
  const data: DataType[] = postList ? postList.map((ele: IFixPost) => ({
    key: ele.maBaiViet,
    tieuDe: ele.tieuDe,
    noiDung: ele.noiDung,
    tenKySu:ele.tenKySu,
    hinhAnh: ele.hinhAnh[0],
    createAt: ele.createAt
  })) : [];
  
  return (
    <div>
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};

export default FixPostList;
