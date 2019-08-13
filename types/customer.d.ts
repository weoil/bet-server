declare namespace Bet {
  export interface RequestInUser {
    id: string;
    name: string;
  }
  export interface IReuqest extends Request {
    user: RequestInUser;
  }
}
