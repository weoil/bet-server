export function createResult(
  data: any = {},
  code: number = 200,
  msg: string = 'success',
) {
  return {
    code,
    data,
    msg,
  };
}
