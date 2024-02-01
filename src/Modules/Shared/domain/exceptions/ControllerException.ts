import { HttpResponseCodes } from '../../HttpResponseCodes';

export class ControllerError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = HttpResponseCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
  }
}
