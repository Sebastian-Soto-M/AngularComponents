export class Account {
  constructor(
    public firstName: string,
    public lastName: string,
    public login: string,
    public id: number,
    public activated?: boolean,
    public authorities?: string[],
    public email?: string,
    public langKey?: string,
    public imageUrl?: string
  ) {}
}
