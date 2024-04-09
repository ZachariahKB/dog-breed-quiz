const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": "live_Lh6idGIX2s0O1fSTNNNZgzh7TIrEKbLJbyj3sglCt6SuVDT7mcN4JhVL2kvJA5MO"
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

function getBreeds() {
  let breedArr = []
  return new Promise ((resolve,reject){
    for (let i = 0; i < 8; i++) {
      fetch(`https://api.thedogapi.com/v1/breeds?limit=20&page=${i}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          breedArr = breedArr.concat(result)
          //console.log(breedArr)
        }
        )
        .catch(error => console.log('error', error));
  
    }
    if(breedArr.length>150)


  })
  
  console.log (breedArr)
}
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

getBreeds()