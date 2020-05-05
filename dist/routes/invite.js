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
const inviteController_1 = require("../controllers/inviteController");
const userAuth_1 = require("./userAuth");
const router = express_1.Router();
// route to get all users
router.get("/", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const invites = yield inviteController_1.getAllIvites(email);
    res.json({ data: invites });
}));
router.get("/accept/:projectId", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { projectId } = req.params;
    const invites = yield inviteController_1.inviteUsers(user, projectId);
    res.json({ data: invites });
}));
router.post("/", userAuth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { email, ProjectId } = req.body;
    const invites = yield inviteController_1.createInvite(user, email, ProjectId);
    res.json({ data: invites });
}));
router.delete("/:deleteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield inviteController_1.deleteInvite(req.params.deleteId);
    res.json({ data: response });
}));
exports.default = router;
//# sourceMappingURL=invite.js.map