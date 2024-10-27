import { ObjectId, Document } from "mongoose";
import { TYPE_CONTENT } from "./ICategory";

/**
 * Represents a content item in the system.
 * 
 * @interface IContent
 * @extends Document
 */
export interface IContent extends Document {
    /**
     * The title of the content item.
     * @type {string}
     */
    title: string;

    /**
     * The type of content, which can be either 'imagen', 'video', or 'text'.
     * @type {'imagen' | 'video' | 'text'}
     */
    type: TYPE_CONTENT;

    /**
     * The theme associated with the content item.
     * @type {string}
     */
    theme: string;

    /**
     * The creator of the content item.
     * @type {string}
     */
    creator: ObjectId;

    /**
     * The URL of the content item, applicable only for images or videos.
     * @type {string}
     * @optional
     */
    url?: string; // only image or video

    /**
     * The text content, applicable only for documents.
     * @type {string}
     * @optional
     */
    text?: string; // only document
}