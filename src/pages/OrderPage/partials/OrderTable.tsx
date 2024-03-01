import { Button, Popover, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { IOrderStatusBase, IOrdersFromStatus } from "types/Order";
import moment from "moment";
import "moment/locale/vi";
import { useContext, useEffect } from "react";
import { OrderContext } from "../OrderPage";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";


interface OrderTable {
  tableData: IOrdersFromStatus[] | [];
  fetchDetail?: (orderId: string, signal?: AbortSignal) => void;
  handleUpdateStatusOrder: (
    statusId: string,
    orderId: string,
    signal?: AbortSignal
  ) => void;
}

interface DataType {
  key: string;
  customer: string;
  phoneNumber: string;
  timeDuration: any;
  status: IOrderStatusBase;
  total: string;
}

const OrderTable = ({ tableData, handleUpdateStatusOrder, fetchDetail }: OrderTable) => {
  const { state } = useContext(OrderContext);
  const controller = new AbortController();

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Khách Hàng",
      dataIndex: "customer",
      key: "address",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Thời Gian",
      dataIndex: "timeDuration",
      key: "timeDuration",
      render: (value) => (
        <div className="flex gap-2 items-center">
          <span className="p-1 rounded-full inline-block bg-green-400"></span>
          <p className="capitalize">{value} trước</p>
        </div>
      ),
    },
    {
      title: "Tổng Tiền",
      key: "total",
      dataIndex: "total",
      render: (value) => <b className="opacity-70">{value} VND</b>,
    },
    {
      title: "Trạng Thái",
      key: "status",
      dataIndex: "status",
      render: (value) => {
        return (
          <Tag
            className="py-2 px-4 rounded-full capitalize"
            color={
              value?.role === 1
                ? "processing"
                : value?.role === 2
                ? "warning"
                : value?.role === 3
                ? "success"
                : "error"
            }
            bordered={false}
          >
            {value?.trangThai}
          </Tag>
        );
      },
    },
    {
      title: "",
      key: "action",
      render: (_, obj) => (
        <div className="flex items-center gap-4 jus">
          <Button onClick={() => fetchDetail && fetchDetail(obj.key, controller.signal)} type="primary">Chi Tiết</Button>
          {obj.status.role == 2 && (
            <Popover
              content={
                <div className="overflow-hidden flex items-center flex-col">
                  <span
                    onClick={() =>
                      handleUpdateStatusOrder(
                        state.orderStatus[2].maTrangThai,
                        obj.key,
                        controller.signal
                      )
                    }
                    className="cursor-pointer hover:bg-gray-500 inline-block w-full px-2 py-2"
                  >
                    Thành Công
                  </span>
                  <span 
                  onClick={() =>
                    handleUpdateStatusOrder(
                      state.orderStatus[3].maTrangThai,
                      obj.key,
                      controller.signal
                    )
                  }
                  className="cursor-pointer hover:bg-gray-500 inline-block w-full px-2 py-2">
                    Thất Bại
                  </span>
                </div>
              }
              arrow
              trigger={["click"]}
            >
              <Button type="default" className="!shadow-none">
                <MoreOutlined className="rotate-90" />
              </Button>
            </Popover>
          )}
          {obj.status.role === 1 ? (
            (<>
            <Button
              onClick={() =>
                handleUpdateStatusOrder(
                  state.orderStatus[1].maTrangThai,
                  obj.key,
                  controller.signal
                )
              }
              className="bg-green-500 hover:bg-green-700 hover:!border-green-700 hover:!text-white"
            >
              Duyệt Đơn
            </Button>
            <Button
            onClick={() =>
              handleUpdateStatusOrder(
                state.orderStatus[4].maTrangThai,
                obj.key,
                controller.signal
              )
            }
            className="bg-green-500 hover:bg-green-700 hover:!border-green-700 hover:!text-white"
          >
            Hủy Đơn
          </Button>
            </>)
          ) : obj.status.role === 2 ? (
            <ClockCircleOutlined className="text-yellow-400 font-semibold text-[20px]" />
          ) : obj.status.role === 3 ? (
            <CheckCircleOutlined className="text-green-400 font-semibold text-[20px]" />
          ) : (
            <CloseCircleOutlined className="text-red-400 font-semibold text-[20px]" />
          )}
        </div>
      ),
    },
  ];

  // get time
  const currentTime = moment();

  const data: DataType[] | [] =
    tableData && Array.isArray(tableData)
      ? tableData.map((ele: IOrdersFromStatus) => ({
          key: ele.maDonHang,
          timeDuration: moment
            .duration(currentTime.diff(moment(ele.createAt)))
            .locale("vi")
            .humanize()
            .replace("seconds", "Giây")
            .replace("minutes", "Phút")
            .replace("hours", "Giờ")
            .replace("days", "Ngày")
            .replace("months", "Tháng")
            .replace("years", "Năm"),
          phoneNumber: ele.soDT,
          customer: ele.tenKhachHang,
          status: ele?.trangThai,
          total: ele?.tongTien
            ?.toLocaleString()
            .replace(",", ".")
            .replace(",", "."),
        }))
      : [];

  return <Table pagination={{pageSize: 30}} columns={columns} dataSource={data} />;
};

export default OrderTable;
