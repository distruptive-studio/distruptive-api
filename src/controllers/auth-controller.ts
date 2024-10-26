import { Response } from 'express';
import { IUser } from "../interfaces/IUser";
import { IAuthServices, AuthServicesInstance } from "../services/auth-services";
import { CreateUserReqDto, LoginReqDto } from "../types/auth-types";
import GenericController from "./generic-controller";

abstract class IAuthController extends GenericController<IUser> {
    abstract register(req: CreateUserReqDto, res: Response): Promise<void>;
    abstract login(req: LoginReqDto, res: Response): Promise<void>;
}

class AuthController extends IAuthController {
    private static instance: AuthController;

    private constructor(protected _service: IAuthServices = AuthServicesInstance) {
        super(_service);
    }

    public static getInstance(): AuthController {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    /**
     * Create a new user.
     * @param {CreateUserReqDto} req - The Express request.
     * @param {Response} res - The Express response.
     */
    register = async (req: CreateUserReqDto, res: Response) => {
        try {
            const body: IUser = req.body;

            const newUser = await this._service.register(body);
            this.sendSuccess({
                res,
                data: newUser,
                message: 'Usuario Registrado',
                statusCode: 201,
            });
        } catch (error: any) {
            if (error.code === 11000) {
                return this.handleError({
                    res,
                    error: { message: 'Usuario ya existe' },
                    statusCode: 400,
                });
            }
            this.handleError({ res, error });
        }
    };

    login = async (req: LoginReqDto, res: Response) => {
        try {
            const { user, password } = req.body

            const response = await this._service.login({ user, password });

            this.sendSuccess({
                res,
                data: { user: response.user, token: response.token },
            });

        } catch (error: any) {
            this.handleError({ res, error });
        }
    }
}

export const AuthControllerInstance = AuthController.getInstance();
