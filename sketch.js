
// SPEECH TO TEXT

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.variable');

// SLIDERS

let weightSlider;
let widthSlider;
let variable;
let sizeSlider;
let opticalSize;
let xOpaque;
let grade;



// SETUP

function setup() {
  noCanvas();
  
  weightSlider = createSlider(100, 900, 500);
  weightSlider.position(20,40);
  weightSlider.style('width', '180px');
  
  widthSlider = createSlider(35, 100, 50);
  widthSlider.position(20,60);
  widthSlider.style('width', '180px');

  opticalSize = createSlider(10, 50, 30);
  opticalSize.position(20,80);
  opticalSize.style('width', '180px');

  xOpaque = createSlider(5, 300, 100);
  xOpaque.position(20,100);
  xOpaque.style('width', '180px');

  // grade = createSlider(25, 150, 100);
  // grade.position(20,120);
  // grade.style('width', '180px');
  
  variable = select('.variable');
}

// SPEECH TO TEXT

document.body.onkeydown = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {

  var words = event.results[0][0].transcript;
  diagnostic.textContent = words;
  console.log('Confidence: ' + event.results[0][0].confidence);
}

// DRAW

function draw() {

  variable.style('font-variation-settings', 
  "'wght' " + weightSlider.value() + 
  ", 'wdth' " + widthSlider.value() +
  ", 'opsz' " + opticalSize.value() +
  ", 'XOPQ' " + xOpaque.value()
  );
}

recognition.onspeechend = function() {
  recognition.stop();
}