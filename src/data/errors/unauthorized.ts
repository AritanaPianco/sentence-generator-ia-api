export class Unauthorized extends Error {
  super(message: string) {
    this.message = message;
  }
}
