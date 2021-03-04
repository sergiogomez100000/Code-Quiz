// create variables for target classes n ids
// create variable for questions
var startbtn = document.querySelector("#start-btn");
var time = document.querySelector("#time");
var timeleft = 100;
var startprompt = document.querySelector(".start-prompt");
var endprompt = document.querySelector(".end-prompt");
var container = document.querySelector(".container");
var timerInterval;
var questions = [
    {question: "What is a div?",
    correctAnswer:"an html tag element",
    options: ["a css tag element","a javascript element","an html tag element"]
    },
    {
        question: "What are people that write computer code called?",
        correctAnswer: "Programmers",
        options: ["Programmers","Coders","Developers","Cryptographers"]
    },
    {
        question: "Which of these is NOT a coding program?",
        correctAnswer: "Banana",
        options: ["Banana","Javascript","Python","Ruby"]
    },
    {question:"how do you style the class header?",
    correctAnswer:".header",
    options:["#header", ".header"]
    },
    {question:"Which of these does NOT run using a computer program?",
    correctAnswer:"Skateboard",
    options:["Computer", "Boat","Skateboard","Airplane"]
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
    
        timerInterval = setInterval(function() {
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
        timeleft -= 10
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
   clearInterval(timerInterval);
   
}
var save = $(".save-btn");
//event listenter to save button
save.on("click", saveScore);

//WHEN the game is over,THEN I can save my initials and my score
//make function to save score
function saveScore(e){
     //prevent refresh
     e.preventDefault();
     console.log(e.target)
     //creat variable for initials input. get value of varable
     var val = document.getElementsByClassName("initials").value;
     var scoreboard =document.getElementsByClassName("scoreboard");
     // check if there are high scores in local storage
     var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
    console.log(scoreboard);
     if (val !== "") {
        // initial.text(val);
        // scoreboard.append(initial);


        // create a new high score
        var newScore = {
            score: timeleft,
            initials: val
        }
        // push this the new high score into the high scores that we retrieve from local storage
        highScores.push(newScore);

        // then we set the local storage as the whole new array with te new high score
        window.localStorage.setItem("highScores", JSON.stringify(highScores));
     }
     console.log("high scores: ", highScores);
     

     // sort the high scores
     highScores.sort(function(a,b) {
         return b.score - a.score;
     });
     // for each high score, set the list item text to INITIALS: SCORE, append the list item to the ul
    //  for(var i=0; i<highScores.length;i++) {
    //     var initial = $("<li>");
    //      console.log(highScores[i].initials + ": " + highScores[i].score)
    //      var inits = highScores[i].initials;
    //      var score = highScores[i].score;
    //      initial.innerText = inits + ": " + score;
    //      scoreboard[0].append(initial);
    //  }
    highScores.forEach(function(score) {
        var initial = document.createElement("li");
         var inits = score.initials;
         var score = score.score;
         initial.innerText = inits + ": " + score;
         scoreboard[0].append(initial);
    })

     console.log("sorted scores: ", highScores);
     // display them as a list

     //creates item variable, equalling to a new li element
     
    //item variable text is equal to val variable
    //add item inside of shoppinlist el
    // initial.appendChild(val);
    // scoreboard.append(initial);
    // scoreboard.append($("<li>").text(val)

    
}
