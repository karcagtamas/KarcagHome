export default class User {
  public id?: number;
  public username: string;
  public email: string;
  public name: string;
  public displayName: string;
  public lastLogin: Date;
  public registration: Date;

  constructor(
    username: string,
    email: string,
    name: string,
    displayName: string,
    lastLogin: Date,
    registration: Date
  ) {
    this.username = username;
    this.email = email;
    this.name = name;
    this.displayName = displayName;
    this.lastLogin = lastLogin;
    this.registration = registration;
  }
}
