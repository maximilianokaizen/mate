export class ValueObjectException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValueObjectException';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValueObjectException);
    }
  }
}
