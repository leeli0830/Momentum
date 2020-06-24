const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

// When this function is called with a text input,
// USER_LS will store the text input.
function saveName(text) {
  localStorage.setItem(USER_LS, text); // Function "setItem" => first argument = second argument
}

// When submission occurs, this function
// 1. Prevents refreshment of the page
// 2. Updates "currentValue" with given input from the form
// 3. Calls paintGreeting() and saveName() => both functions accepts "currentValue"
function handleSubmit(event) {
  event.preventDefault(); // When event happens page refreshed, this function prevents the default reaction
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

// This function adds "showing" to HTML class => shows form for name
// When this function detects submission, it calls handleSubmit()
function askForName() {
  form.classList.add(SHOWING_CN); // "showing" is added => "What is you name?" form shows up
  form.addEventListener("submit", handleSubmit);
}

// This function removes "showing" from HTML class => removes form for name
//               adds "showing" to HTML class => shows greeting ("Hello" + name)
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `${getTimeGreeting()} ${text}`;
}

// This function checks if local storage has a name of user
// If the storage is empty => calls askForName()
// Otherwise => calls paintGreeting()
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

// This function checks local time and returns corresponding greeting message.
function getTimeGreeting() {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 5 && hours <= 11) {
    return "Good Morning ";
  } else if (hours >= 12 && hours <= 17) {
    return "Good Afternoon ";
  } else {
    return "Good Evening";
  }
}

// This function calls loadName();
function init() {
  loadName();
}

init();
