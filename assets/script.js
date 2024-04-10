const url = `https://api.thedogapi.com/v1/breeds`;
const api_key = "live_Hub7CF5mUcP0zp9NtRWJf5gUHyJYswrPmmZUPq8TfUODueobaOpOEzZfeQgOLQLe"
let storedBreeds = []

 fetch(url,{headers: {
      'x-api-key': api_key
    }})
 .then((response) => {
   return response.json();
 })
.then((data) => {
   
   //filter to only include those with an `image` object
   data = data.filter(img=> img.image?.url!=null)
   
  storedBreeds = data;
   
   for (let i = 0; i < storedBreeds.length; i++) {
    const breed = storedBreeds[i];
    let option = document.createElement('option');
     
     //skip any breeds that don't have an image
     if(!breed.image)continue
     
    //use the current array index
    option.value = i;
    option.innerHTML = `${breed.name}`;
document.getElementById('breed_selector').appendChild(option);
    
    }
   //show the first breed by default
   showBreedImage(0)
})
.catch(function(error) {
   console.log(error);
});

function showBreedImage(index)
{ 
  document.getElementById("breed_image").src= storedBreeds[index].image.url;
  
  document.getElementById("breed_json").textContent= storedBreeds[index].temperament
  
  
  document.getElementById("wiki_link").href= storedBreeds[index].wikipedia_url
  document.getElementById("wiki_link").innerHTML= storedBreeds[index].wikipedia_url
}




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
  // filterBreedsBySize();
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

// async function getBreeds() {
//   let breedArr = [];
//   try {
//     for (let i = 0; i < 10; i++) {
//       const response = await fetch(
//         `https://api.thedogapi.com/v1/breeds?limit=20&page=${i}`,
//         requestOptions
//       );
//       const result = await response.json();
//       breedArr = breedArr.concat(result);
//     }
//     return breedArr;
//   } catch (error) {
//     console.log("Error:", error);
//     return [];
//   }
// }

// async function fetchData() {
//   try {
//     const breedsData = await getBreeds();
//     filterDataByUserChoice(breedsData);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// function filterDataByUserChoice(breedsData) {
//   console.log(breedsData);
//   const result = [];
//   breedsData.forEach((breed) => {
//     const { temperament } = breed;
//     if (temperament) {
//       const arr = temperament.split(", ");
//       console.log(arr);
//       if (arr.includes("Gay")) {
//         result.push(breed);
//       }
      
//     }
//   });
//   console.log(result);
// }

// fetchData();

// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function () {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// fetchData()
// const filterBreedsBySize = function () {
//   const size = document.querySelector('input[name="choice1"]:checked').value;
//   const dogApiKey = "live_Lh6idGIX2s0O1fSTNNNZgzh7TIrEKbLJbyj3sglCt6SuVDT7mcN4JhVL2kvJA5MO"
//   const dogApiUrl = (`https://api.thedogapi.com/v1/breeds?size=${size}&format=json&has_breeds=true&order=RANDOM&page=0&api_key=${dogApiKey}`);
//   // requestOptions);


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
        "unflappable",
        "docile",
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
        "adaptable",
      ],
      "reserved": [
        "shy",
        "reserved",
        "apprehensive",
        "nervous",
        "hesitant",
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
      console.log(baseBreedsArr);

      // Filter based on size
      const sizeFilteredBreedsArr = baseBreedsArr.filter(function (breed) {
        return traitMapping.question1[responses.size].includes(breed.weight.imperial);
      });
      console.log(sizeFilteredBreedsArr);

      // Filter based on energy
      const energyFilteredBreedsArr = baseBreedsArr.filter(function (breed) {
        // console.log(responses.energy);
        // console.log(breed);
        // console.log(breed.temperament);
        // console.log(traitMapping.question2);
        // console.log(traitMapping.question2[responses.energy]);
        if ("temperament" in breed) {
          if (responses.energy === "calm") {
            return (breed.temperament.toLowerCase().indexOf("calm") > 0 ||
              breed.temperament.toLowerCase().indexOf("aloof") > 0 ||
              breed.temperament.toLowerCase().indexOf("composed") > 0 ||
              breed.temperament.toLowerCase().indexOf("tranquil") > 0 ||
              breed.temperament.toLowerCase().indexOf("even tempered") > 0 ||
              breed.temperament.toLowerCase().indexOf("peaceful") > 0 ||
              breed.temperament.toLowerCase().indexOf("refined") > 0 ||
              breed.temperament.toLowerCase().indexOf("unflappable") > 0 ||
              breed.temperament.toLowerCase().indexOf("docile") > 0 ||
              breed.temperament.toLowerCase().indexOf("composed") > 0);
          } else if (responses.energy === "energetic") {
            return (breed.temperament.toLowerCase().indexOf("energetic") > 0 ||
              breed.temperament.toLowerCase().indexOf("active") > 0 ||
              breed.temperament.toLowerCase().indexOf("fun-loving") > 0 ||
              breed.temperament.toLowerCase().indexOf("spirited") > 0 ||
              breed.temperament.toLowerCase().indexOf("excitable") > 0 ||
              breed.temperament.toLowerCase().indexOf("bubbly") > 0 ||
              breed.temperament.toLowerCase().indexOf("adventurous") > 0 ||
              breed.temperament.toLowerCase().indexOf("wild") > 0 ||
              breed.temperament.toLowerCase().indexOf("hardworking") > 0 ||
              breed.temperament.toLowerCase().indexOf("courageous") > 0 ||
              breed.temperament.toLowerCase().indexOf("feisty") > 0);
          }
        }
      });
      console.log(energyFilteredBreedsArr);


      // Tiered filter Lvl 2
      const tierFilteredBreedsArrLvl2 = sizeFilteredBreedsArr.filter(function (breed) {
        if ("temperament" in breed) {
          if (responses.energy === "calm") {
            return (breed.temperament.toLowerCase().indexOf("calm") > 0 ||
              breed.temperament.toLowerCase().indexOf("aloof") > 0 ||
              breed.temperament.toLowerCase().indexOf("composed") > 0 ||
              breed.temperament.toLowerCase().indexOf("tranquil") > 0 ||
              breed.temperament.toLowerCase().indexOf("even tempered") > 0 ||
              breed.temperament.toLowerCase().indexOf("peaceful") > 0 ||
              breed.temperament.toLowerCase().indexOf("refined") > 0 ||
              breed.temperament.toLowerCase().indexOf("unflappable") > 0 ||
              breed.temperament.toLowerCase().indexOf("docile") > 0 ||
              breed.temperament.toLowerCase().indexOf("composed") > 0);
          } else if (responses.energy === "energetic") {
            return (breed.temperament.toLowerCase().indexOf("energetic") > 0 ||
              breed.temperament.toLowerCase().indexOf("active") > 0 ||
              breed.temperament.toLowerCase().indexOf("fun-loving") > 0 ||
              breed.temperament.toLowerCase().indexOf("spirited") > 0 ||
              breed.temperament.toLowerCase().indexOf("excitable") > 0 ||
              breed.temperament.toLowerCase().indexOf("bubbly") > 0 ||
              breed.temperament.toLowerCase().indexOf("adventurous") > 0 ||
              breed.temperament.toLowerCase().indexOf("wild") > 0 ||
              breed.temperament.toLowerCase().indexOf("hardworking") > 0 ||
              breed.temperament.toLowerCase().indexOf("courageous") > 0 ||
              breed.temperament.toLowerCase().indexOf("feisty") > 0);
          }
        }
      });
      console.log(tierFilteredBreedsArrLvl2);


      // Filter based on confidence
      const confidenceFilteredBreedsArr = baseBreedsArr.filter(function (breed) {
        if ("temperament" in breed) {
          if (responses.confidence === "confident") {
            return (breed.temperament.toLowerCase().indexOf("assertive") > 0 ||
              breed.temperament.toLowerCase().indexOf("fearless") > 0 ||
              breed.temperament.toLowerCase().indexOf("bold") > 0 ||
              breed.temperament.toLowerCase().indexOf("self-confident") > 0 ||
              breed.temperament.toLowerCase().indexOf("vigilant") > 0 ||
              breed.temperament.toLowerCase().indexOf("stubborn") > 0 ||
              breed.temperament.toLowerCase().indexOf("dominant") > 0 ||
              breed.temperament.toLowerCase().indexOf("strong willed") > 0 ||
              breed.temperament.toLowerCase().indexOf("determined") > 0 ||
              breed.temperament.toLowerCase().indexOf("vocal") > 0 ||
              breed.temperament.toLowerCase().indexOf("adaptable") > 0);
          } else if (responses.confidence === "reserved") {
            return (breed.temperament.toLowerCase().indexOf("shy") > 0 ||
              breed.temperament.toLowerCase().indexOf("reserved") > 0 ||
              breed.temperament.toLowerCase().indexOf("apprehensive") > 0 ||
              breed.temperament.toLowerCase().indexOf("nervous") > 0 ||
              breed.temperament.toLowerCase().indexOf("hesitant") > 0 ||
              breed.temperament.toLowerCase().indexOf("kind") > 0 ||
              breed.temperament.toLowerCase().indexOf("sweet-tempered") > 0);
          }
        }
      });
      console.log(confidenceFilteredBreedsArr);


      // Tiered filter Lvl 3
      const tierFilteredBreedsArrLvl3 = tierFilteredBreedsArrLvl2.filter(function (breed) {
        if ("temperament" in breed) {
          if (responses.confidence === "confident") {
            return (breed.temperament.toLowerCase().indexOf("assertive") > 0 ||
              breed.temperament.toLowerCase().indexOf("fearless") > 0 ||
              breed.temperament.toLowerCase().indexOf("bold") > 0 ||
              breed.temperament.toLowerCase().indexOf("self-confident") > 0 ||
              breed.temperament.toLowerCase().indexOf("vigilant") > 0 ||
              breed.temperament.toLowerCase().indexOf("stubborn") > 0 ||
              breed.temperament.toLowerCase().indexOf("dominant") > 0 ||
              breed.temperament.toLowerCase().indexOf("strong willed") > 0 ||
              breed.temperament.toLowerCase().indexOf("determined") > 0 ||
              breed.temperament.toLowerCase().indexOf("vocal") > 0 ||
              breed.temperament.toLowerCase().indexOf("adaptable") > 0);
          } else if (responses.confidence === "reserved") {
            return (breed.temperament.toLowerCase().indexOf("shy") > 0 ||
              breed.temperament.toLowerCase().indexOf("reserved") > 0 ||
              breed.temperament.toLowerCase().indexOf("apprehensive") > 0 ||
              breed.temperament.toLowerCase().indexOf("nervous") > 0 ||
              breed.temperament.toLowerCase().indexOf("hesitant") > 0 ||
              breed.temperament.toLowerCase().indexOf("kind") > 0 ||
              breed.temperament.toLowerCase().indexOf("sweet-tempered") > 0);
          }
        }
      });
      console.log(tierFilteredBreedsArrLvl3);

      
      // Filter based on affection
      const affectionFilteredBreedsArr = baseBreedsArr.filter(function (breed) {
        if ("temperament" in breed) {
          if (responses.affection === "independent") {
            return (breed.temperament.toLowerCase().indexOf("aloof") > 0 ||
              breed.temperament.toLowerCase().indexOf("dignified") > 0 ||
              breed.temperament.toLowerCase().indexOf("reserved") > 0 ||
              breed.temperament.toLowerCase().indexOf("receptive") > 0 ||
              breed.temperament.toLowerCase().indexOf("autonomous") > 0 ||
              breed.temperament.toLowerCase().indexOf("territorial") > 0 ||
              breed.temperament.toLowerCase().indexOf("dilligent") > 0 ||
              breed.temperament.toLowerCase().indexOf("mischievous") > 0 ||
              breed.temperament.toLowerCase().indexOf("curious") > 0);
          } else if (responses.affection === "affectionate") {
            return (breed.temperament.toLowerCase().indexOf("loving") > 0 ||
              breed.temperament.toLowerCase().indexOf("faithful") > 0 ||
              breed.temperament.toLowerCase().indexOf("friendly") > 0 ||
              breed.temperament.toLowerCase().indexOf("warm-hearted") > 0 ||
              breed.temperament.toLowerCase().indexOf("devoted") > 0 ||
              breed.temperament.toLowerCase().indexOf("sociable") > 0 ||
              breed.temperament.toLowerCase().indexOf("trusting") > 0 ||
              breed.temperament.toLowerCase().indexOf("faithful") > 0 ||
              breed.temperament.toLowerCase().indexOf("protective") > 0 ||
              breed.temperament.toLowerCase().indexOf("benevolent") > 0 ||
              breed.temperament.toLowerCase().indexOf("dutiful") > 0 ||
              breed.temperament.toLowerCase().indexOf("good-natured") > 0 ||
              breed.temperament.toLowerCase().indexOf("gay") > 0);
          }
        }
      });
      console.log(affectionFilteredBreedsArr);


      // Tiered filter Lvl 4
      const tierFilteredBreedsArrLvl4 = tierFilteredBreedsArrLvl3.filter(function (breed) {
        if ("temperament" in breed) {
          if (responses.affection === "independent") {
            return (breed.temperament.toLowerCase().indexOf("aloof") > 0 ||
              breed.temperament.toLowerCase().indexOf("dignified") > 0 ||
              breed.temperament.toLowerCase().indexOf("reserved") > 0 ||
              breed.temperament.toLowerCase().indexOf("receptive") > 0 ||
              breed.temperament.toLowerCase().indexOf("autonomous") > 0 ||
              breed.temperament.toLowerCase().indexOf("territorial") > 0 ||
              breed.temperament.toLowerCase().indexOf("dilligent") > 0 ||
              breed.temperament.toLowerCase().indexOf("mischievous") > 0 ||
              breed.temperament.toLowerCase().indexOf("curious") > 0);
          } else if (responses.affection === "affectionate") {
            return (breed.temperament.toLowerCase().indexOf("loving") > 0 ||
              breed.temperament.toLowerCase().indexOf("faithful") > 0 ||
              breed.temperament.toLowerCase().indexOf("friendly") > 0 ||
              breed.temperament.toLowerCase().indexOf("warm-hearted") > 0 ||
              breed.temperament.toLowerCase().indexOf("devoted") > 0 ||
              breed.temperament.toLowerCase().indexOf("sociable") > 0 ||
              breed.temperament.toLowerCase().indexOf("trusting") > 0 ||
              breed.temperament.toLowerCase().indexOf("faithful") > 0 ||
              breed.temperament.toLowerCase().indexOf("protective") > 0 ||
              breed.temperament.toLowerCase().indexOf("benevolent") > 0 ||
              breed.temperament.toLowerCase().indexOf("dutiful") > 0 ||
              breed.temperament.toLowerCase().indexOf("good-natured") > 0 ||
              breed.temperament.toLowerCase().indexOf("gay") > 0);
          }
        }
      });
      console.log(tierFilteredBreedsArrLvl4);


      // Filter based on purpose
      const purposeFilteredBreedsArr = baseBreedsArr.filter(function (breed) {
        if ("bred_for" in breed) {
          if (responses.purpose === "hunting") {
            return (breed.bred_for.toLowerCase().indexOf("small rodent hunting, lapdog") > 0 ||
              breed.bred_for.toLowerCase().indexOf("fox hunting, scent hound") > 0 ||
              breed.bred_for.toLowerCase().indexOf("badger, otter hunting") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting bears") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting raccoon, deer, bear, and cougar.") > 0 ||
              breed.bred_for.toLowerCase().indexOf("boar herding, hunting, guarding") > 0 ||
              breed.bred_for.toLowerCase().indexOf("rabbit, hare hunting") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting water game") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting on foot.") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting by scent") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting rats") > 0 ||
              breed.bred_for.toLowerCase().indexOf("fox bolting") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting with a superior sense of smell.") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting raccoons, night hunting") > 0 ||
              breed.bred_for.toLowerCase().indexOf("coursing wolves, elk") > 0 ||
              breed.bred_for.toLowerCase().indexOf("coursing hares") > 0 ||
              breed.bred_for.toLowerCase().indexOf("coursing gazelle and hare") > 0 ||
              breed.bred_for.toLowerCase().indexOf("coursing deer") > 0 ||
              breed.bred_for.toLowerCase().indexOf("bolting of otter, foxes, other vermin") > 0 ||
              breed.bred_for.toLowerCase().indexOf("bird setting, retrieving") > 0 ||
              breed.bred_for.toLowerCase().indexOf("bird flushing, retrieving") > 0 ||
              breed.bred_for.toLowerCase().indexOf("bird flushing and retrieving") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting the american woodcock") > 0 ||
              breed.bred_for.toLowerCase().indexOf("small vermin hunting") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting big-game like Boar.") > 0 ||
              breed.bred_for.toLowerCase().indexOf("general hunting") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting birds, small mammals") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting, guarding") > 0);
          } else if (responses.purpose === "herding") {
            return (breed.bred_for.toLowerCase().indexOf("sheep herding") > 0 ||
              breed.bred_for.toLowerCase().indexOf("cattle herding") > 0 ||
              breed.bred_for.toLowerCase().indexOf("cattle droving") > 0 ||
              breed.bred_for.toLowerCase().indexOf("driving livestock") > 0 ||
              breed.bred_for.toLowerCase().indexOf("driving sheep, cattle") > 0 ||
              breed.bred_for.toLowerCase().indexOf("herding & guarding livestock, farm watch dog") > 0 ||
              breed.bred_for.toLowerCase().indexOf("herding livestock") > 0 ||
              breed.bred_for.toLowerCase().indexOf("herding reindeer, guardian, draft") > 0 ||
              breed.bred_for.toLowerCase().indexOf("cattle herding, ratting, driving cattle to market.") > 0 ||
              breed.bred_for.toLowerCase().indexOf("herding, guard dog") > 0 ||
              breed.bred_for.toLowerCase().indexOf("rid the home and farm of vermin, and hunt badger and fox") > 0 ||
              breed.bred_for.toLowerCase().indexOf("sheep guarding") > 0);
          } else if (responses.purpose === "guarding") {
            return (breed.bred_for.toLowerCase().indexOf("guarding") > 0 ||
              breed.bred_for.toLowerCase().indexOf("guard dogs, defending sheep from predators, mainly wolves, jackals and bears") > 0 ||
              breed.bred_for.toLowerCase().indexOf("guardian, hunting large game") > 0 ||
              breed.bred_for.toLowerCase().indexOf("guardian, cart pulling, hunting") > 0 ||
              breed.bred_for.toLowerCase().indexOf("guardian, appearance.") > 0 ||
              breed.bred_for.toLowerCase().indexOf("guarding inside the home, companion") > 0 ||
              breed.bred_for.toLowerCase().indexOf("farms, watchdog, guard duty") > 0 ||
              breed.bred_for.toLowerCase().indexOf("guardian") > 0 ||
              breed.bred_for.toLowerCase().indexOf("sheep guarding") > 0 ||
              breed.bred_for.toLowerCase().indexOf("hunting, guarding") > 0);
          } else {
            return (breed.bred_for.toLowerCase().indexOf("companion") > 0 ||
              breed.bred_for.toLowerCase().indexOf("companion of kings") > 0 ||
              breed.bred_for.toLowerCase().indexOf("companionship") > 0 ||
              breed.bred_for.toLowerCase().indexOf("lapdog") > 0 ||
              breed.bred_for.toLowerCase().indexOf("an elegant man's fashion statement") > 0 ||
              breed.bred_for.toLowerCase().indexOf("circus performer") > 0 ||
              breed.bred_for.toLowerCase().indexOf("ratting, lapdog, curio") > 0);
            }
          }
        });
        console.log(purposeFilteredBreedsArr);


        // Tiered filter Lvl 5 - Final
        const tierFilteredBreedsArrLvl5 = tierFilteredBreedsArrLvl4.filter(function (breed) {
          if ("bred_for" in breed) {
            if (responses.purpose === "hunting") {
              return (breed.bred_for.toLowerCase().indexOf("small rodent hunting, lapdog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("fox hunting, scent hound") > 0 ||
                breed.bred_for.toLowerCase().indexOf("badger, otter hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting bears") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting raccoon, deer, bear, and cougar.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("boar herding, hunting, guarding") > 0 ||
                breed.bred_for.toLowerCase().indexOf("rabbit, hare hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting water game") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting on foot.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting by scent") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting rats") > 0 ||
                breed.bred_for.toLowerCase().indexOf("fox bolting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting with a superior sense of smell.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting raccoons, night hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("coursing wolves, elk") > 0 ||
                breed.bred_for.toLowerCase().indexOf("coursing hares") > 0 ||
                breed.bred_for.toLowerCase().indexOf("coursing gazelle and hare") > 0 ||
                breed.bred_for.toLowerCase().indexOf("coursing deer") > 0 ||
                breed.bred_for.toLowerCase().indexOf("bolting of otter, foxes, other vermin") > 0 ||
                breed.bred_for.toLowerCase().indexOf("bird setting, retrieving") > 0 ||
                breed.bred_for.toLowerCase().indexOf("bird flushing, retrieving") > 0 ||
                breed.bred_for.toLowerCase().indexOf("bird flushing and retrieving") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting the american woodcock") > 0 ||
                breed.bred_for.toLowerCase().indexOf("small vermin hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting big-game like Boar.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("general hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting birds, small mammals") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting, guarding") > 0);
            } else if (responses.purpose === "herding") {
              return (breed.bred_for.toLowerCase().indexOf("sheep herding") > 0 ||
                breed.bred_for.toLowerCase().indexOf("cattle herding") > 0 ||
                breed.bred_for.toLowerCase().indexOf("cattle droving") > 0 ||
                breed.bred_for.toLowerCase().indexOf("driving livestock") > 0 ||
                breed.bred_for.toLowerCase().indexOf("driving sheep, cattle") > 0 ||
                breed.bred_for.toLowerCase().indexOf("herding & guarding livestock, farm watch dog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("herding livestock") > 0 ||
                breed.bred_for.toLowerCase().indexOf("herding reindeer, guardian, draft") > 0 ||
                breed.bred_for.toLowerCase().indexOf("cattle herding, ratting, driving cattle to market.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("herding, guard dog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("rid the home and farm of vermin, and hunt badger and fox") > 0 ||
                breed.bred_for.toLowerCase().indexOf("sheep guarding") > 0);
            } else if (responses.purpose === "guarding") {
              return (breed.bred_for.toLowerCase().indexOf("guarding") > 0 ||
                breed.bred_for.toLowerCase().indexOf("guard dogs, defending sheep from predators, mainly wolves, jackals and bears") > 0 ||
                breed.bred_for.toLowerCase().indexOf("guardian, hunting large game") > 0 ||
                breed.bred_for.toLowerCase().indexOf("guardian, cart pulling, hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("guardian, appearance.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("guarding inside the home, companion") > 0 ||
                breed.bred_for.toLowerCase().indexOf("farms, watchdog, guard duty") > 0 ||
                breed.bred_for.toLowerCase().indexOf("guardian") > 0 ||
                breed.bred_for.toLowerCase().indexOf("sheep guarding") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting, guarding") > 0);
            } else {
              return (breed.bred_for.toLowerCase().indexOf("companion") > 0 ||
                breed.bred_for.toLowerCase().indexOf("companion of kings") > 0 ||
                breed.bred_for.toLowerCase().indexOf("companionship") > 0 ||
                breed.bred_for.toLowerCase().indexOf("lapdog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("an elegant man's fashion statement") > 0 ||
                breed.bred_for.toLowerCase().indexOf("circus performer") > 0 ||
                breed.bred_for.toLowerCase().indexOf("ratting, lapdog, curio") > 0);
            }
          }
        }
        );
        // Final breed output
        console.log(tierFilteredBreedsArrLvl5);
      }
      )
    }


const displayChosenBreed = function () {

};

const displpayAltBreeds = function () {

};

const displayFeelingLucky = function () {

};

// Event listeners to trigger the above functions
takeQuizBtnEl.addEventListener('click', buttonClickHandler);
quizSubmitEl.addEventListener('click', quizSubmitHandler);
// feelingLuckyBtnEl.addEventListener('click', displayFeelingLucky);
