import { validateProject } from "../validation/validateProject";
import { ProjectInterface } from "../interfaces/projectInterface";
const db = require("../../database/models");

const { Project, User } = db;

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
    UserId: id,
  };
  try {
    const createdProject = await Project.create(projects);
    return { status: "success", data: createdProject };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const getAllProjects = async () => {
  try {
    const projects = await Project.findAll({
      include: [User],
    });
    return { status: "success", data: projects };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const getAProject = async (id: number) => {
  try {
    const project = await Project.findOne({
      where: { id },
      include: [User],
    });
    if (project) return { status: "success", data: project };

    return { status: "error", error: "Cant find this project" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const updateProject = async (id: number, project: any) => {
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
