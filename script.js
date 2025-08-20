// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Fill available voices into dropdown
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle(); // Restart speaking with new voice if already speaking
}

// Speak the text
function toggle(startOver = true) {
  speechSynthesis.cancel(); // stop current speech
  if (startOver && msg.text.trim() !== "") {
    speechSynthesis.speak(msg);
  }
}

// Update options (rate, pitch, text)
function setOption() {
  msg[this.name] = this.value;
}

// Event Listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', () => toggle(true));
stopButton.addEventListener('click', () => toggle(false));

// Default text
msg.text = document.querySelector('[name="text"]').value;
