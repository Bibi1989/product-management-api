import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController";

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
  const user = await registerUser(req.body);
  res.json({ data: user });
});

router.post("/login", async (req, res) => {
  const user = await loginUser(req.body);
  res.json({ data: user });
});

export default router;
