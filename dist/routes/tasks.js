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
const taskController_1 = require("../controllers/taskController");
const router = express_1.Router();
// route to get all projects
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield taskController_1.getAllTasks(req.body.ProjectId);
    // console.log(req.protocol + "://" + req.get("host") + req.originalUrl);
    res.json(tasks);
}));
// // route to get a single project
router.get("/:id", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield taskController_1.getOne(id);
    res.json(task);
}));
// route to create a project
router.post("/add", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const task = yield taskController_1.createTask(id, req.body);
    res.json({ data: task });
}));
router.put("/:id", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield taskController_1.updateTask(id, req.body);
    res.json({ data: project });
}));
router.patch("/status/:id", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield taskController_1.updateStatus(id, req.body);
    res.json({ data: project });
}));
router.delete("/:id", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield taskController_1.deleteTask(id);
    res.json({ data: task });
}));
exports.default = router;
//# sourceMappingURL=tasks.js.map