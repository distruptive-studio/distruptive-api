import { Router } from "express";

import { ENDPOINTS } from "../config/endpoints";

import { AuthControllerInstance } from '../controllers/auth-controller'

const AuthRouter = Router()

AuthRouter.post(ENDPOINTS.AUTH.REGISTER, AuthControllerInstance.register)

export default AuthRouter
