type ResultErrorType<T> = {
  type: "error";
  payload: T;
};

type ResultSuccessType<T> = {
  type: "success";
  payload: T;
};

export type Result<S = {}, E = AppError> =
  | ResultSuccessType<S>
  | ResultErrorType<E>;
export type FutureResult<S = {}, E = AppError> = Promise<Result<S, E>>;

export type AppError = {
  statusCode: string;
  title: string;
  message: string;
};

export function ResultError<T>(e: T): ResultErrorType<T> {
  return {
    type: "error",
    payload: e,
  };
}

export function ResultSuccess<T>(payload: T): ResultSuccessType<T> {
  return {
    type: "success",
    payload,
  };
}
