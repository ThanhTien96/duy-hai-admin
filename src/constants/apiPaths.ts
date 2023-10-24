
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
    deleteSubLink: "/xoaSubLink"
}

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
    updateProductWithoutImage: "/capNhatSanPhamKhongHinh"
}

export const authPaths = {
    login: "/dangNhap",
    fetchProfile: "/layThongTinTaiKhoan",
    getToken: "/layToken"
}


export const newsPaths = {
    getAllNewsType: "/layLoaiTinTuc",
    createNewsType: "/themLoaiTinTuc",
    updateNewsType: "/capNhatLoaiTinTuc",
    deleteNewsType: "/xoaLoaiTinTuc"
}