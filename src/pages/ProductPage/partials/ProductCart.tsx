import { Badge, Button, Card, Divider, Image, Space, Tooltip, Typography } from "antd";
import { EMPTY_IMAGE } from "constants";
import { truncateText } from "utils/truncateText";
import {
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons"
import Calculator from "utils/calculator";
import { useAppSelector } from "store";
const { Meta } = Card;
const { Text } = Typography;


export type TProductCartProps = {
  img?: string;
  title?: string;
  description?: string;
  originalPrice?: number;
  overwritePrice?: number;
  loading?: boolean;
};

const ProductCart = ({
  img,
  title,
  description,
  originalPrice,
  overwritePrice,
  loading = false,
}: TProductCartProps) => {
  const {colorPrimary} = useAppSelector(state => state.app.theme);
  return (
    <Badge.Ribbon color={colorPrimary} text={"- " +Calculator.calcPercentDiscount(originalPrice ?? 0, overwritePrice ?? 0) + " %"}>
      <Card
        loading={loading}
        hoverable
        cover={
          <Image
            height={200}
            preview={false}
            alt={title ?? "product"}
            src={loading ? EMPTY_IMAGE : img ? img : EMPTY_IMAGE}
          />
        }
        actions={[
          <Button size="small" type="primary" key="detail" >Chi Tiết</Button>,
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
        ]}
      >
        <Meta
          title={
            <Tooltip title={title}>
              {title ? truncateText(title, 20) : "None Titile"}
            </Tooltip>
          }
          description={
            description ? truncateText(description, 40) : "None description."
          }
        />
        <Space direction="horizontal" className="mt-3">
          <Text className="line-through text-gray-500">{originalPrice?.toLocaleString()} VNĐ</Text>
          <Text className="font-semibold">Giá: {overwritePrice?.toLocaleString()} VNĐ</Text>
        </Space>
        <Divider className="my-4" />
        <Meta
          description={"Tổng số lượng: 100"}
        />
        <Divider className="my-4" />
        <Meta
          description={"P: 100"}
        />
      </Card>
    </Badge.Ribbon>
  );
};

export default ProductCart;
