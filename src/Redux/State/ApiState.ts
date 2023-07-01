enum ApiProcessState {
  Idle,
  InProcess,
  Success,
  Error,
}
interface ApiState<T> {
  loading: boolean;
  state: ApiProcessState;
  data: T;
  error: string;
}

export default ApiState;
export { ApiProcessState };
