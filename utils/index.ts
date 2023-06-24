import { formatDistanceToNow } from "date-fns";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
  return formattedDate;
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;

  return String(error);
};

export const generateUniqueUserTag = (): string => {
  var randomNumber = Math.floor(Math.random() * 1000000);
  var uniqueNumber = randomNumber.toString().padStart(6, "0");

  return `#${uniqueNumber}`;
};

export const hasDuplicates = <T>(list: T[]): boolean => {
  const set = new Set(list);
  return set.size !== list.length;
};
