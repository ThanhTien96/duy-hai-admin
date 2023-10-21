import {
  Badge,
  Button,
  Card,
  Divider,
  Image,
  Popconfirm,
  Popover,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { EMPTY_IMAGE, pagePaths } from "constants";
import { truncateText } from "utils/truncateText";
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import Calculator from "utils/calculator";
import { useAppSelector } from "store";
import { useNavigate } from "react-router";
import { useState } from "react";
import { IProductPayloadType } from "types/Product";

const { Meta } = Card;
const { Text, Title } = Typography;

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
  onDelete?: () => void;
  onUpdate?: (id: string, data: Partial<IProductPayloadType>) => void;
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
  isHot,
  onDelete,
  onUpdate,
}: TProductCartProps) => {
  const { colorPrimary } = useAppSelector((state) => state.app.theme);
  const navigate = useNavigate();
  const [popOpen, setPopOpen] = useState<boolean>(false);

  return (
    <Badge.Ribbon
      color={colorPrimary}
      text={
        originalPrice && overwritePrice && originalPrice > overwritePrice
          ? "- " +
            Calculator.calcPercentDiscount(
              originalPrice ?? 0,
              overwritePrice ?? 0
            ) +
            " %"
          : "0%"
      }
    >
      <Card
        loading={loading}
        hoverable
        cover={
          <Image
            onClick={() =>
              navigate(`/${pagePaths.product}/${pagePaths.productDetail}/${id}`)
            }
            className="object-cover"
            loading="lazy"
            height={300}
            preview={false}
            alt={title ?? "product"}
            src={loading ? EMPTY_IMAGE : img ? img : EMPTY_IMAGE}
          />
        }
        actions={[
          <span
            onClick={() =>
              navigate(`/${pagePaths.product}/${pagePaths.productDetail}/${id}`)
            }
            key="detail"
          >
            Chi Tiết
          </span>,
          <EditOutlined
            onClick={() =>
              navigate(`/${pagePaths.product}/${pagePaths.updateProduct}/${id}`)
            }
            key="edit"
          />,
          <Popconfirm
            key="delete"
            title="Xác Nhận Xoá"
            description={`Vẫn muôn xoá ${title}?`}
            onConfirm={onDelete}
            okText="Có"
            cancelText="Không"
          >
            <DeleteOutlined />
          </Popconfirm>,
          <Popover
            open={popOpen}
            onOpenChange={() => setPopOpen(false)}
            trigger={"click"}
            content={
              <Space direction="vertical">
                <Button
                  onClick={() => {
                    setPopOpen(false);
                    id && onUpdate && onUpdate(id, { hot: !isHot });
                  }}
                  className="w-full"
                  type="default"
                  icon={
                    isHot ? <CloudDownloadOutlined /> : <CloudUploadOutlined />
                  }
                >
                  Đổi Hot thành {isHot ? "Không" : "Có"}
                </Button>
                <Button
                  onClick={() => {
                    id && onUpdate && onUpdate(id, { seo: !isSEO });
                    setPopOpen(false);
                  }}
                  icon={
                    isSEO ? <CloudDownloadOutlined /> : <CloudUploadOutlined />
                  }
                  className="w-full"
                  type="default"
                >
                  Đổi SEO Thành {isSEO ? "Không" : "Có"}
                </Button>
              </Space>
            }
          >
            <SettingOutlined
              onClick={() => setPopOpen(!popOpen)}
              key="setting"
            />
          </Popover>,
        ]}
      >
        <Meta
          title={
            <Title
              onClick={() =>
                navigate(
                  `/${pagePaths.product}/${pagePaths.productDetail}/${id}`
                )
              }
              level={5}
              className="hover:text-red-500 transition-all duration-300"
            >
              {" "}
              {title ? truncateText(title, 40) : "None Titile"}
            </Title>
          }
          description={
            <Tooltip title={description}>
              {description
                ? truncateText(description, 50)
                : "None description."}
            </Tooltip>
          }
        />
        <Space direction="horizontal" className="mt-3">
          <Text className="line-through text-gray-500">
            {originalPrice?.toLocaleString()} VNĐ
          </Text>
          <Text className="font-semibold">
            Giá: {overwritePrice?.toLocaleString()} VNĐ
          </Text>
        </Space>
        <Divider className="my-4" />
        <Meta
          description={
            <Text>
              <b>Tổng Số Lượng:</b> {quantity}
            </Text>
          }
        />
        <Divider className="my-4" />
        <Space className="justify-between gap-8">
          {/* HOT */}
          <Text>
            Hot:{" "}
            {isHot ? (
              <Tag color="green-inverse" className="ml-4">
                Có
              </Tag>
            ) : (
              <Tag color="red-inverse" className="ml-4">
                Không
              </Tag>
            )}
          </Text>

          {/* SEO */}
          <Text>
            SEO:{" "}
            {isSEO ? (
              <Tag color="green-inverse" className="ml-4">
                Có
              </Tag>
            ) : (
              <Tag color="red-inverse" className="ml-4">
                Không
              </Tag>
            )}
          </Text>
        </Space>
      </Card>
    </Badge.Ribbon>
  );
};

export default ProductCart;
