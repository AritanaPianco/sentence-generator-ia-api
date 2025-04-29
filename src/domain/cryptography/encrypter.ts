export interface Encrypter {
  encrypt(userId: string): Promise<string>;
  decrypt(value: string): Promise<string>;
}
