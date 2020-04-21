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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateUser_1 = require("../validation/validateUser");
const db = require("../../database/models");
const { User } = db;
exports.registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = validateUser_1.validateUserRegister(user);
    if (error.first_name)
        return { status: "error", error: error.first_name };
    if (error.last_name)
        return { status: "error", error: error.last_name };
    if (error.email)
        return { status: "error", error: error.email };
    if (error.phone)
        return { status: "error", error: error.phone };
    if (error.password)
        return { status: "error", error: error.password };
    const checkUserExist = yield User.findOne({
        where: { email: value.email },
    });
    if (checkUserExist)
        return { status: "error", error: "User exist already" };
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(value.password, salt);
    try {
        const registered = yield User.create(Object.assign(Object.assign({}, value), { password: hashedPassword }));
        const token = yield jsonwebtoken_1.default.sign(registered.dataValues, process.env.SECRET_KEY);
        return { status: "success", user: registered, token };
    }
    catch (error) {
        return error.message;
    }
});
exports.loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = validateUser_1.validateUserLogin(user);
    if (error.email)
        return { status: "error", error: error.email };
    if (error.password)
        return { status: "error", error: error.password };
    const checkUser = yield User.findOne({
        where: { email: value.email },
    });
    if (!checkUser)
        return { status: "error", error: "You are yet to register" };
    const validPassword = yield bcryptjs_1.default.compare(value.password, checkUser.dataValues.password);
    if (!validPassword)
        return { status: "error", error: "Password is not valid" };
    try {
        const token = yield jsonwebtoken_1.default.sign(checkUser.dataValues, process.env.SECRET_KEY);
        return {
            status: "success",
            user: Object.assign(Object.assign({}, checkUser.dataValues), { password: null }),
            token,
        };
    }
    catch (error) {
        return error.message;
    }
});
//# sourceMappingURL=userController.js.map