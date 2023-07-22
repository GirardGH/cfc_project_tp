export const validateEmail = (email) => {
    const regexSt = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regexSt.test(email);
};
