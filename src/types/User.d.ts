export interface IUserTypeFromBe {
  readonly maLoaiNguoiDung: string;
  loaiNguoiDung: string;
}

export interface IUserFromBe {
  readonly maNguoiDung: string;
  taiKhoan: string;
  hinhAnh: string;
  hoTen: string;
  soDT: string;
  email: string;
  theme: "dark" | "default";
  primaryColor: string;
  loaiNguoiDung: IUserTypeFromBe;
}


