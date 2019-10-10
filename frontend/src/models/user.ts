export default class User {
  public id?: number;
  public username: string;
  public email: string;
  public name: string;
  public displayName: string;
  public lastLogin?: Date;
  public registration: Date;
  public password: string = '';

  constructor(
    username: string,
    email: string,
    name: string,
    displayName: string,
    registration: Date
  ) {
    this.username = username;
    this.email = email;
    this.name = name;
    this.displayName = displayName;
    this.registration = registration;
  }
}
