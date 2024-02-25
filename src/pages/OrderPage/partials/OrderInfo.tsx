import { OrderBox } from "components/shared";
import { useContext } from "react";
import { IOrderStatusState, OrderContext } from "../OrderPage";
import allProd from "assets/all-order.png";
import successProd from "assets/success-prod.png";
import pendingProd from "assets/pendingProd.png";
import transported from "assets/transported-Prod.png";
import faildProd from "assets/faild-prod.png";
import rejectedProd from "assets/rejected-prod.png";
import { Col, Image, Row } from "antd";

type OrderInfoProps = {
  totalOrders: number
};

const iconList = [
  {
    media: pendingProd,
    role: 1,
  },
  {
    media: transported,
    role: 2,
  },
  {
    media: successProd,
    role: 3,
  },
  {
    media: faildProd,
    role: 4,
  },
  {
    media: rejectedProd,
    role: 5,
  },
];

const OrderInfo = ({totalOrders}: OrderInfoProps) => {
  const { state } = useContext(OrderContext);
  return (
    <Row gutter={[24, 24]}>
      <Col span={12} md={8} lg={6} xxl={4}>
        <OrderBox
          result={totalOrders}
          icon={<Image width={80} src={allProd} preview={false} />}
          title={"Tất Cả Đơn Hàng"}
        />
      </Col>
      {state &&
        state.orderStatus &&
        Array.isArray(state.orderStatus) &&
        state?.orderStatus?.map((ele: IOrderStatusState) => (
          <Col span={12} md={8} lg={6} xxl={4} key={ele.maTrangThai}>
            <OrderBox
              result={ele.totalOrders}
              icon={
                <Image
                  width={80}
                  src={iconList.find((img) => img.role === ele.role)?.media}
                  preview={false}
                />
              }
              title={ele.trangThai}
            />
          </Col>
        ))}
    </Row>
  );
};

export default OrderInfo;
