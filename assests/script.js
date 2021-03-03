


//WHEN the game is over,THEN I can save my initials and my score
// create variables for target classes n ids
// create variable for questions
var startbtn = document.querySelector("#start-btn");
var time = document.querySelector("#time");
var timeleft = 100;
var startprompt = document.querySelector(".start-prompt");
var endprompt = document.querySelector(".end-prompt");
var container = document.querySelector(".container");
var questions = [
    {question: "what is a div?",
    correctAnswer:"an html tag element",
    options: ["a css tag element","a javascript element","an html tag element"]
    },
    {
        question: "is the sky blue?",
        correctAnswer: "True",
        options: ["True","False"]
    },
    {
        question: "is the sea red?",
        correctAnswer: "False",
        options: ["True","False"]
    },
    {question:"how do you style the class header?",
    correctAnswer:".header",
    options:["#header", ".header"]
    }
]
const questionElement = document.getElementById("question")

 var currentQuestionIndex = 0;
 var score = 0;

//WHEN I click the start button, 
startbtn.addEventListener("click", startgame)
//THEN a timer starts 
//make function to start game; hide start prompt, show container
function startgame(){
        startprompt.classList.add("hide");
        container.classList.add("start-prompt");
        container.classList.remove("container");
      
      //make  a timer that counts down every second.  
    
        var timerInterval = setInterval(function() {
            timeleft--;
            time.textContent = timeleft + " second(s) left";
            }
        
         , 1000) ;
         //use a function to pull up next question
         setNextquestion()
} 
// create button for options
document.createElement("button");
//and I am presented with a question

////WHEN I answer a question, THEN I am presented with another question,
// make function to pul up next question
function setNextquestion(){
    //make a variable that changes questions depending on index value
 var currentQuestion = questions[currentQuestionIndex];
 //fill question elemeent with current question
 questionElement.innerText= currentQuestion.question;
 var answerbuttons = document.querySelector("#answer-buttons")
 answerbuttons.innerHTML= ''
 // for when index equals 0 or the length of the options of the current question, add 1 to index
 for(i=0;i<currentQuestion.options.length;i++){
     //create variable for the choices equaling the current question options index
     var choice = currentQuestion.options[i];
     // create variable for the choice buttons
     var choiceBtn = document.createElement("button");
        // choice button is equal to choice
     choiceBtn.setAttribute("value", choice);
     // want inner text of choice button to be the choice variables
     choiceBtn.innerText= choice;
     //make a variable for the answer buttons using answer-buttons id
     
     // pull together answer buttons and choice buttons
     answerbuttons.appendChild(choiceBtn);
    //when a chioce button is clicked , fire function answerClick
     choiceBtn.addEventListener("click", answerClick);
 }
}

//if its last question or timer 0, then call function endQuiz, otherwise call setNextquestion
//create function answerClick for when an answer gets clicked.
function answerClick(evt) {
    //when the answer is correct, add points.
    //if the value of the answer clicked is equal to the correct answer of current index of question
    if(evt.target.value === questions[currentQuestionIndex].correctAnswer){
        //add 10 to time/score
    // += means time = time + 10
        console.log("CORRECT!");
        timeleft += 10
        //if value of answer is not equal to correct answer of current index of question
    } else {
         // when answer is wrong, subtract time.
        //THEN time is subtracted from the clock,
        //then subtract 5 to score/time
        console.log("WRONG!")
        timeleft -= 5
        //when the timer reaches 0, THEN the game is over
        if (timeleft < 0) {
            endQuiz();
        
        }
    }

    // this adds 1 to the index to move through the questions
    currentQuestionIndex++;
     // if the question index === questions.length, then that's the last question, end the quiz
    // WHEN all questions are answered; current question index equals length of questions array meaning the last question
    if(currentQuestionIndex === questions.length){
        //run function endquiz
     endQuiz();
     //if not the last question, got to next question, fire setNectquestion function
     //// otherwise, get the next question
    }else {
        setNextquestion()
    }

   
        

}
// create function for ending quiz endQuiz; hide questions, show endprompt 
function endQuiz(evt) {
    console.log("End quiz!");
    container.classList.add("hide");
    endprompt.classList.remove("hide");
    endprompt.classList.add("startprompt");
   //setTimeout(timeleft);
   
}
var save = $(".save-btn");
//event listenter to save button
save.on("click", saveScore);

//make function for submit

function saveScore(e){
    e.preventdefault();
    console.log("score saved");
}
