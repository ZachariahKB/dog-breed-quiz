const url = `https://api.thedogapi.com/v1/breeds`;
const api_key = "live_Hub7CF5mUcP0zp9NtRWJf5gUHyJYswrPmmZUPq8TfUODueobaOpOEzZfeQgOLQLe"
let storedBreeds = []

fetch(url, {
  headers: {
    'x-api-key': api_key
  }
})
.then(response => response.json())
.then(data => {
  // Filter to only include breeds with an `image` object
  storedBreeds = data.filter(breed => breed.image?.url != null);

  // Populate the dropdown menu with breed names
  const breedSelector = document.getElementById('breed_selector');
  storedBreeds.forEach((breed, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.innerHTML = breed.name;
    breedSelector.appendChild(option);
  });
})
.catch(error => {
  console.log(error);
});

// Function to show breed image and temperament by breed name
function showBreedByName(breedName) {
  const breed = storedBreeds.find(breed => breed.name.toLowerCase() === breedName.toLowerCase());
  if (breed) {
    document.getElementById("breed_image").src = breed.image.url;
    document.getElementById("breed_json").textContent = breed.temperament;
    document.getElementById("breed_name").textContent = breed.name;
  } else {
    alert("Breed not found!");
  }
}

// Event listener for input field
document.getElementById("breed_input").addEventListener("change", function() {
  const breedName = this.value;
  showBreedByName(breedName);
});