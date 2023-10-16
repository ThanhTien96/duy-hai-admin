export interface IProductMediaType {
  readonly id: string;
  hinhAnh: string;
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
