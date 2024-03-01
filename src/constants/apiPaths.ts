export const menuPaths = {
  get: "/menu",
  updateMenu: "/capNhatMenu",
  creatNavLink: "/taoNavLink",
  getAllNavLink: "/navLink",
  getDetailNavLink: "/chiTietNavLink",
  updateNavLink: "/suaNavLink",
  deleteNavLink: "/xoaNavLink",
  createSubLink: "/taoSubLink",
  getDetailSubLink: "/aSubLink",
  updateSubLink: "/suaSubLink",
  deleteSubLink: "/xoaSubLink",
};

export const categoriesPaths = {
  getMainCategories: "/layDanhMuc",
  getDetailMainCategories: "/chiTietDanhMuc",
  createCategories: "/themDanhMuc",
  updateMainCategories: "/capNhatDanhMuc",
  deleteMainCategories: "/xoaDanhMuc",
  createSubCategories: "/themDanhMucNho",
  fetchDetailSubCategories: "/chiTietDanhMucNho",
  updateSubCategories: "/capNhatDanhMucNho",
  deleteSubCategories: "/xoaDanhMucNho",
  getAllSubCategories: "/layDanhMucNho",
};

export const productPaths = {
  getProductPagination: "/laySanPhamPhanTrang",
  getProductDetail: "/layChiTietSanPham",
  createProduct: "/themSanPham",
  updateProduct: "/capNhatSanPham",
  deleteProduct: "/xoaSanPham",
  addImageToProduct: "/themHinhAnhSanPham",
  changeBaseImage: "/hinhChinh",
  updateImageProduct: "/capNhatHinhSanPham",
  deleteImageProduct: "/xoaHinhAnhSanPham",
  updateProductWithoutImage: "/capNhatSanPhamKhongHinh",
};

export const authPaths = {
  login: "/dangNhap",
  fetchProfile: "/layThongTinTaiKhoan",
  getToken: "/layToken",
};

export const newsPaths = {
  getAllNewsType: "/layLoaiTinTuc",
  createNewsType: "/themLoaiTinTuc",
  updateNewsType: "/capNhatLoaiTinTuc",
  deleteNewsType: "/xoaLoaiTinTuc",
  createNews: "/themTinTuc",
  fetchAllNews: "/layTinTucPhanTrang",
  fetchNewsDetail: "/chiTietTinTuc",
  updateNews: "/capNhatTinTuc",
  deleteNews: "/xoaTinTuc",
};

export const bannerPaths = {
  getAll: "/layDanhSachBanner",
  createBanner: "/themBanner",
  updateBanner: "/api/capNhatBanner",
  deleteBanner: "/xoaBanner",
};

export const youtubePaths = {
  getAll: "/layDanhSachYT",
  getDetail: "/chiTietYT",
  create: "/themYT",
  update: "/capNhatYT",
  delete: "/xoaYT",
};

export const userPaths = {
  getAllUserType: '/layLoaiNguoiDung',
  getDetailUserType: '/layMotLoaiNguoiDung',
  createUserType: '/themLoaiNguoiDung',
  updateUserType: '/capNhatLoaiNguoiDung',
  deleteUserType: '/xoaLoaiNguoiDung',
  // USER
  getAllUser: '/layDanhSachNguoiDungPhanTrang',
  getUserDetail: '/layChiTietNguoiDung',
  createUser: '/themNguoiDung',
  updateUser: '/capNhatNguoiDung',
  deleteUser: '/xoaNguoiDung'
}

export const blogPath = {
  createSupportPost: '/themBvHoTro',
  getAllSupportPost: '/layDanhSachBvHoTro',
  getSupportPostDetail: "/ChiTietBvHoTro",
  updateSupportPost: "/capNhatBvHoTro",
  deleteSupportPost: "/xoaBvHoTro", 
  // fix post
  createFixPost: "/themBVSuaChua",
  getAllFixPost: "/layDanhSachBVSuaChua",
  getFixPostDetail: "/layChiTietBVSuaChua",
  updateFixPost: "/capNhatBVSuaChua",
  deleteFixPost: "/xoaBVSuaChua",
}

// Order
export const orderPath = {
  orderStatus: "/layDanhSachTrangThai",
  updateOrderStatus: "/capNhatTrangThaiDonHang",
  getAllOrders: "/layDanhSachDonHang",
  getOrderDetail: "/chiTietDonHang"
}
