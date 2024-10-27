import { IUser } from "../interfaces/IUser";
import userModel from "../models/user-model";
import GenericService from "./generic-service";

export abstract class IUserServices extends GenericService<IUser> { }

class UserServices extends IUserServices {
    private static instance: UserServices;

    private constructor(_model = userModel) {
        super(_model)
    }

    public static getInstance(): UserServices {
        if (!UserServices.instance) {
            UserServices.instance = new UserServices()
        }
        return UserServices.instance
    }
}

export const UserServicesInstance = UserServices.getInstance()