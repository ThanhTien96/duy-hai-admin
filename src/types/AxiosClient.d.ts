import { AxiosResponse } from "axios";

export type TGetAxiosResponseClient<T> = AxiosResponse & {
    data: T;
}  


