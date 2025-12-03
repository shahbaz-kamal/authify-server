import dotenv from "dotenv";
dotenv.config();

interface EnvVars {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  EXPRESS_SESSION_SECRET: string;
  BCRYPT_SALT_ROUND:"string"
 
}

const loadEnvironmentVariables = (): EnvVars => {
  const requiredVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "EXPRESS_SESSION_SECRET",
    "BCRYPT_SALT_ROUND",
    // "JWT_ACCESS_TOKEN_SECRET",
    // "JWT_ACCESS_TOKEN_EXPIRES_IN",
    // "JWT_REFRESH_TOKEN_SECRET",
    // "JWT_REFRESH_TOKEN_EXPIRES_IN",
    // "SUPER_ADMIN_EMAIL",
    // "SUPER_ADMIN_PASSWORD",
    // "GOOGLE_CLIENT_ID",
    // "GOOGLE_CLIENT_SECRET",
    // "GOOGLE_CALLBACK_URL",
    // "FRONTEND_URL",
    // "EXPRESS_SESSION_SECRET",
    // "BACKENED_URL",
    // "SSL_STORE_ID",
    // "SSL_STORE_PASS",
    // "SSL_ADDMONEY_API",
    // "SSL_VALIDATION_API",
    // "SSL_SUCCESS_FRONTEND_URL",
    // "SSL_FAIL_FRONTEND_URL",
    // "SSL_CANCEL_FRONTEND_URL",
    // "SSL_SUCCESS_BACKEND_URL",
    // "SSL_FAIL_BACKEND_URL",
    // "SSL_CANCEL_BACKEND_URL",
    // "CLOUDINARY_CLOUD_NAME",
    // "CLOUDINARY_API_KEY",
    // "CLOUDINARY_API_SECRET",
    // "SMTP_HOST",
    // "SMTP_PORT",
    // "SMTP_USER",
    // "SMTP_PASS",
    // "SMTP_FROM",
    // "REDIS_PASSWORD",
    // "REDIS_USERNAME",
    // "REDIS_PORT",
    // "REDIS_HOST",
    // "REDIS_OTP_EXPIRATION_TIME",
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
    // JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    // JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
    // JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    // JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,
    // SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    // SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    // FRONTEND_URL: process.env.FRONTEND_URL as string,
    // GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    // BACKENED_URL: process.env.BACKENED_URL as string,
    // SSL: {
    //   STORE_ID: process.env.SSL_STORE_ID as string,
    //   STORE_PASS: process.env.SSL_STORE_PASS as string,
    //   ADDMONEY_API: process.env.SSL_ADDMONEY_API as string,
    //   VALIDATION_API: process.env.SSL_VALIDATION_API as string,
    //   SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL as string,
    //   FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
    //   CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL as string,
    //   SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL as string,
    //   FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL as string,
    //   CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL as string,
    // },
    // CLOUDINARY: {
    //   CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    //   API_KEY: process.env.CLOUDINARY_API_KEY as string,
    //   API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    // },
    // EMAIL_SENDER: {
    //   SMTP_HOST: process.env.SMTP_HOST as string,
    //   SMTP_PORT: process.env.SMTP_PORT as string,
    //   SMTP_USER: process.env.SMTP_USER as string,
    //   SMTP_PASS: process.env.SMTP_PASS as string,
    //   SMTP_FROM: process.env.SMTP_FROM as string,
    // },
    // REDIS: {
    //   HOST: process.env.REDIS_HOST as string,
    //   PORT: process.env.REDIS_PORT as string,
    //   USERNAME: process.env.REDIS_USERNAME as string,
    //   PASSWORD: process.env.REDIS_PASSWORD as string,
    //   OTP_EXPIRATION_TIME: process.env.REDIS_OTP_EXPIRATION_TIME as string,
    // },
  };
};
export const envVars: EnvVars = loadEnvironmentVariables();
