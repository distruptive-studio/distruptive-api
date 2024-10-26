/**
 * Enum representing the types of content available.
 * 
 * @enum {string}
 * @readonly
 */
export enum TYPE_CONTENT {
    /** Represents an image content type. */
    IMAGEN = 'imagen',

    /** Represents a video content type. */
    VIDEO = 'video',

    /** Represents a text content type. */
    TEXT = 'text'
}

/**
 * Interface representing a category of content.
 * 
 * @interface
 * @extends Document
 */
export interface ICategory extends Document {
    /** The name of the category. */
    name: string;

    /** The type of content associated with the category. */
    type: TYPE_CONTENT;
}