import { AxiosError } from "axios";
import { IError, IErrorResponse } from "../models";

export const checkError = (err: AxiosError<IErrorResponse>, setError: (a: IError) => void) => {
  if (err.response?.data.data?.errors) {
    const errors = err.response?.data.data.errors;
    setError({
      errors
    });
  } else {
    const message = err.response?.data.data?.message;
    setError({
      message
    });
  }
};
