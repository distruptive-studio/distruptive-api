import { Request } from "express";
import { IUser } from "../interfaces/IUser";

export type CreateUserReqDto = {
    body: IUser;
} & Request


export type CredentialDto = {
    token: string,
    user: IUser
}

export type LoginReqDto = {
    body: {
        identifier: string;
        password: string;
    }
} & Request