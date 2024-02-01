import { HttpResponseCodes } from '../../HttpResponseCodes';
import { GeneralErrorHandler } from './GeneralErrorHandler';

export class ControllerError extends GeneralErrorHandler {
  statusCode: number;

  constructor(message: string, statusCode: number = HttpResponseCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
  }
}
