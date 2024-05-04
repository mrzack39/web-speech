// Get all DOM elements required
const voiceSelect = document.getElementById("voices"); // Select box for changing voices
const toggleBtn = document.getElementById("toggle"); // Toggle button to display custom text input
const closeBtn = document.getElementById("close"); // Button to close the custom text div
const customText = document.getElementById("text"); // Text area for custom text input
const readBtn = document.getElementById("read"); // Button to read the custom text input
const customTextDiv = document.getElementById("custom-text"); // Custom Text Div

// Array for all Web Speech API Voices
let voicesBackup = [];

// Functions
// Function to get voices from Web Speech API and put into the select box
function populateVoiceList() {
    if (typeof speechSynthesis === "undefined") {
        return;
    }

    let voices = speechSynthesis.getVoices();
    voicesBackup = voices;

    // Clear the select box
    voiceSelect.innerHTML = '';

    for (var i = 0; i < voices.length; i++) {
        var option = document.createElement("option");
        option.textContent = voices[i].name + " (" + voices[i].lang + ")";

        if (voices[i].default) {
            option.textContent += " -- DEFAULT";
        }

        option.setAttribute("data-lang", voices[i].lang);
        option.setAttribute("data-name", voices[i].name);
        voiceSelect.appendChild(option);
    }
}

// Function to set the text for speech synthesis
function setMessage(text) {
    message = new SpeechSynthesisUtterance();
    message.text = text;
}

// Function to speak the text
function speakText() {
    speechSynthesis.speak(message);
}

// Function to set the new voice
function setVoice(e) {
    message.voice = voicesBackup.find((voice) => voice.name === e.target.value);
}

// Event Listener for changing voices
voiceSelect.addEventListener("change", setVoice);

// Event Listener for custom text reader
readBtn.addEventListener("click", () => {
    setMessage(customText.value);
    speakText();
});

// Execute populateVoiceList function
populateVoiceList();
if (
    typeof speechSynthesis !== "undefined" &&
    speechSynthesis.onvoiceschanged !== undefined
) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Event Listener for toggling custom text div
toggleBtn.addEventListener("click", () => {
    customTextDiv.classList.toggle("show");
});

// Event Listener for closing custom text div
closeBtn.addEventListener("click", () => {
    customTextDiv.classList.remove("show");
});

// Get all boxes
const boxes = document.querySelectorAll(".box");

// Event Listener for each box to speak text when clicked
boxes.forEach(box => {
    box.addEventListener("click", () => {
        const text = box.querySelector(".imageInfo").textContent;
        setMessage(text);
        speakText();
    });
});
