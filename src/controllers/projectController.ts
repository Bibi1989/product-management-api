import { validateProject } from "../validation/validateProject";
import { ProjectInterface } from "../interfaces/projectInterface";
const db = require("../../database/models");

const { Project, User } = db;

export const createProject = async (id: string, project: ProjectInterface) => {
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
    return { status: "success", data: project };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
