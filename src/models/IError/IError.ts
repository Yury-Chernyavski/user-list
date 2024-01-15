import { IRegisterRequest } from "../IRegisterRequest/IRegisterRequest";

export interface IErrorResponse {
  data: IError;
}

export interface IError {
  errors?: IRegisterRequest
  message?: string;
}
