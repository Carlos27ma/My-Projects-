// Question Class
class Question {
  constructor(text, choices, correctAnswer) {
    this.text = text;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
  }
}

// Main Quiz Class
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  nextQuestion() {
    this.currentQuestionIndex++;
  }

  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  checkAnswer(answer) {
    const currentQuestion = this.getCurrentQuestion();
    if (answer === currentQuestion.correctAnswer) {
      this.score++;
      return true;
    }
    return false;
  }

  displayQuestion() {
    const currentQuestion = this.getCurrentQuestion();
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");

    questionElement.textContent = currentQuestion.text;
    answerButtons.innerHTML = "";

    currentQuestion.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.classList.add("btn");
      button.addEventListener("click", () => this.selectAnswer(choice));
      answerButtons.appendChild(button);
    });
  }

  selectAnswer(selectedAnswer) {
    const isCorrect = this.checkAnswer(selectedAnswer);
    const buttons = document.querySelectorAll("#answer-buttons .btn");

    buttons.forEach((button) => {
      button.disabled = true;
      if (button.textContent === this.getCurrentQuestion().correctAnswer) {
        button.classList.add("correct");
      }
      if (button.textContent === selectedAnswer && !isCorrect) {
        button.classList.add("incorrect");
      }
    });

    document.getElementById("score").textContent = this.score;
    document.getElementById("next-btn").classList.remove("hide");
  }

  showScore() {
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("next-btn").classList.add("hide");
    document.getElementById("score-container").classList.remove("hide");
    document.getElementById("submit-btn").classList.remove("hide");
  }
}

// TimedQuiz Class (extends Quiz)
class TimedQuiz extends Quiz {
  constructor(questions, timeLimit) {
    super(questions);
    this.timeLimit = timeLimit;
    this.timeRemaining = timeLimit;
    this.timer = null;
  }

  startTimer() {
    const timerElement = document.createElement("div");
    timerElement.id = "timer";
    timerElement.style.cssText =
      "font-size: 1.2rem; font-weight: bold; color: #e74c3c; margin-bottom: 15px;";
    document
      .querySelector(".quiz-container")
      .insertBefore(
        timerElement,
        document.getElementById("question-container")
      );

    timerElement.textContent = `Time: ${this.timeRemaining}s`;

    this.timer = setInterval(() => {
      this.timeRemaining--;
      timerElement.textContent = `Time: ${this.timeRemaining}s`;

      if (this.timeRemaining <= 0) {
        this.endQuiz();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  endQuiz() {
    this.stopTimer();
    this.currentQuestionIndex = this.questions.length;
    this.showScore();
  }
}

// Quiz Controller
class QuizController {
  constructor(quizType = "regular", timeLimit = 60) {
    const questions = [
      new Question(
        "What is JavaScript?",
        [
          "A markup language",
          "A programming language",
          "A styling language",
          "A database",
        ],
        "A programming language"
      ),
      new Question(
        "Which keyword declares a variable in ES6?",
        ["var", "let", "both let and var", "const"],
        "both let and var"
      ),
      new Question(
        "What does DOM stand for?",
        [
          "Document Object Model",
          "Data Object Model",
          "Display Object Management",
          "Digital Orientation Module",
        ],
        "Document Object Model"
      ),
    ];

    this.quiz =
      quizType === "timed"
        ? new TimedQuiz(questions, timeLimit)
        : new Quiz(questions);

    this.setupUI();
  }

  setupUI() {
    this.startButton = document.getElementById("start-btn");
    this.nextButton = document.getElementById("next-btn");
    this.submitButton = document.getElementById("submit-btn");

    this.startButton.addEventListener("click", () => this.startQuiz());
    this.nextButton.addEventListener("click", () => this.nextQuestion());
    this.submitButton.addEventListener("click", () => this.submitQuiz());
  }

  startQuiz() {
    this.startButton.classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    document.getElementById("score-container").classList.remove("hide");

    if (this.quiz instanceof TimedQuiz) {
      this.quiz.startTimer();
    }

    this.quiz.displayQuestion();
  }

  nextQuestion() {
    this.quiz.nextQuestion();
    this.nextButton.classList.add("hide");

    if (this.quiz.hasEnded()) {
      if (this.quiz instanceof TimedQuiz) {
        this.quiz.stopTimer();
      }
      this.quiz.showScore();
    } else {
      this.quiz.displayQuestion();
    }
  }

  submitQuiz() {
    alert(
      `Quiz submitted! Your score: ${this.quiz.score}/${this.quiz.questions.length}`
    );
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // For regular quiz:
  new QuizController("regular");

  // For timed quiz (uncomment to use):
  // new QuizController('timed', 60); // 60 seconds
});
