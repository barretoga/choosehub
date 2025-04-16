const tokenName = "choosehub-token";

export const getToken = () => {
  const token = localStorage.getItem(tokenName) ?? "";

  return token;
};

export const setToken = (value: string) => {
  localStorage.setItem(tokenName, value);
};

export const removeToken = () => {
  localStorage.removeItem(tokenName);
};
