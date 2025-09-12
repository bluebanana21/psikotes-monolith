import { isSet } from "util/types";
import db from "../config/database.conf.ts";

export class answerController {
  static async sendAnswers(req: any, res: any) {
    const surveyId = req.params.surveyId;
    const takerId = req.body.takerId;

    try {
      const answerQuery = `insert into answers (takerId, answerText, questionId) values (?, ?, ?)`;
      const choiceAnswerQuery = `insert into answerChoices (takerId, questionChoiceId) values (?, ?)`;

      const answers: any = req.body;

      answers.answers.forEach(async (answer: any) => {
        if (answer.answerText) {
          db.query(
            answerQuery,
            [answer.takerId, answer.answerText, answer.questionId],
            (err: any) => {
              if (err) throw err;
              console.info("inserted into answers for essay question");
            }
          );
        } else {
          db.query(
            choiceAnswerQuery,
            [answer.takerId, answer.questionChoiceId],
            (err: any) => {
              if (err) throw err;
              console.info("inserted into answer for choice");
            }
          );
        }
      });

      const resultQuery = `insert into results (takerId, surveyId, results) values (?, ?, ?)`;

      const response = {
        takerId: takerId,
        surveyId: surveyId,
        results: req.body.answers,
      };

      try {
        db.query(resultQuery, [takerId, surveyId, JSON.stringify(response)], (err, res) => {
          if (err) throw err
        });
        res.status(201).json(response);
      } catch (error) {
        console.error("error sending answers: ", error);
        res.status(500).json("internal server error: ", error);
      }
    } catch (error) {
      console.error("error sending answers: ", error);
      res.status(500).json("internal server error: ", error);
    }
  }
}
