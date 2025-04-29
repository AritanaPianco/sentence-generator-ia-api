import { v4 as uuidv4 } from 'uuid';

export type UserProps = {
  name: string;
  email: string;
  password: string;
};

export class User {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _password: string,
  ) {}

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }

  static create({ name, email, password }: UserProps, id?: string) {
    const newId = id ?? uuidv4();
    const user = new User(newId, name, email, password);
    return user;
  }
}
