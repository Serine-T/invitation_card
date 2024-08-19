// Add leading 0 if number has only one digit
export const addZero = (num: number) => {
  return String(num).padStart(2, '0');
};
