
const DEFAULT_VALUES = {
  KB: 0,
  LSPEICH: 0,
  KZSPEICH: 0,
  RHSPEICH: 0,
  PROBESAMPLES: 500,
};

const storageKeys = ['KBSPEICH', 'LSPEICH', 'KZSPEICH', 'RHSPEICH'];
const EXERCISES = ['KB', 'LSPEICH', 'KZSPEICH', 'RHSPEICH'];

let modus = 1, audioV = 0, Probenanzahl = DEFAULT_VALUES.PROBESAMPLES, GL = 8, GS = 12;
let ss = 0, untenzahl = 0, AV = 1;

window.onload = function () {
  initPage();
  resetDayData();
  resetMonthData();
};

function initPage() {
  // Hide elements and initialize localStorage
  hideElements(['aktivcanvasdiv', 'Ldiv', 'aktivdiv', 'sta_div', 'table2']);
  localStorage.removeItem("LSPEICHneu");
  localStorage.removeItem("KBSPEICHneu");
  localStorage.removeItem("KZPEICHneu");
  localStorage.removeItem("RHSPEICHneu");
  localStorage.setItem('KBzeitspeicher', +new Date());

  // Set default values if undefined
  EXERCISES.forEach(ex => {
    document.getElementById(ex.toLowerCase()).innerHTML = localStorage.getItem(ex) || "0";
  });
}

function hideElements(ids) {
  ids.forEach(id => document.getElementById(id).style.display = "none");
}

function resetDayData() {
  if (new Date(parseInt(localStorage.getItem('KBzeitspeicher'))).getDate() !== new Date().getDate()) {
    EXERCISES.forEach(ex => {
      const yesterdayTag = ex + "tag" + (new Date().getDate() - 1);
      localStorage.setItem(yesterdayTag, localStorage.getItem(ex));
      localStorage.removeItem(ex);
    });
  }
}

function resetMonthData() {
  const lastMonth = new Date(parseInt(localStorage.getItem('KBzeitspeicher'))).getMonth();
  const currentMonth = new Date().getMonth();
  if (lastMonth !== currentMonth) {
    storageKeys.forEach(key => localStorage.removeItem(key + "monat"));
    localStorage.clear();
  }
}

function displayStats() {
  const today = new Date();
  const monthNames = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  const currentMonth = monthNames[today.getMonth()];

  document.getElementById("datum").innerHTML = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
  document.getElementById("monatname").innerHTML = currentMonth;

  EXERCISES.forEach(ex => {
    const monthlyData = localStorage.getItem(ex + "monat") || 0;
    document.getElementById(`mittelwert${ex}`).innerHTML = Math.round(monthlyData / today.getDate());
    fillTableWithExerciseData(ex, currentMonth);
  });

  document.getElementById("sta_div").style.display = "";
  hideElements(['aktivcanvasdiv', 'aktivdiv', 'startdiv']);
}

function fillTableWithExerciseData(ex, month) {
  for (let i = 1; i <= 31; i++) {
    const value = localStorage.getItem(`${ex}tag${i}`) || 0;
    document.getElementById(`t${i}${ex}`).innerHTML = value;
  }
}

function toggleView() {
  const table2 = document.getElementById("table2");
  if (table2.style.display === "none") {
    document.getElementById("table1div").style.display = "none";
    table2.style.display = "block";
    document.getElementById("details").innerHTML = "Monatsansicht";
  } else {
    document.getElementById("table1div").style.display = "block";
    table2.style.display = "none";
    document.getElementById("details").innerHTML = "Tagesansicht";
  }
}

function changeMode() {
  const modeSelect = document.getElementById("mod");
  modus = parseInt(modeSelect.value);
  updateUIForMode();
}

function updateUIForMode() {
  const startb = document.getElementById("startb");
  const imageSrc = ["media/flach.png", "media/hoch.png", "media/quer.png", "media/LiegeS.png"][modus - 1];
  const bgColors = ["var(--kfarbe)", "var(--kzfarbe)", "var(--rhfarbe)", "var(--lfarbe)"];

  startb.style.backgroundColor = bgColors[modus - 1];
  startb.innerHTML = `<img src="${imageSrc}" width="200px" height="200px" id="${imageSrc}">`;
}

function updateExercise(ex) {
  let count = parseInt(localStorage.getItem(ex)) || 0;
  count++;
  localStorage.setItem(ex, count);
  document.getElementById("heute").innerHTML = count;
  document.getElementById("Anzahl").innerHTML = count;
}

function playSound() {
  let synth = Synth.createInstrument('piano');
  if (KB % 10 === 0) {
    synth.play("C", 4, 0.5);
  } else {
    synth.play("E", 4, 0.5);
  }
}

function startExercise() {
  console.log("Exercise started");
  document.getElementById("startdiv").style.display = "none";
  document.getElementById("aktivdiv").style.display = modus === 4 ? "none" : "";
  document.getElementById("aktivcanvasdiv").style.display = modus === 4 ? "" : "none";

  if ([1, 2, 3].includes(modus)) {
    hideElements(["Ldiv"]);
    startStopwatch();
  } else if (modus === 4) {
    document.getElementById("Ldiv").style.display = "";
  }
}

function startStopwatch() {
  let sec = 0, min = 0;
  setInterval(() => {
    sec++;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
    document.getElementById("sekAn").innerHTML = sec;
    document.getElementById("minAn").innerHTML = min;
  }, 1000);
}
