import { combineReducers } from "redux";
import { AuthenticationType } from "./StoreType";

const INITIAL_STATE_AUTHENTICATION: AuthenticationType = {
  token: "",
};

export const authReducer = (
  state = INITIAL_STATE_AUTHENTICATION,
  action: any
) => {
  switch (action.type) {
    case "ADD_AUTHENTICATION_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  authentication: authReducer,
});
