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
const notificationController_1 = require("../controllers/notificationController");
const db = require("../../database/models/");
const router = express_1.Router();
// route to get all projects
router.get("/", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const projects = yield notificationController_1.getNotifications(id);
    res.json(projects);
}));
router.post("/", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { notify, ProjectId, TaskId } = req.body;
    console.log({ notify, id, ProjectId, TaskId });
    yield notificationController_1.createNotification(id, notify, ProjectId, TaskId);
    res.json({ message: "notification sent!!!" });
}));
router.delete("/:id", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield notificationController_1.deleteNotification(id);
    res.json({ data: "Notification cleared!!!" });
}));
router.delete("/", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    yield notificationController_1.deleteAllNotifications(id);
    res.json({ data: "All Notification cleared!!!" });
}));
exports.default = router;
//# sourceMappingURL=notification.js.map