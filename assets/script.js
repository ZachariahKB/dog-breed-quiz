const takeQuizBtnEl = document.querySelector('#take-quiz-btn');
const quizSubmitEl = document.querySelector('#quiz-submit');
const feelingLuckyBtnEl = document.querySelector('#feeling-lucky-btn');

// Pull the quiz response history from local storage or, if there isn't one, create a new array
let quizResponseHistory = JSON.parse(localStorage.getItem("responses")) || [];

// Hide the quiz initially
document.getElementById('quiz-section').style.display = 'none';

// Show the quiz and hide the take quiz button
const showQuiz = function () {
  document.getElementById('quiz-section').style.display = 'block';
  document.getElementById('quiz-btn-section').style.display = 'none';
};


const buttonClickHandler = function (event) {
  showQuiz();

};

const quizSubmitHandler = function (event) {
  event.preventDefault();

  // Redirect to results page - UNCOMMENT WHEN READY
  // window.location.href = 'results.html'
  filterBreedsBySize();
  getBreeds();
  // displayChosenBreed();
  // displayAltBreeds();
};
// const headers = new Headers({
//   "Content-Type": "application/json",
//   "x-api-key":
//     "live_Lh6idGIX2s0O1fSTNNNZgzh7TIrEKbLJbyj3sglCt6SuVDT7mcN4JhVL2kvJA5MO",
// });

// var requestOptions = {
//   method: "GET",
//   headers: headers,
//   redirect: "follow",
// };

const filterBreedsBySize = function () {
  const size= document.querySelector('input[name="choice1"]:checked').value;
  const dogApiKey = "live_Lh6idGIX2s0O1fSTNNNZgzh7TIrEKbLJbyj3sglCt6SuVDT7mcN4JhVL2kvJA5MO"
  const dogApiUrl = (`https://api.thedogapi.com/v1/breeds?size=${size}&format=json&has_breeds=true&order=RANDOM&page=0&api_key=${dogApiKey}`);
    // requestOptions);

  // const response = 
  fetch(dogApiUrl).then(function(response){return response.json()}).then(function(result){
    // breedArr = breedArr.concat(result)
    console.log(result)
    console.log(dogApiUrl)
  })}
    // requestOptions);
  // const result = response.json();

// Map user's Q2 answer to API dog breed characteristics
const traitMapping = {
  "question2": {
    "energetic": [
      "active",
      "fun-loving",
      "spirited",
      "excitable",
      "bubbly",
      "adventurous",
      "wild",
      "hardworking",
      "courageous",
      "feisty"
    ],
    "calm": [
      "aloof",
      "composed",
      "tranquil",
      "even tempered",
      "peaceful",
      "composed",
      "refined",
      "unflappable"
    ],
  },
  "question3": {
    "confident": [
      "assertive",
      "fearless",
      "bold",
      "self-confident",
      "vigilant",
      "stubborn",
      "dominant",
      "strong willed",
      "determined",
      "vocal",
      "adaptable"
    ],
    "reserved": [
      "shy",
      "reserved",
      "apprehensive",
      "nervous",
      "hesitant",
      "docile",
      "kind",
      "sweet-tempered"
    ],
  },
  "question4": {
    "independent": [
      "aloof",
      "dignified",
      "reserved",
      "receptive",
      "autonomous",
      "territorial",
      "diligent",
      "mischievous",
      "curious"
    ],
    "affectionate": [
      "loving",
      "faithful",
      "friendly",
      "warm-hearted",
      "devoted",
      "sociable",
      "trusting",
      "faithful",
      "protective",
      "benevolent",
      "dutiful",
      "good-natured",
      "gay",
    ],
  },
  "question5": {
    "hunting": [
      "Small rodent hunting, lapdog",
      "Fox hunting, scent hound",
      "Badger, otter hunting",
      "Hunting bears",
      "Hunting raccoon, deer, bear, and cougar.",
      "Boar herding, hunting, guarding",
      "Rabbit, hare hunting",
      "Hunting water game",
      "Hunting on foot.",
      "Hunting by scent",
      "Hunting rats",
      "Fox bolting",
      "Hunting with a superior sense of smell.",
      "Hunting raccoons, night hunting",
      "Coursing wolves, elk",
      "Coursing hares",
      "Coursing gazelle and hare",
      "Coursing deer",
      "Bolting of otter, foxes, other vermin",
      "Bird setting, retrieving",
      "Bird flushing, retrieving",
      "Bird flushing and retrieving",
      "Hunting the American woodcock",
      "Small vermin hunting",
      "Hunting big-game like Boar.",
      "General hunting",
      "Hunting birds, small mammals",
      "Hunting, guarding"
    ],
    "herding": [
      "Sheep herding",
      "Cattle herding",
      "Cattle droving",
      "Driving livestock",
      "Driving sheep, cattle",
      "Herding & guarding livestock, farm watch dog",
      "Herding livestock",
      "Herding reindeer, guardian, draft",
      "Cattle herding, Ratting, Driving cattle to market.",
      "Herding, Guard dog",
      "Rid the home and farm of vermin, and hunt badger and fox",
      "Sheep guarding",
    ],
    "guarding": [
      "Guarding",
      "Guard dogs, defending sheep from predators, mainly wolves, jackals and bears",
      "Guardian, hunting large game",
      "Guardian, cart pulling, hunting",
      "Guardian, appearance.",
      "Guarding inside the home, companion",
      "Farms, watchdog, guard duty",
      "Guardian"
    ],
    "companionship": [
      "Companion",
      "Companion of kings",
      "Companionship",
      "Lapdog",
      "An elegant man's fashion statement",
      "Circus performer",
      "Ratting, lapdog, curio"
    ]
  }
};

// Pulls dog breed information from the dogApi
const getBreeds = function () {
  const responses = {
    size: document.querySelector('input[name="choice1"]:checked').value,
    energy: document.querySelector('input[name="choice2"]:checked').value,
    confidence: document.querySelector('input[name="choice3"]:checked').value,
    affection: document.querySelector('input[name="choice4"]:checked').value,
    purpose: document.querySelector('input[name="choice5"]:checked').value,
  };
  localStorage.setItem("responses", JSON.stringify(quizResponseHistory));
  console.log(responses);

  // const traitArrays = Object.values(responses).map((selection, index) => {
  //   const question = "question" + (index + 1);
  //   return traitMapping[question][selection];
  // });

  // const dogApiUrl = `api.thedogapi.com/v1/breeds/search?size=${size}&temperament=${temperament}&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&api_key=${dogApiKey}`
  // const dogApiKey = "live_Lh6idGIX2s0O1fSTNNNZgzh7TIrEKbLJbyj3sglCt6SuVDT7mcN4JhVL2kvJA5MO"


};

const displayChosenBreed = function () {

};

const displpayAltBreeds = function () {

};

const displayFeelingLucky = function () {

};


// const quizResults = function(event){
//     const size = event.target.getAttribute('q1');
//     const 

//     const dogApiUrl = `api.thedogapi.com/v1/breeds/search?size=${size}&temperament=${temperament}&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&api_key=${dogApiKey}`
//     const dogApiKey = "live_Lh6idGIX2s0O1fSTNNNZgzh7TIrEKbLJbyj3sglCt6SuVDT7mcN4JhVL2kvJA5MO"

// fetch(`https://dogapi.dog/api/v2/breeds?_limit=-1`)
// .then(res => res.json())
// .then(data => console.log(data)); 

//     fetch(dogApiUrl)
//         .then(function (response)) {
//             if (response.ok)
//                 return response.json();
//             else {
//                 // REMOVE ALERT AND REPLACE WITH MODAL
//                 alert(`Error:${response.statusText}`);
//             }
//         }.then(function ())
// }

// Event listeners to trigger the above functions
takeQuizBtnEl.addEventListener('click', buttonClickHandler);
quizSubmitEl.addEventListener('click', quizSubmitHandler);
// feelingLuckyBtnEl.addEventListener('click', displayFeelingLucky);