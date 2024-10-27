import { IUser } from "../interfaces/IUser";
import { IUserServices, UserServicesInstance } from "../services/user-services";
import GenericController from "./generic-controller";

abstract class IUserController extends GenericController<IUser> { }


class UserController extends IUserController {
    private static instance: UserController;

    constructor(_services: IUserServices = UserServicesInstance) {
        super(_services)
    }

    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController()
        }
        return UserController.instance
    }
}

export const UserControllerInstance = UserController.getInstance()