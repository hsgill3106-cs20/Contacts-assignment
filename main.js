// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById("go-btn");
let menuEl = document.getElementById("menu");
let outputEl = document.getElementById("output");

//GLOBAL VARIABLES
let contacts = loadContacts();
displayContacts();
// Go Btn - Menu Listener
goBtnEl.addEventListener("click", goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === "display-all") {
    displayContacts();
  } else if (selection === "add") {
    addContact();
  } else if (selection === "remove") {
    removeContact();
  } else if (selection === "display-name") {
    displayByName();
  } else if (selection === "display-country") {
    displayByCountry();
  } else if (selection === "find-email") {
    findByEmail();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let divSTR = "";
  for (let i = 0; i < contacts.length; i++) {
    divSTR += contactHTML(contacts[i], i);
  }
  outputEl.innerHTML = divSTR;
}
function addContact() {
  let contactName = prompt("Enter the name of the Contact");
  let contactEmail = prompt("Enter the Contact's Email");
  let contactNumber = prompt("Enter the phone number of the Contact");
  let contactCountry = prompt("Enter country of the contact");
  contacts.push(
    newContact(contactName, contactEmail, contactNumber, contactCountry)
  );
  saveContacts();
  displayContacts();
  console.log(contacts);
}

function removeContact() {
  let index = +prompt("Enter the number assigned to the Contact");
  if (index >= 0 && index < contacts.length) {
    contacts.splice(index, 1);
    saveContacts();
    displayContacts();
  } else {
    alert("Invalid number");
  }
}

function displayByName() {
  let Nameprompt = prompt("Please Enter a Name");
  let divSTR = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].contactName === Nameprompt) {
      divSTR += contactHTML(contacts[i], i);
    }
  }
  outputEl.innerHTML = divSTR;
}

function displayByCountry() {
  let Countryprompt = prompt("Please Enter the Name of a Country");
  let divSTR = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].contactCountry === Countryprompt) {
      divSTR += contactHTML(contacts[i], i);
    }
  }
  outputEl.innerHTML = divSTR;
}

function findByEmail() {
  index = 0;
  let emailprompt = prompt("Enter Email");
  for (let i = 0; i < contacts.length; i++) {
    if (emailprompt === contacts[i].contactEmail) {
      index++;
    }
  }
  console.log(index);
}

//HELPER FUNCTIONS
function newContact(Name, Email, Number, Country) {
  return {
    contactName: Name,
    contactEmail: Email,
    contactNumber: Number,
    contactCountry: Country,
  };
}
function contactHTML(contactOBJ, i) {
  return `
  <div>
  <p>
  <strong>${i}: ${contactOBJ.contactName}</strong>
   </p>
   <p>
  ${contactOBJ.contactEmail}
  </p>
  <p>
  ${contactOBJ.contactNumber} (${contactOBJ.contactCountry})
  </p>
</div>`;
}

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts() {
  let ContactStr = localStorage.getItem("contacts");
  return JSON.parse(ContactStr) ?? [];
}
