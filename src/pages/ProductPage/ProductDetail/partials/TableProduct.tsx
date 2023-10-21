import { Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { CURRENCY } from "constants";
import moment from "moment";
import { IProductDetailFromBE } from "types/Product";

const { Text } = Typography;

export type TTableProductProps = {
  product?: IProductDetailFromBE;
};

export interface DataType {
  key: string;
  title: string;
  content: string | number | boolean | Date | null;
}

const TableProduct = ({ product }: TTableProductProps) => {

  const columns: ColumnsType<DataType> = [
    {
      title: "Tiêu Đề",
      dataIndex: "title",
      width: "30%",
      render: (text) => {
        return <Text>{text}</Text>;
      },
    },
    {
      title: "Kết Quả",
      className: "column-money",
      dataIndex: "content",
      render: (text, data) => {
        if (typeof text === "boolean") {
          return text ? (
            <Text>
              {" "}
              <span></span>Có
            </Text>
          ) : (
            <Tag color="red">Không</Tag>
          );
        } else if (typeof text === "number" && data.key !== "7") {
          return (
            <Text>
              {text.toLocaleString()} {CURRENCY.vnd}
            </Text>
          );
        } else if (data.key === "10") {
          return <Text>{moment(text).format('dddd MM-DD-YYYY hh:mm:ss a')}</Text>;
        } else {
            return <Text>{text}</Text>;
        }
      },
      align: "right",
      width: "70%",
    },
  ];

  const data: DataType[] = product
    ? [
        {
          key: "1",
          title: "Tiêu Đề SEO",
          content: product.seoTitle,
        },
        {
          key: "2",
          title: "Mô Tả SEO",
          content: product.seoDetail,
        },
        {
          key: "3",
          title: "SEO",
          content: product.seo,
        },
        {
          key: "4",
          title: "Hot",
          content: product.hot,
        },
        {
          key: "5",
          title: "Giá Gốc",
          content: product.giaGoc,
        },
        {
          key: "6",
          title: "Giá Bán",
          content: product.giaGiam,
        },
        {
          key: "7",
          title: "Tổng Số Lượng",
          content: product.tongSoLuong,
        },
        {
          key: "8",
          title: "Link Youtube",
          content: product.youtubeVideo,
        },
        {
          key: "9",
          title: "Danh Mục Sản phẩm",
          content: product.danhMucNho.tenDanhMucNho,
        },
        {
          key: "10",
          title: "Ngày Thêm",
          content: product.createAt,
        },
      ]
    : [];

  return (
    <Table
      rootClassName="rounded-none"
      pagination={false}
      columns={columns}
      dataSource={data}
      bordered
    />
  );
};

export default TableProduct;
