import { Router } from "express";
import db from "../config/database.conf.ts";
import { type Survey } from "../interfaces/survey.interface.ts";

const surveyRouter = Router();

//for creation of survey
surveyRouter.post("/create-survey", async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  try {
    const surveyQuery = `insert into surveys (title, description, startDate, endDate) values (?, ?, ?, ?)`;
    db.query(
      surveyQuery,
      [title, description, startDate, endDate],
      (err: any, results: any) => {
        if (err) {
          throw err;
        }
        console.log(results.insertId);
        const surveyInsertId = results.insertId;

        res.status(201).send(`survey created succesfully, results:`);

        try {
          const survey: Survey = req.body;
          const sectionQuery = `insert into sections (surveyId) values (?);`;

          survey.sections.forEach((section) => {
            db.query(
              sectionQuery,
              [surveyInsertId],
              (err: any, results: any) => {
                if (err) {
                  throw err;
                }
                const resultsInsertId = results.insertId;

                console.log(section);

                section.questions.forEach((question) => {
                  const questionQuery = `
            insert into questions (questionText, questionType, imagePath, sectionId) 
          values (?, ?, ?, ?)`;

                  const imagePath = (question.image?.toLowerCase(), Date.now())
                    .toString;

                  db.query(
                    questionQuery,
                    [
                      question.question_text,
                      question.question_type,
                      imagePath,
                      resultsInsertId,
                    ],
                    (err: any, results: any) => {
                      if (err) {
                        throw err;
                      }

                      const questionInsertId = results.insertId;

                      if (question.question_type === 'choice') {
                        question.choices?.forEach((choice) => {
                          const choiceQuery = `insert into questionchoices (choiceText, status, questionId, imagePath) 
                  values (?, ?, ?, ?)`;

                          const imagePath = (choice.image?.toLowerCase,
                          Date.now).toString;
                          db.query(choiceQuery, [
                            choice.answer_choice,
                            choice.status,
                            questionInsertId,
                            imagePath,
                          ]);
                        });
                      } else {
                        console.log("idk");
                      }
                    }
                  );
                });
              }
            );
          });
        } catch (error) {
          res.status(500).send(`error sending questions ${error}`);
        }
      }
    );
  } catch (error) {
    res.status(500).send("error creating survey");
  }
});

export default surveyRouter;
