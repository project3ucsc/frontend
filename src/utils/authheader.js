import authenticationservice from "services/authentication.service";

export function authHeader() {
  // return authorization header with jwt token
  const currentUser = authenticationservice.currentUserValue;
  if (currentUser && currentUser.token) {
    return { headers: { Authorization: `Bearer ${currentUser.token}` } };
  } else {
    return {
      headers: {},
    };
  }
}
