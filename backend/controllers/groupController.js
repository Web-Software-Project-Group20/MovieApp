const groupModel = require('../models/groupModel');

const createGroup = async (req, res, next) => {
  const userId = res.locals.userId;
  const groupName = req.body.groupName;
  const groupDescription = req.body.groupDescription || null;
  const groupAvatar = req.body.groupAvatar || null;
  try {
    if (!groupName || groupName === '') {
      res.status(400);
      throw new Error('Group name is required');
    }

    if (groupName.length > 20) {
      res.status(400);
      throw new Error('Group name cannot be longer than 20 characters');
    }

    const groupExists = await groupModel.groupAlreadyExists(groupName);
    if (groupExists) {
      res.status(400);
      throw new Error('Group already exists');
    }

    const group = await groupModel.createGroup(groupName, groupDescription, groupAvatar);
    if (!group) {
      res.status(400);
      throw new Error('Group could not be created');
    }

    const groupId = group.id_groups;
    await groupModel.addUserToGroup(userId, groupId);
    res.status(201).json({ message: 'Group created successfully', userId, group });
  } catch (error) {
    next(error);
  }
};

const getGroupInfo = async (req, res, next) => {
  const groupId = req.params.groupId;

  try {
    const groupInfo = await groupModel.getGroupInfo(groupId);

    if (!groupInfo) {
      res.status(404);
      throw new Error('Group not found');
    }

    res.status(200).json({ message: 'Success', groupInfo });
  } catch (error) {
    next(error);
  }
};

const getAllGroups = async (req, res, next) => {
  try {
    const allGroups = await groupModel.getAllGroups();

    if (allGroups.length === 0) {
      res.status(404);
      throw new Error('No groups found');
    }

    res.status(200).json({ message: 'Success', allGroups });
  } catch (error) {
    next(error);
  }
};

const getUsersGroups = async (req, res, next) => {
  const userId = req.params.id || res.locals.userId;

  try {
    const Groups = await groupModel.getUsersGroups(userId);

    if (Groups.length === 0) {
      res.status(404);
      throw new Error('No groups found');
    }

    res.status(200).json({ message: 'Success', Groups });
  } catch (error) {
    next(error);
  }
};

const getGroupMembers = async (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = res.locals.userId;

  try {
    const isAdmin = await groupModel.isUserGroupAdmin(userId, groupId);
    if (!isAdmin) {
      res.status(403);
      throw new Error('Not authorized to view group members');
    }

    const groupMembers = await groupModel.getGroupMembers(groupId);

    if (groupMembers.length === 0) {
      res.status(404);
      throw new Error('No members found');
    }

    res.status(200).json({ message: 'Success', groupMembers });
  } catch (error) {
    next(error);
  }
};

const joinGroup = async (req, res, next) => {
  const userId = res.locals.userId;
  const groupId = req.body.groupId;

  try {
    if (!groupId || groupId === '' || groupId === undefined) {
      res.status(400);
      throw new Error('Group ID is required');
    }

    const groupExists = await groupModel.getIfGroupExists(groupId);
    if (!groupExists) {
      res.status(404);
      throw new Error('Group not found');
    }

    const userInGroup = await groupModel.userInGroup(userId, groupId);
    if (userInGroup) {
      res.status(400);
      throw new Error('User is already in the group');
    }

    const userHasSentRequest = await groupModel.userHasSentRequest(userId, groupId);
    if (userHasSentRequest) {
      res.status(400);
      throw new Error('User has already sent a request to join the group');
    }

    await groupModel.addInvite(userId, groupId);
    res.status(201).json({ message: 'Invite posted successfully' });
  } catch (error) {
    next(error);
  }
};

const getInvites = async (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = res.locals.userId;
  try {
    if (!groupId || isNaN(groupId)) {
      res.status(400);
      throw new Error('Group ID is required');
    }

    const groupExists = await groupModel.getIfGroupExists(groupId);
    if (!groupExists) {
      res.status(404);
      throw new Error('Group not found');
    }

    const isAdmin = await groupModel.isUserGroupAdmin(userId, groupId);
    if (!isAdmin) {
      res.status(403);
      throw new Error('Not authorized to view group invites');
    }

    const invites = await groupModel.getGroupInvites(groupId);

    if (invites.length === 0) {
      res.status(404);
      throw new Error('No invites found');
    }

    res.status(200).json({ message: 'Success', groupId, invites });
  } catch (error) {
    next(error);
  }
};

const addUserFromInvite = async (req, res, next) => {
  const { userId, groupId, inviteId } = req.body;
  const ownerId = res.locals.userId;
  try {
    if (!userId || isNaN(userId)) {
      res.status(400);
      throw new Error('User ID is required');
    }

    if (!groupId || isNaN(groupId)) {
      res.status(400);
      throw new Error('Group ID is required');
    }

    if (!inviteId || isNaN(inviteId)) {
      res.status(400);
      throw new Error('Invite ID is required');
    }

    const groupExists = await groupModel.getIfGroupExists(groupId);
    if (!groupExists) {
      res.status(404);
      throw new Error('Group not found');
    }

    const isAdmin = await groupModel.isUserGroupAdmin(ownerId, groupId);
    if (!isAdmin) {
      res.status(403);
      throw new Error('Not authorized to add users to this group');
    }

    const userInGroup = await groupModel.userInGroup(userId, groupId);
    if (userInGroup) {
      res.status(400);
      throw new Error('User is already in the group');
    }

    await groupModel.addUserFromInvite(userId, groupId, inviteId);
    res.status(201).json({ message: 'User added to group successfully' });
  } catch (error) {
    next(error);
  }
};

const leaveGroup = async (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = res.locals.userId;
  try {
    if (!groupId || isNaN(groupId)) {
      res.status(400);
      throw new Error('Group ID is required');
    }

    const groupInfo = await groupModel.getIfGroupExists(groupId);
    if (!groupInfo) {
      res.status(404);
      throw new Error('Group not found');
    }

    const userInGroup = await groupModel.userInGroup(userId, groupId);
    if (!userInGroup) {
      res.status(404);
      throw new Error('User not found in group');
    }

    const isUserGroupAdmin = await groupModel.isUserGroupAdmin(userId, groupId);
    if (isUserGroupAdmin) {
      res.status(400);
      throw new Error('Cannot leave group as admin');
    }

    await groupModel.deleteGroupMember(userId, groupId);

    res.status(200).json({ message: 'User left group successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteGroup = async (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = res.locals.userId;

  try {
    const groupInfo = await groupModel.getIfGroupExists(groupId);
    if (!groupInfo) {
      res.status(404);
      throw new Error('Group not found');
    }

    // Check if the authenticated user is the group admin
    const isAdmin = await groupModel.isUserGroupAdmin(userId, groupId);
    if (!isAdmin) {
      res.status(403);
      throw new Error('Not authorized to delete this group');
    }

    await groupModel.deleteGroup(groupId);

    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteMembers = async (req, res, next) => {
  const { groupId, userId } = req.body;
  const adminId = res.locals.userId;
  try {
    if (!groupId || isNaN(groupId)) {
      res.status(400);
      throw new Error('Group ID is required');
    }

    if (!userId || isNaN(userId)) {
      res.status(400);
      throw new Error('User ID is required');
    }

    const groupExists = await groupModel.getIfGroupExists(groupId);
    if (!groupExists) {
      res.status(404);
      throw new Error('Group not found');
    }

    const isUserInGroup = await groupModel.userInGroup(userId, groupId);
    if (!isUserInGroup) {
      res.status(404);
      throw new Error('User not found in group');
    }

    const isAdmin = await groupModel.isUserGroupAdmin(adminId, groupId);
    if (!isAdmin) {
      res.status(403);
      throw new Error('Not authorized to delete members');
    }

    const userIsGroupAdmin = await groupModel.isUserGroupAdmin(userId, groupId);
    if (userIsGroupAdmin) {
      res.status(403);
      throw new Error('Cannot delete group admin');
    }

    await groupModel.deleteGroupMember(userId, groupId);
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const editGroup = async (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = res.locals.userId;
  const { groupName, groupDescription, groupAvatar } = req.body;

  try {
    if (groupName.length > 20) {
      res.status(400);
      throw new Error('Group name cannot be longer than 20 characters');
    }

    const groupInfo = await groupModel.getIfGroupExists(groupId);
    if (!groupInfo) {
      res.status(404);
      throw new Error('Group not found');
    }

    const groupExists = await groupModel.groupAlreadyExists(groupName);
    if (groupExists) {
      res.status(400);
      throw new Error('Group already exists');
    }

    const isAdmin = await groupModel.isUserGroupAdmin(userId, groupId);
    if (!isAdmin) {
      res.status(403);
      throw new Error('Not authorized to edit this group');
    }

    const updatedGroup = await groupModel.editGroup(groupId, groupName, groupDescription, groupAvatar);

    res.status(200).json({ message: 'Group edited successfully', updatedGroup });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGroupInfo,
  getAllGroups,
  createGroup,
  deleteGroup,
  editGroup,
  joinGroup,
  getUsersGroups,
  getGroupMembers,
  getInvites,
  addUserFromInvite,
  deleteMembers,
  leaveGroup
};
