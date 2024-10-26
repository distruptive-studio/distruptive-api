import { Response } from 'express';

/**
 * Represents a successful response structure.
 * 
 * @interface ISuccess
 * @template T - The type of data being returned.
 */
export interface ISuccess<T> {
    /**
     * The Express response object.
     * @type {Response}
     */
    res: Response;

    /**
     * The data to be sent in the response, which can be a single item, an array, null, or an object.
     * @type {T | T[] | null | Record<string, T | string>}
     */
    data: T | T[] | null | Record<string, T | string>;

    /**
     * The HTTP status code for the response.
     * @type {number}
     * @optional
     */
    statusCode?: number;

    /**
     * A message providing additional information about the response.
     * @type {string}
     * @optional
     */
    message?: string;
}

/**
 * Represents an error response structure.
 * 
 * @interface IError
 */
export interface IError {
    /**
     * The Express response object.
     * @type {Response}
     */
    res: Response;

    /**
     * The error object containing error details.
     * @type {any}
     */
    error: any;

    /**
     * The HTTP status code for the error response.
     * @type {number}
     * @optional
     */
    statusCode?: number;

    /**
     * A message providing additional information about the error.
     * @type {string}
     * @optional
     */
    message?: string;
}