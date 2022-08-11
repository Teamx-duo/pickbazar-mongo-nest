import { MongoError } from 'mongodb';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description Exception json response
     * @param message
     */
    const responseMessage = (type, message) => {
      response.status(status).json({
        status: status,
        path: request.url,
        errorType: exception.name ? exception.name : type,
        errorCode: exception instanceof MongoError ? exception.code : status,
        error: exception instanceof HttpException ? exception.message : message,
        message,
      });
    };

    if (exception instanceof MongoError) {
      if (exception.code) {
        responseMessage(exception.name, 'Already exists.');
      }
    }

    // API Not Found
    if (exception.message === 'Not Found') {
      responseMessage('Not Found', 'API not found.');
    }

    // API Not Found
    if (exception.name === 'CastError') {
      responseMessage('Cast Error', 'Record not found.');
    }

    // Throw an exceptions for either
    // MongoError, ValidationError, TypeError, CastError and Error
    if (exception.message) {
      responseMessage(
        exception instanceof HttpException
          ? exception.getResponse()['error']
          : 'Error',
        exception.message,
      );
    } else {
      responseMessage(exception.name, exception.message);
    }
  }
}
