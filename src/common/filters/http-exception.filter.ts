import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

import { Response } from 'express';

import { ResponseMessage } from '@app/common/constants/response.constant';
import { ResponseDto } from '@app/common/dto/response.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorResponse = ResponseDto.error(
      error instanceof Error ? error.message : ResponseMessage.UNKNOWN_ERROR,
    );

    response.status(errorResponse.httpCode).json(errorResponse);
  }
}
