import { Router } from "express";
import { Auth } from "./userAuth";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  updateStatus,
  getOne,
} from "../controllers/taskController";

const router = Router();

// route to get all projects
router.post("/", async (req: any, res) => {
  const tasks = await getAllTasks(req.body.ProjectId);
  // console.log(req.protocol + "://" + req.get("host") + req.originalUrl);
  res.json(tasks);
});

// // route to get a single project
router.get("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;
  const task = await getOne(id);
  res.json(task);
});

// route to create a project
router.post("/add", Auth, async (req: any, res) => {
  const { id } = req.user;
  const task = await createTask(id, req.body);

  res.json({ data: task });
});

router.put("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;

  const project = await updateTask(id, req.body);

  res.json({ data: project });
});

router.patch("/status/:id", Auth, async (req: any, res) => {
  const { id } = req.params;
  const project = await updateStatus(id, req.body);

  res.json({ data: project });
});

router.delete("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;

  const task = await deleteTask(id);

  res.json({ data: task });
});

export default router;
