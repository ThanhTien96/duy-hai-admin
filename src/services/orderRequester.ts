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

    // get all order
    static getAllOrders = async (customer?: string, statusId?: string, signal?: AbortSignal) => {
        return await http({
            url: orderPath.getAllOrders,
            method: "GET",
            params: {
                customer,
                statusId,
            },
            signal
        })
    }

    // get orders detail
    static getOrderDetail = async (orderId: string, signal?: AbortSignal) => {
        return await http({
            url: orderPath.getOrderDetail,
            method: "GET",
            params: {
                maDonHang: orderId
            }, 
            signal
        })
    }
}