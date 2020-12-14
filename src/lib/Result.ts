type Success<T> = { _type: "success"; value: T };
type Failure = { _type: "failure"; message: string };
type Loading = { _type: "loading" };
export type Result<T> = Success<T> | Failure;

export const isSuccess = <T>(input: Result<T>): input is Success<T> =>
  input._type === "success";
export const isFailure = <T>(input: Result<T>): input is Failure =>
  input._type === "failure";
// export const isLoading = <T>(input: Result<T>): input is Loading =>
//   input._type === "loading";

export const createSuccess = <T>(value: T): Success<T> => ({
  _type: "success",
  value,
});
export const createFailure = (msg: string): Failure => ({
  _type: "failure",
  message: msg,
});
// export const createLoading = (): Loading => ({ _type: "loading" });
