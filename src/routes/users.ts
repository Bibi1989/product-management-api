import { Router } from "express";
import {
  registerUser,
  loginUser,
  VeryUser,
} from "../controllers/userController";
import { Auth } from "./userAuth";
import jwt from "jsonwebtoken";

const db = require("../../database/models/");

const { User, Project } = db;

const router = Router();

// route to get all users
router.get("/user", async (req, res) => {
  const users = await User.findAll({
    include: [Project],
  });
  res.json({ users });
});

router.get("/verify/:token", async (req: any, res) => {
  const user: any = await jwt.decode(req.params.token);
  console.log(user);
  await VeryUser(user.id, user, req.params.token, res);
  res.redirect("http://localhost:3000");
});

// route to get a single user
router.get("/user/:id", async (req, res) => {
  const users = await User.findOne({
    where: { id: req.params.id },
    include: [Project],
  });
  res.json({ users });
});

// route to create a user
router.post("/register", async (req, res) => {
  const user = await registerUser(req.body, res);
  if (user.status === "error") return res.status(404).json({ data: user });
  res.header("auth", user.token);
  res.json({ data: user });
});

router.post("/login", async (req, res) => {
  const user = await loginUser(req.body);
  if (user.status === "error") return res.status(404).json({ data: user });
  res.header("auth", user.token);
  res.json({ data: user });
});

export default router;
