import { sendMail } from "../mail/mail";
const { Op } = require("sequelize");
const db = require("../../database/models");

const { Project, User, Task, Notification, Invite } = db;

interface InfoInterface {
  sender: string;
  receiver: string;
}

export const createInvite = async (
  user: any,
  receiver: string,
  ProjectId: number
) => {
  //   const { sender, receiver } = user;

  //   const sender_details = await User.findOne({ where: { email: sender } });
  const data = {
    receiver,
    sender: user.email,
    ProjectId,
    UserId: user.id,
    accept: true,
  };
  try {
    const added_invite = await Invite.create(data);
    return { status: "success", data: added_invite };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const getAllIvites = async (receiver: string) => {
  try {
    const invites = await Invite.findAll({
      where: {
        receiver,
      },
    });

    return { status: "success", data: invites };
  } catch (error) {
    console.log(error.message);
    return { status: "error", error: error.message };
  }
};

export const findProject = async (id: number, email: string) => {
  const message = `Click the link to verify your account ${
    "https://b-manager-api.herokuapp.com/api/v1/projects/invite/" +
    email +
    "/" +
    id
  }`;

  sendMail(email, message, "Verify your account");
};

export const inviteUsers = async (user: any, projectId: number) => {
  const project = await Project.findOne({
    where: {
      id: projectId,
    },
  });
  const invites = await Invite.findOne({
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
        userArray,
      };
      return await Project.update(updatedProject, {
        where: { id: Number(projectId) },
      });
    } else {
      return { status: "error", error: "Cant update" };
    }
  } catch (error) {
    return { status: "error", error: error };
  }
};

export const deleteInvite = async (inviteId: number) => {
  try {
    await Invite.destroy({
      where: {
        id: inviteId,
      },
    });
    return { status: "success", data: "You are a collaborator!!!" };
  } catch (error) {
    return { status: "error", data: error.message };
  }
};
