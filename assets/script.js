const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key":
    "live_Lh6idGIX2s0O1fSTNNNZgzh7TIrEKbLJbyj3sglCt6SuVDT7mcN4JhVL2kvJA5MO",
});

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

async function getBreeds() {
  let breedArr = [];
  try {
    for (let i = 0; i < 10; i++) {
      const response = await fetch(
        `https://api.thedogapi.com/v1/breeds?limit=20&page=${i}`,
        requestOptions
      );
      const result = await response.json();
      breedArr = breedArr.concat(result);
    }
    return breedArr;
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
}

async function fetchData() {
  try {
    const breedsData = await getBreeds();
    filterDataByUserChoice(breedsData);
  } catch (error) {
    console.error("Error:", error);
  }
}

function filterDataByUserChoice(breedsData) {
  console.log(breedsData);
  const result = [];
  breedsData.forEach((breed) => {
    const { temperament } = breed;
    if (temperament) {
      const arr = temperament.split(", ");
      console.log(arr);
      if (arr.includes("Gay")) {
        result.push(breed);
      }
      
    }
  });
  console.log(result);
}

fetchData();

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

fetchData()