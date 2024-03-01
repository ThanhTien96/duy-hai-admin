import { Image, StepProps, Steps, Typography } from "antd";

import { IOrderProduct, IOrderStatusBase } from "types/Order";
import { useContext } from "react";
import { OrderContext } from "../OrderPage";
import { EMPTY_IMAGE } from "constants";

const { Title, Text } = Typography;

const OrderDetail = () => {
  const { state } = useContext(OrderContext);

  const handleRenderItems = (): StepProps[] => {
    if (Number(state.orderDetail?.trangThai?.role) === 3) {
      return state.orderStatus.slice(0, 3).map((ele: IOrderStatusBase) => {
        return {
          title: ele.trangThai,
        };
      });
    } else if (Number(state.orderDetail?.trangThai?.role) === 4) {
      return [
        {
          title: "chờ duyệt",
        },
        {
          title: "đang giao",
        },
        {
          title: "thất bại",
          status: "error",
        },
      ];
    } else if (Number(state.orderDetail?.trangThai?.role) === 5) {
      return [
        {
          title: "chờ duyệt",
        },
        {
          title: "hủy đơn",
          status: "error",
        },
      ];
    } else {
      return state.orderStatus.map((ele: IOrderStatusBase) => {
        return {
          title: ele.trangThai,
        };
      }) as StepProps[];
    }
  };

  return (
    <div>
      <Title level={5}>Tiến độ xử lý</Title>
      <Steps
        current={
          Number(state.orderDetail?.trangThai.role) === 3
            ? Number(state.orderDetail?.trangThai.role)
            : Number(state.orderDetail?.trangThai.role) - 1
        }
        percent={60}
        labelPlacement="vertical"
        items={handleRenderItems()}
      />

      <div className="mt-6">
        <Title level={5}>Thông tin chi tiết</Title>
        {/* column item */}
        <div className="flex justify-between items-center border-y border-solid border-gray-300/50 border-x-0 py-2">
          <Text>Tên Khách Hàng:</Text>
          <Text className="font-semibold capitalize">
            {state.orderDetail?.tenKhachHang}
          </Text>
        </div>

        {/* column item */}
        <div className="flex justify-between items-center border-b border-solid border-gray-300/50 border-x-0 border-t-0 py-2">
          <Text>Liên Hệ:</Text>
          <Text className="font-semibold capitalize">
            {state.orderDetail?.soDT}
          </Text>
        </div>

        {/* column item */}
        <div className="flex justify-between items-center border-b border-solid border-gray-300/50 border-x-0 border-t-0 py-2">
          <Text>Địa Chỉ:</Text>
          <Text className="font-semibold capitalize">
            {state.orderDetail?.diaChi}
          </Text>
        </div>

        {/* column item */}
        <div className="flex justify-between items-center border-b border-solid border-gray-300/50 border-x-0 border-t-0 py-2">
          <Text>Tổng Tiền:</Text>
          <Text className="font-semibold capitalize">
            {String(state.orderDetail?.tongTien.toLocaleString())} VND
          </Text>
        </div>
        {/* column item */}
        <div className="flex justify-between items-center border-b border-solid border-gray-300/50 border-x-0 border-t-0 py-2">
          <Text>Ghi Chú:</Text>
          <Text>{state.orderDetail?.loiNhan}</Text>
        </div>
      </div>

      <div className="mt-6">
        <Title level={5}>Sản Phẩm:</Title>
        <div className="flex items-center gap-4">
          {state.orderDetail?.sanPham &&
            Array.isArray(state.orderDetail?.sanPham) &&
            state.orderDetail?.sanPham?.map((ele: IOrderProduct) => {
              return (
                <div className="w-1/2 xl:w-1/3 rounded-md overflow-hidden" key={ele.maSanPham}>
                  <Image
                    src={
                      ele.sanPham.hinhAnh.find((ele) => ele.hinhChinh)
                        ?.hinhAnh ?? EMPTY_IMAGE
                    }
                  />
                  <div className="border border-solid border-gray-300 border-t-0 p-2 rounded-br-md rounded-bl-md">
                    <Title level={5}>
                      {ele?.sanPham?.tenSanPham}
                    </Title>
                    <Text className="text-rose-500">
                      Số Lượng Sản Phẩm Mua: {ele?.soLuongSanPham}
                    </Text>
                    <div className="flex justify-between py-2">
                      <Text className="line-through text-gray-400/50">
                        {ele.sanPham?.giaGoc.toLocaleString()} VND
                      </Text>
                      <Text className="">
                        {ele.sanPham?.giaGiam.toLocaleString()} VND
                      </Text>
                    </div>
                    <Text className="line-clamp-2">
                      {ele?.sanPham?.moTaNgan}
                    </Text>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
