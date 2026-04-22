
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
let motionZone = "mid";
let needsMidCrossing = false;

// Canvas game state (point collection on the graph line)
let gameOrbs = [];
let gameParticles = [];
let gameScore = 0;
let gameLastSpawn = 0;
const GAME_MAX_ORBS = 4;
const GAME_ORB_RADIUS = 14;
const GAME_COLLECT_DIST = 28;
// Fraction of canvas width an orb travels per second (right → left toward the player)
const GAME_ORB_SPEED_FACTOR = 0.14;
const ORB_GOOD = { fill: "#6effd9", glow: "rgba(110,255,217,0.6)",  type: "good" };
const ORB_BAD  = { fill: "#ff4f4f", glow: "rgba(255,79,79,0.65)",   type: "bad"  };

// Orb control mode for the AV=3 game.
//   "sensor"   – raw accel value maps 1:1 to orb Y (positional).
//   "phase"    – discrete squat state (ss) drives a target Y, smoothed (positional).
//   "kinetic"  – Z deviation from g maps to orb *speed*; direction = sign of deviation.
//   "throttle" – amplitude envelope sets speed magnitude, squat posture (ss) sets direction.
//   "pulse"    – each completed rep gives the orb a discrete impulse; drifts between reps.
//   "tempo"    – rep cadence (reps/s, rolling window) scales speed; ss sets direction.
let orbControlMode = "sensor";
let orbPhaseNorm = 0;                 // 0 = top (standing), 1 = bottom (squat)
const ORB_PHASE_TAU = 0.15;           // seconds – how fast the orb chases its target

// Kinetic mode: Z deviation from gravity drives orb velocity (speed-controlled, not position).
let orbKineticY = 0;                  // signed px offset from centre
const ORB_KINETIC_DEADZONE = 0.4;     // m/s² – below this the orb freezes
const ORB_KINETIC_SCALE = 40;         // px/s per m/s² of deviation above the deadzone
const ORB_KINETIC_DAMP = 0.9;         // s⁻¹ gentle exponential pull toward centre when still

// Throttle mode: amplitude envelope = |Z - g| → speed magnitude, ss → direction.
let orbThrottleY = 0;
let orbThrottleEnv = 0;               // 0..1 smoothed amplitude envelope
const ORB_THROTTLE_REF = 3.0;         // m/s² deviation that yields full throttle
const ORB_THROTTLE_ATTACK = 5.0;      // s⁻¹ envelope rise rate
const ORB_THROTTLE_RELEASE = 1.2;     // s⁻¹ envelope decay rate
const ORB_THROTTLE_MAX_SPEED = 220;   // px/s at full throttle

// Pulse mode: each completed squat rep kicks the orb toward the opposite side.
let orbPulseY = 0;
let orbPulseVel = 0;
let orbPulsePending = 0;              // reps not yet consumed by pulse mode
let orbPulseToggle = false;
const ORB_PULSE_IMPULSE = 180;        // px/s velocity added per rep
const ORB_PULSE_DAMP = 1.2;           // s⁻¹ velocity damping
const ORB_PULSE_CENTER = 2.0;         // s⁻¹ spring toward centre

// Tempo mode: reps per second over a rolling window sets speed; ss sets direction.
let orbTempoY = 0;
let orbTempoEnv = 0;                  // 0..1 smoothed cadence envelope
let orbRepTimes = [];                 // ms timestamps of recent squat reps
const ORB_TEMPO_WINDOW_MS = 10000;    // reps within this window count toward cadence
const ORB_TEMPO_FULL_RATE = 0.8;      // reps/s that saturates tempo speed
const ORB_TEMPO_ATTACK = 2.5;         // s⁻¹
const ORB_TEMPO_RELEASE = 0.6;        // s⁻¹
const ORB_TEMPO_MAX_SPEED = 180;      // px/s at full cadence

let viewYear = new Date().getFullYear();
let viewMonth = new Date().getMonth();





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
  AudioPosition: "AudioPosition",
};

const EXERCISE_STATS = [
  {
    dayKeyPrefix: "Ktag",
    liveStorageKey: STORAGE_KEYS.KBSPEICH,
    monthlyStorageKey: STORAGE_KEYS.KBSPEICHmonat,
    todayElementId: "heute",
    monthElementId: "monat",
    averageElementId: "mittelwert",
    accentClass: "cell-kb",
  },
  {
    dayKeyPrefix: "KZtag",
    liveStorageKey: STORAGE_KEYS.KZSPEICH,
    monthlyStorageKey: STORAGE_KEYS.KZSPEICHmonat,
    todayElementId: "heuteKZ",
    monthElementId: "monatKZ",
    averageElementId: "mittelwertKZ",
    accentClass: "cell-kz",
  },
  {
    dayKeyPrefix: "RHtag",
    liveStorageKey: STORAGE_KEYS.RHSPEICH,
    monthlyStorageKey: STORAGE_KEYS.RHSPEICHmonat,
    todayElementId: "heuteRH",
    monthElementId: "monatRH",
    averageElementId: "mittelwertRH",
    accentClass: "cell-rh",
  },
  {
    dayKeyPrefix: "tag",
    liveStorageKey: STORAGE_KEYS.LSPEICH,
    monthlyStorageKey: STORAGE_KEYS.LSPEICHmonat,
    todayElementId: "heuteL",
    monthElementId: "monatL",
    averageElementId: "mittelwertL",
    accentClass: "cell-l",
  },
];


// ─── Daily Exercise Badge ────────────────────────────────────────────────────
// Shows a badge on the app icon each day at 16:00 (4 PM).
// The badge disappears when the user completes ≥ 10 reps (any exercise).
// It reappears the next day at 16:00.

const BADGE_TRIGGER_HOUR = 0; // Midnight — badge is there from the start of each day
const BADGE_MIN_REPS = 10;

function getTotalDailyReps() {
  return (
    (parseInt(localStorage.getItem(STORAGE_KEYS.KBSPEICH), 10) || 0) +
    (parseInt(localStorage.getItem(STORAGE_KEYS.LSPEICH), 10) || 0) +
    (parseInt(localStorage.getItem(STORAGE_KEYS.KZSPEICH), 10) || 0) +
    (parseInt(localStorage.getItem(STORAGE_KEYS.RHSPEICH), 10) || 0)
  );
}

function updateDailyBadge() {
  if (!("setAppBadge" in navigator)) return;
  const now = new Date();
  const shouldShow = now.getHours() >= BADGE_TRIGGER_HOUR && getTotalDailyReps() < BADGE_MIN_REPS;
  if (shouldShow) {
    navigator.setAppBadge(1).catch(() => {});
  } else {
    navigator.clearAppBadge().catch(() => {});
  }
  saveBadgeStatusToIDB(!shouldShow);
}

// Writes today's completion status to IndexedDB so the service worker can
// decide whether to show the badge during Periodic Background Sync.
function saveBadgeStatusToIDB(done) {
  const req = indexedDB.open('nur10BadgeDB', 1);
  req.onupgradeneeded = () => req.result.createObjectStore('status');
  req.onsuccess = () => {
    const tx = req.result.transaction('status', 'readwrite');
    tx.objectStore('status').put({ date: new Date().toDateString(), done }, 'badge_status');
  };
}

// Registers a Periodic Background Sync task so the service worker can set the
// badge overnight without the app being open.
async function registerPeriodicSync() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    if (!("periodicSync" in reg)) return;
    await reg.periodicSync.register("daily-badge", {
      minInterval: 12 * 60 * 60 * 1000, // at most twice a day
    });
  } catch (_) {
    // Periodic sync not available or permission denied — badge still works when app is open.
  }
}

function initDailyBadge() {
  updateDailyBadge();
  setInterval(updateDailyBadge, 60_000);
  registerPeriodicSync();
}
// ─────────────────────────────────────────────────────────────────────────────

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
  initDailyBadge();
};

window.addEventListener("beforeunload", () => {
  updateLastActiveTimestamp();
  persistCustomAudioPosition();
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
}

// Function to update statistics on the page
function updateStatistics() {
  updateMonthlyStatistics();
}

// Function to update monthly statistics
function updateMonthlyStatistics() {
  EXERCISE_STATS.forEach(({ monthlyStorageKey, monthElementId }) => {
    const val = parseInt(localStorage.getItem(monthlyStorageKey), 10) || 0;
    document.getElementById(monthElementId).innerHTML = val === 0 ? "–" : val;
  });
}

// Function to display statistics
function sta_zeigen() {
  const now = new Date();
  viewYear = now.getFullYear();
  viewMonth = now.getMonth();

  document.getElementById("sta_div").style.display = "";
  document.getElementById("aktivcanvasdiv").style.display = "none";
  document.getElementById("aktivdiv").style.display = "none";
  document.getElementById("startdiv").style.display = "none";
  document.getElementById("nextMonthBtn").disabled = true;

  renderStatsForMonth(viewYear, viewMonth);
}

// Function to update average values
function updateAverageValues(daysInMonth) {
  const safeDaysInMonth = Math.max(daysInMonth, 1);

  EXERCISE_STATS.forEach(({ monthlyStorageKey, averageElementId }) => {
    const monthlyValue = parseInt(localStorage.getItem(monthlyStorageKey), 10) || 0;
    const avg = Math.round(monthlyValue / safeDaysInMonth);
    document.getElementById(averageElementId).innerHTML = avg === 0 ? "–" : avg;
  });
}

function formatFullDate(date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

function createStatsRow(label, values, accentClass = "") {
  const row = document.createElement("tr");
  if (accentClass) {
    row.classList.add(accentClass);
  }

  const labelCell = document.createElement("th");
  labelCell.scope = "row";
  labelCell.textContent = label;
  row.appendChild(labelCell);

  values.forEach((value, index) => {
    const cell = document.createElement("td");
    cell.textContent = (!value || value === "0" || value === 0) ? "–" : value;
    cell.classList.add(EXERCISE_STATS[index].accentClass);
    row.appendChild(cell);
  });

  return row;
}

function getDayValue(statConfig, dayNumber, currentDate) {
  if (dayNumber === currentDate.getDate()) {
    return localStorage.getItem(statConfig.liveStorageKey) || "0";
  }

  return localStorage.getItem(`${statConfig.dayKeyPrefix}${dayNumber}`) || "0";
}

// Function to update exercise tables
function updateExerciseTables(referenceDate = new Date()) {
  const tableBody = document.getElementById("statsTableBody");
  if (!tableBody) {
    return;
  }

  tableBody.innerHTML = "";
  const monthShort = new Intl.DateTimeFormat("de-DE", { month: "short" }).format(referenceDate);

  for (let dayNumber = 1; dayNumber <= referenceDate.getDate(); dayNumber += 1) {
    const values = EXERCISE_STATS.map((statConfig) =>
      getDayValue(statConfig, dayNumber, referenceDate)
    );
    const rowLabel = `${dayNumber}. ${monthShort}`;
    const rowAccent = dayNumber === referenceDate.getDate() ? "is-today" : "";
    tableBody.appendChild(createStatsRow(rowLabel, values, rowAccent));
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

// Archive current month's data before resetting
function archiveCurrentMonth() {
  const lastDate = getLastActiveDate();
  const year = lastDate.getFullYear();
  const month = lastDate.getMonth();
  const key = `nur10_hist_${year}_${month}`;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const hist = { days: daysInMonth, totals: {}, data: {} };
  EXERCISE_STATS.forEach(({ dayKeyPrefix, monthlyStorageKey }) => {
    hist.totals[dayKeyPrefix] = parseInt(localStorage.getItem(monthlyStorageKey), 10) || 0;
    hist.data[dayKeyPrefix] = [];
    for (let d = 1; d <= daysInMonth; d++) {
      hist.data[dayKeyPrefix].push(parseInt(localStorage.getItem(`${dayKeyPrefix}${d}`), 10) || 0);
    }
  });

  localStorage.setItem(key, JSON.stringify(hist));
}

// Function to reset monthly statistics
function monatneu() {
  archiveCurrentMonth();

  EXERCISE_STATS.forEach(({ monthlyStorageKey }) => {
    localStorage.removeItem(monthlyStorageKey);
  });

  clearMonthlyHistory();
  refreshStatisticsView();
}

function clearMonthlyHistory() {
  for (let dayNumber = 1; dayNumber <= 31; dayNumber += 1) {
    EXERCISE_STATS.forEach(({ dayKeyPrefix }) => {
      localStorage.removeItem(`${dayKeyPrefix}${dayNumber}`);
    });
  }
}

function refreshStatisticsView() {
  updateStatistics();

  if (document.getElementById("sta_div").style.display !== "none") {
    const now = new Date();
    if (viewYear === now.getFullYear() && viewMonth === now.getMonth()) {
      document.getElementById("datum").innerHTML = formatFullDate(now);
      updateAverageValues(now.getDate());
      updateExerciseTables(now);
    }
  }
}

// Navigate to previous or next month in statistics view
function navigateMonth(delta) {
  viewMonth += delta;
  if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; }
  if (viewMonth > 11) { viewMonth = 0; viewYear += 1; }

  const now = new Date();
  document.getElementById("nextMonthBtn").disabled =
    viewYear === now.getFullYear() && viewMonth === now.getMonth();

  renderStatsForMonth(viewYear, viewMonth);
}

const MONTH_NAMES = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];

// Render statistics for a given year/month
function renderStatsForMonth(year, month) {
  const now = new Date();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  document.getElementById("monatname").textContent = MONTH_NAMES[month];

  if (isCurrentMonth) {
    document.getElementById("datum").innerHTML = formatFullDate(now);
    updateMonthlyStatistics();
    updateAverageValues(now.getDate());
    updateExerciseTables(now);
  } else {
    document.getElementById("datum").textContent = `${MONTH_NAMES[month]} ${year}`;
    renderArchivedMonth(year, month);
  }
}

// Render a past month from the archive
function renderArchivedMonth(year, month) {
  const key = `nur10_hist_${year}_${month}`;
  const raw = localStorage.getItem(key);
  const monthShort = new Intl.DateTimeFormat("de-DE", { month: "short" }).format(
    new Date(year, month, 1)
  );

  if (!raw) {
    document.getElementById("statsTableBody").innerHTML = `
      <tr><td colspan="4" style="text-align:center;opacity:0.5;padding:1rem">Keine Daten</td></tr>`;
    EXERCISE_STATS.forEach(({ monthElementId, averageElementId }) => {
      document.getElementById(monthElementId).textContent = "–";
      document.getElementById(averageElementId).textContent = "–";
    });
    return;
  }

  const hist = JSON.parse(raw);
  const daysInMonth = hist.days;

  EXERCISE_STATS.forEach(({ dayKeyPrefix, monthElementId, averageElementId }) => {
    const total = hist.totals[dayKeyPrefix] || 0;
    document.getElementById(monthElementId).textContent = total === 0 ? "–" : total;
    document.getElementById(averageElementId).textContent =
      total === 0 ? "–" : Math.round(total / daysInMonth);
  });

  const tableBody = document.getElementById("statsTableBody");
  tableBody.innerHTML = "";
  for (let d = 0; d < daysInMonth; d++) {
    const values = EXERCISE_STATS.map(({ dayKeyPrefix }) =>
      (hist.data[dayKeyPrefix] && hist.data[dayKeyPrefix][d]) || 0
    );
    tableBody.appendChild(createStatsRow(`${d + 1}. ${monthShort}`, values, ""));
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

// Orb control dropdown (visible only in the AV=3 canvas game)
const orbControlSelect = document.getElementById("orbControl");
if (orbControlSelect) {
  orbControlSelect.value = orbControlMode;
  orbControlSelect.addEventListener("change", () => {
    const v = orbControlSelect.value;
    if (
      v === "sensor" || v === "phase" || v === "kinetic" ||
      v === "throttle" || v === "pulse" || v === "tempo"
    ) {
      orbControlMode = v;
      orbPhaseNorm = ss === 1 ? 1 : 0;
      orbKineticY = 0;
      orbThrottleY = 0;
      orbThrottleEnv = 0;
      orbPulseY = 0;
      orbPulseVel = 0;
      orbPulsePending = 0;
      orbPulseToggle = false;
      orbTempoY = 0;
      orbTempoEnv = 0;
      orbRepTimes = [];
    }
  });
}

// Function to start the exercise tracking
function start() {
  resetMotionState();
  if (audioMode === "synth") {
    initSynthWebAudio();
  }
  document.getElementById("startdiv").style.display = "none";
  const aktivDiv = document.getElementById("aktivdiv");
  const aktivCanvasDiv = document.getElementById("aktivcanvasdiv");
  const lDiv = document.getElementById("Ldiv");

  if (AV === 1) {
    aktivDiv.style.display = "";
    aktivCanvasDiv.style.display = "none";
  } else if (AV === 2) {
    aktivDiv.style.display = "";
  } else if (AV === 3) {
    aktivDiv.style.display = "none";
    aktivCanvasDiv.style.display = "";
    // The canvas was hidden on load, so its size may still be 0 here.
    // Measure it now that it's visible, then again on the next frame once
    // layout has definitely settled.
    resizeCanvas();
    requestAnimationFrame(resizeCanvas);
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
const audioUploadControls = document.getElementById("audioUploadControls");

if (audioModeSelect) {
  audioModeSelect.value = audioMode;
  audioModeSelect.addEventListener("change", () => {
    audioMode = audioModeSelect.value;
    localStorage.setItem(STORAGE_KEYS.AudioMode, audioMode);
    handleCustomAudioPauseNow();
    updateAudioUploadVisibility();

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
    resetCustomAudioPosition();
    await saveCustomAudioFile(file);

    if (audioModeSelect) {
      audioModeSelect.value = "file";
    }
    audioMode = "file";
    localStorage.setItem(STORAGE_KEYS.AudioMode, audioMode);

    if (audioInfo) {
      audioInfo.innerHTML = `Gespeichert im Browser: ${file.name}`;
    }

    updateAudioUploadVisibility();
  });
}

function updateAudioUploadVisibility() {
  if (!audioUploadControls) {
    return;
  }

  audioUploadControls.classList.toggle("is-hidden", audioMode !== "file");
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
  processMotionValue(z);
}

function processYVar(y) {
  processMotionValue(y);
}

function processXVar(x) {
  processMotionValue(x);
}

function processMotionValue(value) {
  let nextZone = "mid";

  if (value < GL) {
    nextZone = "low";
  } else if (value > GS) {
    nextZone = "high";
  }

  if (nextZone === motionZone) {
    return;
  }

  motionZone = nextZone;

  if (nextZone === "mid") {
    needsMidCrossing = false;
    return;
  }

  if (needsMidCrossing) {
    return;
  }

  if (nextZone === "high") {
    hochg();
  } else if (nextZone === "low") {
    niedrigg();
  }

  needsMidCrossing = true;
}

// Variables for timing
let firstExecution = 0; // Store the first execution time
const interval = 250; // milliseconds

function resetMotionState() {
  ss = 0;
  motionZone = "mid";
  needsMidCrossing = false;
  firstExecution = 0;
  orbPhaseNorm = 0;
  orbKineticY = 0;
  orbThrottleY = 0;
  orbThrottleEnv = 0;
  orbPulseY = 0;
  orbPulseVel = 0;
  orbPulsePending = 0;
  orbPulseToggle = false;
  orbTempoY = 0;
  orbTempoEnv = 0;
  orbRepTimes = [];
}

// Shared rep-counting logic used by both hochg and niedrigg
function countMotionRep() {
  KB += 1;
  playSound();
  maybeAdvanceCustomAudio();
  if (AV === 2) {
    bildwechselKB();
  }
  updateCountDisplay();
  updateLocalStorageCounts();
  if (modus === 1) {
    orbRepTimes.push(performance.now());
    orbPulsePending += 1;
  }
}

// Called when the sensor value crosses the HIGH threshold
function hochg() {
  const milliseconds = Date.now();
  if (milliseconds - firstExecution > interval) {
    firstExecution = milliseconds;
    untenzahl += 1;
    if (modus === 1) {
      // Squats: standing back up is the completed rep — count + sound here
      if (ss === 1) {
        countMotionRep();
        ss = 0;
      }
    } else {
      // Pull-ups / back extensions: high position arms ready, activate next count
      ss = 1;
    }
  }
}

// Called when the sensor value crosses the LOW threshold
function niedrigg() {
  const milliseconds = Date.now();
  if (milliseconds - firstExecution > interval) {
    firstExecution = milliseconds;
    if (modus === 1) {
      // Squats: reached squat depth — arm the counter for the next stand-up
      ss = 1;
    } else if (ss === 1) {
      // Pull-ups / back extensions: low position = completed rep
      countMotionRep();
      ss = 0;
    }
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
  updateDailyBadge();
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

// Web Audio API pre-buffered playback for low-latency synth sound
let _synthCtx = null;
const _synthBuffers = {};

async function initSynthWebAudio() {
  if (_synthCtx) return;
  try {
    _synthCtx = new (window.AudioContext || window.webkitAudioContext)();
    await Promise.all(
      [["E", 4, 0.5], ["C", 4, 0.5], ["A", 3, 0.4]].map(async ([note, octave, dur]) => {
        const dataUri = Synth.generate("piano", note, octave, dur);
        const resp = await fetch(dataUri);
        const arrayBuf = await resp.arrayBuffer();
        _synthBuffers[note] = await _synthCtx.decodeAudioData(arrayBuf);
      })
    );
  } catch (_e) {
    _synthCtx = null; // fall back to HTML Audio on error
  }
}

function playSynthBufferNote(note) {
  if (_synthCtx && _synthBuffers[note]) {
    if (_synthCtx.state === "suspended") {
      _synthCtx.resume();
    }
    const src = _synthCtx.createBufferSource();
    src.buffer = _synthBuffers[note];
    src.connect(_synthCtx.destination);
    src.start(0);
    return;
  }
  // Fallback: original HTML Audio approach
  const p = Synth.createInstrument("piano");
  p.play(note, 4, 0.5);
}

// Function to play sound
function synthleicht() {
  playSynthBufferNote(KB % 10 === 0 ? "C" : "E");
}

function playOrbSound(isGood) {
  if (audioMode !== "synth") return;
  playSynthBufferNote(isGood ? "E" : "A");
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

  updateAudioUploadVisibility();
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
      updateAudioUploadVisibility();
      return;
    }

    setCustomAudioFromFile(storedFile);
    if (audioInfo) {
      audioInfo.innerHTML = `Aus Browser geladen: ${storedFile.name}`;
    }
  } catch {
    if (audioInfo) {
      audioInfo.innerHTML = "Audio-Datei konnte nicht aus dem Browser geladen werden.";
    }
  }

  updateAudioUploadVisibility();
}

function setCustomAudioFromFile(file) {
  releaseCustomAudioObjectUrl();
  customAudioObjectUrl = URL.createObjectURL(file);

  if (!customAudio) {
    customAudio = new Audio();
    customAudio.addEventListener("loadedmetadata", restoreCustomAudioPosition);
  }

  customAudio.src = customAudioObjectUrl;
  customAudio.preload = "auto";
  customAudio.loop = true;
  customAudio.load();
}

function releaseCustomAudioObjectUrl() {
  if (customAudioObjectUrl) {
    URL.revokeObjectURL(customAudioObjectUrl);
    customAudioObjectUrl = "";
  }
}

function getSavedCustomAudioPosition() {
  const savedPosition = parseFloat(localStorage.getItem(STORAGE_KEYS.AudioPosition));
  return Number.isFinite(savedPosition) && savedPosition > 0 ? savedPosition : 0;
}

function persistCustomAudioPosition() {
  if (audioMode !== "file" || !customAudio) {
    return;
  }

  localStorage.setItem(STORAGE_KEYS.AudioPosition, String(customAudio.currentTime || 0));
}

function restoreCustomAudioPosition() {
  if (!customAudio) {
    return;
  }

  const savedPosition = getSavedCustomAudioPosition();
  if (savedPosition <= 0) {
    return;
  }

  if (Number.isFinite(customAudio.duration) && customAudio.duration > 0) {
    customAudio.currentTime = Math.min(savedPosition, Math.max(0, customAudio.duration - 0.25));
    return;
  }

  customAudio.currentTime = savedPosition;
}

function resetCustomAudioPosition() {
  localStorage.setItem(STORAGE_KEYS.AudioPosition, "0");

  if (customAudio) {
    customAudio.currentTime = 0;
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

function startCustomAudioPlayback(restartTrack = false) {
  if (audioMode !== "file" || !customAudio) {
    return;
  }

  customAudioLastActivityAt = Date.now();
  ensureCustomAudioInactivityWatcher();

  if (customAudio.readyState === 0) {
    customAudio.load();
  }

  if (restartTrack) {
    resetCustomAudioPosition();
  } else if (customAudio.paused) {
    restoreCustomAudioPosition();
  }

  if (!customAudio.paused) {
    return;
  }

  const playPromise = customAudio.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      // ignored: browsers may block autoplay until user interaction
    });
  }
}

function maybeAdvanceCustomAudio(restartTrack = false) {
  startCustomAudioPlayback(restartTrack);
}

function handleCustomAudioPauseNow() {
  customAudioLastActivityAt = 0;
  persistCustomAudioPosition();

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
  // When the canvas is hidden (display:none) its client size is 0. Skipping
  // here avoids locking W/H to a 1×1 box, which otherwise leaves the game
  // blank when the view is shown later.
  if (canvas.clientWidth === 0 || canvas.clientHeight === 0) {
    return;
  }

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

// Re-measure whenever the canvas actually gets real pixels (e.g. after the
// game view is unhidden in start()). ResizeObserver fires on the first layout
// pass when the element goes from 0×0 to a real size.
if (typeof ResizeObserver !== "undefined") {
  const canvasObserver = new ResizeObserver(() => resizeCanvas());
  canvasObserver.observe(canvas);
}

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

  const now = performance.now();
  const dt = Math.min((now - (tick._lastTime || now)) / 1000, 0.1);
  tick._lastTime = now;

  drawBackground();
  drawGrid();
  drawLine(H / 2, "rgba(217, 217, 217, 0.28)");
  drawLine(H / 2 + 9.81 * scaleY, "rgba(79, 255, 231, 0.30)");

  // Get the latest value from the appropriate array
  let currentValue;
  if      (modus === 1) {currentValue = linien.z[linien.z.length - 1]; drawGraph(linien.z, "#ff6f9f", "rgba(255, 111, 159, 0.55)");}
  else if (modus === 2) {currentValue = linien.y[linien.y.length - 1]; drawGraph(linien.y, "#6effd9", "rgba(110, 255, 217, 0.45)"); }
  else if (modus === 3) {currentValue = linien.x[linien.x.length - 1]; drawGraph(linien.x, "#6ab6ff", "rgba(106, 182, 255, 0.45)"); }

  // Display the current value on the canvas
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "600 20px Arial";
  ctx.fillText(currentValue.toFixed(2), 10, 30);

  // Point-collection game (runs on top of the graph in AV=3)
  if (AV === 3) {
    const endpointY = computeOrbEndpointY(currentValue, dt);
    const endpointX = (Probenanzahl - 1) * scaleX * 0.5;
    gameUpdateOrbs(dt, endpointX);
    gameCheckCollisions(endpointX, endpointY);
    gameUpdateParticles(dt);
    gameDrawOrbs();
    gameDrawParticles();
    let headColor = "#ff6f9f";
    let headGlow = "rgba(255, 111, 159, 0.55)";
    if (modus === 2) { headColor = "#6effd9"; headGlow = "rgba(110, 255, 217, 0.45)"; }
    else if (modus === 3) { headColor = "#6ab6ff"; headGlow = "rgba(106, 182, 255, 0.45)"; }
    drawPlayerHead(endpointX, endpointY, headColor, headGlow);
    gameDrawScore();
    drawOrbModeOverlay();
  }
}

// Small HUD so you can see at a glance which control mode is active and the
// key internal signal driving the orb. Useful for sanity-checking that modes
// actually behave differently.
function drawOrbModeOverlay() {
  let detail = "";
  if (modus !== 1) {
    detail = "(only active for squats)";
  } else if (orbControlMode === "phase") {
    detail = `ss=${ss} norm=${orbPhaseNorm.toFixed(2)}`;
  } else if (orbControlMode === "kinetic") {
    detail = `y=${orbKineticY.toFixed(0)}`;
  } else if (orbControlMode === "throttle") {
    detail = `env=${orbThrottleEnv.toFixed(2)} y=${orbThrottleY.toFixed(0)}`;
  } else if (orbControlMode === "pulse") {
    detail = `vel=${orbPulseVel.toFixed(0)} y=${orbPulseY.toFixed(0)} reps=${orbRepTimes.length}`;
  } else if (orbControlMode === "tempo") {
    detail = `env=${orbTempoEnv.toFixed(2)} y=${orbTempoY.toFixed(0)} reps=${orbRepTimes.length}`;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "500 12px Arial";
  ctx.fillText(`mode: ${orbControlMode}  ${detail}`, 10, H - 12);
  ctx.restore();
}

// Maps the current sensor state to the orb's Y pixel position. The non-"sensor"
// modes only activate for squats (modus===1) — other exercises keep the direct
// sensor mapping so the orb still follows the graph line.
function computeOrbEndpointY(currentValue, dt) {
  const sensorY = H / 2 + 9.81 * scaleY + (currentValue || 0) * -scaleY;
  if (modus !== 1 || orbControlMode === "sensor") {
    return sensorY;
  }

  const margin = GAME_ORB_RADIUS + 10;
  const topY = margin;
  const bottomY = H - margin;
  const centerY = (topY + bottomY) / 2;
  const halfRange = (bottomY - topY) / 2;

  if (orbControlMode === "phase") {
    const target = ss === 1 ? 1 : 0;
    const alpha = 1 - Math.exp(-dt / ORB_PHASE_TAU);
    orbPhaseNorm += (target - orbPhaseNorm) * alpha;
    return topY + (bottomY - topY) * orbPhaseNorm;
  }

  if (orbControlMode === "kinetic") {
    // Deviation from gravity sets the orb's *velocity* rather than its position.
    // Stand still → dev ≈ 0 → orb frozen. Moving through a squat produces
    // signed deviation pulses (positive on the way up, negative at transitions),
    // which the orb integrates. A soft exponential pull keeps it from drifting.
    const dev = (currentValue || 0) - 9.81;
    const absDev = Math.abs(dev);
    let v = 0;
    if (absDev > ORB_KINETIC_DEADZONE) {
      v = -Math.sign(dev) * (absDev - ORB_KINETIC_DEADZONE) * ORB_KINETIC_SCALE;
    }
    orbKineticY += v * dt;
    orbKineticY *= Math.exp(-ORB_KINETIC_DAMP * dt);
    if (orbKineticY > halfRange) orbKineticY = halfRange;
    else if (orbKineticY < -halfRange) orbKineticY = -halfRange;
    return centerY + orbKineticY;
  }

  if (orbControlMode === "throttle") {
    // |Z - g| envelope → how fast the orb moves. ss → which way it moves.
    // Holding still at any posture freezes the orb; the harder you pump, the
    // faster it travels toward the endpoint matching your current phase.
    const amp = Math.min(Math.abs((currentValue || 0) - 9.81) / ORB_THROTTLE_REF, 1);
    const rate = amp > orbThrottleEnv ? ORB_THROTTLE_ATTACK : ORB_THROTTLE_RELEASE;
    orbThrottleEnv += (amp - orbThrottleEnv) * (1 - Math.exp(-rate * dt));
    const dir = ss === 1 ? 1 : -1;
    orbThrottleY += orbThrottleEnv * ORB_THROTTLE_MAX_SPEED * dir * dt;
    if (orbThrottleY > halfRange) orbThrottleY = halfRange;
    else if (orbThrottleY < -halfRange) orbThrottleY = -halfRange;
    return centerY + orbThrottleY;
  }

  if (orbControlMode === "pulse") {
    // Consume rep events that arrived since the last frame — each one kicks
    // the orb. Direction points away from its current side so reps counter-
    // balance; with the orb near centre, the kick direction just alternates.
    while (orbPulsePending > 0) {
      let dir;
      if (Math.abs(orbPulseY) > 2) {
        dir = -Math.sign(orbPulseY);
      } else {
        dir = orbPulseToggle ? 1 : -1;
        orbPulseToggle = !orbPulseToggle;
      }
      orbPulseVel += dir * ORB_PULSE_IMPULSE;
      orbPulsePending -= 1;
    }
    orbPulseVel -= orbPulseY * ORB_PULSE_CENTER * dt;
    orbPulseVel *= Math.exp(-ORB_PULSE_DAMP * dt);
    orbPulseY += orbPulseVel * dt;
    if (orbPulseY > halfRange) {
      orbPulseY = halfRange;
      if (orbPulseVel > 0) orbPulseVel = 0;
    } else if (orbPulseY < -halfRange) {
      orbPulseY = -halfRange;
      if (orbPulseVel < 0) orbPulseVel = 0;
    }
    return centerY + orbPulseY;
  }

  if (orbControlMode === "tempo") {
    // Prune old reps, compute cadence, envelope-follow so speed doesn't jitter
    // on each new rep, then drive Y at a speed proportional to cadence with
    // direction from ss (bottom → orb pushes down, top → orb pushes up).
    const now = performance.now();
    const cutoff = now - ORB_TEMPO_WINDOW_MS;
    while (orbRepTimes.length && orbRepTimes[0] < cutoff) {
      orbRepTimes.shift();
    }
    const rate = orbRepTimes.length / (ORB_TEMPO_WINDOW_MS / 1000);
    const target = Math.min(rate / ORB_TEMPO_FULL_RATE, 1);
    const r = target > orbTempoEnv ? ORB_TEMPO_ATTACK : ORB_TEMPO_RELEASE;
    orbTempoEnv += (target - orbTempoEnv) * (1 - Math.exp(-r * dt));
    const dir = ss === 1 ? 1 : -1;
    orbTempoY += orbTempoEnv * ORB_TEMPO_MAX_SPEED * dir * dt;
    if (orbTempoY > halfRange) orbTempoY = halfRange;
    else if (orbTempoY < -halfRange) orbTempoY = -halfRange;
    return centerY + orbTempoY;
  }

  return sensorY;
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

    // In game mode (AV=3), compress the graph so the line endpoint (player)
    // sits in the middle of the canvas and orbs can approach from the right.
    const graphScaleX = scaleX * (AV === 3 ? 0.5 : 1);

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
      const x = i * graphScaleX;
      const y = dataArray[i] * -scaleY;
      const nextX = (i + 1) * graphScaleX;
      const nextY = dataArray[i + 1] * -scaleY;
      const controlX = (x + nextX) / 2;
      const controlY = (y + nextY) / 2;
      ctx.quadraticCurveTo(x, y, controlX, controlY);
    }

    ctx.stroke();

    const endX = (dataArray.length - 1) * graphScaleX;
    const endY = latestValue * -scaleY;
    // In AV=3 the player head is drawn separately by tick() at endpointY so
    // the orb-control mode actually affects where the player sits. Here we
    // only draw the head inline for the non-game graph view.
    if (AV !== 3) {
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 32 + pulse * 12;
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(endX, endY, 10 + pulse * 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.beginPath();
      ctx.arc(endX, endY, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
}

function drawPlayerHead(x, y, color, glowColor) {
  ctx.save();
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 32;
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 11, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Function to initialize an array with zeros
function getInitArr(length) {
    return new Float32Array(length);
}

// ── Point-collection game (integrated into AV=3 canvas) ────────

function gameSpawnOrb() {
  const colorObj = Math.random() < 0.6 ? ORB_GOOD : ORB_BAD;
  // Y range: gravity center ± maxDeviation (random target height)
  const centerY = H / 2 + 9.81 * scaleY;
  const range = maxDeviation * scaleY * 0.8;
  const orbY = centerY + (Math.random() * 2 - 1) * range;
  // Spawn at the right edge; travel left toward the player sitting at W/2.
  // Speed scales with canvas width so crossing time stays roughly constant.
  const speed = W * GAME_ORB_SPEED_FACTOR;
  gameOrbs.push({
    x: W + GAME_ORB_RADIUS,
    y: Math.max(GAME_ORB_RADIUS + 5, Math.min(H - GAME_ORB_RADIUS - 5, orbY)),
    vx: -speed,
    pulse: Math.random() * Math.PI * 2,
    age: 0,
    fill: colorObj.fill,
    glow: colorObj.glow,
    type: colorObj.type,
  });
}

function gameUpdateOrbs(dt, endpointX) {
  gameLastSpawn += dt;
  // Spawn new orbs periodically
  if (gameOrbs.length < GAME_MAX_ORBS && gameLastSpawn > 2.0) {
    gameSpawnOrb();
    gameLastSpawn = 0;
  }
  // Spawn initial orb on first frame
  if (gameOrbs.length === 0 && gameScore === 0) {
    gameSpawnOrb();
    gameLastSpawn = 0;
  }
  for (let i = gameOrbs.length - 1; i >= 0; i--) {
    const orb = gameOrbs[i];
    orb.pulse += dt * 2.5;
    orb.age += dt;
    orb.x += orb.vx * dt;
    // Remove orbs that have passed the player without being collected
    if (orb.x < endpointX - GAME_COLLECT_DIST) {
      gameOrbs.splice(i, 1);
    }
  }
}

function gameCheckCollisions(endpointX, endpointY) {
  for (let i = gameOrbs.length - 1; i >= 0; i--) {
    const orb = gameOrbs[i];
    const dx = endpointX - orb.x;
    const dy = endpointY - orb.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < GAME_COLLECT_DIST) {
      if (orb.type === "good") {
        gameScore += 1;
        gameSpawnParticles(orb.x, orb.y, ORB_GOOD.fill);
        playOrbSound(true);
      } else {
        gameScore = Math.max(0, gameScore - 1);
        gameSpawnParticles(orb.x, orb.y, ORB_BAD.fill);
        playOrbSound(false);
      }
      gameOrbs.splice(i, 1);
    }
  }
}

function gameSpawnParticles(x, y, color) {
  const count = 8 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const speed = 50 + Math.random() * 70;
    gameParticles.push({
      x: x, y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      color: color,
      radius: 2 + Math.random() * 3,
    });
  }
}

function gameUpdateParticles(dt) {
  for (let i = gameParticles.length - 1; i >= 0; i--) {
    const p = gameParticles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt * 2.0;
    if (p.life <= 0) {
      gameParticles.splice(i, 1);
    }
  }
}

function gameDrawOrbs() {
  for (let i = 0; i < gameOrbs.length; i++) {
    const orb = gameOrbs[i];
    const p = Math.sin(orb.pulse) * 0.4 + 0.6;
    // Fade in during the first 0.4s as the orb emerges from the right edge
    const alpha = Math.min(1, orb.age / 0.4);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowColor = orb.glow;
    ctx.shadowBlur = 12 + p * 12;

    // Outer pulsing glow
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, GAME_ORB_RADIUS + p * 4, 0, Math.PI * 2);
    ctx.fillStyle = orb.glow;
    ctx.fill();

    // Inner solid orb
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, GAME_ORB_RADIUS - 3, 0, Math.PI * 2);
    ctx.fillStyle = orb.fill;
    ctx.fill();

    // Bright center
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.fill();

    // × marker on bad orbs
    if (orb.type === "bad") {
      const s = 5;
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(orb.x - s, orb.y - s); ctx.lineTo(orb.x + s, orb.y + s);
      ctx.moveTo(orb.x + s, orb.y - s); ctx.lineTo(orb.x - s, orb.y + s);
      ctx.stroke();
    }

    ctx.restore();
  }
}

function gameDrawParticles() {
  for (let i = 0; i < gameParticles.length; i++) {
    const p = gameParticles[i];
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function gameDrawScore() {
  if (gameScore === 0) return;
  ctx.save();
  ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
  ctx.shadowBlur = 8;
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.font = "bold 26px Arial";
  const text = String(gameScore);
  ctx.fillText(text, W / 2 - ctx.measureText(text).width / 2, 38);

  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.font = "12px Arial";
  const label = "PUNKTE";
  ctx.fillText(label, W / 2 - ctx.measureText(label).width / 2, 54);
  ctx.restore();
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
  maybeAdvanceCustomAudio();
  updatePushUpCounts();

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
  updateDailyBadge();
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
