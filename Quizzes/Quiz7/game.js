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
        question: "What is a function?",
        choice1: "A block of code that is activated when called.",
        choice2: "A mathematical coding method.",
        choice3: "A way of looping.",
        choice4: "A way of reviewing code.",      
        answer: 1,
    },
    {
        question: "Which of the following is used to define a function?",
        choice1: "Def.",
        choice2: "def.",
        choice3: "Define.",
        choice4: "define.",      
        answer: 2,
    },
    {
        question: "What is a 'break' statement used for?",
        choice1: "Breaking a program.",
        choice2: "Breaking all code typed until that point.",
        choice3: "Stopping the loop even if the while condition is true.",
        choice4: "Stopping anymore code being typed after it.",      
        answer: 3,
    },
    {
        question: "How do we call a function?",
        choice1: "We use the print function.",
        choice2: "We type the name of the function with [] at the end.",
        choice3: "We type the name of the function with {} at the end.",
        choice4: "We type the name of the function with () at the end.",      
        answer: 4,
    },
    {
        question: "What does calling a function mean? ",
        choice1: "It means we execute the code.",
        choice2: "It means we delete the code.",
        choice3: "It means we are pausing the code.",
        choice4: "It means we are restarting the code.",      
        answer: 1,
    },
    {
        question: "What are arguments?",
        choice1: "Pieces of the code not working together.",
        choice2: "A way of stopping code from working.", 
        choice3: "A way of adding information to the function.",
        choice4: "Functions that won't work together.",      
        answer: 3,
    },
    {
        question: "How many arguments can we have for a function?",
        choice1: "0.",
        choice2: "1.", 
        choice3: "2.",
        choice4: "As many as we want.",      
        answer: 4,
    },
    {
        question: "Are functions called with the same number of arguments?", 
        choice1: "Depends on situation.",
        choice2: "Only 1.", 
        choice3: "Yes.",
        choice4: "No.",      
        answer: 3,
    },
    {
        question: "What is an arbitrary argument for?",
        choice1: "For random arguments.",
        choice2: "For random loops.", 
        choice3: "For when we know how many arguments we are using.",
        choice4: "For when we don't know how many arguments we're using.",      
        answer: 4,
    },
    {
        question: "Which of the following is false about keyword arguments?",
        choice1: "You can use arguments with the key = value syntax.",
        choice2: "We can only have 3.", 
        choice3: "We can have as many as we want.",
        choice4: "Order doesn't matter.",      
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