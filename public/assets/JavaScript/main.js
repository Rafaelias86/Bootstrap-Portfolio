const functions = require('firebase-functions');
const request = require('request-promise');

const apiKey = functions.config().main.apikey;
const SenderId = functions.config().main.senderid;
const appId = functions.config().main.appid;


 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: apikey,
    authDomain: "portfolio-contact-form-d66e1.firebaseapp.com",
    databaseURL: "https://portfolio-contact-form-d66e1.firebaseio.com",
    projectId: "portfolio-contact-form-d66e1",
    storageBucket: "portfolio-contact-form-d66e1.appspot.com",
    messagingSenderId: senderid,
    appId: appid
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//Message collection reference
                    
var messagesRef = firebase.database().ref("messages");


//Listen for form submit

var contact = document.getElementById("contactForm");
if(contact){
    contact.addEventListener("submit", submitForm);
}


//Submit form
function submitForm(e){
    e.preventDefault();

    //get values
    var name = getInputVal("name");
    var email = getInputVal("email");
    var phone = getInputVal("phone");
    var message = getInputVal("message");

    // Save message
    saveMessage(name, email, phone, message);

    //Show alert 
    document.querySelector(".alert").style.display = "block";
    //Hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    //Clear form
    document.getElementById("contactForm").reset();
}

//Function to get values from values
function getInputVal(id){
    return document.getElementById(id).value;
}

//Save message to firebase
function saveMessage(name, email, phone, message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        phone: phone,
        message: message
    });
}

// Button to show more projects in portfolio
var showMoreButton = document.getElementById("show-more");
var hidden = document.getElementsByClassName("hidden");

//function to display more projects in the portfolio
function showMore(){
    for (var i=0;i<hidden.length;i+=1){
        hidden[i].style.display = "block";
      }
}

showMoreButton.addEventListener("click", function(){
    showMore();
});
