import dotenv from "dotenv";
dotenv.config();

interface EnvVars {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  EXPRESS_SESSION_SECRET: string;
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;
  CLOUDINARY: {
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
  };
}

const loadEnvironmentVariables = (): EnvVars => {
  const requiredVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "EXPRESS_SESSION_SECRET",
    "BCRYPT_SALT_ROUND",
    "JWT_ACCESS_TOKEN_SECRET",
    "JWT_ACCESS_TOKEN_EXPIRES_IN",
    "JWT_REFRESH_TOKEN_SECRET",
    "JWT_REFRESH_TOKEN_EXPIRES_IN",

    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];

  requiredVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environments variable: ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,

    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,

    // },
    CLOUDINARY: {
      CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
      API_KEY: process.env.CLOUDINARY_API_KEY as string,
      API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    },
  };
};
export const envVars: EnvVars = loadEnvironmentVariables();
