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
        question: "What does the 'if' statement do?",
        choice1: "Executes a block of code if a specified condition is false.",
        choice2: "Executes a block of code if a specified condition is true.",
        choice3: "Executes a block of code if a specified condition is partially true",
        choice4: "Executes a block of code if a specified condition is partially false.",      
        answer: 2,
    },
    {
        question: "What does the 'elif' statement do?",
        choice1: "Executes a different condition if previous conditions were false.",
        choice2: "Executes a different condition if previous conditions were true.",
        choice3: "Executes a different condition if previous conditions were partially false.",
        choice4: "Executes a different condition if previous conditions were partially true.",      
        answer: 1,
    },
    {
        question: "When will the 'else' statement be used?",
        choice1: "If the condition is false, another block of code can be executed.",
        choice2: "If the condition is true, another block of code can be executed.",
        choice3: "If the condition before is true, another block of code can be executed.",
        choice4: "If all of the previous conditions are true.",      
        answer: 1,
    },
    {
        question: "Do we have to use logical conditions in 'if' statements?",
        choice1: "Yes",
        choice2: "No",
        choice3: "Never used",
        choice4: "Always used",      
        answer: 2,
    },
    {
        question: "Do we need to indent the next line after an 'if' statement? ",
        choice1: "No",
        choice2: "Depends on situtation",
        choice3: "Yes",
        choice4: "Never",      
        answer: 3,
    },
    {
        question: "Can we use an 'if' statement inside another?",
        choice1: "Yes.",
        choice2: "No.", 
        choice3: "Depends on situation.",
        choice4: "Never.",      
        answer: 1,
    },
    {
        question: "What does \n ''' x = 10 \n y = 10 \n if y > x: \n print('y is bigger') \n else: \n print('They are the same') '''\n display?",
        choice1: "Neither.",
        choice2: "Both.", 
        choice3: "y is bigger.",
        choice4: "They are the same.",      
        answer: 4,
    },
    {
        question: "What does \n ''' x = 33 \n y = 25 \n if y <= x: \n print('x is bigger') \n else: \n print('y is bigger') '''\n display?",
        choice1: "Neither.",
        choice2: "Both", 
        choice3: "x is bigger.",
        choice4: "y is bigger.",      
        answer: 3,
    },
    {
        question: "What does \n ''' x = 150 \n y = 100 \n if x != y: \n print('x is bigger') \n elif x == y: \n print('They are the same') '''\n display?",
        choice1: "They are the same.",
        choice2: "x is bigger.", 
        choice3: "Neither.",
        choice4: "Both.",      
        answer: 2,
    },
    {
        question: "What does \n ''' x = 50 \n y = 75 \n if x != y \n print('They are not the same') \n elif x == y: \n print('They are the same') \n else: \n print('No idea') '''\n display?",
        choice1: "They are not the same",
        choice2: "They are the same", 
        choice3: "No idea",
        choice4: "Error",      
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