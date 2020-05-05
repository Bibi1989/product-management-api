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
const { Op } = require("sequelize");
const db = require("../../database/models");
const { Project, User, Task, Notification } = db;
exports.createNotification = (id, body, ProjectId, TaskId) => __awaiter(void 0, void 0, void 0, function* () {
    const notify = {
        notify: body,
        UserId: id,
        ProjectId: Number(ProjectId),
        TaskId: Number(TaskId),
    };
    console.log({ notify });
    try {
        const createdNotification = yield Notification.create(notify);
        return { status: "success", data: createdNotification };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.getNotifications = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdNotification = yield Notification.findAll({
            where: { UserId: id },
            include: [Project, User, Task],
        });
        return { status: "success", data: createdNotification };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.deleteNotification = (deleteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Notification.destroy({
            where: { id: deleteId },
        });
        return { status: "success", data: deleted };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.deleteAllNotifications = (UserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Notification.destroy({
            where: { UserId },
        });
        return { status: "success", data: deleted };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
//# sourceMappingURL=notificationController.js.map