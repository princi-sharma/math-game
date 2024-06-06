let playing = false;  // for game is not start
let score;
let timeRemaining;
let action;
let correctAnswer;

// if we click on start game button

document.getElementById("start-reset").onclick = function()
{
    // if we are playing

    if (playing == true)
    {
        location.reload();// reload the game
    }
    else
    {
        // if we are not playing
        // change the mode to playing

        playing = true;
        score=0;
        document.getElementById("score-value").innerHTML=score;

        // show the countdown box

        show("time-remaining");
        timeRemaining=60;
        document.getElementById("time-remaining-value").innerHTML=timeRemaining

        // hide game over

        hide("game-over")

        // To change button to reset game

        document.getElementById("start-reset").innerHTML="Reset Game";

        // show the countdown box

        showCountDown();

        //to generate question and answer

        generateQA();
    }
}
// show function and hide functions

function show(id)
{
    document.getElementById(id).style.display="block";
}

function hide(id)
{
    document.getElementById(id).style.display="none"
}

// function for countdown and stop countdown

function showCountDown()
{
    action = setInterval(function(){
        timeRemaining--;
        document.getElementById("time-remaining-value").innerHTML=timeRemaining;
        if(timeRemaining==0)
        {
            // game over

            stopCountDown()
            show("game-over");
            document.getElementById("game-over").innerHTML=`
            <p>Game Over!</p>
            <p>Your Score is ${score}</p>
            `;
            hide("time-remaining")
            hide("correct")
            hide("wrong")
            playing=false;
            document.getElementById("start-reset").innerHTML="Start Game"
        }
    },1000);
}
function stopCountDown()
{
    clearInterval(action);
}
// function for generating ques ans

function generateQA()
{
    let x= 1+Math.floor(9*Math.random())
    let y= 1+Math.floor(9*Math.random())
    correctAnswer = x*y
    document.getElementById("question").innerHTML = x + "x" + y
    let correctPosition = 1+Math.round(3 * Math.random())

    // fill the correct box

    document.getElementById("box"+ correctPosition).innerHTML=correctAnswer;

    // fill the wrong boxes

    var answer =[correctAnswer];
    for(let i=1;i<5;i++)
    {
        if(i!=correctPosition)
        {
            let wrongAnswer;
            do
            {
                wrongAnswer=1+Math.floor(9*Math.random()) * 1+Math.floor(9*Math.random());
            }while(answer.indexOf(wrongAnswer) > -1);
            answer.push(wrongAnswer);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
        }
    }
}
// if we click on answer box

for(let i=1;i<5;i++)
{
    document.getElementById("box" + i).onclick=function()
    {
        // if we are playing

        if(playing==true)  //yes
        {
            if(this.innerHTML==correctAnswer)// correct answer
            {

            // increase the score

                score++;
                document.getElementById("score-value").innerHTML=score;

                // show the correct box for sec and hide wrong box

                hide("wrong");
                show("correct");
                setTimeout(function()
                {
                    hide("correct")
                }
                ,1000)

                // generate Question answer

                generateQA()
            }
            else
            {
                // wrong answer

                hide("correct")
                show("wrong")
                setTimeout(function()
                {
                    hide("wrong")
                }
                ,1000)
            }
        }
    }
}

