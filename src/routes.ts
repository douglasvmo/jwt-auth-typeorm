import { Router } from 'express'
import authMiddleware from './app/middleware/authMiddleware'


import UserController from './app/controller/UserController'
import AuthController from './app/controller/AuthController'


const routes = Router()

routes.post("/users", UserController.store);
routes.post("/auth", AuthController.store);
routes.get("/users", authMiddleware, UserController.index);




export default routes