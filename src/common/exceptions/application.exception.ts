export class ApplicationException extends Error {
  constructor(message = 'An unexpected error occured') {
    super(message);
  }
}
