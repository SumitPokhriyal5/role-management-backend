const express = require('express');
const { RoleModel } = require('../models/Role.model');
const { UserModel } = require('../models/Users.model');


const router = express.Router()


// Create a custom role
router.post('/api/roles', async (req, res) => {
    try {
        const { name, permissions } = req.body;
        const role = new RoleModel({ name, permissions });
        await role.save();
        res.status(201).json(role);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating role' });
      }
  });

// Create users
router.post('/api/user', async (req, res) => {
    
    try {
        const { name, roleId } = req.body;
        const user = new UserModel({ name, roleId });
        await user.save();
        res.status(201).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
      }
  });
  
  // Assign a role to a user
  router.post('/api/users/:userId/assign-role/:roleId', async (req, res) => {
    try {
      const { userId, roleId } = req.params;
      const user = await UserModel.findByIdAndUpdate(userId, { roleId });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error assigning role to user' });
    }
  });


  // Check if a user has permission
router.get('/api/users/:userId/has-permission/:permission', async (req, res) => {
    try {
      const { userId, permission } = req.params;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const role = await RoleModel.findById(user.roleId);
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      const hasPermission = role.permissions.includes(permission);
      res.json({ hasPermission });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error checking permissions' });
    }
  });

  module.exports = { router }