import { Response, NextFunction, Request } from "express";
import { IUser, ROLES } from "../interfaces/IUser";

/**
 * Middleware to check if the user is an admin.
 *
 * @function validUserAdmin
 * @param {Request} req - The request from Express.
 * @param {Response} res - The response from Express.
 * @param {NextFunction} next - The next middleware in the stack.
 * @throws {Error} - If the user is not an admin.
 */
export const validUserAdmin = (req: Request & { user?: IUser }, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw {
                error: 'Unauthorized',
                message: "invalid user",
                code: 401,
            }
        }
        if (req.user.type !== ROLES.ADMIN) {
            throw {
                error: 'Unauthorized',
                message: "User is not an admin",
                code: 401,
            }
        }
        next();

    } catch (error: any) {

        const code = error.code | 401
        const message = error.message || 'usuario no es del tipo admin';

        res.status(code).json({
            error,
            message,
            code,
        });
    }
}