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
        question: "What are loops?",
        choice1: "Looping means repeating something until a particular condition is satisfied.",
        choice2: "Looping is tying a piece of code to another.",
        choice3: "Looping means stopping something until a particular condition is satisfied.",
        choice4: "Looping is untying a piece of code from another.",      
        answer: 1,
    },
    {
        question: "What are 'for loops' used for?",
        choice1: "Used for ending a program.",
        choice2: "Used for iterating through a sequence.",
        choice3: "Used for tying a piece of code to another.",
        choice4: "Used for looping through a comment.",      
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
        question: "What is a 'continue' statement used for?",
        choice1: "Continuing the current iteration, and future ones.",
        choice2: "Stopping the current iteration, and future ones.",
        choice3: "Continuing the current iteration, and stopping with the next.",
        choice4: "Stopping the current iteration, and continuing with the next.",      
        answer: 4,
    },
    {
        question: "What is the range() function used for? ",
        choice1: "To loop through a set of code a specified number of times.",
        choice2: "To check the length of a loop.",
        choice3: "To determine the length of a program.",
        choice4: "To calculate things.",      
        answer: 1,
    },
    {
        question: "How many parameters can range() have?",
        choice1: "0",
        choice2: "1", 
        choice3: "2",
        choice4: "3",      
        answer: 4,
    },
    {
        question: "Can we use continue and break in for loops?",
        choice1: "Yes.",
        choice2: "No.", 
        choice3: "Only continue.",
        choice4: "Only break.",      
        answer: 1,
    },
    {
        question: "Can we use continue and break in while loops?",
        choice1: "Only continue.",
        choice2: "Only break.", 
        choice3: "Yes.",
        choice4: "No.",      
        answer: 3,
    },
    {
        question: "Can we use the 'else' statement in loops?",
        choice1: "No.",
        choice2: "Depends on the situation.", 
        choice3: "If certain conditions are met.",
        choice4: "Yes.",      
        answer: 4,
    },
    {
        question: "What will \n x = 1 \n while x < 11: \n print(x) \n x += 1",
        choice1: "Numbers 0 to 10",
        choice2: "Numbers 1 to 10", 
        choice3: "Numbers 0 to 10",
        choice4: "Numbers 1 to 10",      
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