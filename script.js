const voiceSelect = document.getElementById("voices"); 
const toggleBtn = document.getElementById("toggle"); 
const closeBtn = document.getElementById("close"); 
const customText = document.getElementById("text"); 
const readBtn = document.getElementById("read"); 
const customTextDiv = document.getElementById("custom-text"); 

let voicesBackup = [];
function populateVoiceList() {
    if (typeof speechSynthesis === "undefined") {
        return;
    }

    let voices = speechSynthesis.getVoices();
    voicesBackup = voices;
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

function setMessage(text) {
    message = new SpeechSynthesisUtterance();
    message.text = text;
}
function speakText() {
    speechSynthesis.speak(message);
}

function setVoice(e) {
    message.voice = voicesBackup.find((voice) => voice.name === e.target.value);
}

voiceSelect.addEventListener("change", setVoice);

readBtn.addEventListener("click", () => {
    setMessage(customText.value);
    speakText();
});

populateVoiceList();
if (
    typeof speechSynthesis !== "undefined" &&
    speechSynthesis.onvoiceschanged !== undefined
) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

toggleBtn.addEventListener("click", () => {
    customTextDiv.classList.toggle("show");
});

closeBtn.addEventListener("click", () => {
    customTextDiv.classList.remove("show");
});

const boxes = document.querySelectorAll(".box");

boxes.forEach(box => {
    box.addEventListener("click", () => {
        const text = box.querySelector(".imageInfo").textContent;
        setMessage(text);
        speakText();
    });
});
