import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInterface, LoginInterface } from "../interfaces/userInterface";
import {
  validateUserRegister,
  validateUserLogin,
} from "../validation/validateRegister";
const db = require("../../database/models");

const { User } = db;

export const registerUser = async (user: UserInterface) => {
  const { value, error } = validateUserRegister(user);
  if (error.first_name) return { status: "error", error: error.first_name };
  if (error.last_name) return { status: "error", error: error.last_name };
  if (error.email) return { status: "error", error: error.email };
  if (error.phone) return { status: "error", error: error.phone };
  if (error.password) return { status: "error", error: error.password };

  const checkUserExist = await User.findOne({
    where: { email: value.email },
  });

  if (checkUserExist) return { status: "error", error: "User exist already" };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  try {
    const registered = await User.create({
      ...value,
      password: hashedPassword,
    });

    console.log(registered);

    const token = await jwt.sign(registered.dataValues, process.env.SECRET_KEY);

    return { status: "success", user: registered, token };
  } catch (error) {
    return error.message;
  }
};

export const loginUser = async (user: LoginInterface) => {
  const { value, error } = validateUserLogin(user);

  if (error.email) return { status: "error", error: error.email };
  if (error.password) return { status: "error", error: error.password };

  const checkUser = await User.findOne({
    where: { email: value.email },
  });

  if (!checkUser) return { status: "error", error: "You are yet to register" };

  const validPassword = await bcrypt.compare(
    value.password,
    checkUser.dataValues.password
  );

  if (!validPassword)
    return { status: "error", error: "Password is not valid" };

  try {
    // return await User.findOne({
    //   where: { email: user.email },
    // });
    return {
      status: "success",
      user: { ...checkUser.dataValues, password: null },
    };
  } catch (error) {
    return error.message;
  }
};
