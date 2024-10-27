import { Response, NextFunction, Request } from 'express';
import { IUser, ROLES } from "../interfaces/IUser";
import { PERMISSIONS } from '../constants/permissions-contstants';

type CustomRequest<T = Record<string, any>> = Request<T> & {
    user?: IUser;
};

const rolePermissionsMap = {
    [ROLES.ADMIN]: PERMISSIONS.CRUD,
    [ROLES.CREATOR]: PERMISSIONS.CRU,
    [ROLES.LECTOR]: PERMISSIONS.R,
};

/**
 * Middleware to authorize users based on role permissions.
 */
export const authorize = (req: CustomRequest, res: Response, next: NextFunction) => {
    const userType = req.user?.type;

    const rolePermissions = userType && rolePermissionsMap[userType];

    if (!rolePermissions) {
        res.status(403).json({ message: 'Access denied: invalid role or permissions not assigned' });
    }

    next();
};
