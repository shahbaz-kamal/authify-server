"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const env_1 = require("./app/config/env");
// import "./app/config/passport";
const logger_1 = require("./app/middlewares/logger");
const routes_1 = require("./app/routes");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFoundError_1 = require("./app/middlewares/notFoundError");
exports.app = (0, express_1.default)();
//required constatnts for middlewares
//// middlewares
exports.app.use((0, express_session_1.default)({
    secret: env_1.envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
exports.app.use((0, cookie_parser_1.default)());
// app.use(passport.initialize());
// app.use(passport.session());
exports.app.set("trust proxy", 1);
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://authify-by-shahbaz.netlify.app"],
    credentials: true,
}));
exports.app.use(logger_1.logger);
//// routing middlewares
exports.app.use("/api/v1", routes_1.router);
exports.app.get("/", (req, res) => {
    res.send("🔐 authify server is running ");
});
// global error handler
exports.app.use(globalErrorHandler_1.globalErrorHandler);
// // not found route
exports.app.use(notFoundError_1.notFoundRoute);
