export const addAuthenticationToken = (authToken: string) => ({
  type: "ADD_AUTHENTICATION_TOKEN",
  payload: authToken,
});

export const deleteAuthenticationToken = () => ({
  type: "DELETE_AUTHENTICATION_TOKEN",
});
