import { Router } from "express";
import { Auth } from "./userAuth";
import {
  getNotifications,
  createNotification,
} from "../controllers/notificationController";

const db = require("../../database/models/");

const router = Router();

// route to get all projects
router.get("/", Auth, async (req: any, res) => {
  const { id } = req.user;
  const projects = await getNotifications(id);
  res.json(projects);
});

router.post("/", Auth, async (req: any, res) => {
  const { id } = req.user;
  const { notify, ProjectId, TaskId } = req.body;
  console.log({ notify, id, ProjectId, TaskId });

  await createNotification(id, notify, ProjectId, TaskId);

  res.json({ message: "notification sent!!!" });
});

// router.delete("/:projectId", Auth, async (req: any, res) => {
//   const { projectId } = req.params;
//   const { id } = req.user;

//   const project = await d(id, projectId);

//   res.json({ data: project });
// });

export default router;
