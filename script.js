
// Global variables
let bilderanzahl = 54; //Anzahl bm bilder ab 0 (+1)
let modus = 1;
let audioV = 0;
let untenzahl = 0;
let KB = 0;
let Probenanzahl = 500;
let ss = 0;
let GL = 8;
let GS = 12;
let AV = 1;





// Constants for localStorage keys
const STORAGE_KEYS = {
  KBSPEICH: "KBSPEICH",
  LSPEICH: "LSPEICH",
  KZSPEICH: "KZSPEICH",
  RHSPEICH: "RHSPEICH",
  KBSPEICHneu: "KBSPEICHneu",
  KZSPEICHneu: "KZSPEICHneu",
  RHSPEICHneu: "RHSPEICHneu",
  LSPEICHneu: "LSPEICHneu",
  KBSPEICHmonat: "KBSPEICHmonat",
  KZSPEICHmonat: "KZSPEICHmonat",
  RHSPEICHmonat: "RHSPEICHmonat",
  LSPEICHmonat: "LSPEICHmonat",
  KBzeitspeicher: "KBzeitspeicher",
};


// Initialize the application on window load
window.onload = function () {
  neuerTagTest();
  neuerMonatTest();
  setUpInitialView();
  clearTemporaryStorage();
  hideElementsOnLoad();
  updateStatistics();
};

// Function to set up the initial view
function setUpInitialView() {
  standardImage();
  localStorage.setItem(STORAGE_KEYS.KBzeitspeicher, Date.now());
}

// Function to clear temporary storage
function clearTemporaryStorage() {
  localStorage.removeItem(STORAGE_KEYS.LSPEICHneu);
  localStorage.removeItem(STORAGE_KEYS.KBSPEICHneu);
  localStorage.removeItem(STORAGE_KEYS.KZSPEICHneu);
  localStorage.removeItem(STORAGE_KEYS.RHSPEICHneu);
}

// Function to hide elements on load
function hideElementsOnLoad() {
  document.getElementById("aktivcanvasdiv").style.display = "none";
  document.getElementById("Ldiv").style.display = "none";
  document.getElementById("aktivdiv").style.display = "none";
  document.getElementById("sta_div").style.display = "none";
  document.getElementById("table2").style.display = "none";
  document.getElementById("details").innerHTML = "Tage anzeigen";
}

// Function to update statistics on the page
function updateStatistics() {
  updateMonthlyStatistics();
  updateDailyStatistics();
}

// Function to update monthly statistics
function updateMonthlyStatistics() {
  document.getElementById("monat").innerHTML =
    localStorage.getItem(STORAGE_KEYS.KBSPEICHmonat) || "0";
  document.getElementById("monatKZ").innerHTML =
    localStorage.getItem(STORAGE_KEYS.KZSPEICHmonat) || "0";
  document.getElementById("monatRH").innerHTML =
    localStorage.getItem(STORAGE_KEYS.RHSPEICHmonat) || "0";
  document.getElementById("monatL").innerHTML =
    localStorage.getItem(STORAGE_KEYS.LSPEICHmonat) || "0";
}

// Function to update daily statistics
function updateDailyStatistics() {
  document.getElementById("heute").innerHTML =
    localStorage.getItem(STORAGE_KEYS.KBSPEICH) || "0";
  document.getElementById("heuteL").innerHTML =
    localStorage.getItem(STORAGE_KEYS.LSPEICH) || "0";
  document.getElementById("heuteKZ").innerHTML =
    localStorage.getItem(STORAGE_KEYS.KZSPEICH) || "0";
  document.getElementById("heuteRH").innerHTML =
    localStorage.getItem(STORAGE_KEYS.RHSPEICH) || "0";
}

// Function to display statistics
function sta_zeigen() {
  const d = new Date();
  document.getElementById("datum").innerHTML =
    d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

  const monthNames = [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ];
  let monthName = monthNames[d.getMonth()];
  const monate = document.getElementsByClassName("monats");
  for (let i = 0; i < d.getDate(); i++) {
    monate[i].innerHTML = i + 1 + "." + monthName;
  }

  const daysInMonth = d.getDate();
  updateAverageValues(daysInMonth);
  document.getElementById("sta_div").style.display = "";
  document.getElementById("aktivcanvasdiv").style.display = "none";
  document.getElementById("aktivdiv").style.display = "none";
  document.getElementById("startdiv").style.display = "none";
  document.getElementById("monatname").innerHTML = monthName;

  // Update exercise tables
  updateExerciseTables();
}

// Function to update average values
function updateAverageValues(daysInMonth) {
  document.getElementById("mittelwert").innerHTML = Math.round(
    (parseInt(localStorage.getItem(STORAGE_KEYS.KBSPEICHmonat)) || 0) /
      daysInMonth
  );
  document.getElementById("mittelwertKZ").innerHTML = Math.round(
    (parseInt(localStorage.getItem(STORAGE_KEYS.KZSPEICHmonat)) || 0) /
      daysInMonth
  );
  document.getElementById("mittelwertRH").innerHTML = Math.round(
    (parseInt(localStorage.getItem(STORAGE_KEYS.RHSPEICHmonat)) || 0) /
      daysInMonth
  );
  document.getElementById("mittelwertL").innerHTML = Math.round(
    (parseInt(localStorage.getItem(STORAGE_KEYS.LSPEICHmonat)) || 0) /
      daysInMonth
  );
}

// Function to update exercise tables
function updateExerciseTables() {
  const daysInMonth = 31; // Maximum days in a month
  // Kniebeugen table
  for (let i = 1; i <= daysInMonth; i++) {
    const tableRowId = "t" + i;
    const dayKey = "Ktag" + i;
    const value = localStorage.getItem(dayKey) || "0";
    const tableCell = document.getElementById(tableRowId);
    if (tableCell) {
      tableCell.innerHTML = value;
    }
  }

  // Klimmzüge table
  for (let i = 1; i <= daysInMonth; i++) {
    const dayKey = "KZtag" + i;
    const tableCellId = "t" + i + "KZ";
    const value = localStorage.getItem(dayKey) || "0";
    const tableCell = document.getElementById(tableCellId);
    if (tableCell) {
      tableCell.innerHTML = value;
    }
  }

  // Rückenheber table
  for (let i = 1; i <= daysInMonth; i++) {
    const dayKey = "RHtag" + i;
    const tableCellId = "t" + i + "RH";
    const value = localStorage.getItem(dayKey) || "0";
    const tableCell = document.getElementById(tableCellId);
    if (tableCell) {
      tableCell.innerHTML = value;
    }
  }

  // Liegestützen table
  for (let i = 1; i <= daysInMonth; i++) {
    const dayKey = "tag" + i;
    const tableCellId = "t" + i + "L";
    const value = localStorage.getItem(dayKey) || "0";
    const tableCell = document.getElementById(tableCellId);
    if (tableCell) {
      tableCell.innerHTML = value;
    }
  }
}

// Function to toggle between daily and monthly view
function tage_zeigen() {
  const table2 = document.getElementById("table2");
  const table1div = document.getElementById("table1div");
  const details = document.getElementById("details");

  if (table2.style.display === "none") {
    table1div.style.display = "none";
    table2.style.display = "block";
    details.innerHTML = "Monatsansicht";
  } else {
    table1div.style.display = "block";
    table2.style.display = "none";
    details.innerHTML = "Tagesansicht";
  }
}

// Function to check if a new day has started
function neuerTagTest() {
  const lastDate = new Date(
    parseInt(localStorage.getItem(STORAGE_KEYS.KBzeitspeicher)) || Date.now()
  );
  const currentDate = new Date();
  if (lastDate.getDate() !== currentDate.getDate()) {
    neuer_tag();
  }
}

// Function to handle new day logic
function neuer_tag() {
  const d = new Date();
  const dayIndex = d.getDate() - 1;

  // Store the counts for the previous day
  storeDailyCount("Ktag" + dayIndex, STORAGE_KEYS.KBSPEICH);
  storeDailyCount("tag" + dayIndex, STORAGE_KEYS.LSPEICH);
  storeDailyCount("KZtag" + dayIndex, STORAGE_KEYS.KZSPEICH);
  storeDailyCount("RHtag" + dayIndex, STORAGE_KEYS.RHSPEICH);

  // Remove daily counts
  localStorage.removeItem(STORAGE_KEYS.KBSPEICH);
  localStorage.removeItem(STORAGE_KEYS.LSPEICH);
  localStorage.removeItem(STORAGE_KEYS.KZSPEICH);
  localStorage.removeItem(STORAGE_KEYS.RHSPEICH);
}

// Helper function to store daily count
function storeDailyCount(dayKey, storageKey) {
  const count = localStorage.getItem(storageKey);
  if (count !== null) {
    localStorage.setItem(dayKey, count);
  }
}

// Function to check if a new month has started
function neuerMonatTest() {
  const lastDate = new Date(
    parseInt(localStorage.getItem(STORAGE_KEYS.KBzeitspeicher)) || Date.now()
  );
  const currentDate = new Date();
  if (lastDate.getMonth() !== currentDate.getMonth()) {
    monatneu();
  }
}

// Function to reset monthly statistics
function monatneu() {
  localStorage.removeItem(STORAGE_KEYS.KBSPEICHmonat);
  localStorage.removeItem(STORAGE_KEYS.LSPEICHmonat);
  localStorage.removeItem(STORAGE_KEYS.KZSPEICHmonat);
  localStorage.removeItem(STORAGE_KEYS.RHSPEICHmonat);
  // Optionally, clear other monthly data
  document.getElementById("monat").innerHTML = "0";
}

// Event listener for 'ansichtw' dropdown
const ansichtw = document.getElementById("ansichtw");
ansichtw.addEventListener("change", function () {
  const value = parseInt(ansichtw.value);
  if ([1, 2, 3].includes(value)) {
    AV = value;
  }
});

// Function to start the exercise tracking
function start() {
  document.getElementById("startdiv").style.display = "none";
  const aktivDiv = document.getElementById("aktivdiv");
  const aktivCanvasDiv = document.getElementById("aktivcanvasdiv");
  const lDiv = document.getElementById("Ldiv");

  if (AV === 1) {
    aktivDiv.style.display = "";
    aktivCanvasDiv.style.display = "none";
  } else if (AV === 2) {
    aktivDiv.style.display = "";
  }else if (AV === 3) {
    aktivDiv.style.display = "none";
    aktivCanvasDiv.style.display = "" ;
  }

  if ([1, 2, 3].includes(modus)) {
    lDiv.style.display = "none";
    startTimer();
    addEventListener("devicemotion", handleMotionEvent);
    addEventListener("devicemotion", doSample);
    tick();
  } else if (modus === 4) {
    aktivDiv.style.display = "none";
    lDiv.style.display = "";
  }
}

// Function to display the standard image
function standardImage() {
  const flachbild = document.createElement("img");
  flachbild.src = "media/flach.png";
  flachbild.id = "flachbild";
  flachbild.style.width = "200px";
  flachbild.style.height = "200px";
  const startb = document.getElementById("startb");
  if (startb) {
    startb.appendChild(flachbild);
  }
  if (screen.orientation) {
    screen.orientation.unlock();
  }
}

// Initialize 'mod' element
const modusV = document.getElementById("mod");
modusV.value = 1;
modusV.min = 1;
modusV.max = 4;

// Event listener for 'mod' dropdown
modusV.addEventListener("change", function () {
  const startb = document.getElementById("startb");
  const value = parseInt(modusV.value);
  modus = value;
  // Remove existing images
  ["flachbild", "hochbild", "querbild", "liegesbild"].forEach((id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.remove();
    }
  });
  let newImage = document.createElement("img");
  newImage.style.width = "200px";
  newImage.style.height = "200px";

  switch (modus) {
    case 1:
      newImage.src = "media/flach.png";
      newImage.id = "flachbild";
      startb.style.backgroundColor = "var(--kfarbe)";
      break;
    case 2:
      newImage.src = "media/hoch.png";
      newImage.id = "hochbild";
      startb.style.backgroundColor = "var(--kzfarbe)";
      break;
    case 3:
      newImage.src = "media/quer.png";
      newImage.id = "querbild";
      startb.style.backgroundColor = "var(--rhfarbe)";
      break;
    case 4:
      newImage.src = "media/LiegeS.png";
      newImage.id = "liegesbild";
      startb.style.backgroundColor = "var(--lfarbe)";
      break;
    default:
      break;
  }
  if (startb) {
    startb.appendChild(newImage);
  }
});


// Function to toggle sound
function ton() {
  const b = document.getElementById("tonb");
  const a = document.getElementById("tona");
  if (audioV === 0) {
    audioV = 1;
    a.innerHTML = "🔇";
    b.style.backgroundColor = "rgb(115, 115, 115)";
  } else if (audioV === 1) {
    audioV = 0;
    a.innerHTML = "🔈";
    b.style.backgroundColor = "rgb(115, 115, 115)";
  } else {
    console.log("Unexpected audioV value");
  }
}

// Event handler for device motion
function handleMotionEvent(event) {
  const x = event.accelerationIncludingGravity.x;
  const y = event.accelerationIncludingGravity.y;
  const z = event.accelerationIncludingGravity.z;

  if (modus === 1) {
    processZVar(z);
    document.getElementById("oneb").style.backgroundColor = "var(--kfarbe)";
  } else if (modus === 2) {
    processYVar(y);
    document.getElementById("oneb").style.backgroundColor = "var(--kzfarbe)";
  } else if (modus === 3) {
    processXVar(x);
    document.getElementById("oneb").style.backgroundColor = "var(--rhfarbe)";
  }
}

// Functions to process accelerometer data
function processZVar(z) {
  if (z < GL) {
    niedrigg();
  }
  if (z > GS) {
    hochg();
  }
}

function processYVar(y) {
  if (y < GL) {
    niedrigg();
  }
  if (y > GS) {
    hochg();
  }
}

function processXVar(x) {
  if (x < GL) {
    niedrigg();
  }
  if (x > GS) {
    hochg();
  }
}

// Variables for timing
let firstExecution = 0; // Store the first execution time
const interval = 100; // milliseconds

// Function called when the device moves upwards
function hochg() {
  const milliseconds = Date.now();
  if (milliseconds - firstExecution > interval) {
    firstExecution = milliseconds;
    untenzahl += 1;
    if (ss === 0) {
      ss += 1; // Activate counting
    }
  }
}

// Function called when the device moves downwards
function niedrigg() {
  const milliseconds = Date.now();
  if (milliseconds - firstExecution > interval && ss === 1) {
    firstExecution = milliseconds;
    KB += 1;
    playSound();
    if (AV === 2) {
      bildwechselKB();
    }
    updateCountDisplay();

    // Update local storage counts
    updateLocalStorageCounts();

    ss -= 1; // Reset activation
  }
}

// Function to play sound
function playSound() {
  if (audioV === 0) {
    synthleicht();
  }
}

// Function to update count display
function updateCountDisplay() {
  document.getElementById("KB").innerHTML = KB;
  document.getElementById("Anzahl").innerHTML = KB;
}

// Function to update local storage counts
function updateLocalStorageCounts() {
  let storageKey, storageKeyNeu, storageKeyMonat, heuteElementId;

  if (modus === 1) {
    storageKey = STORAGE_KEYS.KBSPEICH;
    storageKeyNeu = STORAGE_KEYS.KBSPEICHneu;
    storageKeyMonat = STORAGE_KEYS.KBSPEICHmonat;
    heuteElementId = "heute";
  } else if (modus === 2) {
    storageKey = STORAGE_KEYS.KZSPEICH;
    storageKeyNeu = STORAGE_KEYS.KZSPEICHneu;
    storageKeyMonat = STORAGE_KEYS.KZSPEICHmonat;
    heuteElementId = "heuteKZ";
  } else if (modus === 3) {
    storageKey = STORAGE_KEYS.RHSPEICH;
    storageKeyNeu = STORAGE_KEYS.RHSPEICHneu;
    storageKeyMonat = STORAGE_KEYS.RHSPEICHmonat;
    heuteElementId = "heuteRH";
  } else {
    return;
  }

  incrementLocalStorageKey(storageKey);
  incrementLocalStorageKey(storageKeyNeu);
  incrementLocalStorageKey(storageKeyMonat);
  document.getElementById(heuteElementId).innerHTML =
    localStorage.getItem(storageKey) || "0";
}

// Helper function to increment a local storage key
function incrementLocalStorageKey(key) {
  const currentValue = parseInt(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, currentValue + 1);
}

// Function to change image every 10 counts
function bildwechselKB() {
  if (KB % 10 === 0 && KB >= 10) {
    bildKB();
  }
}

// Function to play sound
function synthleicht() {
  const p = Synth.createInstrument("piano");
  if (KB % 10 === 0) {
    p.play("C", 4, 0.5);
  } else {
    p.play("E", 4, 0.5);
  }
}

// Function to change background image
function bildKB() {
  const mediaV = Math.floor(Math.random() * bilderanzahl) + 1;
  const oneb = document.getElementById("oneb");
  if (oneb) {
    oneb.style.background = `url('media/bm${mediaV}.jpg') no-repeat center`;
  }
}
// Canvas and graph variables
const canvas = document.getElementById("canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const W = canvas.width;
const H = canvas.height;
const ctx = canvas.getContext("2d");

const linien = {
    z: getInitArr(Probenanzahl),
    y: getInitArr(Probenanzahl),
    x: getInitArr(Probenanzahl),
};

const scaleX = W / Probenanzahl;
const maxDeviation = 20; 
const scaleY = (H / 2) / maxDeviation; // Fixed scaleY

// Function to sample device motion data
function doSample(event) {
    if      (modus === 1) {shiftAndCrunch(linien.z, event.accelerationIncludingGravity.z);} 
    else if (modus === 2) {shiftAndCrunch(linien.y, event.accelerationIncludingGravity.y);}
    else if (modus === 3) {shiftAndCrunch(linien.x, event.accelerationIncludingGravity.x);}
}

// Function to shift data and compress older data
function shiftAndCrunch(arr, datum) {
    arr.copyWithin(0, 1);
    arr[arr.length - 1] = datum;
    // Simple compression: average every 2 adjacent points for the first half
    for (let i = 0; i < arr.length / 2; i += 2) {
        arr[i] = (arr[i] + arr[i + 1]) / 2;
    }
}


function tick() {
  requestAnimationFrame(tick);
  ctx.fillStyle = "#1c1c1c"; // Background color
  ctx.fillRect(0, 0, W, H);

 
  drawGrid();
  drawLine(H / 2, "brown"); 
  drawLine(H / 2 + 9.81 * scaleY, "blue"); // kein Schwerkraft null linie die +9.81 aus ctx.translate werden ausgeglichen

  // Get the latest value from the appropriate array
  let currentValue;
  if      (modus === 1) {currentValue = linien.z[linien.z.length - 1]; drawGraph(linien.z, scaleX, scaleY, "red");} 
  else if (modus === 2) {currentValue = linien.y[linien.y.length - 1]; drawGraph(linien.y, scaleX, scaleY, "green"); } 
  else if (modus === 3) {currentValue = linien.x[linien.x.length - 1]; drawGraph(linien.x, scaleX, scaleY, "blue"); }

  // Display the current value on the canvas
  ctx.fillStyle = "#2f2f2f"; // Text color
  ctx.font = "20px Arial"; // Font size and style
  ctx.fillText(currentValue.toFixed(2), 10, 30); // Position at (10, 30)
}



// Helper function to draw a line at a specified y position with a specified color
function drawLine(yPosition, color) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, yPosition);
    ctx.lineTo(W, yPosition);
    ctx.stroke();
}

// Function to draw a grid on the canvas
function drawGrid() {
    ctx.strokeStyle = "#2f2f2f"; // Subtle grid color
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
    }
    for (let y = 0; y < H; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
    }
}

// Function to draw the graph
function drawGraph(dataArray, scaleX, scaleY, color) {
    ctx.save();
  
    ctx.translate(0, H / 2 + 9.81 * scaleY); // zentriere y achse auf 9.81
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.beginPath();
   
    ctx.moveTo(0, (dataArray[0] - (0)) * -scaleY);
    for (let i = 1; i < dataArray.length; i++) {
        ctx.lineTo(i * scaleX, (dataArray[i] - (0)) * -scaleY);
    }
    ctx.stroke();
    ctx.restore();
}

// Function to initialize an array with zeros
function getInitArr(length) {
    return new Float32Array(length);
}



// Variables for the stopwatch
let sec = 0;
let min = 0;
let timerInterval;

// Function for the stopwatch tick
function tock() {
  document.getElementById("sekAn").innerHTML = sec;
  document.getElementById("minAn").innerHTML = min;
  sec += 1;
  if (sec >= 60) {
    sec = 0;
    min += 1;
  }
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(tock, 1000);
}










// Function to reset the application
function neu() {
  location.reload();
}

// Variables for push-ups
let L = 0;

// Function called when a push-up is detected
function nasedrauf() {
  L += 1;
  document.getElementById("LieA").innerHTML = L;
  updatePushUpCounts();

  if (AV === 2) {
    bildwechsel();
  }
  if (audioV === 0) {
    synth_Lieg();
  }
}

// Function to update push-up counts in local storage
function updatePushUpCounts() {
  incrementLocalStorageKey(STORAGE_KEYS.LSPEICH);
  incrementLocalStorageKey(STORAGE_KEYS.LSPEICHneu);
  incrementLocalStorageKey(STORAGE_KEYS.LSPEICHmonat);
  document.getElementById("heuteL").innerHTML =
    localStorage.getItem(STORAGE_KEYS.LSPEICH) || "0";
}

// Function to change image every 10 push-ups
function bildwechsel() {
  if (L % 10 === 0 && L >= 10) {
    bild();
  }
}

// Function to play sound for push-ups


var note ="C"
var noteH = "D"
function synth_Lieg() {

  
  const dropdown = document.getElementById("notew");


  // Add an event listener to handle dropdown changes
  dropdown.addEventListener("change", () => {
      const selectedValue = dropdown.value; // Get the selected value

      // Conditional handling of selected values
      if (selectedValue === "eins") { note = "C", noteH = "D"}
       else if (selectedValue === "zwei") {note = "D" , noteH = "E"} 
       else if (selectedValue === "drei") {note = "E", noteH = "F"} 
       else if (selectedValue === "vier") {note ="F", noteH = "G"}
       else if (selectedValue === "fuenf") {note = "G" , noteH = "H"} 
       else if (selectedValue === "sechs") {note = "A", noteH = "A"} 
       else if (selectedValue === "sieben") {note ="B", noteH = "C"}
       else {x = "A"}
  });

  const p = Synth.createInstrument("piano");
  if (L % 10 === 0 && L >= 10) {
    p.play(noteH, 4, 1);
  } else {
    p.play(note, 4, 1); // nomrmalfall
  }
}

// Function to change background image for push-ups
function bild() {
  const mediaV = Math.floor(Math.random() * bilderanzahl) + 1;
  const ONE = document.getElementById("LieB");
  if (ONE) {
    ONE.style.background = `url('media/bm${mediaV}.jpg') no-repeat center`;
  }
}
