export type TSubNavLinkFromBE = {
  readonly id: string;
  url: string;
  tenSubLink: string;
  readonly maNavLink: string;
};

export type TNavLinkFromBE = {
  readonly maNavLink: string;
  tenNavLink: string;
  url: string;
  readonly maMenu: string;
  role: number;
  subLink: TSubNavLinkFromBE[];
};

export type TMenuFromBE = {
  readonly maMenu: string;
  active: true;
  logo: string;
  navlink: TNavLinkFromBE[];
};

/********** CATEGORIES ************/
export interface ISubCategoriesFormBE {
  readonly maDanhMucNho: string;
  tenDanhMucNho: string;
  icon: string;
  readonly maDanhMucChinh: string;
}


export interface IMainCategoriesFromBE {
  readonly maDanhMucChinh: string;
  tenDanhMuc: string;
  role: number;
  icon: string;
  subcategories: ISubCategoriesFormBE[];
}
