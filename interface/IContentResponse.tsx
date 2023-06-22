import { TContent } from "@/types/TUsefulLinks";
import { IBaseResponse } from "./IBaseResponse";

export interface IContentResponse extends IBaseResponse {
  content: TContent;
}
