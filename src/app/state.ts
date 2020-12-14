export enum LoadingStatus {
  UNDETERMINED = "UNDETERMINED",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  LOADING = "LOADING",
}
type State = {
  status: LoadingStatus;
  error?: string;
  value?: any;
};
export const initial: State = {
  status: LoadingStatus.UNDETERMINED,
  error: undefined,
  value: undefined,
};

export const onSuccess = <T>(value: T) =>
  <const>{ type: "ON_SUCCESS", payload: { value } };
export const onFail = (err?: string) =>
  <const>{ type: "ON_FAIL", payload: { err } };
export const onLoad = () => <const>{ type: "ON_LOAD" };
type Action = ReturnType<typeof onSuccess | typeof onFail | typeof onLoad>;

type Reducer = (state: State, action: Action) => State;
export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case "ON_SUCCESS":
      return {
        ...state,
        status: LoadingStatus.SUCCESS,
        value: action.payload.value,
      };
    case "ON_LOAD":
      return { ...state, status: LoadingStatus.LOADING };
    case "ON_FAIL":
      return {
        ...state,
        status: LoadingStatus.FAILURE,
        error: action.payload.err,
      };

    default:
      return state;
  }
};
