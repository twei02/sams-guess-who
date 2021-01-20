let socket;

window.addEventListener("load", () => {
  socket = io.connect("https://sams-guess-who.glitch.me/");
  const form = document.querySelector("#question-form");
  const textArea = document.querySelector("#question-form textarea");

  let name = prompt("enter your name");
  if (name.length === 0) {
    name = "anonymous";
  }
  printMessageFromServer("you joined");
  socket.emit("name", name);

  socket.on("message", data => {
    printMessageFromServer(`${data.name}: ${data.message}`);
  });

  socket.on("user-connected", name => {
    printMessageFromServer(`${name} connected`);
  });
  
  socket.on("user-disconnected", name => {
    printMessageFromServer(`${name} disconnected`)
  })

  form.addEventListener("submit", e => {
    e.preventDefault();
    const message = textArea.value;
    printMessageFromServer(`${name} (you): ${message}`);
    socket.emit("message", message);
    textArea.value = "";
  });
});

function printMessageFromServer(message) {
  const chatList = document.querySelector("#chat");
  const line = document.createElement("li");
  line.innerText = message;
  chatList.appendChild(line);
}
