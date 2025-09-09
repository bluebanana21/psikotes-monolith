import db from "../config/database.conf.ts";

const initializeTables = `
create table if not exists users (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255),
    email varchar(255) UNIQUE,
    password varchar(255),
    DoB date,
    PoB varchar(255),
    gender ENUM('Laki-laki','Perempuan')
);

create table if not exists surveys (
    id int PRIMARY KEY AUTO_INCREMENT,
    title varchar(255),
    description varchar(255),
    startDate date,
    endDate date
);

create table if not exists sections(
    id int PRIMARY KEY AUTO_INCREMENT,
    surveyId int,
    CONSTRAINT FK_sectionSurvey FOREIGN KEY (surveyId) REFERENCES surveys(id)
);

create table if not exists questions(
    id int PRIMARY KEY AUTO_INCREMENT,
    questionText varchar(255),
    questionType ENUM('choice', 'essay', 'scale'),
    sectionId int,
    imagePath LONGTEXT,
    CONSTRAINT FK_questionSection FOREIGN KEY (sectionId) REFERENCES sections(id)    
);

create table if not exists questionChoices(
    id int PRIMARY KEY AUTO_INCREMENT,
    choiceText varchar(255),
    questionId int,
    status boolean, 
    imagePath LONGTEXT,
    CONSTRAINT FK_questionChoiceQuestion FOREIGN KEY (questionId) REFERENCES questions(id)
);

create table if not exists answer(
    id int PRIMARY KEY AUTO_INCREMENT,
    takerId int,
    answerText varchar(255),
    questionId int,
    CONSTRAINT FK_answerUser FOREIGN KEY (takerId) REFERENCES users(id),
    CONSTRAINT FK_answerQuestions FOREIGN KEY (questionId) REFERENCES questions(id)

);

create table if not exists answerChoices(
    id int PRIMARY KEY AUTO_INCREMENT,
    takerId int,
    questionChoiceId int,
    CONSTRAINT FK_ACQC FOREIGN KEY (questionChoiceId) REFERENCES questionChoices(id)
);

create table if not exists results(
    id int PRIMARY KEY AUTO_INCREMENT,
    takerId int,
    surveyId int,
    results longtext,
    CONSTRAINT FK_resultsUser FOREIGN KEY (takerId) REFERENCES users(id),
    CONSTRAINT FK_resultsSurvey FOREIGN KEY (surveyId) REFERENCES surveys(id)
);

create table if not exists review(
    id int PRIMARY KEY AUTO_INCREMENT,
    resultId int,
    keterangan ENUM('disarankan', 'dipertimbangkan', 'tidak disarankan'),
    score int,
    CONSTRAINT FK_reviewResult FOREIGN KEY (resultId) REFERENCES results(id)
);

`;

db.query(initializeTables, function (err: any, result: any) {
  if (err) throw err;
  console.log("Table created");
});

export default initializeTables;
