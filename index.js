'use strict';

/*
questions outline

Which of these songs was a hit by Whitney Houston in 1990?
--I Will Always Love You
-exhale
-Im every woman
-the greatest love of all

Which r&b male/group is known to beg in his/their music:
--Keith Sweat
-R. Kelly
-Tony Toni Tony
- Jodeci

Which 90s R&B song was considered the first mashup to be on the billboards top 100.
-- "Right here/Human nature remix" by SWV
- 'Scream' by Michael Jackson/Janet Jackson
- 'I'll be missing you' Puff Daddy and the family
- 'Youre all I need' by Mary J Blige feat Method Man

Mariah Carey had a hit song in 1995 with what singer/group?
-- Boyz II Men
-Babyface
-Whitney Houston
-Luther Vandross

Escapade, Come Back to Me and Black Cats are songs from what Janet Jackson album?
-- Rhythym Nation 1814
- Janet
- Control
- All for you

*/

const STORE = [
  {question: 'Which of these songs was a hit by Whitney Houston in 1990?',
    answers: ['exhale', 'Im every woman','I Will Always Love You', 'the greatest love of all'],
    correct: 'I Will Always Love You',
    number: 1},
  {question:'Which r&b male/group is known to beg in his/their music?',
    answers: ['Tony Toni Tony', 'Keith Sweat', 'Jodeci', 'R. Kelly' ],
    correct: 'Keith Sweat',
    number: 2,},
  {question: 'Which 90s R&B song was considered the first mashup to be on the billboards top 100?',
    answers:['\'Youre all I need\' by Mary J Blige feat Method Man','\'Scream\' by Michael Jackson/Janet Jackson', '\'I\'ll be missing you\' Puff Daddy and the family','Right here/Human nature remix by SWV' ],
    correct: 'Right here/Human nature remix by SWV',
    number: 3},
  {question: 'Mariah Carey had a hit song in 1995 with what singer/group?',
    answers: ['Boyz II Men', 'Babyface', 'Whitney Houston', 'Luther Vandross'], 
    correct: 'Boyz II Men',
    number: 4},
  {question: 'Escapade, Come Back to Me and Black Cats are songs from what Janet Jackson album?',
    answers: ['Control', 'Rhythym Nation 1814', 'Janet', 'All for you'],
    correct: 'Rhythym Nation 1814',
    number: 5}
];

let questionNumber = 1;

let correctAnswers = 0;

function questionsPage (questionNum) {
  console.log(questionNum.question);
  return `
  <section class="questions-page" role="main">
  <h3 class="question">${questionNum.question}</h3>

  <form>
    <fieldset>
      <label>
        <input class="answer" type="radio" name="option" checked>
        <span>${questionNum.answers[0]}</span>
      </label>

      <label>
        <input class="answer" type="radio" name="option">
        <span>${questionNum.answers[1]}</span>
      </label>

      <label>
          <input class="answer" type="radio" name="option">
          <span>${questionNum.answers[2]}</span>
      </label>

      <label>
            <input class="answer" type="radio" name="option">
            <span>${questionNum.answers[3]}</span>
      </label>    
    </fieldset>

    <button id="js-submit">Submit</button>

  </form>
  <div id="progress">
    <span id="question-count">Question: ${questionNumber} / 5 </span>
    <span id="correct-answers">Answered Correctly: ${correctAnswers}</span>
  </div>
</section>`;
}



function nextQuestion(){
  const questionNum = STORE[questionNumber -1];
  
  $('#container').html(questionsPage(questionNum)); 
  
}


function quizStartButton(){
  $('#js-start-button').click(function (event){
    nextQuestion();
    console.log('Button Pressed');
  });
}

function nextButton(){
  $('#container').on('click', '#js-next', function(event){
    console.log(questionNumber);
    if (questionNumber === 5){
      renderResultsPage();
    } else {
      handleNextQuestion();
      nextQuestion();
    }
  });
}

function submitButton() {
  $('#container').on('click', '#js-submit', function(event){
    event.preventDefault();
    const answer = $('form input[type=radio]:checked').siblings('span').html();
    const userCorrect = checkAnswer(answer);
    if(userCorrect) {
      renderCorrectFeedback();
    } else{
      renderWrongFeedback();
    }
  });
}
//variable for correct feedback
/*const correctFeedback = `
<section class="feedback-page" role="main">
  <h3>You got it right!</h3>
  <img src="https://media.giphy.com/media/13jxyFwcS7dsdy/giphy.gif">
  <p class="correct-ans">The correct answer was:</p>
  <button id="js-next">Next</button>
</section>`;*/

function renderCorrectFeedback() {
  $('#container').html(
    `<section class="feedback-page" role="main">
    <h3>You got it right!</h3>
    <img src="https://media.giphy.com/media/13jxyFwcS7dsdy/giphy.gif">
    <p class="correct-ans">The correct answer was: ${STORE[questionNumber -1].correct}</p>
    <button id="js-next">Next</button>
  </section>`);
  correctAnswers++;
}

//variable for incorrect feedback
/*const wrongFeedback = `
<section class="feedback-page" role="main">
  <h3>Wrong answer!</h3>
  <img src="https://media.giphy.com/media/2DQgCiHu8VhJu/giphy.gif">
  <p class="correct-ans">The correct answer was:</p>
  <button id="js-next">Next</button>
</section>`;*/

function renderWrongFeedback() {
  $('#container').html(
    `<section class="feedback-page" role="main">
  <h3>Wrong answer!</h3>
  <img src="https://media.giphy.com/media/2DQgCiHu8VhJu/giphy.gif">
  <p class="correct-ans">The correct answer was: ${STORE[questionNumber -1].correct}</p>
  <button id="js-next">Next</button>
</section>`);
}

//results page
function renderResultsPage(){
  if (correctAnswers === 5) {
    $('#container').html(`<div class="results">
  <h3></h3>
  <img src="https://media.giphy.com/media/AqMBjUQW6k85G/giphy.gif">
  <p>You got ${correctAnswers} out of 5 right</p>
  <button class="js-restart">Restart</button>
</div>`);
  }
  else if (correctAnswers < 5 && correctAnswers > 2) {
    $('#container').html(`<div class="results">
<h3></h3>
<img src="https://media.giphy.com/media/6elwBD77KFNlK/giphy.gif">
<p>You got ${correctAnswers} out of 5 right</p>
<button class="js-restart">Restart</button>
</div>`);
  }else {
    $('#container').html(`<div class="results">
<h3></h3>
<img src="https://media.giphy.com/media/WoM4QLxPmAHMk/giphy.gif">
<p>You got ${correctAnswers} out of 5 right</p>
<button class="js-restart">Restart</button>
</div>`);
  }
}


function checkAnswer(answer){
  if(answer === STORE[questionNumber -1].correct){
    return true;
  } else {
    return false;
  }
}

function handleNextQuestion(){
  questionNumber++; 
}

/*function restartButton(){
  $('#container').click('.js-restart', function(event) {
    questionNumber = 1;
    correctAnswers = 0;
    nextButton();
  });
}*/

function main(){
  quizStartButton();
  submitButton();
  nextButton();
  //restartButton();

}

$(main);