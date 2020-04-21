import { Router } from "express";

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
router.post("/user", async (req, res) => {
  const user = await User.create({
    first_name: "Savvy",
    last_name: "Aremo",
    email: "savvy@gmail.com",
    phone: "1234567890",
    password: "12345678",
  });
  res.json({ user });
});

export default router;
