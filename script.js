
// Global variables
let bilderanzahl = 55; //Anzahl bm bilder ab 0 (+1)
let modus = 1;
let audioMode = "none";
let customAudio = null;
let customAudioObjectUrl = "";
let customAudioLastActivityAt = 0;
let customAudioInactivityInterval = null;
const AUDIO_DB_NAME = "nur10AudioDB";
const AUDIO_STORE_NAME = "audioFiles";
const AUDIO_FILE_KEY = "customAudioFile";
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
  AudioMode: "AudioMode",
};


// Initialize the application on window load
window.onload = function () {
  neuerTagTest();
  neuerMonatTest();
  setUpInitialView();
  clearTemporaryStorage();
  hideElementsOnLoad();
  updateStatistics();
  restoreAudioModePreference();
  initCustomAudioFromStorage();
};

window.addEventListener("beforeunload", () => {
  updateLastActiveTimestamp();
  releaseCustomAudioObjectUrl();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    updateLastActiveTimestamp();
  }
});

function updateLastActiveTimestamp() {
  localStorage.setItem(STORAGE_KEYS.KBzeitspeicher, Date.now());
}

// Function to set up the initial view
function setUpInitialView() {
  standardImage();
  updateLastActiveTimestamp();
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
  const currentDate = new Date();

  for (let i = 1; i <= daysInMonth; i++) {
    setTableCellValue("t" + i, getStatValueForDay(i, "Ktag" + i, STORAGE_KEYS.KBSPEICH, currentDate));
    setTableCellValue("t" + i + "KZ", getStatValueForDay(i, "KZtag" + i, STORAGE_KEYS.KZSPEICH, currentDate));
    setTableCellValue("t" + i + "RH", getStatValueForDay(i, "RHtag" + i, STORAGE_KEYS.RHSPEICH, currentDate));
    setTableCellValue("t" + i + "L", getStatValueForDay(i, "tag" + i, STORAGE_KEYS.LSPEICH, currentDate));
  }
}

function getStatValueForDay(dayNumber, storedDayKey, liveStorageKey, currentDate) {
  if (dayNumber > currentDate.getDate()) {
    return "";
  }

  if (dayNumber === currentDate.getDate()) {
    return localStorage.getItem(liveStorageKey) || "0";
  }

  return localStorage.getItem(storedDayKey) || "0";
}

function setTableCellValue(elementId, value) {
  const tableCell = document.getElementById(elementId);
  if (tableCell) {
    tableCell.innerHTML = value;
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
  const lastDate = getLastActiveDate();
  const currentDate = new Date();
  if (!isSameCalendarDay(lastDate, currentDate)) {
    neuer_tag(lastDate);
  }
}

// Function to handle new day logic
function neuer_tag(lastActiveDate) {
  const previousDayIndex = lastActiveDate.getDate();

  // Store the counts for the previous day
  storeDailyCount("Ktag" + previousDayIndex, STORAGE_KEYS.KBSPEICH);
  storeDailyCount("tag" + previousDayIndex, STORAGE_KEYS.LSPEICH);
  storeDailyCount("KZtag" + previousDayIndex, STORAGE_KEYS.KZSPEICH);
  storeDailyCount("RHtag" + previousDayIndex, STORAGE_KEYS.RHSPEICH);

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
  const lastDate = getLastActiveDate();
  const currentDate = new Date();
  if (
    lastDate.getMonth() !== currentDate.getMonth() ||
    lastDate.getFullYear() !== currentDate.getFullYear()
  ) {
    monatneu();
  }
}

function getLastActiveDate() {
  const rawTimestamp = parseInt(localStorage.getItem(STORAGE_KEYS.KBzeitspeicher));
  if (Number.isNaN(rawTimestamp)) {
    return new Date();
  }
  return new Date(rawTimestamp);
}

function isSameCalendarDay(a, b) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

// Function to reset monthly statistics
function monatneu() {
  localStorage.removeItem(STORAGE_KEYS.KBSPEICHmonat);
  localStorage.removeItem(STORAGE_KEYS.LSPEICHmonat);
  localStorage.removeItem(STORAGE_KEYS.KZSPEICHmonat);
  localStorage.removeItem(STORAGE_KEYS.RHSPEICHmonat);
  clearMonthlyHistory();
  refreshStatisticsView();
}

function clearMonthlyHistory() {
  for (let dayNumber = 1; dayNumber <= 31; dayNumber += 1) {
    localStorage.removeItem("Ktag" + dayNumber);
    localStorage.removeItem("KZtag" + dayNumber);
    localStorage.removeItem("RHtag" + dayNumber);
    localStorage.removeItem("tag" + dayNumber);
  }
}

function refreshStatisticsView() {
  updateStatistics();

  if (document.getElementById("sta_div").style.display !== "none") {
    const currentDate = new Date();
    document.getElementById("datum").innerHTML =
      currentDate.getDate() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear();
    updateAverageValues(currentDate.getDate());
    updateExerciseTables();
  }
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


// Audio mode handling
const audioModeSelect = document.getElementById("audioMode");
const audioFileInput = document.getElementById("audioFileInput");
const audioInfo = document.getElementById("audioInfo");
const audioFileControls = document.getElementById("audioFileControls");

if (audioModeSelect) {
  audioModeSelect.value = audioMode;
  audioModeSelect.addEventListener("change", () => {
    audioMode = audioModeSelect.value;
    localStorage.setItem(STORAGE_KEYS.AudioMode, audioMode);
    handleCustomAudioPauseNow();
    updateAudioFileControlsVisibility();

    if (audioMode === "file" && !customAudio && audioInfo) {
      audioInfo.innerHTML = "Bitte zuerst eine Audio-Datei wählen.";
    }
  });
}

if (audioFileInput) {
  audioFileInput.addEventListener("change", async () => {
    const file = audioFileInput.files && audioFileInput.files[0];
    if (!file) {
      return;
    }

    setCustomAudioFromFile(file);
    await saveCustomAudioFile(file);

    if (audioModeSelect) {
      audioModeSelect.value = "file";
    }
    audioMode = "file";
    localStorage.setItem(STORAGE_KEYS.AudioMode, audioMode);

    if (audioInfo) {
      audioInfo.innerHTML = `Gespeichert im Browser: ${file.name}`;
    }
  });
}

// Event handler for device motion
function handleMotionEvent(event) {
  if (!event.accelerationIncludingGravity) {
    return;
  }

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
    maybeAdvanceCustomAudio();
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
  if (audioMode === "synth") {
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
  refreshStatisticsView();
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
function restoreAudioModePreference() {
  const storedMode = localStorage.getItem(STORAGE_KEYS.AudioMode);
  if (["none", "synth", "file"].includes(storedMode)) {
    audioMode = storedMode;
  }

  if (audioModeSelect) {
    audioModeSelect.value = audioMode;
  }

  updateAudioFileControlsVisibility();
}

function updateAudioFileControlsVisibility() {
  if (!audioFileControls) {
    return;
  }

  audioFileControls.style.display = audioMode === "file" ? "flex" : "none";
}

async function initCustomAudioFromStorage() {
  try {
    const storedFile = await loadCustomAudioFile();
    if (!storedFile) {
      if (audioMode === "file") {
        audioMode = "none";
        if (audioModeSelect) {
          audioModeSelect.value = "none";
        }
      }
      if (audioInfo) {
        audioInfo.innerHTML = "Keine gespeicherte Audio-Datei im Browser.";
      }
      updateAudioFileControlsVisibility();
      return;
    }

    setCustomAudioFromFile(storedFile);
    if (audioInfo) {
      audioInfo.innerHTML = `Aus Browser geladen: ${storedFile.name}`;
    }
    updateAudioFileControlsVisibility();
  } catch {
    if (audioInfo) {
      audioInfo.innerHTML = "Audio-Datei konnte nicht aus dem Browser geladen werden.";
    }
    updateAudioFileControlsVisibility();
  }
}

function setCustomAudioFromFile(file) {
  releaseCustomAudioObjectUrl();
  customAudioObjectUrl = URL.createObjectURL(file);

  if (!customAudio) {
    customAudio = new Audio();
  }

  customAudio.src = customAudioObjectUrl;
  customAudio.preload = "auto";
  customAudio.loop = true;
}

function releaseCustomAudioObjectUrl() {
  if (customAudioObjectUrl) {
    URL.revokeObjectURL(customAudioObjectUrl);
    customAudioObjectUrl = "";
  }
}

async function saveCustomAudioFile(file) {
  const db = await openAudioDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE_NAME, "readwrite");
    tx.objectStore(AUDIO_STORE_NAME).put(file, AUDIO_FILE_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function loadCustomAudioFile() {
  const db = await openAudioDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE_NAME, "readonly");
    const request = tx.objectStore(AUDIO_STORE_NAME).get(AUDIO_FILE_KEY);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

function openAudioDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(AUDIO_DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(AUDIO_STORE_NAME)) {
        db.createObjectStore(AUDIO_STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function ensureCustomAudioInactivityWatcher() {
  if (customAudioInactivityInterval) {
    return;
  }

  customAudioInactivityInterval = setInterval(() => {
    if (audioMode !== "file" || !customAudio) {
      return;
    }

    if (customAudioLastActivityAt > 0 && Date.now() - customAudioLastActivityAt >= 5000) {
      handleCustomAudioPauseNow();
    }
  }, 500);
}

function maybeAdvanceCustomAudio() {
  if (audioMode !== "file" || !customAudio) {
    return;
  }

  customAudioLastActivityAt = Date.now();
  ensureCustomAudioInactivityWatcher();

  if (!customAudio.paused) {
    return;
  }

  if (customAudio.paused) {
    const playPromise = customAudio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // ignored: browsers may block autoplay until user interaction
      });
    }
  }
}

function handleCustomAudioPauseNow() {
  customAudioLastActivityAt = 0;

  if (customAudio && !customAudio.paused) {
    customAudio.pause();
  }
}

// Canvas and graph variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let W = 0;
let H = 0;
let scaleX = 1;
let scaleY = 1;

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const displayWidth = Math.max(1, canvas.clientWidth);
  const displayHeight = Math.max(1, canvas.clientHeight);

  canvas.width = Math.floor(displayWidth * ratio);
  canvas.height = Math.floor(displayHeight * ratio);
  canvas.style.width = `${displayWidth}px`;
  canvas.style.height = `${displayHeight}px`;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(ratio, ratio);

  W = displayWidth;
  H = displayHeight;
  scaleX = W / Probenanzahl;
  scaleY = (H / 2) / maxDeviation;
}

const linien = {
    z: getInitArr(Probenanzahl),
    y: getInitArr(Probenanzahl),
    x: getInitArr(Probenanzahl),
};

const maxDeviation = 20; 
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Function to sample device motion data
function doSample(event) {
    if (!event.accelerationIncludingGravity) {
      return;
    }

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
  drawBackground();

 
  drawGrid();
  drawLine(H / 2, "rgba(217, 217, 217, 0.28)"); 
  drawLine(H / 2 + 9.81 * scaleY, "rgba(79, 255, 231, 0.30)"); // kein Schwerkraft null linie die +9.81 aus ctx.translate werden ausgeglichen

  // Get the latest value from the appropriate array
  let currentValue;
  if      (modus === 1) {currentValue = linien.z[linien.z.length - 1]; drawGraph(linien.z, "#ff6f9f", "rgba(255, 111, 159, 0.55)");} 
  else if (modus === 2) {currentValue = linien.y[linien.y.length - 1]; drawGraph(linien.y, "#6effd9", "rgba(110, 255, 217, 0.45)"); } 
  else if (modus === 3) {currentValue = linien.x[linien.x.length - 1]; drawGraph(linien.x, "#6ab6ff", "rgba(106, 182, 255, 0.45)"); }

  // Display the current value on the canvas
  ctx.fillStyle = "rgba(255,255,255,0.85)"; // Text color
  ctx.font = "600 20px Arial"; // Font size and style
  ctx.fillText(currentValue.toFixed(2), 10, 30); // Position at (10, 30)
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, H);
  gradient.addColorStop(0, "#090f1e");
  gradient.addColorStop(0.45, "#121b2f");
  gradient.addColorStop(1, "#04070f");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W * 0.75, H * 0.2, 20, W * 0.75, H * 0.2, W * 0.8);
  glow.addColorStop(0, "rgba(0, 255, 255, 0.12)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
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
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)"; // Subtle grid color
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
function drawGraph(dataArray, color, glowColor) {
    ctx.save();
  
    ctx.translate(0, H / 2 + 9.81 * scaleY); // zentriere y achse auf 9.81

    const latestValue = dataArray[dataArray.length - 1] || 0;
    const pulse = Math.min(Math.abs(latestValue) / maxDeviation, 1);

    ctx.lineWidth = 3.2;
    ctx.strokeStyle = color;
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 16 + pulse * 16;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    const startY = dataArray[0] * -scaleY;
    ctx.moveTo(0, startY);

    for (let i = 1; i < dataArray.length - 1; i++) {
      const x = i * scaleX;
      const y = dataArray[i] * -scaleY;
      const nextX = (i + 1) * scaleX;
      const nextY = dataArray[i + 1] * -scaleY;
      const controlX = (x + nextX) / 2;
      const controlY = (y + nextY) / 2;
      ctx.quadraticCurveTo(x, y, controlX, controlY);
    }

    ctx.stroke();

    const endX = (dataArray.length - 1) * scaleX;
    const endY = latestValue * -scaleY;
    ctx.shadowBlur = 0;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(endX, endY, 3.8 + pulse * 3, 0, 2 * Math.PI);
    ctx.fill();

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
  handleCustomAudioPauseNow();
  releaseCustomAudioObjectUrl();
  location.reload();
}

// Variables for push-ups
let L = 0;

// Function called when a push-up is detected
function nasedrauf() {
  L += 1;
  document.getElementById("LieA").innerHTML = L;
  updatePushUpCounts();

  maybeAdvanceCustomAudio();
  if (AV === 2) {
    bildwechsel();
  }
  if (audioMode === "synth") {
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
  refreshStatisticsView();
}

// Function to change image every 10 push-ups
function bildwechsel() {
  if (L % 10 === 0 && L >= 10) {
    bild();
  }
}

// Function to play sound for push-ups


var note = "C";
var noteH = "D";

function updatePushupSoundNotes(selectedValue) {
  if (selectedValue === "eins") {
    note = "C";
    noteH = "D";
  } else if (selectedValue === "zwei") {
    note = "D";
    noteH = "E";
  } else if (selectedValue === "drei") {
    note = "E";
    noteH = "F";
  } else if (selectedValue === "vier") {
    note = "F";
    noteH = "G";
  } else if (selectedValue === "fuenf") {
    note = "G";
    noteH = "A";
  } else if (selectedValue === "sechs") {
    note = "A";
    noteH = "B";
  } else if (selectedValue === "sieben") {
    note = "B";
    noteH = "C";
  } else {
    note = "C";
    noteH = "D";
  }
}

const pushupNoteDropdown = document.getElementById("notew");
if (pushupNoteDropdown) {
  updatePushupSoundNotes(pushupNoteDropdown.value);
  pushupNoteDropdown.addEventListener("change", () => {
    updatePushupSoundNotes(pushupNoteDropdown.value);
  });
}

function synth_Lieg() {

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
