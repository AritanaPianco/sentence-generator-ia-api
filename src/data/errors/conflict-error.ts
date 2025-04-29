export class Conflict extends Error {
  super(message: string) {
    this.message = message;
  }
}
