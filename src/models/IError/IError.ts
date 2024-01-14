import { IRegisterRequest } from "../IRegisterRequest/IRegisterRequest";

export interface IErrorResponse {
  data: {
    errors?: IRegisterRequest
    message?: string;
  };
}

export interface IError {
  errors?: IRegisterRequest
  message?: string;
}
