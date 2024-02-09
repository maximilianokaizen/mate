import { GeneralErrorHandler } from './GeneralErrorHandler';
export class RepositoryException extends GeneralErrorHandler {
  constructor(message: string) {
    super(message);
  }
}
