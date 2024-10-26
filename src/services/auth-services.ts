
import jwt from 'jsonwebtoken'

import { IUser } from "../interfaces/IUser";
import GenericService from "./generic-service";
import UserModel from "../models/user-model";
import bcrypt from "bcryptjs";

export abstract class IAuthServices extends GenericService<IUser> {
    abstract register(user: IUser): Promise<IUser>;
    abstract login({ user, password }: { user: string, password: string }): Promise<{ user: IUser, token: string }>;
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

    async login({ user, password }: { user: string, password: string }) {

        try {


            const userValidate = await this._verifyUser({ user, password });

            const token = jwt.sign({ user }, 'HS256', { expiresIn: "672h" });

            const userUpdatingToken = await this.update(userValidate._id, { token })

            return {
                user: userUpdatingToken as IUser,
                token
            }


        } catch (error) {

            throw error

        }
    }


    private _verifyUser = async ({ user, password }: { user: string, password: string }) => {

        const isEmail = /\S+@\S+\.\S+/.test(user);

        const userIdentifier = isEmail ? { email: user } : { username: user };

        try {
            const user = await this.findOne({ ...userIdentifier });

            if (!user) {
                throw {
                    statusCode: 404,
                    code: 404,
                    message: "Usuario no encontrado",
                }
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw {
                    statusCode: 401,
                    code: 401,
                    message: "Contraseña invalida",
                }
            }

            return user
        } catch (error) {
            throw error
        }

    }

}
export const AuthServicesInstance = AuthServices.getInstance()
