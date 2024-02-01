import { GeneralErrorHandler } from './GeneralErrorHandler';

export class CaseUseException extends GeneralErrorHandler {
  constructor(message: string) {
    super(message);
  }
}
