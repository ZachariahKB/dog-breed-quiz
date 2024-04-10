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
  getBreeds();
  // displayChosenBreed();
  // displayAltBreeds();
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
        "Hunting, guarding",

        "Livestock guardian, hunting",
        "Guarding the homestead, farm work.",
        "Turkey retrieving",
        "Water retriever",
        "Big-game hunting",
        "Hunting rabbits",
        "Find and point gamebirds",
        "All purpose water dog, fishing aid",
        `Gundog, "swamp-tromping", flushing, pointing, and retrieving water fowl & game birds`,
        "Water retrieval dog in the marshes of romagna",
        "Big game hunting, guarding",
        "Good luck charms, mascots, watchdogs, herding dogs, and companions",
        `Luring ducks into traps - "tolling"`,
        "Hunt and kill vermin in stables",
        "Hunting in the mountains of japan, alert watchdog",
        "Large game trailing and versatile gundog",
        "Flushing and retrieving birds",
        "Pointing and trailing",
        "Accompanying ladies on long sea voyages, ratters onboard ship.",
        "Coursing, racing",
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

        "Livestock guardian, hunting",
        "Stock herding",
        "Guarding the homestead, farm work.",
        "Sheep herder",
        "Big game hunting, guarding",
        "Good luck charms, mascots, watchdogs, herding dogs, and companions",
        "Driving stock to market in northern wales",
      ],
      "guarding": [
        "Guarding",
        "Guard dogs, defending sheep from predators, mainly wolves, jackals and bears",
        "Guardian, hunting large game",
        "Guardian, cart pulling, hunting",
        "Guardian, appearance.",
        "Guarding inside the home, companion",
        "Farms, watchdog, guard duty",
        "Guardian",

        "Barge watchdog",
        "Good luck charms, mascots, watchdogs, herding dogs, and companions",
        "Hunting in the mountains of japan, alert watchdog",
        "Carriage dog - trot alongside carriages to protect the occupants from banditry or other interference",
        "Draft, search, rescue",
      ],
      "companionship": [
        "Companion",
        "Companion of kings",
        "Companionship",
        "Lapdog",
        "An elegant man's fashion statement",
        "Circus performer",
        "Ratting, lapdog, curio",
        "Good luck charms, mascots, watchdogs, herding dogs, and companions",
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
        if (responses.size === "nopref1") {
          return true;
        }

        return traitMapping.question1[responses.size].includes(breed.weight.imperial);
      });
      console.log("Size Filtered Breeds Array")
      console.log(sizeFilteredBreedsArr);

      // Energy Filter
      function filterBreedsByTemperament(breedsArr, energy) {
        if (energy === "nopref2") {
          return breedsArr; // Return the original array without applying any filters
        }

        return breedsArr.filter(function (breed) {
          if ("temperament" in breed) {
            const temperamentLowerCase = breed.temperament.toLowerCase();
            if (energy === "calm") {
              return (
                temperamentLowerCase.includes("calm") ||
                temperamentLowerCase.includes("aloof") ||
                temperamentLowerCase.includes("composed") ||
                temperamentLowerCase.includes("tranquil") ||
                temperamentLowerCase.includes("even tempered") ||
                temperamentLowerCase.includes("peaceful") ||
                temperamentLowerCase.includes("refined") ||
                temperamentLowerCase.includes("unflappable") ||
                temperamentLowerCase.includes("docile")
              );
            } else if (energy === "energetic") {
              return (
                temperamentLowerCase.includes("energetic") ||
                temperamentLowerCase.includes("active") ||
                temperamentLowerCase.includes("fun-loving") ||
                temperamentLowerCase.includes("spirited") ||
                temperamentLowerCase.includes("excitable") ||
                temperamentLowerCase.includes("bubbly") ||
                temperamentLowerCase.includes("adventurous") ||
                temperamentLowerCase.includes("wild") ||
                temperamentLowerCase.includes("hardworking") ||
                temperamentLowerCase.includes("courageous") ||
                temperamentLowerCase.includes("feisty")
              );
            }
          }
        },
        )
      }

      // Usage:
      const energyFilteredBreedsArr = filterBreedsByTemperament(baseBreedsArr, responses.energy);
      console.log("Energy Filtered Breeds Array")
      console.log(energyFilteredBreedsArr);

      // Tiered filter Lvl 2
      const tierFilteredBreedsArrLvl2 = filterBreedsByTemperament(sizeFilteredBreedsArr, responses.energy);
      console.log("Tier Filtered Breeds Array Lvl 2")
      console.log(tierFilteredBreedsArrLvl2);

      // Confidence Filter
      function filterBreedsByConfidence(breedsArr, confidence) {
        if (confidence === "nopref3") {
          return breedsArr; // Return the original array without applying any filters
        }

        return breedsArr.filter(function (breed) {
          if ("temperament" in breed) {
            const temperamentLowerCase = breed.temperament.toLowerCase();
            if (confidence === "confident") {
              return (
                temperamentLowerCase.includes("assertive") ||
                temperamentLowerCase.includes("fearless") ||
                temperamentLowerCase.includes("bold") ||
                temperamentLowerCase.includes("self-confident") ||
                temperamentLowerCase.includes("vigilant") ||
                temperamentLowerCase.includes("stubborn") ||
                temperamentLowerCase.includes("dominant") ||
                temperamentLowerCase.includes("strong willed") ||
                temperamentLowerCase.includes("determined") ||
                temperamentLowerCase.includes("vocal") ||
                temperamentLowerCase.includes("adaptable")
              );
            } else if (confidence === "reserved") {
              return (
                temperamentLowerCase.includes("shy") ||
                temperamentLowerCase.includes("reserved") ||
                temperamentLowerCase.includes("apprehensive") ||
                temperamentLowerCase.includes("nervous") ||
                temperamentLowerCase.includes("hesitant") ||
                temperamentLowerCase.includes("kind") ||
                temperamentLowerCase.includes("sweet-tempered")
              );
            }
          }
        });
      }

      // Usage:
      const confidenceFilteredBreedsArr = filterBreedsByConfidence(baseBreedsArr, responses.confidence);
      console.log("Confidence Filtered Breeds Array")
      console.log(confidenceFilteredBreedsArr);

      // Tiered filter Lvl 3
      const tierFilteredBreedsArrLvl3 = filterBreedsByConfidence(tierFilteredBreedsArrLvl2, responses.confidence);
      console.log("Tier Filtered Breeds Array Lvl 3")
      console.log(tierFilteredBreedsArrLvl3);

      // Affection Filter
      function filterBreedsByAffection(breedsArr, affection) {

        return breedsArr.filter(function (breed) {
          if (affection === "nopref4") {
            return breedsArr; // Return the original array without applying any filters
          }
          if ("temperament" in breed) {
            const temperamentLowerCase = breed.temperament.toLowerCase();
            if (affection === "independent") {
              return (
                temperamentLowerCase.includes("aloof") ||
                temperamentLowerCase.includes("dignified") ||
                temperamentLowerCase.includes("reserved") ||
                temperamentLowerCase.includes("receptive") ||
                temperamentLowerCase.includes("autonomous") ||
                temperamentLowerCase.includes("territorial") ||
                temperamentLowerCase.includes("dilligent") ||
                temperamentLowerCase.includes("mischievous") ||
                temperamentLowerCase.includes("curious")
              );
            } else if (affection === "affectionate") {
              return (
                temperamentLowerCase.includes("loving") ||
                temperamentLowerCase.includes("faithful") ||
                temperamentLowerCase.includes("friendly") ||
                temperamentLowerCase.includes("warm-hearted") ||
                temperamentLowerCase.includes("devoted") ||
                temperamentLowerCase.includes("sociable") ||
                temperamentLowerCase.includes("trusting") ||
                temperamentLowerCase.includes("protective") ||
                temperamentLowerCase.includes("benevolent") ||
                temperamentLowerCase.includes("dutiful") ||
                temperamentLowerCase.includes("good-natured") ||
                temperamentLowerCase.includes("gay")
              );
            }
          }
        });
      }

      // Usage:
      const affectionFilteredBreedsArr = filterBreedsByAffection(baseBreedsArr, responses.affection);
      console.log("Affection Filtered Breeds Array")
      console.log(affectionFilteredBreedsArr);

      // Tiered filter Lvl 4
      const tierFilteredBreedsArrLvl4 = filterBreedsByAffection(tierFilteredBreedsArrLvl3, responses.affection);
      console.log("Tier Filtered Breeds Array Lvl 4")
      console.log(tierFilteredBreedsArrLvl4);

      function filterBreedsByPurpose(breedsArr, purpose) {
        if (purpose === "nopref5") {
          return breedsArr; // Return the original array without applying any filters
        }

        return breedsArr.filter(function (breed) {
          if ("bred_for" in breed) {
            const bredForLowerCase = breed.bred_for.toLowerCase();
            if (purpose === "hunting") {
              return (
                bredForLowerCase.includes("small rodent hunting, lapdog") ||
                bredForLowerCase.includes("fox hunting, scent hound") ||
                bredForLowerCase.includes("badger, otter hunting") ||
                bredForLowerCase.includes("hunting bears") ||
                bredForLowerCase.includes("hunting raccoon, deer, bear, and cougar.") ||
                bredForLowerCase.includes("boar herding, hunting, guarding") ||
                bredForLowerCase.includes("rabbit, hare hunting") ||
                bredForLowerCase.includes("hunting water game") ||
                bredForLowerCase.includes("hunting on foot.") ||
                bredForLowerCase.includes("hunting by scent") ||
                bredForLowerCase.includes("hunting rats") ||
                bredForLowerCase.includes("fox bolting") > 0 ||
                bredForLowerCase.includes("hunting with a superior sense of smell.") > 0 ||
                bredForLowerCase.includes("hunting raccoons, night hunting") > 0 ||
                bredForLowerCase.includes("coursing wolves, elk") > 0 ||
                bredForLowerCase.includes("coursing hares") > 0 ||
                bredForLowerCase.includes("coursing gazelle and hare") > 0 ||
                bredForLowerCase.includes("coursing deer") > 0 ||
                bredForLowerCase.includes("bolting of otter, foxes, other vermin") > 0 ||
                bredForLowerCase.includes("bird setting, retrieving") > 0 ||
                bredForLowerCase.includes("bird flushing, retrieving") > 0 ||
                bredForLowerCase.includes("bird flushing and retrieving") > 0 ||
                bredForLowerCase.includes("hunting the american woodcock") > 0 ||
                bredForLowerCase.includes("small vermin hunting") > 0 ||
                bredForLowerCase.includes("livestock guardian, hunting") > 0 ||
                bredForLowerCase.includes("guarding the homestead, farm work.") > 0 ||
                bredForLowerCase.includes("turkey retrieving") > 0 ||
                bredForLowerCase.includes("water retriever") > 0 ||
                bredForLowerCase.includes("big-game hunting") > 0 ||
                bredForLowerCase.includes("hunting rabbits") > 0 ||
                bredForLowerCase.includes("find and point gamebirds") > 0 ||
                bredForLowerCase.includes("all purpose water dog, fishing aid") > 0 ||
                bredForLowerCase.includes(`gundog, "swamp-tromping", flushing, pointing, and retrieving water fowl & game birds`) > 0 ||
                bredForLowerCase.includes("water retrieval dog in the marshes of romagna") > 0 ||
                bredForLowerCase.includes("big game hunting, guarding") > 0 ||
                bredForLowerCase.includes("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                bredForLowerCase.includes(`luring ducks into traps - "tolling"`) > 0 ||
                bredForLowerCase.includes("hunt and kill vermin in stables") > 0 ||
                bredForLowerCase.includes("hunting in the mountains of japan, alert watchdog") > 0 ||
                bredForLowerCase.includes("large game trailing and versatile gundog") > 0 ||
                bredForLowerCase.includes("hunting the american woodcock") > 0 ||
                bredForLowerCase.includes("flushing and retrieving birds") > 0 ||
                bredForLowerCase.includes("pointing and trailing") > 0 ||
                bredForLowerCase.includes("accompanying ladies on long sea voyages, ratters onboard ship.") > 0 ||
                bredForLowerCase.includes("coursing, racing") > 0 ||
                bredForLowerCase.includes("hunting big-game like boar.") > 0 ||
                bredForLowerCase.includes("general hunting") > 0 ||
                bredForLowerCase.includes("hunting birds, small mammals") > 0 ||
                bredForLowerCase.includes("hunting, guarding") > 0)
            } else if (purpose === "herding") {
              return (
                bredForLowerCase.includes("sheep herding") ||
                bredForLowerCase.includes("cattle herding") ||
                bredForLowerCase.includes("cattle droving") ||
                bredForLowerCase.includes("driving livestock") ||
                bredForLowerCase.includes("driving sheep, cattle") ||
                bredForLowerCase.includes("herding & guarding livestock, farm watch dog") ||
                bredForLowerCase.includes("herding livestock") ||
                bredForLowerCase.includes("herding reindeer, guardian, draft") > 0 ||
                bredForLowerCase.includes("cattle herding, ratting, driving cattle to market.") > 0 ||
                bredForLowerCase.includes("herding, guard dog") > 0 ||
                bredForLowerCase.includes("rid the home and farm of vermin, and hunt badger and fox") > 0 ||
                bredForLowerCase.includes("livestock guardian, hunting") > 0 ||
                bredForLowerCase.includes("stock herding") > 0 ||
                bredForLowerCase.includes("guarding the homestead, farm work.") > 0 ||
                bredForLowerCase.includes("sheep herder") > 0 ||
                bredForLowerCase.includes("big game hunting, guarding") > 0 ||
                bredForLowerCase.includes("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                bredForLowerCase.includes("driving stock to market in northern wales") > 0 ||
                bredForLowerCase.includes("sheep guarding") > 0)
            } else if (purpose === "guarding") {
              return (
                bredForLowerCase.includes("guarding") ||
                bredForLowerCase.includes("guard dogs, defending sheep from predators, mainly wolves, jackals and bears") ||
                bredForLowerCase.includes("guardian, hunting large game") ||
                bredForLowerCase.includes("guardian, cart pulling, hunting") ||
                bredForLowerCase.includes("guardian, appearance.") ||
                bredForLowerCase.includes("guarding inside the home, companion") ||
                bredForLowerCase.includes("farms, watchdog, guard duty") > 0 ||
                bredForLowerCase.includes("guardian") > 0 ||
                bredForLowerCase.includes("sheep guarding") > 0 ||
                bredForLowerCase.includes("barge watchdog") > 0 ||
                bredForLowerCase.includes("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                bredForLowerCase.includes("hunting in the mountains of japan, alert watchdog") > 0 ||
                bredForLowerCase.includes("carriage dog - trot alongside carriages to protect the occupants from banditry or other interference") > 0 ||
                bredForLowerCase.includes("draft, search, rescue") > 0 ||
                bredForLowerCase.includes("hunting, guarding") > 0)
            } else {
              // Default case for companion breeds
              return (
                bredForLowerCase.includes("companion") ||
                bredForLowerCase.includes("companion of kings") ||
                bredForLowerCase.includes("companionship") > 0 ||
                bredForLowerCase.includes("lapdog") > 0 ||
                bredForLowerCase.includes("an elegant man's fashion statement") > 0 ||
                bredForLowerCase.includes("circus performer") > 0 ||
                bredForLowerCase.includes("lapdog") > 0 ||
                bredForLowerCase.includes("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                bredForLowerCase.includes("accompanying ladies on long sea voyages, ratters onboard ship.") > 0 ||
                bredForLowerCase.includes("swimming, carrying backpacks, pulling carts or sleds") > 0 ||
                bredForLowerCase.includes("ratting, lapdog, curio") > 0);
            }
          }
        },
        )
      }
      // Usage:
      const purposeFilteredBreedsArr = filterBreedsByPurpose(baseBreedsArr, responses.purpose);
      console.log("Purpose Filtered Breeds Array")
      console.log(purposeFilteredBreedsArr);

      // Tiered filter Lvl 5 - Final
      const tierFilteredBreedsArrLvl5 = filterBreedsByPurpose(tierFilteredBreedsArrLvl4, responses.purpose);
      console.log(tierFilteredBreedsArrLvl5)
      console.log(`Final Results: ${JSON.stringify(tierFilteredBreedsArrLvl5)}`)
    })
};

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