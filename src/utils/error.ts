export class BetError extends Error {
  public code: number;
  public message: string;
  constructor(code: number, message: string) {
    super(`${code}:${message}`);
    this.code = code;
    this.message = message;
  }
  static AuthorError() {
    return new BetError(100, '权限错误');
  }
}
