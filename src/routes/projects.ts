import { Router } from "express";
import { Auth } from "./userAuth";
import { validateProject } from "../validation/validateProject";
import {
  createProject,
  getAllProjects,
  getAProject,
  updateProject,
  deleteProject,
  findProject,
  inviteUsers,
} from "../controllers/projectController";

const db = require("../../database/models/");

const router = Router();

// route to get all projects
router.get("/", Auth, async (req: any, res) => {
  const { id } = req.user;
  const projects = await getAllProjects(id);
  res.json(projects);
});

// route to get a single project
router.get("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;
  const project = await getAProject(id);
  res.json(project);
});

router.post("/invite", Auth, async (req: any, res) => {
  // const { id } = req.params;
  const { email, id } = req.body;

  await findProject(id, email);

  res.json({ message: "Invitation sent!!!" });
});
router.get("/invite/:email/:id", async (req: any, res) => {
  const { id, email } = req.params;
  const project = await inviteUsers(email, id);
  res.json({ data: project });
});

// route to create a project
router.post("/", Auth, async (req: any, res) => {
  const { id } = req.user;

  const project = await createProject(id, req.body);

  res.json({ data: project });
});

router.put("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;

  const project = await updateProject(id, req.body);

  if (project.status === "error") {
    return res.status(404).json({ data: project });
  }

  res.json({ data: project });
});

router.delete("/:projectId", Auth, async (req: any, res) => {
  const { projectId } = req.params;
  const { id } = req.user;

  const project = await deleteProject(id, projectId);

  res.json({ data: project });
});

export default router;
