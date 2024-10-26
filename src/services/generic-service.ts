import { Document, FilterQuery, Model, QueryOptions } from 'mongoose';

/**
 * Interface for a generic service.
 * @param {T} - The model type.
 * @param {ID} - The model ID type.
 * @param {Q} - The query type.
 * 
 */
export interface IGenericService<T, ID, Q> {
    create(data: T): Promise<T>;
    findOne(query: Q): Promise<T | null>;
    find(query: Q): Promise<T[]>;
    update(id: ID, data: Partial<T>): Promise<T | null>;
    delete(id: ID): Promise<void>;
}

/**
 * Base class for services.
 * @param {T} - The model type, which should extend Document.
 * @param {ID} - The model ID type.
 * @param {Q} - The query type.
 * 
 */
abstract class GenericService<T extends Document, ID = T['_id'], Q = FilterQuery<T>> implements IGenericService<T, ID, Q> {

    protected _model: Model<T>;

    constructor(_model: Model<T>) {
        this._model = _model;
    }

    create = async (data: Omit<T, keyof Document>): Promise<T> => {
        return await this._model.create(data);
    }

    findOne = async (params: Q): Promise<T | null> => {
        const populateFields = this._getPopulateFields();
        return await this._model.findOne(params || {}).populate(populateFields) as T
    }

    find = async (params: Q, project?: QueryOptions): Promise<T[]> => {
        const populateFields = this._getPopulateFields();
        return await this._model.find(params || {}, {}, project).populate(populateFields);
    }

    update = async (id: ID, data: Partial<T>): Promise<T | null> => {
        return await this._model.findByIdAndUpdate(id, data, { new: true });
    }

    delete = async (id: ID): Promise<void> => {
        await this._model.findByIdAndDelete(id);
    }

    /**
    * Helper method to get the fields that should be populated based on the model schema.
    */
    private _getPopulateFields(): string[] {
        const schemaPaths = this._model.schema.paths;
        const populateFields: string[] = [];

        for (const path in schemaPaths) {
            const pathOptions = schemaPaths[path].options;

            if (pathOptions && pathOptions.ref) {
                populateFields.push(path);
            } else if (pathOptions && Array.isArray(pathOptions.type) && pathOptions.type[0]?.ref) {
                populateFields.push(path);
            }
        }

        return populateFields;
    }
}

export default GenericService;
