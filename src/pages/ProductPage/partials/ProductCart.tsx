import { Badge, Card, Divider, Image, Space, Tooltip, Typography } from "antd";
import { EMPTY_IMAGE, pagePaths } from "constants";
import { truncateText } from "utils/truncateText";
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import Calculator from "utils/calculator";
import { useAppSelector } from "store";
import { useNavigate } from "react-router";
const { Meta } = Card;
const { Text } = Typography;


export type TProductCartProps = {
  id: string;
  img?: string;
  title?: string;
  description?: string;
  originalPrice?: number;
  overwritePrice?: number;
  loading?: boolean;
  quantity?: number;
  isHot?: boolean;
  isSEO?: boolean;
};

const ProductCart = ({
  id,
  img,
  title,
  description,
  originalPrice,
  overwritePrice,
  loading = false,
  quantity,
  isSEO,
  isHot
}: TProductCartProps) => {
  const {colorPrimary} = useAppSelector(state => state.app.theme);
  const navigate = useNavigate();
  return (
    <Badge.Ribbon color={colorPrimary} text={"- " +Calculator.calcPercentDiscount(originalPrice ?? 0, overwritePrice ?? 0) + " %"}>
      <Card
        loading={loading}
        hoverable
        cover={
          <Image
            loading="lazy"
            height={200}
            preview={false}
            alt={title ?? "product"}
            src={loading ? EMPTY_IMAGE : img ? img : EMPTY_IMAGE}
          />
        }
        actions={[
          <a href="#" key="detail" >Chi Tiết</a>,
          <EditOutlined 
          onClick={() => navigate(`/${pagePaths.product}/${pagePaths.updateProduct}/${id}`)}
          key="edit" />,
          <DeleteOutlined key="delete" />,
          <SettingOutlined key="setting" />,
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
          description={
            <Text><b>Tổng Số Lượng:</b> {quantity}</Text>
          }
        />
        <Divider className="my-4" />
        <Space className="justify-between">
          <Meta description={`Public: ${isHot ? "Có" : "Không"}`} />
          <Meta description={`SEO: ${isSEO? "Có" : "Không"}`} />
        </Space>
      </Card>
    </Badge.Ribbon>
  );
};

export default ProductCart;
