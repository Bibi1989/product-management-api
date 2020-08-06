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
const mail_1 = require("../mail/mail");
const db = require("../../database/models");
const { Project, Invite } = db;
exports.createInvite = (user, receiver, ProjectId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        receiver,
        sender: user.email,
        ProjectId,
        UserId: user.id,
        accept: true,
    };
    try {
        const added_invite = yield Invite.create(data);
        return { status: "success", data: added_invite };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.getAllIvites = (receiver) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invites = yield Invite.findAll({
            where: {
                receiver,
            },
        });
        return { status: "success", data: invites };
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
exports.inviteUsers = (user, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield Project.findOne({
        where: {
            id: projectId,
        },
    });
    const invites = yield Invite.findOne({
        where: {
            receiver: user.email,
            ProjectId: projectId,
        },
    });
    console.log(invites.dataValues.accept);
    try {
        if (invites.dataValues.accept) {
            let userArray = project.dataValues.userArray;
            console.log({ userArray, usid: user.id });
            userArray.push(user.id);
            console.log({ userArray });
            const updatedProject = {
                project_name: project.project_name,
                description: project.description,
                project_identifier: project.project_identifier,
                start_date: project.start_date,
                end_date: project.end_date,
                UserId: project.UserId,
                userArray: [...new Set(userArray)],
            };
            return yield Project.update(updatedProject, {
                where: { id: Number(projectId) },
            });
        }
        else {
            return { status: "error", error: "Cant update" };
        }
    }
    catch (error) {
        return { status: "error", error: error };
    }
});
exports.deleteInvite = (inviteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Invite.destroy({
            where: {
                id: inviteId,
            },
        });
        return { status: "success", data: "You are a collaborator!!!" };
    }
    catch (error) {
        return { status: "error", data: error.message };
    }
});
//# sourceMappingURL=inviteController.js.map