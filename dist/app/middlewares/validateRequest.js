"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (zodSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (req.body.data)
            req.body = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
        // console.log("Old Body", req.body);
        req.body = yield zodSchema.parseAsync(req.body);
        // console.log("New Body", req.body);
        next();
    }
    catch (error) {
        // console.log("error====>", error);
        next(error);
    }
});
exports.validateRequest = validateRequest;
