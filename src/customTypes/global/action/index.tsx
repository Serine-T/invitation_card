export interface IActionCreator<P = undefined> {
  type: string;
  payload: P;
}
