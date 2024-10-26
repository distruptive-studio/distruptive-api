import mongoose, { Document, Schema } from 'mongoose';
import { ICategory } from '../interfaces/ICategory';


/**
 * Schema definition for the Category model.
 * 
 * @type {Schema<ICategory>}
 */
const categorySchema = new Schema<ICategory>({
    /**
     * The name of the category, must be unique and is required.
     * @type {String}
     */
    name: { type: String, unique: true, required: true },

    /**
     * The type of content for the category, must be one of the specified enum values.
     * @type {String}
     */
    type: { type: String, enum: ['imagen', 'video', 'text'], required: true }
});

/**
 * Category model based on the category schema.
 * 
 * @type {mongoose.Model<ICategory>}
 */
export default mongoose.model<ICategory>('Category', categorySchema);