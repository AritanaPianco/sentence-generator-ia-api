import type { Hash } from '@/domain/cryptography/hash';

export class FakeHasher implements Hash {
  async hash(value: string): Promise<string> {
    return `hashed-${value}`;
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    if (`hashed-${value}` === hashedValue) {
      return true;
    }

    return false;
  }
}
