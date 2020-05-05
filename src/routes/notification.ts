import { Router } from "express";
import { Auth } from "./userAuth";
import {
  getNotifications,
  createNotification,
  deleteNotification,
  deleteAllNotifications,
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

router.delete("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;

  await deleteNotification(id);

  res.json({ data: "Notification cleared!!!" });
});
router.delete("/", Auth, async (req: any, res) => {
  const { id } = req.user;

  await deleteAllNotifications(id);

  res.json({ data: "All Notification cleared!!!" });
});

export default router;
