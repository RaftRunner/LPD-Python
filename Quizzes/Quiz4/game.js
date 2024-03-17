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
        question: "What are operators used for?",
        choice1: "Operators are used to perform operations on variables and values.",
        choice2: "Operators are used for fixing code.",
        choice3: "Operators are used for commenting values. ",
        choice4: "Operators are used for determining a boolean.",      
        answer: 1,
    },
    {
        question: "Which of these isn't an operator type?",
        choice1: "Logic",
        choice2: "Arithmetic",
        choice3: "Comparison",
        choice4: "Space",      
        answer: 4,
    },
    {
        question: "What does print(4 * 4) display?",
        choice1: "0.",
        choice2: "4.",
        choice3: "8'.",
        choice4: "16.",      
        answer: 4,
    },
    {
        question: "What is '==' used for?",
        choice1: "Making something equal something else",
        choice2: "Comparing",
        choice3: "Reducing",
        choice4: "Updating a value",      
        answer: 2,
    },
    {
        question: "What does \n '''x = 3 \n y = 2 \n print(x != y)'''\n display? ",
        choice1: "5",
        choice2: "False",
        choice3: "True",
        choice4: "1",      
        answer: 3,
    },
    {
        question: "What does \n ''' x = 12 \n y = 7 \n print(x > y) '''\n display?",
        choice1: "12.",
        choice2: "7.", 
        choice3: "True.",
        choice4: "False.",      
        answer: 3,
    },
    {
        question: "What does \n ''' x = 10 \n y = 10 \n print(x <= y) '''\n display?",
        choice1: "0",
        choice2: "True", 
        choice3: "False",
        choice4: "20",      
        answer: 2,
    },
    {
        question: "What does \n ''' x = 50 \n y = 10 \n print(x / y) '''\n display?",
        choice1: "40",
        choice2: "60", 
        choice3: "500",
        choice4: "5",      
        answer: 4,
    },
    {
        question: "What does print(4 - 12) display?",
        choice1: "Cannot print negative numbers",
        choice2: "-8", 
        choice3: "-6",
        choice4: "16",      
        answer: 2,
    },
    {
        question: "What does \n ''' x = 50 \n print((x > 30) and (x <= 70))'''\n display?",
        choice1: "50",
        choice2: "True", 
        choice3: "False",
        choice4: "Error",      
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