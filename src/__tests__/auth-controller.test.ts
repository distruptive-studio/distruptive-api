import { Response } from 'express';
import { AuthControllerInstance } from '../controllers/auth-controller';
import { IUser } from '../interfaces/IUser';
import { CreateUserReqDto } from '../types/auth-types';
import { IAuthServices } from '../services/auth-services';


const mockAuthService = {
    register: jest.fn(),
};


describe('AuthController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully register a new user', async () => {
        const req: CreateUserReqDto = { body: { username: 'testuser', email: 'test@example.com', type: 'lector', password: 'password123' } } as any;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as any;

        mockAuthService.register.mockResolvedValue({ success: true });

        await AuthControllerInstance.register(req, res);

        expect(mockAuthService.register).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
        });
    });

    it('should handle duplicate user error', async () => {
        const req: any = { body: { username: 'testuser' } };
        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockAuthService.register.mockRejectedValue({
            code: 11000, // Error de duplicado
            message: 'Usuario ya existe',
        });

        await AuthControllerInstance.register(req, res);

        expect(mockAuthService.register).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Usuario ya existe',
        });
    });

    it('should handle general errors', async () => {
        const req: any = { body: { username: 'someUser' } };
        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const error = new Error('Internal Server Error');
        mockAuthService.register.mockRejectedValue(error);

        await AuthControllerInstance.register(req, res);

        expect(mockAuthService.register).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: { message: 'Internal Server Error' },
        });
    });
});
