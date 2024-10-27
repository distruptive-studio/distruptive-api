import { IContent } from "../interfaces/IContent";
import { IContentServices, ContentServicesInstance } from "../services/content-serivices";
import GenericController from "./generic-controller";

abstract class IContentController extends GenericController<IContent> { }


class ContentController extends IContentController {
    private static intance: ContentController

    constructor(_services: IContentServices = ContentServicesInstance) {
        super(_services)
    }

    public static getInstance(): ContentController {
        if (!ContentController.intance) {
            ContentController.intance = new ContentController()
        }

        return ContentController.intance
    }
}

export const ContentControllerInstance = ContentController.getInstance()