const takeQuizBtnEl = document.querySelector('#take-quiz-btn');
const quizSubmitEl = document.querySelector('#quiz-submit');

// Pull the quiz response history from local storage or, if there isn't one, create a new array
let responseHistory = JSON.parse(localStorage.getItem("quizResponseHistory")) || [];

// Hide the quiz initially
document.getElementById('quiz-section').style.display = 'none';

// Show the quiz and hide the take quiz button
const showQuiz = function (event) {
  document.getElementById('quiz-section').style.display = 'block';
  document.getElementById('quiz-btn-section').style.display = 'none';
};

// When quiz is submitted, user answers are stored locally to be references on results.html
const quizSubmitHandler = function (event) {
  event.preventDefault();
  storeUserInput();
  window.location.href = 'results.html'
};

// Fetch data from the API
const apiUrl = "https://api.thedogapi.com/v1/breeds";
let baseBreedsArr = [];

fetch(apiUrl)
  .then(function (responses) {
    if (!responses.ok) {
      throw new Error('API Network not OK')
    }
    return responses.json();
  })
  .then(function (breeds) {
    baseBreedsArr = breeds;
    // console.log(baseBreedsArr);
  });

  // Store User input locally for usage on results page
const storeUserInput = function () {
  const responses = {
    size: document.querySelector('input[name="choice1"]:checked').value,
    energy: document.querySelector('input[name="choice2"]:checked').value,
    confidence: document.querySelector('input[name="choice3"]:checked').value,
    affection: document.querySelector('input[name="choice4"]:checked').value,
    purpose: document.querySelector('input[name="choice5"]:checked').value,
  };

  // Ensure responseHistory is defined here
  if (!Array.isArray(responseHistory)) {
    responseHistory = [];
  }
  
  responseHistory.unshift(responses);
  localStorage.setItem("quizResponseHistory", JSON.stringify(responseHistory));
  // console.log(responses);
}

// Dog Facts
fetch("https://dogapi.dog/api/v2/facts?limit=2").then(res => res.json())
  .then(data => {
    // console.log(data)
    document.getElementById("fact1").textContent = data.data[0].attributes.body
    document.getElementById("fact2").textContent = data.data[1].attributes.body
  })

// Event listeners to trigger the above functions
takeQuizBtnEl.addEventListener('click', showQuiz);
quizSubmitEl.addEventListener('click', quizSubmitHandler);
