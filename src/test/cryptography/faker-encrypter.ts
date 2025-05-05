import type { Encrypter } from '@/domain/cryptography/encrypter';

export class FakeEncrypter implements Encrypter {
  async encrypt(userId: string): Promise<string> {
    return `encrypted-${userId}`;
  }

  async decrypt(value: string): Promise<string> {
    return value.replace('encrypted-', '');
  }
}
