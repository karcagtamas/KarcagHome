// User model class
export default class User {
  // Id
  public id?: number;

  // Username
  public username: string;

  // E-mail
  public email: string;

  // Full name
  public name: string;

  // Display name
  public displayName: string;

  // Time of the last login
  public lastLogin?: Date;

  // Time of the registration
  public registration: Date;

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
