import { validateProject } from "../validation/validateProject";
import { ProjectInterface } from "../interfaces/projectInterface";
import { sendMail } from "../mail/mail";
const { Op } = require("sequelize");
const db = require("../../database/models");

const { Project, User, Task, Notification } = db;

export const createNotification = async (
  id: number,
  body: string,
  ProjectId: number,
  TaskId: number
) => {
  const notify = {
    notify: body,
    UserId: id,
    ProjectId: Number(ProjectId),
    TaskId: Number(TaskId),
  };
  console.log({ notify });
  try {
    const createdNotification = await Notification.create(notify);
    return { status: "success", data: createdNotification };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
export const getNotifications = async (id: number) => {
  try {
    const createdNotification = await Notification.findAll({
      where: { UserId: id },
      include: [Project, User, Task],
    });
    return { status: "success", data: createdNotification };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
export const deleteNotification = async (deleteId: number) => {
  try {
    const deleted = await Notification.destroy({
      where: { id: deleteId },
    });
    return { status: "success", data: deleteId };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
