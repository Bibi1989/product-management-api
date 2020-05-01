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
const uuid_1 = require("uuid");
const db = require("../../database/models");
const { Project, User, Task } = db;
exports.createTask = (id, project) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = validateProject_1.validateTask(project);
    if (error.summary)
        return { status: "error", error: error.summary };
    if (error.status)
        return { status: "error", error: error.status };
    if (error.priorty)
        return { status: "error", error: error.priorty };
    if (error.project_sequence)
        return { status: "error", error: error.project_sequence };
    if (error.due_date)
        return { status: "error", error: error.due_date };
    const findProject = yield Project.findOne({
        where: { id: value.ProjectId },
    });
    const unique = uuid_1.v4();
    if (!findProject)
        return { status: "error", error: "Project is not found" };
    const tasks = Object.assign(Object.assign({}, value), { UserId: id, project_sequence: `#${unique.slice(0, 6)}`, ProjectId: value.ProjectId });
    console.log({ tasks });
    try {
        const createdTask = yield Task.create(tasks);
        return { status: "success", data: createdTask };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.getAllTasks = (ProjectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task.findAll({
            where: { ProjectId },
            include: [User, Project],
        });
        return { status: "success", data: tasks };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
// export const getAllTasks = async (id: number, ProjectId: number) => {
//   try {
//     const tasks = await Task.findAll({
//       where: { id, ProjectId },
//       include: [User, Project],
//     });
//     return { status: "success", data: tasks };
//   } catch (error) {
//     return { status: "error", error: error.message };
//   }
// };
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
exports.getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task.findOne({
            where: { id },
            include: [User, Project],
        });
        if (task)
            return { status: "success", data: task };
        return { status: "error", error: "Cant find this project" };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.updateTask = (id, task) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = validateProject_1.validateTask(task);
    if (error.summary)
        return { status: "error", error: error.summary };
    if (error.status)
        return { status: "error", error: error.status };
    if (error.priorty)
        return { status: "error", error: error.priorty };
    if (error.project_sequence)
        return { status: "error", error: error.project_sequence };
    if (error.due_date)
        return { status: "error", error: error.due_date };
    try {
        const projected = yield Task.findOne({
            where: { id },
            include: [User, Project],
        });
        if (projected) {
            const updatedProject = yield Task.update(value, {
                where: { id },
            });
            return {
                status: "success",
                data: yield Task.findOne({
                    where: { id },
                    include: [User, Project],
                }),
            };
        }
        return { status: "error", error: "Cant update this project" };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.updateStatus = (id, task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasked = yield Task.findOne({
            where: { id: id },
            include: [User, Project],
        });
        if (tasked) {
            const updatedTask = yield Task.update(task, {
                where: { id: task.id },
            });
            return {
                status: "success",
                data: yield Task.findOne({
                    where: { id },
                    include: [User, Project],
                }),
            };
        }
        return { status: "error", error: "Cant update this project" };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Task.findOne({
            where: { id },
            include: ["User"],
        });
        if (deleted) {
            const deletedTask = yield Task.destroy({
                where: { id },
            });
            return {
                status: "success",
                data: deletedTask,
            };
        }
        return { status: "error", error: "Cant update this project" };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
//# sourceMappingURL=taskController.js.map