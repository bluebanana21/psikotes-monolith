import { Router } from "express";
import { surveyController } from "../controllers/survey.controllers.ts";

const surveyRouter = Router();

surveyRouter.post("/create-survey", surveyController.createSurvey);
surveyRouter.get('/get-survey/:surveyId', surveyController.getSurvey);

export default surveyRouter;