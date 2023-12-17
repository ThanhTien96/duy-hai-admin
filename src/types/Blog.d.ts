import { IBaseMedia } from "./Auth";

export interface IFixPostPayload {
  tieuDe: string;
  noiDung: string;
  tenKySu?: string;
  hinhAnh: File[] | null;
}

export interface ISupportPostPayload {
  tieuDe: string;
  slug: string;
  noiDung: string;
}

export interface ISupportPost {
  readonly id: string;
  tieuDe: string;
  noiDung: string;
  createAt: string;
  updateAt: string;
  slug: string;
}

export interface IFixPost {
  readonly maBaiViet: string;
  tieuDe: string;
  noiDung: string;
  tenKySu: string;
  createAt: string;
  updateAt: string;
  hinhAnh: IBaseMedia[];
}
