const getBreeds2 = function () {
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
                "hunting big-game like Boar.",
                "general hunting",
                "hunting birds, small mammals",
                "hunting, guarding",
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
  
                "Barge watchdog",
                "Good luck charms, mascots, watchdogs, herding dogs, and companions",
                "Hunting in the mountains of japan, alert watchdog",
                "Carriage dog - trot alongside carriages to protect the occupants from banditry or other interference",
                "Draft, search, rescue",
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
            console.log("Size Filtered Breeds Array")
            console.log(sizeFilteredBreedsArr);
  
            // Energy Filter
            function filterBreedsByTemperament(breedsArr, energy) {
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
                });
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
                                bredForLowerCase.includes("hunting big-game like Boar.") > 0 ||
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
            console.log(purposeFilteredBreedsArr);
  
            // Tiered filter Lvl 5 - Final
            const tierFilteredBreedsArrLvl5 = filterBreedsByPurpose(tierFilteredBreedsArrLvl4, responses.purpose);
            console.log(tierFilteredBreedsArrLvl5)
            console.log(`Final Results: ${json.stringify(tierFilteredBreedsArrLvl5)}`)
        })
  };




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
          "hunting big-game like Boar.",
          "general hunting",
          "hunting birds, small mammals",
          "hunting, guarding",
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
  
          "Barge watchdog",
          "Good luck charms, mascots, watchdogs, herding dogs, and companions",
          "Hunting in the mountains of japan, alert watchdog",
          "Carriage dog - trot alongside carriages to protect the occupants from banditry or other interference",
          "Draft, search, rescue",
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
                breed.bred_for.toLowerCase().indexOf("livestock guardian, hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("guarding the homestead, farm work.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("turkey retrieving") > 0 ||
                breed.bred_for.toLowerCase().indexOf("water retriever") > 0 ||
                breed.bred_for.toLowerCase().indexOf("big-game hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting rabbits") > 0 ||
                breed.bred_for.toLowerCase().indexOf("find and point gamebirds") > 0 ||
                breed.bred_for.toLowerCase().indexOf("all purpose water dog, fishing aid") > 0 ||
                breed.bred_for.toLowerCase().indexOf(`gundog, "swamp-tromping", flushing, pointing, and retrieving water fowl & game birds`) > 0 ||
                breed.bred_for.toLowerCase().indexOf("water retrieval dog in the marshes of romagna") > 0 ||
                breed.bred_for.toLowerCase().indexOf("big game hunting, guarding") > 0 ||
                breed.bred_for.toLowerCase().indexOf("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                breed.bred_for.toLowerCase().indexOf(`luring ducks into traps - "tolling"`) > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunt and kill vermin in stables") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting in the mountains of japan, alert watchdog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("large game trailing and versatile gundog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting the american woodcock") > 0 ||
                breed.bred_for.toLowerCase().indexOf("flushing and retrieving birds") > 0 ||
                breed.bred_for.toLowerCase().indexOf("pointing and trailing") > 0 ||
                breed.bred_for.toLowerCase().indexOf("accompanying ladies on long sea voyages, ratters onboard ship.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("coursing, racing") > 0 ||
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
                breed.bred_for.toLowerCase().indexOf("livestock guardian, hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("stock herding") > 0 ||
                breed.bred_for.toLowerCase().indexOf("guarding the homestead, farm work.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("sheep herder") > 0 ||
                breed.bred_for.toLowerCase().indexOf("big game hunting, guarding") > 0 ||
                breed.bred_for.toLowerCase().indexOf("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                breed.bred_for.toLowerCase().indexOf("driving stock to market in northern wales") > 0 ||
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
                breed.bred_for.toLowerCase().indexOf("barge watchdog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting in the mountains of japan, alert watchdog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("carriage dog - trot alongside carriages to protect the occupants from banditry or other interference") > 0 ||
                breed.bred_for.toLowerCase().indexOf("draft, search, rescue") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting, guarding") > 0);
            } else {
              return (breed.bred_for.toLowerCase().indexOf("companion") > 0 ||
                breed.bred_for.toLowerCase().indexOf("companion of kings") > 0 ||
                breed.bred_for.toLowerCase().indexOf("companionship") > 0 ||
                breed.bred_for.toLowerCase().indexOf("lapdog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("an elegant man's fashion statement") > 0 ||
                breed.bred_for.toLowerCase().indexOf("circus performer") > 0 ||
                breed.bred_for.toLowerCase().indexOf("lapdog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                breed.bred_for.toLowerCase().indexOf("accompanying ladies on long sea voyages, ratters onboard ship.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("swimming, carrying backpacks, pulling carts or sleds") > 0 ||
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
                breed.bred_for.toLowerCase().indexOf("livestock guardian, hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("guarding the homestead, farm work.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("turkey retrieving") > 0 ||
                breed.bred_for.toLowerCase().indexOf("water retriever") > 0 ||
                breed.bred_for.toLowerCase().indexOf("big-game hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting rabbits") > 0 ||
                breed.bred_for.toLowerCase().indexOf("find and point gamebirds") > 0 ||
                breed.bred_for.toLowerCase().indexOf("all purpose water dog, fishing aid") > 0 ||
                breed.bred_for.toLowerCase().indexOf(`gundog, "swamp-tromping", flushing, pointing, and retrieving water fowl & game birds`) > 0 ||
                breed.bred_for.toLowerCase().indexOf("water retrieval dog in the marshes of romagna") > 0 ||
                breed.bred_for.toLowerCase().indexOf("big game hunting, guarding") > 0 ||
                breed.bred_for.toLowerCase().indexOf("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                breed.bred_for.toLowerCase().indexOf(`luring ducks into traps - "tolling"`) > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunt and kill vermin in stables") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting in the mountains of japan, alert watchdog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("large game trailing and versatile gundog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting the american woodcock") > 0 ||
                breed.bred_for.toLowerCase().indexOf("flushing and retrieving birds") > 0 ||
                breed.bred_for.toLowerCase().indexOf("pointing and trailing") > 0 ||
                breed.bred_for.toLowerCase().indexOf("accompanying ladies on long sea voyages, ratters onboard ship.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("coursing, racing") > 0 ||
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
                breed.bred_for.toLowerCase().indexOf("livestock guardian, hunting") > 0 ||
                breed.bred_for.toLowerCase().indexOf("stock herding") > 0 ||
                breed.bred_for.toLowerCase().indexOf("guarding the homestead, farm work.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("sheep herder") > 0 ||
                breed.bred_for.toLowerCase().indexOf("big game hunting, guarding") > 0 ||
                breed.bred_for.toLowerCase().indexOf("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                breed.bred_for.toLowerCase().indexOf("driving stock to market in northern wales") > 0 ||
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
                breed.bred_for.toLowerCase().indexOf("barge watchdog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting in the mountains of japan, alert watchdog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("carriage dog - trot alongside carriages to protect the occupants from banditry or other interference") > 0 ||
                breed.bred_for.toLowerCase().indexOf("draft, search, rescue") > 0 ||
                breed.bred_for.toLowerCase().indexOf("hunting, guarding") > 0);
            } else {
              return (breed.bred_for.toLowerCase().indexOf("companion") > 0 ||
                breed.bred_for.toLowerCase().indexOf("companion of kings") > 0 ||
                breed.bred_for.toLowerCase().indexOf("companionship") > 0 ||
                breed.bred_for.toLowerCase().indexOf("lapdog") > 0 ||
                breed.bred_for.toLowerCase().indexOf("an elegant man's fashion statement") > 0 ||
                breed.bred_for.toLowerCase().indexOf("circus performer") > 0 ||
                breed.bred_for.toLowerCase().indexOf("good luck charms, mascots, watchdogs, herding dogs, and companions") > 0 ||
                breed.bred_for.toLowerCase().indexOf("accompanying ladies on long sea voyages, ratters onboard ship.") > 0 ||
                breed.bred_for.toLowerCase().indexOf("swimming, carrying backpacks, pulling carts or sleds") > 0 ||
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
  