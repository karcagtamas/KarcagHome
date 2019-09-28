export default class Token {
  user: number;
  token: string;
  creationDate: Date;

  constructor(user: number, token: string, date: Date) {
    this.user = user;
    this.token = token;
    this.creationDate = date;
  }
}
