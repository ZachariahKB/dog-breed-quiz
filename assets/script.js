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

  if (!allQuestionsAnswered()) {
    // If not all questions are answered, render the modal
    renderModal();
    return; // Exit the function to prevent further execution
  }
  storeUserInput();
  window.location.href = 'results.html'
};

// Function to check if all questions are answered
const allQuestionsAnswered = function () {
  // Loop through each question and check if it has a selected answer
  if (!document.querySelector('input[name="choice1"]:checked') ||
    !document.querySelector('input[name="choice2"]:checked') ||
    !document.querySelector('input[name="choice3"]:checked') ||
    !document.querySelector('input[name="choice4"]:checked') ||
    !document.querySelector('input[name="choice5"]:checked')) {
    {
      return false; // If any question does not have an answer, return false
    }
  }
  return true; // Return true if all questions have answers
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
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
const renderModal = function () {
  document.getElementById("quiz-submit").onclick = function () {
    modal.style.display = "block";
  };
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Dog Facts
fetch("https://dogapi.dog/api/v2/facts?limit=2").then(res => res.json())
  .then(data => {
    document.getElementById("fact1").textContent = `- ${data.data[0].attributes.body}`
    document.getElementById("fact2").textContent = `- ${data.data[1].attributes.body}`
  })

// Event listeners to trigger the above functions
takeQuizBtnEl.addEventListener('click', showQuiz);
quizSubmitEl.addEventListener('click', quizSubmitHandler);