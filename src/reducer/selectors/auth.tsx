import { StoreType } from "../StoreType";

export const getAuthenticationToken = (state: StoreType) => {
  return state.authentication.token;
};
