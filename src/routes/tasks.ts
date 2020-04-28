import { Router } from "express";
import { Auth } from "./userAuth";
import {
  createTask,
  getAllTasks,
  getATask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

// route to get all projects
router.get("/", Auth, async (req: any, res) => {
  const tasks = await getAllTasks();
  res.json(tasks);
});

// // route to get a single project
router.get("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;
  const task = await getATask(id);
  res.json(task);
});

// route to create a project
router.post("/", Auth, async (req: any, res) => {
  const { id } = req.user;

  const task = await createTask(id, req.body);

  res.json({ data: task });
});

router.put("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;

  const project = await updateTask(id, req.body);

  res.json({ data: project });
});

router.delete("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;

  const project = await deleteTask(id);

  res.json({ data: project });
});

export default router;
