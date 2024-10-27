import { Router } from "express";

import { ENDPOINTS } from "../config/endpoints";

import { UserControllerInstance } from "../controllers/user-controller";

const UserRouter = Router()

UserRouter.get(ENDPOINTS.USERS.LIST, UserControllerInstance.find)
UserRouter.get(ENDPOINTS.USERS.DETAIL_USER, UserControllerInstance.findOne)

export default UserRouter