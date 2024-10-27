import { Router } from "express";
import { ENDPOINTS } from "../config/endpoints";
import { ContentControllerInstance } from "../controllers/content-controller";
import { authorize } from "../middlewares/valid-permission";

const ContentRouter = Router()

ContentRouter.get(ENDPOINTS.CONTENTS.LIST, authorize, ContentControllerInstance.find)

export default ContentRouter