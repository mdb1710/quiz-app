'use strict';

const questions = [
  {question: 'Which of these songs was a hit by Whitney Houston in 1990?',
    answers: ['exhale', 'Im every woman','I Will Always Love You', 'the greatest love of all'],
    correct: 2,
  },
  {question:'Which r&b male/group is known to beg in his/their music?',
    answers: ['Tony Toni Tony', 'Keith Sweat', 'Jodeci', 'R. Kelly' ],
    correct: 1,
  },
  {question: 'Which 90s R&B song was considered the first mashup to be on the billboards top 100?',
    answers:['\'Youre all I need\' by Mary J Blige feat Method Man','\'Scream\' by Michael Jackson/Janet Jackson', '\'I\'ll be missing you\' Puff Daddy and the family','Right here/Human nature remix by SWV' ],
    correct: 3,
  },
  {question: 'Mariah Carey had a hit song in 1995 with what singer/group?',
    answers: ['Boyz II Men', 'Babyface', 'Whitney Houston', 'Luther Vandross'], 
    correct: 0,
  },
  {question: 'Escapade, Come Back to Me and Black Cats are songs from what Janet Jackson album?',
    answers: ['Control', 'Rhythym Nation 1814', 'Janet', 'All for you'],
    correct: 1,
  }
];

const STORE = {
  questionNumber: 1,
  score: 0,
  userAnswer: null
};

function questionsPage (questionNum) {
  return `
  <section class="questions-page" role="main">

  <div id="progress">
  <span id="question-count">Question: ${STORE.questionNumber} / 5 </span>
  <span id="correct-answers">Answered Correctly: ${STORE.score}</span>
  </div>

  <h3 class="question">${questionNum.question}</h3>


  <form>
    <fieldset>
      <label>
        <input class="answer" type="radio" name="option" data-index-value=0  checked>
        ${questionNum.answers[0]}
      </label>
      <br>
      <label>
        <input class="answer" type="radio" name="option" data-index-value=1 >
        ${questionNum.answers[1]}
      </label>
      <br>
      <label>
          <input class="answer" type="radio" name="option" data-index-value=2 >
            ${questionNum.answers[2]}
      </label>
      <br>
      <label>
            <input class="answer" type="radio" name="option" data-index-value=3 >
            ${questionNum.answers[3]}
      </label>    
    </fieldset>
    <button id="js-submit">Submit</button>
  </form>


</section>`;
}

function nextQuestion(){
  const questionNum = questions[STORE.questionNumber -1];
  $('#container').html(questionsPage(questionNum));  
}
function quizStartButton(){
  $('#js-start-button').click(function (event){
    nextQuestion();
  });
}
function nextButton(){
  $('#container').on('click', '#js-next', function(event){
    if (STORE.questionNumber === 5){
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
    STORE.userAnswer =  parseInt($('form input[type=radio]:checked').attr('data-index-value'), 10);
    if(STORE.userAnswer === questions[STORE.questionNumber -1].correct) {
      renderCorrectFeedback();
    } else{
      renderWrongFeedback();
    }
  });
}

function renderCorrectFeedback() {
  const displayAnswer = questions[STORE.questionNumber -1].answers[questions[STORE.questionNumber -1].correct];
  $('#container').html(
    `<section class="feedback-page" role="main">
    <h3>You got it right!</h3>
    <img src="https://media.giphy.com/media/13jxyFwcS7dsdy/giphy.gif" alt="House Party dancing scene">
    <br>
    <h3 class="correct-ans">The correct answer was: ${displayAnswer}</h3>
    <button id="js-next">Next</button>
  </section>`);
  STORE.score++;
}
function renderWrongFeedback() {
  const displayAnswer = questions[STORE.questionNumber -1].answers[questions[STORE.questionNumber -1].correct];
  $('#container').html(
    `<section class="feedback-page" role="main">
  <h3>Wrong answer!</h3>
  <img src="https://media.giphy.com/media/2DQgCiHu8VhJu/giphy.gif" alt="Regina Laughing Sarcastically">
  <br>
  <h3 class="correct-ans">The correct answer was: ${displayAnswer}</h3>
  <button id="js-next">Next</button>
</section>`);
}
function renderResultsPage(){
  if (STORE.score === 5) {
    $('#container').html(`<div class="results">
  <h3>You are a R&B trivia legend!</h3>
  <img src="https://media.giphy.com/media/AqMBjUQW6k85G/giphy.gif" alt="Tupac Dancing" >
  <h3>You got ${STORE.score} out of 5 right</h3>
  <button class="js-restart">Restart</button>
</div>`);
  }
  else if (STORE.score < 5 && STORE.score > 2) {
    $('#container').html(`<div class="results">
<h3>You did alright, I guess...</h3>
<img src="https://media.giphy.com/media/6elwBD77KFNlK/giphy.gif" alt="Menace to society laughing">
<h3>You got ${STORE.score} out of 5 right</h3>
<button class="js-restart">Restart</button>
</div>`);
  }else {
    $('#container').html(`<div class="results">
<h3>That was horrible! You need some culture.</h3>
<img src="https://media.giphy.com/media/WoM4QLxPmAHMk/giphy.gif" alt="Getting Shot">
<h3>You got ${STORE.score} out of 5 right</h3>
<button class="js-restart">Restart</button>
</div>`);
  }
}

function handleNextQuestion(){
  STORE.questionNumber++; 
}
function restartButton(){
  $('#container').on('click', '.js-restart', function(event) {
    STORE.questionNumber = 1;
    STORE.score = 0;
    nextQuestion();
  });
}
function main(){
  quizStartButton();
  submitButton();
  nextButton();
  restartButton();
}
$(main);