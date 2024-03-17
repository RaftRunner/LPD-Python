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
        question: "What is a data type?",
        choice1: "Data types define the data that a variable will contain and actions it can perform.",
        choice2: "Data types are for typing data.",
        choice3: "Data types define how to add variables. ",
        choice4: "Data types are for analysing the variable and what it can do.",      
        answer: 1,
    },
    {
        question: "Which of these isn't a data type?",
        choice1: "String",
        choice2: "Float",
        choice3: "Text",
        choice4: "Integer",      
        answer: 3,
    },
    {
        question: "Which of the following isn't a data type?",
        choice1: "Sets.",
        choice2: "Maps.",
        choice3: "Compass'.",
        choice4: "Sequences.",      
        answer: 3,
    },
    {
        question: "How would you check the data type of 'x = 3'?",
        choice1: "Print(type(x))",
        choice2: "print(typeOf(x))",
        choice3: "Print(typeOf(x))",
        choice4: "print(type(x))",      
        answer: 4,
    },
    {
        question: "What do sequences do?",
        choice1: "They count numbers",
        choice2: "They store multiple items at a time",
        choice3: "They order a list of words",
        choice4: "They analyse variables",      
        answer: 2,
    },
    {
        question: "Which of the following is correct?",
        choice1: "A set is a collection which is unordered, unchangeable, and unindexed.",
        choice2: "A set is a collection which is ordered, changeable, and unindexed.", 
        choice3: "A set is a collection which is ordered, unchangeable, and indexed.",
        choice4: "A set is a collection which is unordered, changeable, and unindexed.",      
        answer: 1,
    },
    {
        question: "Which of the following do Sequences Types not include?",
        choice1: "Integers",
        choice2: "List", 
        choice3: "Tuple",
        choice4: "Ranges",      
        answer: 1,
    },
    {
        question: "What brackets would a set use?",
        choice1: "[]",
        choice2: "()", 
        choice3: "{}",
        choice4: "<>",      
        answer: 3,
    },
    {
        question: "Which is correct about the data type 'dict'?",
        choice1: "It has a key, and a value, then maps them together so they're related",
        choice2: "It stores words for us to check", 
        choice3: "It is a help guide we reference",
        choice4: "It locks a variable",      
        answer: 1,
    },
    {
        question: "What is the type of x = ['Dog', 'Cat', 'Mouse']?",
        choice1: "< class 'animals' >",
        choice2: "< class 'list' >", 
        choice3: "< class 'dict' >",
        choice4: "< class 'tuple' >",      
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