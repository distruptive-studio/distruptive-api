import { IContent } from "../interfaces/IContent"
import GenericService from "./generic-service"
import ContentModel from '../models/content-model'

export abstract class IContentServices extends GenericService<IContent> { }

class ContentServices extends IContentServices {

    private static instance: ContentServices

    private constructor(_model = ContentModel) {
        super(_model)
    }

    public static getInstance(): ContentServices {
        if (!ContentServices.instance) {
            ContentServices.instance = new ContentServices()
        }
        return ContentServices.instance
    }
}

export const ContentServicesInstance = ContentServices.getInstance()