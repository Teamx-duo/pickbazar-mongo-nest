import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { MongoError } from 'mongodb'; // I couldn't see the error class is being exported from Mongoose

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();

    let error;

    switch (exception.name) {
      case 'DocumentNotFoundError': {
        error = {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Not Found',
        };
        break;
      }
      case 'MongooseError': {
        error = {
          message: 'Mongoose Error',
          name: exception.name,
          code: exception.code,
        };
      } // general Mongoose error
      case 'CastError': {
        error = {
          message: 'Cast error',
          name: exception.name,
          code: exception.code,
        };
      }
      case 'DisconnectedError': {
        error = {
          message: 'Diconnected from mongodb',
          name: exception.name,
          code: exception.code,
        };
      }
      case 'DivergentArrayError': {
        error = {
          message: 'Divergent array error',
          name: exception.name,
          code: exception.code,
        };
      }
      case 'MissingSchemaError': {
        error = {
          message: 'Missing schema error',
          name: exception.name,
          code: exception.code,
        };
      }
      case 'ValidatorError': {
        error = {
          message: 'Validation error',
          name: exception.name,
          code: exception.code,
        };
      }
      case 'ObjectExpectedError': {
        error = {
          message: 'Object expected error',
          name: exception.name,
          code: exception.code,
        };
      }
      case 'ObjectParameterError': {
        error = {
          message: 'Object parameter error',
          name: exception.name,
          code: exception.code,
        };
      }
      case 'OverwriteModelError': {
        error = {
          message: 'Model overwrite error',
          name: exception.name,
          code: exception.code,
        };
      }
      case 'ParallelSaveError': {
        error = {
          message: 'Model overwrite error',
          name: exception.name,
          code: exception.code,
        };
      }
      case 'StrictModeError': {
        error = {
          message: 'Strict mode error',
          name: exception.name,
          code: exception.code,
        };
      }
      case 'VersionError': {
        error = {
          message: 'Version error',
          name: exception.name,
          code: exception.code,
        };
      }
      default: {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Error (Mongodb)',
        };
        break;
      }
    }

    response.status(error.statusCode).json(error);
  }
}
