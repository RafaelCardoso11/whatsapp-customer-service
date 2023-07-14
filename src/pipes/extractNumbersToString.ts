export const extractNumbersToString = (input: string): string => {
  const numbers = input.replace(/\D/g, "");
  return numbers;
};
