export interface IBannerFormBE {
  readonly maBanner: string;
  hinhAnh: string;
}

export interface IYoutubePostFromBE {
  readonly maYT: string;
  tieuDe: string;
  url: string;
  hinhAnh: string;
  createAt: string;
  updateAt: string;
  embedLink?: string | null;
}
