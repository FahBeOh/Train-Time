// Initialize Firebase
var config = {
    apiKey: "AIzaSyCp5rXk7WrFArHOzannnHDKwzqhiwXlCfU",
    authDomain: "train-time-7f245.firebaseapp.com",
    databaseURL: "https://train-time-7f245.firebaseio.com",
    projectId: "train-time-7f245",
    storageBucket: "train-time-7f245.appspot.com",
    messagingSenderId: "868788133990"
};
firebase.initializeApp(config);

// Convenience variables
var database = firebase.database();

// Function that validates that user filled out each part of the form
function formvalidation() {
    var dateFormat = "HH:mm";
    if ($("#trainName").val().trim() === "" || $("#destination").val().trim() === "" || $("#time").val().trim() === "" || $("#frequency").val().trim() === "") {
        alert("poop monster")
    }
}

// When submit is clicked, values from input field are placed into 'newTrain' object, then the object is pushed to firebase
$("button").click(function () {
    formvalidation();
    var trainName = $("#trainName").val().trim();
    var destName = $("#destination").val().trim();
    var startTime = $("#time").val().trim();
    var freq = $("#frequency").val().trim();

    var newTrain = {
        tName: trainName,
        dName: destName,
        sTime: startTime,
        frequency: freq
    }
    database.ref().push(newTrain);

// Clear out input forms
    $("#trainName").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");
})

database.ref().on("child_added", function(childSnapshot, prevChildKey){
    var trainStored = childSnapshot.val().tName;
    var destinationStored = childSnapshot.val().dName;
    var timeStored = childSnapshot.val().startTime;
    var frequencyStored = childSnapshot.val().freq;
// WTF!!!!!!

    var goodTime = moment(timeStored).format("HH:mm");

    $("tbody").append("<tr><td>" + trainStored + "</td>" + "<td>" + destinationStored + "</td>" + "<td>" + frequencyStored + "</td></tr>");
})