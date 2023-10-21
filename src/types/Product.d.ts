import { ISubCategoriesFormBE } from "./Menu";

export interface IProductPagination {
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface IProductMediaType {
  readonly id: string;
  hinhAnh: string;
  hinhChinh: boolean;
}

export interface IProductFromBE {
  readonly maSanPham: string;
  tenSanPham: string;
  moTa: string;
  giaGoc: 3300000;
  giaGiam: 3000000;
  tongSoLuong: 10;
  readonly maDanhMucNho: string;
  createAt: string;
  updateAt: string;
  hot: false;
  seo: false;
  seoDetail: string;
  seoTitle: string;
  moTaNgan: string;
  youtubeVideo: null;
  hinhAnh: IProductMediaType[];
  danhMucNho: {
    readonly maDanhMucNho: string;
    tenDanhMucNho: string;
  };
  comment: any[];
  danhGia: any[];
  donHang: any[];
}

// PRODUCT DETAIL TYPE

export interface IProductDetailFromBE extends IProductFromBE {
  danhMucNho: ISubCategoriesFormBE;
}


// update type
export interface IProductPayloadType {
  tenSanPham: string;
  moTa: string;
  moTaNgan: string;
  giaGoc: number;
  giaGiam: number;
  seoTitle: string;
  seoDetail: string;
  tongSoLuong: number;
  maDanhMucNho : string;
  hot: boolean;
  seo: boolean
}
