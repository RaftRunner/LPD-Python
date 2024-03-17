const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progress-text");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progress-bar-full");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What does print do?",
        choice1: "It prints a specific message(s), or another standard output device.",
        choice2: "It prints a piece of code to the web.",
        choice3: "It prints a piece of paper somewhere... ",
        choice4: "It erases your code so you can restart.",      
        answer: 1,
    },
    {
        question: "Where can you create a Python program?",
        choice1: "Microsoft Word",
        choice2: "In an IDE",
        choice3: "Sticky Notes",
        choice4: "On a piece of paper",      
        answer: 2,
    },
    {
        question: "Which is the correct way to use the print function?",
        choice1: "PRINT('Hello World')",
        choice2: "Print('Hello World')",
        choice3: "print('Hello World')",
        choice4: "prints('Hello World')",      
        answer: 3,
    },
    {
        question: "How many objects can we print in one function?",
        choice1: "You can't print objects",
        choice2: "1",
        choice3: "3",
        choice4: "As many as you want",      
        answer: 4,
    },
    {
        question: "What is the correct extension for a Python file?",
        choice1: ".Py",
        choice2: ".python",
        choice3: ".py",
        choice4: ".Python",      
        answer: 3,
    },
    {
        question: "Which of the following is incorrect?",
        choice1: "print('Hello', 'World', my name is Bob)",
        choice2: "print('Hello World', 'my name is Bob')", 
        choice3: "print('Hello', 'World', 'my name is Bob')",
        choice4: "print('Hello World my name is Bob')",      
        answer: 1,
    },
    {
        question: "What are comments not for?",
        choice1: "Providing information about our code",
        choice2: "Executing code for the program", 
        choice3: "Preventing some code from being executed",
        choice4: "Making code easier to understand",      
        answer: 2,
    },
    {
        question: "Which symbol is for comments?",
        choice1: "@",
        choice2: "&", 
        choice3: "£",
        choice4: "#",      
        answer: 4,
    },
    {
        question: "What is used for multi line comments?",
        choice1: "!!!",
        choice2: "+++", 
        choice3: "'''",
        choice4: "***",      
        answer: 3,
    },
    {
        question: "Can you print things other than Strings?",
        choice1: "No",
        choice2: "Yes", 
        choice3: "Only if they are formatted like a String",
        choice4: "Only Integers",      
        answer: 2,
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score)
        return window.location.assign("end.html")
    }

    questionCounter++ 
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) {
            return
        }

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

        if(classToApply === "correct"){
            incrementScore(SCORE_POINTS)
        } 
        
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()