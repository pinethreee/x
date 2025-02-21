import {
  ResponseMessage,
  HttpStatusCode,
} from '@app/common/constants/response.constant';
import { BaseResponseType } from '@app/types/common/response.type';

export class ResponseDto<T> implements BaseResponseType<T> {
  message: string;
  httpCode: number;
  data: T;

  constructor(message: string, httpCode: number, data: T) {
    this.message = message;
    this.httpCode = httpCode;
    this.data = data;
  }

  static success<T>(
    data: T,
    message = ResponseMessage.SUCCESS,
    httpCode = HttpStatusCode.OK,
  ): ResponseDto<T> {
    return new ResponseDto(message, httpCode, data);
  }

  static error(
    message: string = ResponseMessage.BAD_REQUEST,
    httpCode = HttpStatusCode.BAD_REQUEST,
  ): ResponseDto<null> {
    return new ResponseDto(message, httpCode, null);
  }
}
