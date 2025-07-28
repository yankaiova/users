export const getValue = (user, key) => {
  if (key.includes(".")) {
    return key.split(".").reduce((obj, k) => obj?.[k], user);
  }
  return user[key];
};
