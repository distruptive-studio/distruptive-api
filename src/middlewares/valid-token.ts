import { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/user-model'
import { IUser } from '../interfaces/IUser';

interface ITokenPayload extends JwtPayload {
    user: IUser
}

export const validToken = async (req: Request & { user?: IUser }, res: Response, next: NextFunction) => {
    const token = req.get("Authorization") || "";

    try {
        const decoded = jwt.verify(token, 'HS256') as ITokenPayload;

        const user = await UserModel.findOne({ _id: decoded.user._id });

        if (!user) {
            throw {
                message: 'Token no válido o el usuario ha sido inhabilitado',
                statusCode: 401
            }
        }

        req.user = user;
        next();

    } catch (error: any) {

        const statusCode = error.statusCode | 401;
        const message = error.message || 'Token no válido';

        res.status(statusCode).json({ error, message });
    }
}