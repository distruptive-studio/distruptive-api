import mongoose, { Schema } from 'mongoose';
import { IContent } from '../interfaces/IContent';


/**
 * Schema definition for the Content model.
 * 
 * @type {Schema<IContent>}
 */
const contentSchema = new Schema<IContent>({
    /**
     * The title of the content item, which is required.
     * @type {String}
     */
    title: { type: String, required: true },

    /**
     * The type of content, must be one of the specified enum values.
     * @type {String}
     */
    type: { type: String, enum: ['imagen', 'video', 'text'], required: true },

    /**
     * The theme associated with the content item, which is required.
     * @type {String}
     */
    theme: { type: String, required: true },

    /**
     * The creator of the content item, which is required.
     * @type {String}
     */
    creator: { type: String, required: true },

    /**
     * The URL of the content item, applicable for images or videos.
     * @type {String}
     * @optional
     */
    url: { type: String },

    /**
     * The text content, applicable for documents.
     * @type {String}
     * @optional
     */
    text: { type: String }
});

/**
 * Content model based on the content schema.
 * 
 * @type {mongoose.Model<IContent>}
 */
export default mongoose.model<IContent>('Content', contentSchema);