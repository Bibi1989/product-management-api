import { Router } from "express";

const db = require("../../database/models/");

const { User, Project } = db;

const router = Router();

// route to get all projects
router.get("/", async (req, res) => {
  const users = await Project.findAll({
    include: [User],
  });
  res.json({ users });
});

// route to get a single project
router.get("/:id", async (req, res) => {
  const users = await Project.findOne({
    where: { id: req.params.id },
    include: [User],
  });
  res.json({ users });
});

// route to create a project
router.post("/", async (req, res) => {
  const user = await Project.create({
    project_name: "Vue app",
    description: "App for Vue users",
    project_identifier: "vue-1",
    start_date: "2020-04-21",
    end_date: "2020-04-23",
    UserId: 2,
  });
  res.json({ user });
});

export default router;
