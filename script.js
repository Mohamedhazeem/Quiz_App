const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const questionContainer = document.getElementById("question-container");
const question = document.getElementById("question");
const answerButtons = document.getElementsByClassName("answer-button");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", next);

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setQuestion();
}
function next() {
  currentQuestionIndex++;
  nextButton.classList.add("hide");
  setQuestion();
}

function setQuestion() {
  resetCheckState(document.body);
  question.innerText = shuffledQuestions[currentQuestionIndex].question;
  let length = answerButtons.length;

  for (let i = 0; i < length; i++) {
    resetCheckState(answerButtons[i]);

    delete answerButtons[i].dataset.correct;
    if (i < shuffledQuestions[currentQuestionIndex].answer.length) {
      answerButtons[i].innerText =
        shuffledQuestions[currentQuestionIndex].answer[i].text;
      answerButtons[i].classList.remove("hide");
      let isTrue = shuffledQuestions[currentQuestionIndex].answer[i].correct;

      if (isTrue) {
        answerButtons[i].dataset.correct = isTrue;
      }

      answerButtons[i].addEventListener("click", selectAnswer);
    } else {
      answerButtons[i].classList.add("hide");
    }
  }
}

function selectAnswer(element) {
  let button = element.target;
  setStatus(document.body, button.dataset.correct);
  Array.from(answerButtons).forEach((button) => {
    setStatus(button, button.dataset.correct);
  });

  if (currentQuestionIndex + 1 >= shuffledQuestions.length) {
    console.log(currentQuestionIndex);
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    nextButton.classList.add("hide");
  } else {
    nextButton.classList.remove("hide");
  }
}
function setStatus(element, correct) {
  resetCheckState(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function resetCheckState(element) {
  element.classList.remove("wrong");
  element.classList.remove("correct");
}
const questions = [
  {
    question: "what is 2 + 2?",
    answer: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Who is the best Messenger of Allah?",
    answer: [
      { text: "Ahamed S.A.W", correct: true },
      { text: "Mohammed S.A.W", correct: true },
      { text: "Ibrahim S.A.W", correct: true },
      { text: "Isha S.A.W", correct: true },
    ],
  },
  {
    question: "Do you like Life?",
    answer: [
      { text: "Yes", correct: true },
      { text: "No", correct: false },
      { text: "I don't know", correct: false },
    ],
  },
  {
    question: "What is 4 * 2?",
    answer: [
      { text: "6", correct: false },
      { text: "8", correct: true },
    ],
  },
];
