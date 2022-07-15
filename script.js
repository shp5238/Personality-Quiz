const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
  {
    question: "Which of the following is your favorite hobby?",
    answers: {
      a: "coding", 
      b: "cooking",
      c: "sleeping",
      d: "reading"
    },
    optionA: "a",
    optionB: "b",
    optionC: "c", 
    optionD: "d"
  },
  {
    question: "Where would you most likely go for vacation?",
    answers: {
      a: "Rio de Janeiro",
      b: "Yosemite",
      c: "Miami",
      d: "Kyoto,Japan"
    },
    optionA: "a",
    optionB: "b",
    optionC: "c", 
    optionD: "d"
  },
  {
    question: "What kind of convo do you prefer?",
    answers: {
      a: "casual",
      b: "deep"
    },
    optionA: "a",
    optionB: "b"
  },
  {
    question: "Do you believe personality quizzes are effective?",
    answers: {
      a: "yes",
      b: "no"
    },
    optionA: "a",
    optionB: "b"
  }
];

function buildQuiz(){
  // variable to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {
      
      
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}


function showResults(){

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');
  
  // keep track of user's answers
  let score = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.optionA){
      score += 0.75;
      //answerContainers[questionNumber].style.color = 'lightgreen';
    }else if(userAnswer === currentQuestion.optionB){
      score -= 0.5;
      //answerContainers[questionNumber].style.color = 'lightgreen';
    }else if (userAnswer === currentQuestion.optionC){
      score += 1.25;
      //answerContainers[questionNumber].style.color = 'lightgreen';
    }else if (userAnswer === currentQuestion.optionD){
     score -= 1.5;
      //answerContainers[questionNumber].style.color = 'lightgreen';
    }else{
      // if answer is wrong or blank
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });
  score -=2;
  score /= 8;
  if (score <0){
    score *= -100;
    //score = 100-score;
    resultsContainer.innerHTML = `percent introvert: ${score}%`;
  }else{
    score *= 100;
    resultsContainer.innerHTML = `percent extrovert: ${score}%`;
  }
  
  // show number of correct answers out of total
  //resultsContainer.innerHTML = `${score} out of ${myQuestions.length}`;
  //resultsContainer.innerHTML = `percent introvert: ${score}`;
  //resultsContainer.innerHTML = `percent extrovert: ${score}`;

}

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);