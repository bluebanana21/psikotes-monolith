import db from "../config/database.conf.ts";
import { type Survey } from "../interfaces/survey.interface.ts";
import multer from "multer";
import upload from "../config/upload.conf.ts";
import { isSet } from "util/types";

// Kolo mo upload image nanti namanya harus diganti dari sisi frontend
// terus tambahin input hidden make nama image yang udah ke ganti.
//
// Kolo make api tester kaya postman atau curl gakbisa, Harus make frontend

export class surveyController {
  static async createSurvey(req: any, res: any) {
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

          try {
            const survey: Survey = req.body;
            const sectionQuery = `insert into sections (surveyId) values (?);`;

            survey.sections.forEach(async (section) => {
              db.query(
                sectionQuery,
                [surveyInsertId],
                (err: any, results: any) => {
                  if (err) {
                    throw err;
                  }
                  const resultsInsertId = results.insertId;

                  section.questions.forEach(async (question) => {
                    const questionQuery = `
            insert into questions (questionText, questionType, imagePath, sectionId) 
          values (?, ?, ?, ?)`;

                    if (isSet(question.image)) {
                      db.query(
                        questionQuery,
                        [
                          question.question_text,
                          question.question_type,
                          question.image,
                          resultsInsertId,
                        ],
                        (err: any, results: any) => {
                          if (err) {
                            throw err;
                          }

                          const questionInsertId = results.insertId;

                          if (question.question_type === "choice") {
                            question.choices?.forEach(async (choice) => {
                              const choiceQuery = `insert into questionchoices (choiceText, status, questionId, imagePath) 
                          values (?, ?, ?, ?)`;

                              if (isSet(choice.image)) {
                                db.query(choiceQuery, [
                                  choice.answer_choice,
                                  choice.status,
                                  questionInsertId,
                                  choice.image,
                                ]);
                              } else {
                                db.query(choiceQuery, [
                                  choice.answer_choice,
                                  choice.status,
                                  questionInsertId,
                                  null,
                                ]);
                              }
                            });
                          }
                        }
                      );
                    } else {
                      db.query(
                        questionQuery,
                        [
                          question.question_text,
                          question.question_type,
                          null,
                          resultsInsertId,
                        ],
                        (err: any, results: any) => {
                          if (err) {
                            throw err;
                          }

                          const questionInsertId = results.insertId;

                          if (question.question_type === "choice") {
                            question.choices?.forEach(async (choice) => {
                              const choiceQuery = `insert into questionchoices (choiceText, status, questionId, imagePath) 
                          values (?, ?, ?, ?)`;

                              if (isSet(choice.image)) {
                                db.query(choiceQuery, [
                                  choice.answer_choice,
                                  choice.status,
                                  questionInsertId,
                                  choice.image,
                                ]);
                              } else {
                                db.query(choiceQuery, [
                                  choice.answer_choice,
                                  choice.status,
                                  questionInsertId,
                                  null,
                                ]);
                              }
                            });
                          }
                        }
                      );
                    }

                    const imagePath =
                      (question.image?.toLowerCase(), Date.now());

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

                        if (question.question_type === "choice") {
                          question.choices?.forEach(async (choice) => {
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
          res.status(201).send(JSON.stringify("successfully created surveys"));
        }
      );
    } catch (error) {
      res.status(500).send("error creating survey");
    }
  }

  static async getSurvey(req: any, res: any) {
    try {
      const surveyId = req.params.surveyId;

      // Get survey basic info
      const surveyQuery = `SELECT * FROM surveys WHERE id = ?`;

      // Promisify database queries for easier async handling
      const queryAsync = (query: string, params: any[]) => {
        return new Promise((resolve, reject) => {
          db.query(query, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
      };

      const surveyResults: any = await queryAsync(surveyQuery, [surveyId]);

      if (!surveyResults || surveyResults.length === 0) {
        return res.status(404).json({ error: "Survey not found" });
      }

      const survey = surveyResults[0];

      const sectionQuery = `SELECT * FROM sections WHERE surveyId = ?`;
      const sectionResults: any = await queryAsync(sectionQuery, [surveyId]);

      const sectionsWithQuestions = await Promise.all(
        sectionResults.map(async (section: any) => {
          const questionQuery = `SELECT * FROM questions WHERE sectionId = ?`;
          const questionResults: any = await queryAsync(questionQuery, [
            section.id,
          ]);

          const questionsWithChoices = await Promise.all(
            questionResults.map(async (question: any) => {
              let questionData = {
                id: question.id,
                question_text: question.questionText,
                question_type: question.questionType,
                image: question.imagePath,
                choices: [] as any[],
              };

              if (question.questionType === "choice") {
                const choiceQuery = `SELECT * FROM questionChoices WHERE questionId = ?`;
                const choiceResults: any = await queryAsync(choiceQuery, [
                  question.id,
                ]);

                questionData.choices = choiceResults.map((choice: any) => ({
                  id: choice.id,
                  answer_choice: choice.choiceText,
                  status: choice.status,
                  image: choice.imagePath,
                }));
              }

              return questionData;
            })
          );

          return {
            id: section.id,
            surveyId: section.surveyId,
            questions: questionsWithChoices,
          };
        })
      );

      const response = {
        id: survey.id,
        title: survey.title,
        description: survey.description,
        startDate: survey.startDate,
        endDate: survey.endDate,
        sections: sectionsWithQuestions,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching survey:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
