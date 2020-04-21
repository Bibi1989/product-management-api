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
const db = require("../../database/models");
const { Project, User } = db;
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
    const projects = Object.assign(Object.assign({}, value), { UserId: id });
    try {
        const createdProject = yield Project.create(projects);
        return { status: "success", data: createdProject };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.getAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project.findAll({
            include: [User],
        });
        return { status: "success", data: projects };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.getAProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project.findOne({
            where: { id },
            include: [User],
        });
        return { status: "success", data: project };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
//# sourceMappingURL=projectController.js.map