import http from "@axios/http"
import { orderPath } from "constants/apiPaths"

export class OrderService {
    // fetch status include order
    static fetchOrderStatusRequester = async (includeOrders = true, signal?: AbortSignal) => {
        return await http({
            url: orderPath.orderStatus,
            method: "GET",
            params: {
                orders: includeOrders
            },
            signal
        })
    }

    // update status of order
    static updateStatusOfOrder = async (statusId: string, orderId: string, signal?:AbortSignal) => {
        return await http({
            url: orderPath.updateOrderStatus,
            method: "POST",
            params: {
                maTrangThai: statusId,
                maDonHang : orderId,
            },
            signal
        })
    }
}