const express = require("express");
const cors = require("cors");
const questionStore = require("./data");
const app = express();

const port = 4000;

app.use(express.json());
app.use(cors());

const difficulty = ["Easy", "Medium", "Hard"];

app.get("/", (req, res) => {
  console.log(req.query);
  const totalMarks = req.query.totalMarks;
  const easyQuestion = req.query.easyPer;
  const mediumQuestion = req.query.mediumPer;
  const hardQuestion = req.query.hardPer;

  var cntEasy = parseInt(totalMarks * easyQuestion);
  var cntMedium = parseInt((totalMarks * mediumQuestion) / 2);
  var cntHard = parseInt((totalMarks * hardQuestion) / 5);
  let remMarks = totalMarks - (cntEasy + cntMedium * 2 + cntHard * 5);

  var questionList = [];
  difficulty.forEach((level) => {
    const availQuestions = questionStore.filter(
      (question) => question.difficulty === level
    );
    if (level === "Easy") {
      while (cntEasy > 0 && availQuestions.length > 0) {
        const selectedQuestion =
          availQuestions[Math.floor(Math.random() * availQuestions.length)];
        const isQuestionPresent = questionList.some(
          (item) => JSON.stringify(item) === JSON.stringify(selectedQuestion)
        );

        if (!isQuestionPresent) {
          questionList.push(selectedQuestion);
          cntEasy -= 1;
        }
      }
    } else if (level === "Medium") {
      while (cntMedium > 0 && availQuestions.length > 0) {
        const selectedQuestion =
          availQuestions[Math.floor(Math.random() * availQuestions.length)];
        const isQuestionPresent = questionList.some(
          (item) => JSON.stringify(item) === JSON.stringify(selectedQuestion)
        );
        if (!isQuestionPresent) {
          questionList.push(selectedQuestion);
          cntMedium -= 1;
        }
      }
    } else if (level === "Hard") {
      while (cntHard > 0 && availQuestions.length > 0) {
        const selectedQuestion =
          availQuestions[Math.floor(Math.random() * availQuestions.length)];
        const isQuestionPresent = questionList.some(
          (item) => JSON.stringify(item) === JSON.stringify(selectedQuestion)
        );
        if (!isQuestionPresent) {
          questionList.push(selectedQuestion);
          cntHard -= 1;
        }
      }
    }
  });
  if (remMarks > 0) {
    while (remMarks > 0) {
      const selectedQuestion =
        questionStore[Math.floor(Math.random() * questionStore.length)];
      if (remMarks >= selectedQuestion.marks) {
        const isQuestionPresent = questionList.some(
          (item) => JSON.stringify(item) === JSON.stringify(selectedQuestion)
        );
        if (!isQuestionPresent) {
          questionList.push(selectedQuestion);
          remMarks -= selectedQuestion.marks;
        }
      }
    }
  }
  return res.send({ status: 200, questionList: questionList });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
