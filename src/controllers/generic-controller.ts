import { Request, Response } from 'express'

import GenericService from "../services/generic-service";
import { Document, FilterQuery } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import { IError, ISuccess } from '../interfaces/IResponses';

/**
 * Base class for controllers that provides common methods for handling responses.
 */
export abstract class BaseController<T> {

    /**
     * Submit a successful response.
     * @param {Response} res -The response from Express.
     * @param {number} statusCode -HTTP status code.
     * @param {Record} data -Data to send in the response.
     * @param {number} statusCode -HTTP status code.
     */
    protected sendSuccess({ res, data, statusCode = 200 }: ISuccess<T>) {
        res.status(statusCode).json({ data });
    }

    /**
     * Handles errors and sends an error response.
     * @param {Response} res -The response from Express.
     * @param {Record} error -Custom error to send extra data.
     * @param {string} message -Custom error message.
     * @param {number} statusCode -HTTP status code.
     */
    protected handleError({ res, error, message, statusCode = 400 }: IError) {
        const msg = message || error.message || "Error inesperado";
        res.status(statusCode).json({ error, message: msg });
    }

}
/**
 * Custom request interface that extends the Express Request interface with additional properties.
 *
 * @template P - The type for request parameters (defaults to an empty object).
 * @template B - The type for the request body (defaults to an empty object).
 * @template T - The type for the response body (defaults to an empty object).
 * @template Q - The type for the request query string (defaults to an empty object).
 *
 * @property {IUser} [user] - Optional user object attached to the request.
 */

export interface CustomRequest<P = {}, B = {}, T = {}, Q = {},> extends Request<P, B, T, Q> {
    user?: IUser;
}

/**
 * Interface for a generic controller.
 * @param T - The model type.
 * @param ID - The model ID type.
 * @param Q - The query type.
 */

export interface IGenericController<T, ID, Q extends FilterQuery<T>> {
    create(req: CustomRequest<{}, {}, T>, res: Response): Promise<void>;
    findOne(req: CustomRequest<{}, {}, {}, Q>, res: Response): Promise<void>;
    find(req: CustomRequest<{}, {}, {}, Q>, res: Response): Promise<void>;
    update(req: CustomRequest<{ id: ID }, {}, Partial<T>>, res: Response): Promise<void>;
    delete(req: CustomRequest<{ id: ID }, {}, {}>, res: Response): Promise<void>;
}

/**
 * Interface for a generic controller with CRUD operations.
 * 
 * @template T - The type of the model.
 * @template ID - The type of the model's identifier.
 * @template Q - The type of the query object.
 */
abstract class GenericController<T extends Document, ID = T['_id'], Q extends FilterQuery<T> = {}> extends BaseController<T> implements IGenericController<T, ID, Q> {

    constructor(protected _service: GenericService<T, ID, Q>) {
        super();
        this._service = _service;
    }

    create = async (req: CustomRequest<{}, {}, T>, res: Response) => {
        try {
            const data = await this._service.create(req.body);
            this.sendSuccess({ res, data });
        } catch (error) {
            this.handleError({ res, error });
        }
    }

    find = async (req: CustomRequest<{}, {}, {}, Q>, res: Response) => {
        try {
            const data = await this._service.find(req.query);
            this.sendSuccess({ res, data });
        } catch (error) {
            this.handleError({ res, error });
        }
    };

    findOne = async (req: CustomRequest<{}, {}, {}, Q>, res: Response) => {
        try {

            const data = await this._service.findOne(req.query);
            this.sendSuccess({ res, data });
        } catch (error) {
            this.handleError({ res, error });
        }
    };

    update = async (req: CustomRequest<{ id: ID }, {}, Partial<T>>, res: Response) => {
        try {
            const data = await this._service.update(req.params.id, req.body);
            this.sendSuccess({ res, data });
        } catch (error) {
            this.handleError({ res, error });
        }
    };


    delete = async (req: CustomRequest<{ id: ID }>, res: Response) => {
        try {
            await this._service.delete(req.params.id);
            this.sendSuccess({ res, data: null });
        } catch (error) {
            this.handleError({ res, error });
        }
    }

}

export default GenericController;
