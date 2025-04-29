import type { Hash } from '@/domain/cryptography/hash';
import { compare, hash } from 'bcrypt';

export class BcryptAdapter implements Hash {
  async hash(value: string): Promise<string> {
    const hashedValue = await hash(value, 8);
    return hashedValue;
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    const isEqual = await compare(value, hashedValue);
    return isEqual;
  }
}
