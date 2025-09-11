import db from "../config/database.conf.ts";

const dropTables = `
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS users, surveys, sections, questions, questionChoices, answers, answerChoices, results, reviews; 
SET FOREIGN_KEY_CHECKS = 1;
`;

db.query(dropTables, function (err: any) {
  if (err) throw err;
  console.info("All Tables deleted");
});

export default dropTables;
