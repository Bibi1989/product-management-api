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
const db = require("../../database/models/");
const { User, Project } = db;
const router = express_1.Router();
// route to get all projects
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Project.findAll({
        include: [User],
    });
    res.json({ users });
}));
// route to get a single project
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Project.findOne({
        where: { id: req.params.id },
        include: [User],
    });
    res.json({ users });
}));
// route to create a project
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Project.create({
        project_name: "Vue app",
        description: "App for Vue users",
        project_identifier: "vue-1",
        start_date: "2020-04-21",
        end_date: "2020-04-23",
        UserId: 2,
    });
    res.json({ user });
}));
exports.default = router;
//# sourceMappingURL=projects.js.map