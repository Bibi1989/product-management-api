"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.Auth = (req, res, next) => {
    const token = req.header("auth");
    if (!token)
        return res.json({ status: "error", error: "Your not authorize" });
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
    }
    catch (error) {
        res.json({ status: "error", error: error.message });
    }
};
//# sourceMappingURL=userAuth.js.map