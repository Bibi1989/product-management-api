import { Router } from "express";
import { Auth } from "./userAuth";
import { validateProject } from "../validation/validateProject";
import {
  createProject,
  getAllProjects,
  getAProject,
  updateProject,
  deleteProject,
  // inviteUsers,
  // findUser,
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

// router.get("/invite/email", Auth, async (req: any, res) => {
//   const { email } = req.body;

//   await findUser(email);

//   res.json({ message: "Invitation sent!!!" });
// });

// route to create a project
router.post("/", Auth, async (req: any, res) => {
  const { id } = req.user;

  const project = await createProject(id, req.body);

  res.json({ data: project });
});

router.put("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;

  const project = await updateProject(id, req.body);

  res.json({ data: project });
});

// router.patch("/invite/:id", Auth, async (req: any, res) => {
//   const { id } = req.params;
//   const project = await inviteUsers(id, req.body);
//   res.json({ data: project });
// });

router.delete("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;

  const project = await deleteProject(id);

  res.json({ data: project });
});

export default router;
