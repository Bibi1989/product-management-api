import { TaskInterface } from "../interfaces/projectInterface";
import { validateTask } from "../validation/validateProject";
import { v4 as uuid } from "uuid";
const db = require("../../database/models");

const { Project, User, Task } = db;

export const createTask = async (id: number, project: TaskInterface) => {
  const { value, error } = validateTask(project);
  if (error.summary) return { status: "error", error: error.summary };
  if (error.status) return { status: "error", error: error.status };
  if (error.priorty) return { status: "error", error: error.priorty };
  if (error.project_sequence)
    return { status: "error", error: error.project_sequence };
  if (error.due_date) return { status: "error", error: error.due_date };

  const findProject = await Project.findOne({
    where: { id: value.ProjectId },
  });
  const unique: string = uuid();

  if (!findProject) return { status: "error", error: "Project is not found" };

  const tasks = {
    ...value,
    UserId: id,
    project_sequence: `#${unique.slice(0, 6)}`,
    ProjectId: value.ProjectId,
  };
  try {
    const createdTask = await Task.create(tasks);
    return { status: "success", data: createdTask };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const getAllTasks = async (ProjectId: number) => {
  try {
    const tasks = await Task.findAll({
      where: { ProjectId },
      include: [User, Project],
    });
    return { status: "success", data: tasks };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

// export const getATask = async (id: number) => {
//   try {
//     const task = await Task.findOne({
//       where: { id },
//       include: [User, Project],
//     });
//     if (task) return { status: "success", data: task };

//     return { status: "error", error: "Cant find this project" };
//   } catch (error) {
//     return { status: "error", error: error.message };
//   }
// };
export const getOne = async (id: number) => {
  try {
    const task = await Task.findOne({
      where: { id },
      include: [User, Project],
    });
    if (task) return { status: "success", data: task };

    return { status: "error", error: "Cant find this project" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const updateTask = async (id: number, task: TaskInterface) => {
  const { value, error } = validateTask(task);
  if (error.summary) return { status: "error", error: error.summary };
  // if (error.status) return { status: "error", error: error.status };
  // if (error.priorty) return { status: "error", error: error.priorty };
  // if (error.project_sequence)
  //   return { status: "error", error: error.project_sequence };
  if (error.due_date) return { status: "error", error: error.due_date };

  try {
    const projected = await Task.findOne({
      where: { id },
      include: [User, Project],
    });

    if (projected) {
      const updatedProject = await Task.update(value, {
        where: { id },
      });
      return {
        status: "success",
        data: await Task.findOne({
          where: { id },
          include: [User, Project],
        }),
      };
    }
    return { status: "error", error: "Cant update this project" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
export const updateStatus = async (id: number, task: any) => {
  try {
    const tasked = await Task.findOne({
      where: { id: id },
      include: [User, Project],
    });

    if (tasked) {
      const updatedTask = await Task.update(task, {
        where: { id: task.id },
      });
      return {
        status: "success",
        data: await Task.findOne({
          where: { id },
          include: [User, Project],
        }),
      };
    }
    return { status: "error", error: "Cant update this project" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const deleteTask = async (id: number) => {
  try {
    const deleted = await Task.findOne({
      where: { id },
      include: ["User"],
    });
    if (deleted) {
      const deletedTask = await Task.destroy({
        where: { id },
      });
      return {
        status: "success",
        data: deletedTask,
      };
    }
    return { status: "error", error: "Cant update this project" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
