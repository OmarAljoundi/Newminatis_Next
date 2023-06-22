import { TInstagram } from "@/types/TInstagram";
import { IBaseResponse } from "./IBaseResponse";

export interface InstgramResponse extends IBaseResponse {
  instagram: TInstagram[];
}
