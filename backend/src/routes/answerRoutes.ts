import { Router } from "express";
import { answerController } from "../controllers/answer.controllers.ts";

const answerRouter = Router();

answerRouter.post('/send-answers/:surveyId', answerController.sendAnswers)

export default answerRouter;