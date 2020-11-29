export const addAuthenticationToken = (authToken: string) => ({
  type: "ADD_AUTHENTICATION_TOKEN",
  payload: authToken,
});
