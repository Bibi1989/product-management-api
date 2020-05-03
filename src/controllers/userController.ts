import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInterface, LoginInterface } from "../interfaces/userInterface";
import {
  validateUserRegister,
  validateUserLogin,
} from "../validation/validateUser";
import { sendMail } from "../mail/mail";
import { Auth } from "../routes/userAuth";
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

    const token = await jwt.sign(registered.dataValues, process.env.SECRET_KEY);

    // const message = `Click the link to verify your account ${
    //   "http://localhost:5000/auth/v1/verify/" + token
    // }`;
    const message = `Click the link to verify your account ${
      "https://b-manager.netlify.app/auth/v1/verify/" + token
    }`;

    sendMail(value.email, message, "Verify your account");

    return { status: "success", user: registered, token };
  } catch (error) {
    return error.message;
  }
};

export const VeryUser = async (
  id: any,
  user: UserInterface,
  token: string,
  res: any
) => {
  if (token) {
    let newUpdate = {
      ...user,
      isVerify: true,
    };

    let users = await User.update(newUpdate, {
      where: { id },
    });

    return {
      status: "success",
      user: await User.findOne({
        where: { id },
      }),
      token,
    };
  } else {
    return { status: "error", error: "You have not verify your account" };
  }
};

export const loginUser = async (user: LoginInterface) => {
  const { value, error } = validateUserLogin(user);

  if (error.email) return { status: "error", error: error.email };
  if (error.password) return { status: "error", error: error.password };

  const checkUser = await User.findOne({
    where: { email: value.email },
  });

  console.log(checkUser.dataValues.isVerify);

  if (!checkUser.dataValues.isVerify)
    return { status: "error", error: "You are yet to register" };

  if (!checkUser.isVerify)
    return { status: "error", error: "Check your mail an activate"!! };

  const validPassword = await bcrypt.compare(
    value.password,
    checkUser.dataValues.password
  );

  if (!validPassword)
    return { status: "error", error: "Password is not valid" };

  try {
    const token = await jwt.sign(checkUser.dataValues, process.env.SECRET_KEY);

    return {
      status: "success",
      user: { ...checkUser.dataValues, password: null },
      token,
    };
  } catch (error) {
    return error.message;
  }
};
