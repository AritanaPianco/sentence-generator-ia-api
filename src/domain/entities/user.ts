import { v4 as uuidv4 } from 'uuid';

export type UserProps = {
  name: string;
  email: string;
  password: string;
};

export class User {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
  ) {}

  static create({ name, email, password }: UserProps) {
    const id = uuidv4();
    const user = new User(id, name, email, password);
    return user;
  }
}
