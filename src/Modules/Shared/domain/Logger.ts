export default interface Logger {
  debug(message: any): void;
  error(message: any): void;
  info(message: any): void;
}
