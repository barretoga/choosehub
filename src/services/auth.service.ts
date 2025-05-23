import { httpClient } from "./api";

const AUTH_DOMAIN = "/auth";

export const signIn = (
  body: SignInRequest
): Promise<{ data: { token: string } }> => {
  return httpClient.post(`${AUTH_DOMAIN}/authenticate`, body);
};

export const signUp = (
  body: SignUpRequest
): Promise<{ data: { token: string } }> => {
  return httpClient.post(`${AUTH_DOMAIN}/register`, body);
};

const AuthService = {
  signIn: signIn,
  signUp: signUp,
};

export { AuthService };
