const express = require('express')
const userRouter = express.Router();

const { createUser, authenticate, logout, getUsers, patchUsers, deleteUsers} = require('../controllers/user.controllers')
const { isAuth } = require("../middlewares/auth.middleware")

const userRoutes = express.Router();
userRoutes.get('/', getUsers)
userRouter.post("/registro", createUser);
userRouter.post("/autenticar", authenticate);
userRouter.post("/cerrar-sesion", logout);
userRoutes.patch('/:id', patchUsers)
userRoutes.delete('/:id', deleteUsers)



module.exports = userRoutes;