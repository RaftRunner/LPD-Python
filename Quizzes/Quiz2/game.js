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
        question: "What is a variable?",
        choice1: "A variable is a container for storing a value of data.",
        choice2: "A variable is used for naming a comment.",
        choice3: "A variable is something we cannot predict. ",
        choice4: "A variable is a container for deleting a value of data.",      
        answer: 1,
    },
    {
        question: "What is a String used for?",
        choice1: "Measuring",
        choice2: "Counting",
        choice3: "Text",
        choice4: "Numbers",      
        answer: 3,
    },
    {
        question: "What is a float?",
        choice1: "A decimal number.",
        choice2: "A coding technique.",
        choice3: "A way of exiting the program.",
        choice4: "An integer.",      
        answer: 1,
    },
    {
        question: "How do we create a variable?",
        choice1: "We create a comment",
        choice2: "We write text by itself",
        choice3: "We assign something a value",
        choice4: "By printing",      
        answer: 3,
    },
    {
        question: "Which of the following is an illegal variable name?",
        choice1: "myname = ('Ricky')",
        choice2: "my_name = ('Ricky')",
        choice3: "MYNAME = ('Ricky')",
        choice4: "My Name = ('Ricky')",      
        answer: 4,
    },
    {
        question: "Which of the following is a legal variable name?",
        choice1: "1myname  = ('Ricky')",
        choice2: "my name = ('Ricky')", 
        choice3: "my-name = ('Ricky')",
        choice4: "my_name = ('Ricky')",      
        answer: 4,
    },
    {
        question: "Which of these is not the name of a technique?",
        choice1: "Camel Case",
        choice2: "Snake Case", 
        choice3: "Horse Case",
        choice4: "Pascal Case",      
        answer: 3,
    },
    {
        question: "How don't we use variables?",
        choice1: "To store information",
        choice2: "For referencing and using in a program", 
        choice3: "Labelling data with useful names, so programs can be better understood",
        choice4: "For commenting",      
        answer: 4,
    },
    {
        question: "How many variables can share the same value?",
        choice1: "None",
        choice2: "1", 
        choice3: "3",
        choice4: "As many as we want",      
        answer: 4,
    },
    {
        question: "How do we output a variable?",
        choice1: "Using the print function",
        choice2: "By retyping it after we first create it", 
        choice3: "By commenting it straight after",
        choice4: "Using a string to recreate it",      
        answer: 1,
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