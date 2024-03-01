import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, STATUS_CODE } from "constants";
import { Drawer, Spin, Tabs, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import useHelmet from "hooks/useHelmet";
import OrderInfo from "./partials/OrderInfo";
import {
  IOrderFromBE,
  IOrderStatusPayloadBE,
  IOrdersFromStatus,
} from "types/Order";
import { EOrderReducer } from "constants/enum.constant";
import {
  Dispatch,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { OrderService } from "services/orderRequester";
import { useAppDispatch } from "store";
import { setAlert } from "store/app/alert";
import { STORE_STATUS } from "constants/apiMessage";
import { TabsProps } from "antd/lib";
import OrderTable from "./partials/OrderTable";
import OrderDetail from "./partials/OrderDetail";

const { Text } = Typography;

export interface IOrderStatusState extends IOrderStatusPayloadBE {
  totalOrders: number;
}

interface IOrderInitState {
  loading: boolean;
  orderStatus: IOrderStatusState[];
  allOrders: IOrderFromBE[];
  orderDetail?: IOrderFromBE;
  isOpenDrawer: boolean;
}

interface IOrderReducerAction {
  type: EOrderReducer;
  payload: any;
}

// page initial state
const initialState: IOrderInitState = {
  loading: false,
  orderStatus: [],
  allOrders: [],
  orderDetail: undefined,
  isOpenDrawer: false,
};

// page context
export const OrderContext = createContext<{
  state: IOrderInitState;
  dispatch: Dispatch<IOrderReducerAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// page reducer
const orderReducer = (state: IOrderInitState, action: IOrderReducerAction) => {
  const { type, payload } = action;

  switch (type) {
    case EOrderReducer.ORDER_LOADING:
      return { ...state, loading: payload };
    case EOrderReducer.FETCH_ORDER_STATUS:
      return { ...state, orderStatus: payload };
    case EOrderReducer.FETCH_ALL_ORDER:
      return { ...state, allOrders: payload };
    case EOrderReducer.FETCH_ORDER_DETAIL:
      return { ...state, orderDetail: payload };
    case EOrderReducer.OPEN_DRAWER:
      return { ...state, isOpenDrawer: payload };
    default:
      return state;
  }
};

const OrderPage = () => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const reduxDispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useHelmet({
    title: "Duy Hai - Đơn Hàng",
  });

  useEffect(() => {
    const controller = new AbortController();
    fetchOrderStatus(controller.signal);
    fetchAllOrders();

    return () => {
      controller.abort();
    };
  }, []);

  // handle fetch all orders
  const fetchAllOrders = async (
    customer?: string,
    statusId?: string,
    signal?: AbortSignal
  ) => {
    try {
      const res = await OrderService.getAllOrders(customer, statusId, signal);

      if (res.status === STATUS_CODE.success) {
        dispatch({
          type: EOrderReducer.FETCH_ALL_ORDER,
          payload: res.data.data,
        });
      }
    } catch (err: Error | any) {
      // handle error
    }
  };

  // fetch order status
  const fetchOrderStatus = async (signal?: AbortSignal) => {
    try {
      const data = await OrderService.fetchOrderStatusRequester(true, signal);
      if (data.status === STATUS_CODE.success) {
        const formatData: IOrderStatusState[] = data.data.data.map(
          (ele: IOrderStatusPayloadBE) => ({
            ...ele,
            totalOrders:
              Array.isArray(ele.donHang) && ele.donHang.length > 0
                ? ele?.donHang?.length * 1
                : 0,
          })
        );
        dispatch({
          type: EOrderReducer.FETCH_ORDER_STATUS,
          payload: formatData,
        });
      }
    } catch (err: Error | any) {
      reduxDispatch(
        setAlert({ message: "server error", status: STORE_STATUS.error })
      );
      navigate("/home");
    }
  };

  // handle fetch order detail
  const fetchOrderDetail = useCallback(
    async (orderId: string, signal?: AbortSignal) => {
      try {
        const res = await OrderService.getOrderDetail(orderId, signal);

        if (res.status === STATUS_CODE.success) {
          handleOpenDrawer(true);
          dispatch({
            type: EOrderReducer.FETCH_ORDER_DETAIL,
            payload: res.data.data,
          });
        }
      } catch (err: Error | any) {
        reduxDispatch(
          setAlert({
            message: "Lấy chi tiết đơn hàng thất bại",
            status: STORE_STATUS.error,
          })
        );
      }
    },
    []
  );

  // handle update status order
  const handleUpdateStatusOrder = useCallback(
    async (statusId: string, orderId: string, signal?: AbortSignal) => {
      dispatch({ type: EOrderReducer.ORDER_LOADING, payload: true });
      try {
        const data = await OrderService.updateStatusOfOrder(
          statusId,
          orderId,
          signal
        );

        if (data.status === STATUS_CODE.success) {
          reduxDispatch(
            setAlert({
              message: "Cập nhật trạng thái đơn hàng thành công!",
              status: STORE_STATUS.success,
            })
          );
          // re-fetch order status
          fetchOrderStatus();
          fetchAllOrders();
        }
      } catch (err: Error | any) {
        reduxDispatch(
          setAlert({
            message:
              err.response.data ?? "Cập nhật trạng thái đơn hàng thất bại!",
            status: STORE_STATUS.error,
          })
        );
      } finally {
        dispatch({ type: EOrderReducer.ORDER_LOADING, payload: false });
      }
    },
    []
  );

  // handle open drawer
  const handleOpenDrawer = (open: boolean) => {
    dispatch({ type: EOrderReducer.OPEN_DRAWER, payload: open });
  };

  // count total orders
  const totalOrders = useMemo(() => {
    return state.orderStatus.reduce(
      (tt: number, crvalue: IOrderStatusState) => {
        return (tt += crvalue.totalOrders);
      },
      0
    );
  }, [state.orderStatus]);

  // all order
  const allOrders: IOrdersFromStatus[] = useMemo(() => {
    return state.allOrders.map((ord: IOrderFromBE) => {
      return {
        maDonHang: ord.maDonHang,
        tenKhachHang: ord.tenKhachHang,
        diaChi: ord.diaChi,
        soDT: ord.soDT,
        tongTien: ord.tongTien,
        loiNhan: ord.loiNhan,
        maTrangThai: ord.maTrangThai,
        createAt: ord.createAt,
        updateAt: ord.updateAt,
        maDoUuTien: ord.maDoUuTien,
        doUuTien: ord.doUuTien,
        keyIndex: ord.keyIndex,
        phuongThucThanhToan: ord.phuongThucThanhToan,
        trangThai: ord.trangThai,
        sanPham: ord.sanPham,
      };
    });
  }, [state.allOrders]);

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "Tất cả đơn hàng",
      children: (
        <OrderTable
          fetchDetail={fetchOrderDetail}
          handleUpdateStatusOrder={handleUpdateStatusOrder}
          tableData={allOrders}
        />
      ),
    },
    state.orderStatus.map((ele: IOrderStatusState) => ({
      key: ele.maTrangThai,
      label: ele.trangThai.charAt(0).toUpperCase() + ele.trangThai.substring(1),
      children: (
        <OrderTable
          fetchDetail={fetchOrderDetail}
          handleUpdateStatusOrder={handleUpdateStatusOrder}
          tableData={ele.donHang}
        />
      ),
    })),
  ].flat();

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      <PlainLayout
        headerprops={{
          breadcrumb: {
            items: [
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                title: <Text>{location.pathname.replace("/", "")}</Text>,
              },
            ],
          },
          title: "Đơn Hàng",
        }}
        footerprops={{
          children: COPY_RIGHT,
          className: "text-center",
        }}
        className="bg-inherit h-auto px-2"
      >
        <Spin spinning={state.loading}>
          <OrderInfo totalOrders={totalOrders} />
          <Tabs className="mt-4" defaultActiveKey="1" items={items} />

          {/* order detail drawer  */}
          <Drawer
          // extra={[
          //   state.orderDetail && <Button type={"primary"} key={1} onClick={() => handleUpdateStatusOrder(
          //     state.orderStatus.find((ele: IOrderStatusBase )=> ele.role === state.orderDetail?.trangThai?.role + 1).maTrangThai,
          //     state.orderDetail?.maDonHang
          //   )}></Button>
          // ]}
            width={"40%"}
            open={state.isOpenDrawer}
            onClose={() => handleOpenDrawer(false)}
          >
            {state.orderDetail && <OrderDetail />}
          </Drawer>
        </Spin>
      </PlainLayout>
    </OrderContext.Provider>
  );
};

export default OrderPage;
