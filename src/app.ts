import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";

import expressSession from "express-session";

import { envVars } from "./app/config/env";
// import "./app/config/passport";
import { logger } from "./app/middlewares/logger";

export const app = express();

//required constatnts for middlewares

//// middlewares
app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(logger);

//// routing middlewares
// app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("🔐 authify server is running ");
});

// global error handler

// app.use(globalErrorHandler);

// // not found route
// app.use(notFoundRoute);
