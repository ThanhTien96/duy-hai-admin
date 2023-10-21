import { Button, Card, Divider, Flex, Space, Typography } from "antd";
import TableProduct from "./TableProduct";
import { IProductDetailFromBE } from "types/Product";
import { useNavigate } from "react-router";
import { pagePaths } from "constants";

const { Title, Text } = Typography;

type LeftContentProps = {
  data?: IProductDetailFromBE;
};

const LeftContent = ({ data }: LeftContentProps) => {
  const navigate = useNavigate()
  return (
    <Card className="rounded-none">
      <Space direction="vertical" className="w-full">
        <Flex align="center" justify="space-between">
          <Title level={4}>{data?.tenSanPham}</Title>
          <Button onClick={() => navigate(`/${pagePaths.product}/${pagePaths.updateProduct}/${data?.maSanPham}`)} type="primary">Chỉnh Sửa</Button>
        </Flex>
        <Divider className="my-0" />
        <Text>{data?.moTaNgan}</Text>
        <TableProduct product={data} />
      </Space>
    </Card>
  );
};

export default LeftContent;
