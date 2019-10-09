// Token model class
export default class Token {
  // Owner user id
  user: number;

  // Token
  token: string;

  // Creation date
  creationDate: Date;

  constructor(user: number, token: string, date: Date) {
    this.user = user;
    this.token = token;
    this.creationDate = date;
  }
}
