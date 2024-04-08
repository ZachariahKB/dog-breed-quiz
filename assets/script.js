const quizBtn = document.querySelector('#quiz-btn');
const quizSubmit = document.querySelector('#quiz-submit');

document.getElementById('quiz-section').style.display = 'none';

const showQuiz = function() {
    document.getElementById('quiz-section').style.display = 'block';
    document.getElementById('quiz-btn-section').style.display = 'none';
}

const buttonClickHandler = function(event) {
    // showQuiz();
    fetch(`https://dogapi.dog/api/v2/breeds?_limit=-1`)
    .then(res => res.json())
    .then(data => console.log(data)); 
}

// const quizResults = function(event){
//     const size = event.target.getAttribute('q1');
//     const 

//     const dogApiUrl = `api.thedogapi.com/v1/breeds/search?size=${size}&temperament=${temperament}&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&api_key=${dogApiKey}`
//     const dogApiKey = "live_Lh6idGIX2s0O1fSTNNNZgzh7TIrEKbLJbyj3sglCt6SuVDT7mcN4JhVL2kvJA5MO"

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

quizBtn.addEventListener('click', buttonClickHandler);