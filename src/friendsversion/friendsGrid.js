$(window).on("load", function() {
  $("#usernameModal").modal("show");
});

function displayFriends(friend) {
  let newDiv = document.createElement("DIV");
  newDiv.className = "card";
  newDiv.width = "200";
  newDiv.style = "width: 7rem;";
  let img = new Image(),
    url = friend.photoUrl,
    container = document.getElementById("imageDisplay");

  let divBody = document.createElement("DIV");
  divBody.className = "card-body";

  let friendName = document.createElement("p");
  friendName.textContent = friend.name;
  friendName.className = "card-text";

  divBody.appendChild(friendName);
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

function listNamesForChoosing(friend) {
  let list = document.querySelector("#friendFormControlSelect1");
  let option = document.createElement("option");
  option.innerText = friend.name;
  list.appendChild(option);
}

let choosecharacterForm = document.querySelector("#characterForm");
let choosecharacter = document.querySelector("#friendFormControlSelect1");
let friendChosen = document.querySelector("#characterChosenTitle");

choosecharacterForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = choosecharacter.value;
  friendChosen.innerText = `your card: ${name}`;
});

for (let friend of friends) {
  displayFriends(friend);
  listNamesForChoosing(friend);
}
