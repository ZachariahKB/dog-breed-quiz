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
  const size = document.querySelector('input[name="choice1"]:checked').value;
  const dogApiKey = "live_Lh6idGIX2s0O1fSTNNNZgzh7TIrEKbLJbyj3sglCt6SuVDT7mcN4JhVL2kvJA5MO"
  const dogApiUrl = (`https://api.thedogapi.com/v1/breeds?size=${size}&format=json&has_breeds=true&order=RANDOM&page=0&api_key=${dogApiKey}`);
  // requestOptions);

  // const response = 
  fetch(dogApiUrl).then(function (response) { return response.json() }).then(function (result) {
    // breedArr = breedArr.concat(result)
    console.log(result)
    console.log(dogApiUrl)
  })
}
// requestOptions);
// const result = response.json();

// Map user's Q2 answer to API dog breed characteristics
const traitMapping = {
  "question1": {
    "small": [
      "3 - 6",
      "3 - 7",
      "4 - 7",
      "4 - 9",
      "6 - 8",
      "3 - 12",
      "6 - 9",
      "7 - 10",
      "8 - 10",
      "6 - 13",
      "8 - 11",
      "7 - 13",
      "8 - 14",
      "7 - 15",
      "10 - 13",
      "11 - 12",
      "9 - 15",
      "12",
      "9 - 16",
      "10 - 16",
      "11.5 - 15.5",
      "13 - 14",
      "10 - 18",
      "14",
      "14 - 16",
      "12 - 18",
      "13 - 18",
      "11 - 20",
      "15 - 17",
      "14 - 18",
      "8 - 25",
      "15 - 19",
      "10 - 25",
      "up - 18",
      "15 - 22",
      "18 - 22",
      "17 - 23",
      "9 - 31",
      "20 - 24",
      "22 - 24",
      "20 - 30",
      "23 - 28",
      "18 - 33",
    ],
    "med": [
      "25 - 27",
      "20 - 35",
      "25 - 30",
      "28",
      "25 - 33",
      "24 - 35",
      "20 - 40",
      "30",
      "25 - 35",
      "24 - 38",
      "25 - 38",
      "25 - 40",
      "25 - 45",
      "30 - 40",
      "32 - 40",
      "35 - 40",
      "30 - 45",
      "31 - 46",
      "35 - 45",
      "30 - 50",
      "35 - 50",
      "33 - 53",
      "38 - 50",
      "33 - 55",
      "30 - 60",
      "35 - 55",
      "35 - 60",
      "35 - 65",
      "45 - 55",
      "40 - 60",
      "48 - 55",
      "40 - 65",
      "45 - 60",
      "50 - 55",
      "35 - 70",
      "44 - 62",
      "44 - 66",
      "50 - 60",
      "40 - 70",
      "45 - 65",
      "45 - 70",
      "50 - 65",
      "40 - 80",
      "50 - 70",
      "45 - 80",
      "55 - 75",
      "55 - 80",
      "65 - 75",
      "50 - 90",
      "55 - 85",
      "55 - 88",
      "50 - 95",
      "55 - 90",
      "60 - 85",
      "61 - 85",
      // Yes, this m-dash seems out of place but unfortunately that's what's in the API so we need it to match
      "65 – 85",
    ],
    "large": [
      "66 - 88",
      "65 - 90",
      "75 - 80",
      "70 - 90",
      "60 - 100",
      "65 - 100",
      "65 - 115",
      "60 - 120",
      "30 - 150",
      "70 - 110",
      "80 - 100",
      "65 - 120",
      "70 - 115",
      "75 - 110",
      "80 - 110",
      "88 - 110",
      "85 - 115",
      "70 - 130",
      "88 - 120",
      "90 - 120",
      "85 - 140",
      "80 - 150",
      "100 - 130",
      "100 - 150",
      "120 - 140",
      "105 - 180",
      "120 - 170",
      "110 - 190",
      "110 - 200",
      "130 - 180",
    ],
  },
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