// Global variables
let modus = 1;
let KB = 0;
let L = 0;
let untenzahl = 0;
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
  KBSPEICHmonat: "KBSPEICHmonat",
  KZSPEICHmonat: "KZSPEICHmonat",
  RHSPEICHmonat: "RHSPEICHmonat",
  LSPEICHmonat: "LSPEICHmonat",
  lastVisitMonth: "lastVisitMonth",
  lastVisitYear: "lastVisitYear",
  lastVisitDay: "lastVisitDay",
};

// Initialize the application on window load
window.onload = function () {
  checkNewDay();
  checkNewMonth();
  setUpInitialView();
  updateStatistics();
  // Attach event listener for the audio dropdown only once
  setupAudioDropdownListener();
};

// Function to set up the initial view
function setUpInitialView() {
  standardImage();
  hideElementsOnLoad();
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

// Function to check if a new day has started
function checkNewDay() {
  const heute = new Date();
  const lastVisitDay = parseInt(localStorage.getItem(STORAGE_KEYS.lastVisitDay));

  if (lastVisitDay && lastVisitDay !== heute.getDate()) {
    // A new day has started, save yesterday's stats
    const yesterday = new Date();
    yesterday.setDate(heute.getDate() - 1);
    const dayIndex = yesterday.getDate();

    storeDailyCount("Ktag" + dayIndex, STORAGE_KEYS.KBSPEICH);
    storeDailyCount("tag" + dayIndex, STORAGE_KEYS.LSPEICH);
    storeDailyCount("KZtag" + dayIndex, STORAGE_KEYS.KZSPEICH);
    storeDailyCount("RHtag" + dayIndex, STORAGE_KEYS.RHSPEICH);

    // Reset daily counts for the new day
    localStorage.removeItem(STORAGE_KEYS.KBSPEICH);
    localStorage.removeItem(STORAGE_KEYS.LSPEICH);
    localStorage.removeItem(STORAGE_KEYS.KZSPEICH);
    localStorage.removeItem(STORAGE_KEYS.RHSPEICH);
  }

  // Update the last visited day to the current day
  localStorage.setItem(STORAGE_KEYS.lastVisitDay, heute.getDate());
}

// Helper function to store daily count
function storeDailyCount(dayKey, storageKey) {
  const count = localStorage.getItem(storageKey);
  if (count !== null) {
    localStorage.setItem(dayKey, count);
  }
}

// Function to check if a new month has started and reset monthly stats
function checkNewMonth() {
  const heute = new Date();
  const neuerMonat = heute.getMonth();
  const neuerJahr = heute.getFullYear();

  const gespeicherterMonat = parseInt(localStorage.getItem(STORAGE_KEYS.lastVisitMonth));
  const gespeicherterJahr = parseInt(localStorage.getItem(STORAGE_KEYS.lastVisitYear));

  const isNewMonth = (neuerJahr > gespeicherterJahr) || (neuerJahr === gespeicherterJahr && neuerMonat !== gespeicherterMonat);

  if (isNewMonth || !gespeicherterMonat) {
    console.log("New month detected, resetting monthly stats.");

    localStorage.setItem(STORAGE_KEYS.lastVisitMonth, neuerMonat);
    localStorage.setItem(STORAGE_KEYS.lastVisitYear, neuerJahr);

    // Reset all monthly totals to zero
    localStorage.setItem(STORAGE_KEYS.KBSPEICHmonat, "0");
    localStorage.setItem(STORAGE_KEYS.KZSPEICHmonat, "0");
    localStorage.setItem(STORAGE_KEYS.RHSPEICHmonat, "0");
    localStorage.setItem(STORAGE_KEYS.LSPEICHmonat, "0");

    // Clear the daily count entries from the previous month
    for (let i = 1; i <= 31; i++) {
        localStorage.removeItem("Ktag" + i);
        localStorage.removeItem("tag" + i);
        localStorage.removeItem("KZtag" + i);
        localStorage.removeItem("RHtag" + i);
    }
  }
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
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

  document.getElementById("datum").innerHTML =
    d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

  const monthNames = [
    "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
  ];
  let monthName = monthNames[d.getMonth()];
  const monate = document.getElementsByClassName("monats");
  for (let i = 0; i < daysInMonth; i++) {
    monate[i].innerHTML = i + 1 + "." + monthName;
  }

  updateAverageValues(daysInMonth);
  document.getElementById("sta_div").style.display = "";
  document.getElementById("aktivcanvasdiv").style.display = "none";
  document.getElementById("aktivdiv").style.display = "none";
  document.getElementById("startdiv").style.display = "none";
  document.getElementById("monatname").innerHTML = monthName;

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
  const daysInMonth = 31;
  const exercises = [
    { prefix: "Ktag", key: STORAGE_KEYS.KBSPEICH },
    { prefix: "KZtag", key: STORAGE_KEYS.KZSPEICH },
    { prefix: "RHtag", key: STORAGE_KEYS.RHSPEICH },
    { prefix: "tag", key: STORAGE_KEYS.LSPEICH },
  ];

  for (const exercise of exercises) {
    for (let i = 1; i <= daysInMonth; i++) {
      const dayKey = exercise.prefix + i;
      const tableCellId = (exercise.prefix === "tag" ? "t" + i + "L" : "t" + i + exercise.prefix.substring(1));
      const value = localStorage.getItem(dayKey) || "0";
      const tableCell = document.getElementById(tableCellId);
      if (tableCell) {
        tableCell.innerHTML = value;
      }
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

// Event listener for 'ansichtw' dropdown
const ansichtw = document.getElementById("ansichtw");
if (ansichtw) {
  ansichtw.addEventListener("change", function () {
    AV = parseInt(ansichtw.value);
  });
}

// Function to start the exercise tracking
function start() {
  document.getElementById("startdiv").style.display = "none";
  document.getElementById("sta_div").style.display = "none";

  const aktivDiv = document.getElementById("aktivdiv");
  const aktivCanvasDiv = document.getElementById("aktivcanvasdiv");
  const lDiv = document.getElementById("Ldiv");

  if (modus === 4) {
    aktivDiv.style.display = "none";
    aktivCanvasDiv.style.display = "none";
    lDiv.style.display = "";
  } else {
    lDiv.style.display = "none";
    if (AV === 3) {
      aktivDiv.style.display = "none";
      aktivCanvasDiv.style.display = "";
    } else {
      aktivDiv.style.display = "";
      aktivCanvasDiv.style.display = "none";
    }
  }

  if (modus !== 4) {
    startTimer();
    addEventListener("devicemotion", handleMotionEvent);
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
if (modusV) {
  modusV.value = 1;
  modusV.min = 1;
  modusV.max = 4;
}

// Event listener for 'mod' dropdown
if (modusV) {
  modusV.addEventListener("change", function () {
    const startb = document.getElementById("startb");
    modus = parseInt(modusV.value);
    
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
    }
    startb.appendChild(newImage);
  });
}

// Function to toggle sound
function ton() {
  const a = document.getElementById("tona");
  const b = document.getElementById("tonb");

  if (b.classList.contains("active")) {
    b.classList.remove("active");
    a.innerHTML = "🔈";
  } else {
    b.classList.add("active");
    a.innerHTML = "🔇";
  }
}

// Event handler for device motion
function handleMotionEvent(event) {
  const x = event.accelerationIncludingGravity.x;
  const y = event.accelerationIncludingGravity.y;
  const z = event.accelerationIncludingGravity.z;

  let acceleration;
  let color;
  
  switch (modus) {
    case 1:
      acceleration = z;
      color = "var(--kfarbe)";
      break;
    case 2:
      acceleration = y;
      color = "var(--kzfarbe)";
      break;
    case 3:
      acceleration = x;
      color = "var(--rhfarbe)";
      break;
    default:
      return;
  }
  
  document.getElementById("oneb").style.backgroundColor = color;

  if (acceleration < GL) {
    niedrigg();
  }
  if (acceleration > GS) {
    hochg();
  }
}

// Function called when the device moves upwards
function hochg() {
  if (ss === 0) {
    ss = 1;
  }
}

// Function called when the device moves downwards
function niedrigg() {
  if (ss === 1) {
    KB += 1;
    playSound();
    updateCountDisplay();
    updateLocalStorageCounts();
    ss = 0;
  }
}

// Function to play sound
function playSound() {
  if (document.getElementById("tonb").classList.contains("active")) {
    const p = Synth.createInstrument("piano");
    if (KB % 10 === 0 && KB >= 10) {
      p.play("C", 4, 0.5);
    } else {
      p.play("E", 4, 0.5);
    }
  }
}

// Function to update count display
function updateCountDisplay() {
  document.getElementById("KB").innerHTML = KB;
  document.getElementById("Anzahl").innerHTML = KB;
}

// Function to update local storage counts
function updateLocalStorageCounts() {
  let storageKey, storageKeyMonat, heuteElementId;

  if (modus === 1) {
    storageKey = STORAGE_KEYS.KBSPEICH;
    storageKeyMonat = STORAGE_KEYS.KBSPEICHmonat;
    heuteElementId = "heute";
  } else if (modus === 2) {
    storageKey = STORAGE_KEYS.KZSPEICH;
    storageKeyMonat = STORAGE_KEYS.KZSPEICHmonat;
    heuteElementId = "heuteKZ";
  } else if (modus === 3) {
    storageKey = STORAGE_KEYS.RHSPEICH;
    storageKeyMonat = STORAGE_KEYS.RHSPEICHmonat;
    heuteElementId = "heuteRH";
  } else {
    return;
  }

  incrementLocalStorageKey(storageKey);
  incrementLocalStorageKey(storageKeyMonat);
  document.getElementById(heuteElementId).innerHTML =
    localStorage.getItem(storageKey) || "0";
}

// Helper function to increment a local storage key
function incrementLocalStorageKey(key) {
  const currentValue = parseInt(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, currentValue + 1);
}

// Stopwatch
let sec = 0;
let min = 0;
let timerInterval;

function tock() {
  document.getElementById("sekAn").innerHTML = sec;
  document.getElementById("minAn").innerHTML = min;
  sec += 1;
  if (sec >= 60) {
    sec = 0;
    min += 1;
  }
}

function startTimer() {
  timerInterval = setInterval(tock, 1000);
}

// Function to reset the application
function neu() {
  location.reload();
}

// Push-up functions
function nasedrauf() {
  L += 1;
  document.getElementById("LieA").innerHTML = L;
  updatePushUpCounts();
  playPushupSound();
}

// Function to update push-up counts in local storage
function updatePushUpCounts() {
  incrementLocalStorageKey(STORAGE_KEYS.LSPEICH);
  incrementLocalStorageKey(STORAGE_KEYS.LSPEICHmonat);
  document.getElementById("heuteL").innerHTML =
    localStorage.getItem(STORAGE_KEYS.LSPEICH) || "0";
}

// Audio handling for push-ups
let note = "C";
let noteH = "D";

function setupAudioDropdownListener() {
  const dropdown = document.getElementById("notew");
  if (dropdown) {
    dropdown.addEventListener("change", () => {
      const selectedValue = dropdown.value;
      if (selectedValue === "eins") { note = "C"; noteH = "D"; }
      else if (selectedValue === "zwei") { note = "D"; noteH = "E"; }
      else if (selectedValue === "drei") { note = "E"; noteH = "F"; }
      else if (selectedValue === "vier") { note = "F"; noteH = "G"; }
      else if (selectedValue === "fuenf") { note = "G"; noteH = "H"; }
      else if (selectedValue === "sechs") { note = "A"; noteH = "A"; }
      else if (selectedValue === "sieben") { note = "B"; noteH = "C"; }
    });
  }
}

function playPushupSound() {
  if (document.getElementById("tonb").classList.contains("active")) {
    const p = Synth.createInstrument("piano");
    if (L % 10 === 0 && L >= 10) {
      p.play(noteH, 4, 1);
    } else {
      p.play(note, 4, 1);
    }
  }
}