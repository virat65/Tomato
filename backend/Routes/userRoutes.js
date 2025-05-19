import express from 'express'
import { deleteId, findAll, findId, logIn, signUP } from '../Controller/userController.js';
import { middleWare } from '../Middleware/Middleware.js';

const userRoutes = express.Router()

userRoutes.post('/signUp',signUP)
userRoutes.post('/logIn',logIn)
userRoutes.get('/findAll',findAll)
userRoutes.get('/findId/:id',middleWare,findId)
userRoutes.delete('/deleteId/:id',deleteId)

export default userRoutes;