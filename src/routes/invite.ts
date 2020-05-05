import { Router } from "express";
import {
  createInvite,
  getAllIvites,
  inviteUsers,
} from "../controllers/inviteController";
import { Auth } from "./userAuth";

const router = Router();

// route to get all users
router.get("/", Auth, async (req: any, res) => {
  const { email } = req.user;
  const invites = await getAllIvites(email);
  res.json({ data: invites });
});

router.get("/accept/:projectId", Auth, async (req: any, res) => {
  const user = req.user;
  const { projectId } = req.params;
  const invites = await inviteUsers(user, projectId);
  res.json({ data: invites });
});
router.post("/", Auth, async (req: any, res) => {
  const user = req.user;
  const { email, ProjectId } = req.body;
  const invites = await createInvite(user, email, ProjectId);
  res.json({ data: invites });
});

router.delete("/delete/:id", async (req, res) => {});

export default router;
