declare namespace Bet {
  export interface RequestInUser {
    id: string;
    sesstionKey: string;
  }
  export interface IReuqest extends Request {
    user: RequestInUser;
  }
}
