"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateProject_1 = require("../validation/validateProject");
const mail_1 = require("../mail/mail");
const { Op } = require("sequelize");
const db = require("../../database/models");
const { Project, User, Task } = db;
exports.createProject = (id, project) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = validateProject_1.validateProject(project);
    if (error.project_name)
        return { status: "error", error: error.project_name };
    if (error.project_identifier)
        return { status: "error", error: error.project_identifier };
    if (error.description)
        return { status: "error", error: error.description };
    if (error.start_date)
        return { status: "error", error: error.start_date };
    if (error.end_date)
        return { status: "error", error: error.end_date };
    const projects = Object.assign(Object.assign({}, value), { userArray: [id], UserId: id });
    try {
        const createdProject = yield Project.create(projects);
        return { status: "success", data: createdProject };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.getAllProjects = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project.findAll({
            where: {
                userArray: {
                    [Op.contains]: [id],
                },
            },
            include: [User, Task],
        });
        console.log({ projects, id });
        // const find = await Project.findAll();
        // const projects = find.filter((f: any) => {
        //   return f.dataValues.userArray.includes(id);
        // });
        return { status: "success", data: projects };
    }
    catch (error) {
        console.log(error.message);
        return { status: "error", error: error.message };
    }
});
exports.findProject = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const message = `Click the link to verify your account ${"https://b-manager-api.herokuapp.com/api/v1/projects/invite/" +
        email +
        "/" +
        id}`;
    mail_1.sendMail(email, message, "Verify your account");
});
exports.inviteUsers = (email, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({
        where: {
            email,
        },
    });
    const project = yield Project.findOne({
        where: {
            id,
        },
    });
    try {
        if (user) {
            let userArray = project.dataValues.userArray;
            userArray.push(user.dataValues.id);
            const updatedProject = {
                project_name: project.project_name,
                description: project.description,
                project_identifier: project.project_identifier,
                start_date: project.start_date,
                end_date: project.end_date,
                UserId: project.UserId,
                userArray,
            };
            return yield Project.update(updatedProject, { where: { id } });
        }
        else {
            return { status: "error", error: "Cant update" };
        }
    }
    catch (error) {
        return { status: "error", error: error };
    }
});
exports.getAProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project.findOne({
            where: { id },
            include: [User, Task],
        });
        if (project)
            return { status: "success", data: project };
        return { status: "error", error: "Cant find this project" };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.updateProject = (id, project) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = validateProject_1.validateProject(project);
    if (error.project_name)
        return { status: "error", error: error.project_name };
    if (error.project_identifier)
        return { status: "error", error: error.project_identifier };
    if (error.description)
        return { status: "error", error: error.description };
    if (error.start_date)
        return { status: "error", error: error.start_date };
    if (error.end_date)
        return { status: "error", error: error.end_date };
    try {
        const projected = yield Project.findOne({
            where: { id },
            include: ["User"],
        });
        if (projected) {
            const updatedProject = yield Project.update(value, {
                where: { id },
            });
            return {
                status: "success",
                data: updatedProject,
            };
        }
        return { status: "error", error: "Cant update this project" };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.deleteProject = (id, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ id, projectId });
    try {
        const deleted = yield Project.findOne({
            where: { id: Number(projectId) },
            include: ["User"],
        });
        const user = yield User.findOne({
            where: { id: Number(id) },
        });
        console.log({ user });
        if (user.dataValues.id === Number(id)) {
            const deletedProject = yield Project.destroy({
                where: { UserId: Number(id), id: Number(projectId) },
            });
            return {
                status: "success",
                data: deletedProject,
            };
        }
        return {
            status: "error",
            error: "You dont have the previlege to delete this project",
        };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
//# sourceMappingURL=projectController.js.map