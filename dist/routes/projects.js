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
const express_1 = require("express");
const userAuth_1 = require("./userAuth");
const projectController_1 = require("../controllers/projectController");
const db = require("../../database/models/");
const { User, Project } = db;
const router = express_1.Router();
// route to get all projects
router.get("/", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield projectController_1.getAllProjects();
    res.json(projects);
}));
// route to get a single project
router.get("/:id", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield projectController_1.getAProject(id);
    res.json(project);
}));
// route to create a project
router.post("/", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const project = yield projectController_1.createProject(id, req.body);
    res.json({ data: project });
}));
exports.default = router;
//# sourceMappingURL=projects.js.map