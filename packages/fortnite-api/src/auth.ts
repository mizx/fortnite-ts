export class Auth {
  private username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public static login(username: string, password: string) {
    return new Auth(username, password);
  }
}
