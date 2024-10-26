import { IUser } from "../interfaces/IUser";
import GenericService from "./generic-service";
import UserModel from "../models/user-model";
import bcrypt from "bcryptjs";

export abstract class IAuthServices extends GenericService<IUser> {
    abstract register(user: IUser): Promise<IUser>;
    // abstract login({ username, password }: { username: string, password: string }): Promise<{ user: IUser, token: string }>;
}

class AuthServices extends IAuthServices {
    private static instance: AuthServices;

    private constructor() {
        super(UserModel);
    }

    public static getInstance(): AuthServices {
        if (!AuthServices.instance) {
            AuthServices.instance = new AuthServices();
        }
        return AuthServices.instance;
    }

    async register(user: IUser): Promise<IUser> {
        const { password, email, ...rest } = user;

        const hashedPassword = await bcrypt.hash(password, 10);

        const userRegistered = await this.create({
            password: hashedPassword,
            email: email.toLowerCase(),
            ...rest,
        });

        return userRegistered;
    }
}
export const AuthServicesInstance = AuthServices.getInstance()
