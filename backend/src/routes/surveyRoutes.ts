import { Router } from "express";
import { surveyController } from "../controllers/survey.controllers.ts";
import upload from "../config/upload.conf.ts";

const surveyRouter = Router();

surveyRouter.post("/create-survey", upload.any, surveyController.createSurvey);
surveyRouter.get('/get-survey/:surveyId', surveyController.getSurvey);

export default surveyRouter;