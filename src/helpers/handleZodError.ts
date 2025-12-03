import { TErrorSources } from "../app/interfaces/error.types";


export const handleZodError = (err: any) => {
  const errorSource: TErrorSources[] = [];

  err.issues.forEach((errorElement: any) => {
    errorSource.push({
      path: errorElement.path[errorElement.path.length - 1],
      message: errorElement.message,
    });
  });

  return { message: "Zod Error", statusCode: 400, errorSource };
};
