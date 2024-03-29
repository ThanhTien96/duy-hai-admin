import { IProductFromBE } from "./Product";

export enum EPriorityName {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

export interface IPriority {
  id: string;
  doUuTien: EPriorityName;
  role: number;
}

export interface IOrderStatusBase {
  readonly maTrangThai: string;
  trangThai: string;
  role: number;
}

// order type from order status
export interface IOrdersFromStatus {
  readonly maDonHang: string;
  tenKhachHang: string;
  diaChi: string;
  soDT: string;
  tongTien: string;
  loiNhan: string;
  maTrangThai: string;
  createAt: string;
  updateAt: string;
  maDoUuTien: string;
  doUuTien: IPriority;
  keyIndex: number;
  phuongThucThanhToan: string;
  trangThai: IOrderStatusBase;
}

export interface IOrderStatusPayloadBE extends IOrderStatusBase {
  donHang: IOrdersFromStatus[];
}

export interface IOrderProduct {
  maDonHang: string;
  maSanPham: string;
  soLuongSanPham: number;
  sanPham: IProductFromBE;
}

export interface IOrderFromBE {
  readonly maDonHang: string;
  tenKhachHang: string;
  diaChi: string;
  soDT: string;
  tongTien: number;
  loiNhan: string;
  maTrangThai: string;
  createAt: string;
  updateAt: string;
  maDoUuTien: string;
  keyIndex: number;
  phuongThucThanhToan: string;
  doUuTien: IPriority;
  trangThai: IOrderStatusBase;
  sanPham?: IOrderProduct[];
}
