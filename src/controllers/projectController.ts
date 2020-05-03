import { validateProject } from "../validation/validateProject";
import { ProjectInterface } from "../interfaces/projectInterface";
import { sendMail } from "../mail/mail";
const db = require("../../database/models");

const { Project, User, Task } = db;

export const createProject = async (id: number, project: ProjectInterface) => {
  const { value, error } = validateProject(project);
  if (error.project_name) return { status: "error", error: error.project_name };
  if (error.project_identifier)
    return { status: "error", error: error.project_identifier };
  if (error.description) return { status: "error", error: error.description };
  if (error.start_date) return { status: "error", error: error.start_date };
  if (error.end_date) return { status: "error", error: error.end_date };

  const projects = {
    ...value,
    userArray: [id],
    UserId: id,
  };
  try {
    const createdProject = await Project.create(projects);
    return { status: "success", data: createdProject };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const getAllProjects = async (id: number) => {
  try {
    const projects = await Project.findAll({
      where: { UserId: id },
      include: [User, Task],
    });

    return { status: "success", data: projects };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const findProject = async (id: number, email: string) => {
  const message = `Click the link to verify your account ${
    "https://b-manager-api.herokuapp.com/api/v1/projects/invite/" +
    email +
    "/" +
    id
  }`;

  sendMail(email, message, "Verify your account");
};

export const inviteUsers = async (email: string, id: number) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  const project = await Project.findOne({
    where: {
      id,
    },
  });
  console.log({ user: user.dataValues.id, project: project.dataValues });
  try {
    if (user) {
      let userArray = project.dataValues.userArray;
      console.log({ userArray });
      userArray.push(user.dataValues.id);
      console.log({ userArray });
      const updatedProject = {
        project_name: project.project_name,
        description: project.description,
        project_identifier: project.project_identifier,
        start_date: project.start_date,
        end_date: project.end_date,
        UserId: project.UserId,
        userArray,
      };
      return await Project.update(updatedProject, { where: { id } });
    } else {
      return { status: "error", error: "Cant update" };
    }
  } catch (error) {
    return { status: "error", error: error };
  }
};

export const getAProject = async (id: number) => {
  try {
    const project = await Project.findOne({
      where: { id },
      include: [User, Task],
    });
    if (project) return { status: "success", data: project };

    return { status: "error", error: "Cant find this project" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const updateProject = async (id: number, project: ProjectInterface) => {
  const { value, error } = validateProject(project);
  if (error.project_name) return { status: "error", error: error.project_name };
  if (error.project_identifier)
    return { status: "error", error: error.project_identifier };
  if (error.description) return { status: "error", error: error.description };
  if (error.start_date) return { status: "error", error: error.start_date };
  if (error.end_date) return { status: "error", error: error.end_date };
  try {
    const projected = await Project.findOne({
      where: { id },
      include: ["User"],
    });
    if (projected) {
      const updatedProject = await Project.update(value, {
        where: { id },
      });
      return {
        status: "success",
        data: updatedProject,
      };
    }
    return { status: "error", error: "Cant update this project" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const deleteProject = async (id: number) => {
  try {
    const deleted = await Project.findOne({
      where: { id },
      include: ["User"],
    });
    if (deleted) {
      const deletedProject = await Project.destroy({
        where: { id },
      });
      return {
        status: "success",
        data: deletedProject,
      };
    }
    return { status: "error", error: "Cant delete this project" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
