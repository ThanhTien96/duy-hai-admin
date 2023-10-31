export type TNewsPostMedia = {
  readonly id: string;
  hinhAnh: string;
  maTinTuc: string;
};

export interface INewsPostFromBE {
  readonly maTinTuc: string;
  tieuDe: string;
  noiDung: string;
  noiDungNgan: string;
  maNguoiDang: string;
  maLoaiTinTuc: string;
  createAt: string;
  updateAt: string;
  hinhAnh: TNewsPostMedia[];
}

export interface INewsTypeFormBE {
  readonly maLoaiTinTuc: string;
  loaiTinTuc: string;
  tinTuc: any[];
}
