export class EnvValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = EnvValidationException.name;
  }
}
