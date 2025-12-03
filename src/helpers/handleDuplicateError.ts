import { TGenericErrorResponse } from "../app/interfaces/error.types";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const matchedArray = err.message.match(/"([^"]*)"/);
  const message = `${matchedArray[0]} already exists`;
  return {
    statusCode: 400,
    message,
  };
};
