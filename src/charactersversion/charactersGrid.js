function displayCharacters(character) {
  let newDiv = document.createElement("DIV");
  newDiv.className = "card";
  newDiv.width = "200";
  newDiv.style = "width: 7rem;";
  let img = new Image(),
    url = character.photoUrl,
    container = document.getElementById("imageDisplay");

  let divBody = document.createElement("DIV");
  divBody.className = "card-body";

  let characterName = document.createElement("p");
  characterName.textContent = character.name;
  characterName.className = "card-text";

  let characterShow = document.createElement("p");
  characterShow.textContent = `(${character.show})`;
  characterShow.className = "card-text";

  divBody.appendChild(characterName);
  divBody.appendChild(characterShow);
  img.onload = function() {
    newDiv.appendChild(img);
    newDiv.appendChild(divBody);
    container.appendChild(newDiv);
  };
  img.src = url;
  img.className = "card-img-top";
  img.height = "120";

  let isGrayscale = false;
  img.onclick = function() {
    isGrayscale = !isGrayscale;
    if (isGrayscale) {
      img.style.filter = "grayscale(100)";
    } else {
      img.style.filter = "grayscale(0)";
    }
  };
}

function listNamesForChoosing(character) {
  let list = document.querySelector("#cardFormControlSelect1");
  let option = document.createElement("option");
  option.innerText = `${character.name} (${character.show})`;
  list.appendChild(option);
}

let choosecharacterForm = document.querySelector("#characterForm");
let choosecharacter = document.querySelector("#cardFormControlSelect1");
let characterChosen = document.querySelector("#characterChosenTitle");

choosecharacterForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = choosecharacter.value;
  characterChosen.innerText = `your card: ${name}`;
});

for (let character of characters) {
  displayCharacters(character);
  listNamesForChoosing(character);
}
