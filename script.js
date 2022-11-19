var nv = {'C0': 16.35,'C#0': 17.32,'Db0': 17.32,'D0': 18.35,'D#0': 19.45,'Eb0': 19.45,'E0': 20.60,'F0': 21.83,
'F#0': 23.12,'Gb0': 23.12,'G0': 24.50,'G#0': 25.96,'Ab0': 25.96,'A0': 27.50,'A#0': 29.14,'Bb0': 29.14,'B0': 30.87,
'C1': 32.70,'C#1': 34.65,'Db1': 34.65,'D1': 36.71,'D#1': 38.89,'Eb1': 38.89,'E1': 41.20,'F1': 43.65,'F#1': 46.25,
'Gb1': 46.25,'G1': 49.00,'G#1': 51.91,'Ab1': 51.91,'A1': 55.00,'A#1': 58.27,'Bb1': 58.27,'B1': 61.74,'C2': 65.41,
'C#2': 69.30,'Db2': 69.30,'D2': 73.42,'D#2': 77.78,'Eb2': 77.78,'E2': 82.41,'F2': 87.31,'F#2': 92.50,'Gb2': 92.50,
'G2': 98.00,'G#2': 103.83,'Ab2': 103.83,'A2': 110.00,'A#2': 116.54,'Bb2': 116.54,'B2': 123.47,'C3': 130.81,'C#3': 138.59,
'Db3': 138.59,'D3': 146.83,'D#3': 155.56,'Eb3': 155.56,'E3': 164.81,'F3': 174.61,'F#3': 185.00,'Gb3': 185.00,'G3': 196.00,
'G#3': 207.65,'Ab3': 207.65,'A3': 220.00,'A#3': 233.08,'Bb3': 233.08,'B3': 246.94,'C4': 261.63,'C#4': 277.18,'Db4': 277.18,
'D4': 293.66,'D#4': 311.13,'Eb4': 311.13,'E4': 329.63,'F4': 349.23,'F#4': 369.99,'Gb4': 369.99,'G4': 392.00,'G#4': 415.30,
'Ab4': 415.30,'A4': 440.00,'A#4': 466.16,'Bb4': 466.16,'B4': 493.88,'C5': 523.25,'C#5': 554.37,'Db5': 554.37,'D5': 587.33,
'D#5': 622.25,'Eb5': 622.25,'E5': 659.26,'F5': 698.46,'F#5': 739.99,'Gb5': 739.99,'G5': 783.99,'G#5': 830.61,'Ab5': 830.61,
'A5': 880.00,'A#5': 932.33,'Bb5': 932.33,'B5': 987.77,'C6': 1046.50,'C#6': 1108.73,'Db6': 1108.73,'D6': 1174.66,
'D#6': 1244.51,'Eb6': 1244.51,'E6': 1318.51,'F6': 1396.91,'F#6': 1479.98,'Gb6': 1479.98,'G6': 1567.98,'G#6': 1661.22,
'Ab6': 1661.22,'A6': 1760.00,'A#6': 1864.66,'Bb6': 1864.66,'B6': 1975.53,'C7': 2093.00,'C#7': 2217.46,'Db7': 2217.46,
'D7': 2349.32, 'D#7': 2489.02,'Eb7': 2489.02,'E7': 2637.02,'F7': 2793.83,'F#7': 2959.96,'Gb7': 2959.96,'G7': 3135.96,
'G#7': 3322.44,'Ab7': 3322.44,'A7': 3520.00,'A#7': 3729.31,'Bb7': 3729.31,'B7': 3951.07,'C8': 4186.01};
var modus = 1;
var audioV = 1;
var Zahlsquats1 = 0;
var Zahlsquats2 = 0;
var Zahlsquats3 = 0;
var Probenanzahl = 500;
var ss = 0; //situation Squat 0 = unten 1 = oben
document.getElementById("canvas").style.display="none"
document.getElementById("neub").style.display="none"
document.getElementById("KniebA").style.display="none"
document.getElementById("ZAnzeige").style.display="none"

standartbild()
function standartbild(){
var  img1 = document.createElement("img");
      img1.src = "media/flach.png";
      img1.id ="img1"
      img1.style.width = "200px";
      img1.style.hight = "200px";
      startb.appendChild(img1);
      screen.orientation.unlock()
}

var mo = document.getElementById("modus") 
mo.addEventListener("change", function() {
if(mo.value == "1"){ modus = 1;
      if (document.getElementById('img2') != null) { document.getElementById('img2').remove();}
      if (document.getElementById('img3') != null) { document.getElementById('img3').remove();}
      if (document.getElementById('img1') != null) { console.log("gibts schon");} else {
        standartbild()
            }
                      }
if (mo.value == "2"){modus = 2;
      if (document.getElementById('img1') != null) { document.getElementById('img1').remove()}
      if (document.getElementById('img3') != null) { document.getElementById('img3').remove()}
      if (document.getElementById('img2') != null) { console.log("gibts schon");
      } else {
      var  img2 = document.createElement("img");
      img2.src = "media/hoch.png";
      img2.id ="img2"
      img2.style.width = "200px";
      img2.style.hight = "200px";
      startb.appendChild(img2);
            }
                    }
if (mo.value == "3"){modus = 3;
    if (document.getElementById('img1') != null) { document.getElementById('img1').remove();}
    if (document.getElementById('img2') != null) { document.getElementById('img2').remove();}
    if (document.getElementById('img3') != null) { console.log(" img3  gibts schon");
    } else{
      var  img3 = document.createElement("img");
      img3.id ="img3"
      img3.src = "media/quer.png";
      img3.style.width = "200px";
      img3.style.hight = "200px";
      startb.appendChild(img3); 
         } 
                 }
                                        })  



var ach = document.getElementById("audioW") 
ach.addEventListener("change", function() {
    if      (ach.value == "1"){audioV = 1; document.getElementById("audioW").style.backgroundColor = "#737373"}
    else if (ach.value == "2"){audioV = 2; document.getElementById("audioW").style.backgroundColor = "#d83535"}
    else if (ach.value == "3"){audioV = 3; document.getElementById("audioW").style.backgroundColor =  "#d83535"}
          })  


//für die Darstellung in dr Detailansicht werden die Variablen auf eine Dezimalstelle gerundet
// ich glaub es ist besser mit schwer oben / Azsgabeungekehrt
// startet die handleMotionEvent die ist speziell für den Sensor handling ungewöhnlich
function handleMotionEvent(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;

if (modus == 1){zvar(),document.getElementById("sensora").innerHTML = Math.round( z * 10 ) / 10; screen.orientation.lock("portrait")}
if (modus == 2){yvar(),document.getElementById("sensora").innerHTML = Math.round( y * 10 ) / 10; screen.orientation.lock("portrait")}
if (modus == 3){xvar(),document.getElementById("sensora").innerHTML = Math.round( x * 10 ) / 10; screen.orientation.lock("landscape-primary")}
  
function zvar(){
  console.log("squatmodus")
if (z > 20) {schwer1()} 
if (z > 9.8 && z < 10.1){normal2()} 
if (z < 0) {leicht3();
  }
   }  

function yvar(){
   console.log("pullmodus")
  if (y > 20) {schwer1()} 
  if (y > 9.8 && y < 10.1){normal2()} 
  if (y < 0) {leicht3()}
  }   

function xvar(){
  console.log("VRmodus")
   if (x > 20) {schwer1()} 
   if (x > 9.8 && x < 10.1){normal2()} 
   if (x < 0) {leicht3()}
   }   
} 


var firstExecution = 0; // Store the first execution time
var interval = 300; // 2 millisekunden
function schwer1() {

    if (audioV == 1) {console.log("audiv" + audioV)}
    else if (audioV== 2 ) {} // synthschwer()-- rausgenommen damit nur 1 ton wenn vorher unten war
    else if (audioV== 3) {audioc()}

    var date = new Date();
    var milliseconds = date.getTime(); 
    if((milliseconds - firstExecution) > interval)
    {firstExecution = milliseconds;
      
    
      Zahlsquats1 = Zahlsquats1+ 1;
      document.getElementById("A1").innerHTML = Zahlsquats1;
    } else {
      console.log("zufrüh" + interval);
    }


  if (ss == 0) {ss = ss + 1;console.log("ss11 "+ ss)} // startet die aktivierung
  else {console.log("komischss" + ss)}
}

function normal2() {




  var date = new Date();
  var milliseconds = date.getTime(); 
  if((milliseconds - firstExecution) > interval)
  {
    firstExecution = milliseconds;
    Zahlsquats2 = Zahlsquats2+ 1;
    document.getElementById("A2").innerHTML = Zahlsquats2;
  } else {
    console.log("zufrüh" +interval);
  }
}

function leicht3() {
  if (audioV == 1) {console.log("audiV" + audioV)}
  else if (audioV == 2 && ss ==1) {synthleicht()}  
  else if (audioV == 3) {audioc()}

  var date = new Date();
  var milliseconds = date.getTime(); 
  if((milliseconds - firstExecution) > interval)
  {firstExecution = milliseconds;
    
    Zahlsquats3 = Zahlsquats3+ 1;
    document.getElementById("A3").innerHTML = Zahlsquats3;
  } else {
    console.log("zufrüh" +interval);
  }

  if (ss == 1){ss = ss - 1;console.log("ss00 "+ ss)} // setzt den aktivierung zurück  SS

}

function synthleicht(){
  let p = Synth.createInstrument('piano');
   p.play("C",5,0.5)}
function synthschwer(){
    let p = Synth.createInstrument('piano');
     p.play("C",4,0.5)}
                   
                 

// canvas gezchnet werden Linien
var canvas = document.getElementById('canvas');
var W = canvas.width;
var H = canvas.height;
var ctx = canvas.getContext('2d');
var linien = {};
var scaleX = W/Probenanzahl;
var scaleY = 5;
linien.z = getInitArr(Probenanzahl);
linien.y = getInitArr(Probenanzahl);
linien.x = getInitArr(Probenanzahl);

// DiviceMotionEvent ist spezialfunktion für den Sensor
function start() {
document.getElementById("wdiv").style.display ="none"
document.getElementById("startb").style.display ="none"
document.getElementById("canvas").style.display=""
document.getElementById("neub").style.display=""
document.getElementById("KniebA").style.display=""

uhrlos()
addEventListener("devicemotion", handleMotionEvent);
addEventListener("devicemotion", doSample);
tick();  
}


// wird y dann auch gezeichnet ?
function doSample(event) {
if (modus==1){ shift(linien.z, event.accelerationIncludingGravity.z);}
if (modus==2){ shift(linien.y, event.accelerationIncludingGravity.y);}
if (modus==3){ shift(linien.x, event.accelerationIncludingGravity.x);}
}

function tick() {
  requestAnimationFrame(tick);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, W, H);
  zehnGlinie(),zehnleichtlinie();zehnschwerlinie()
  if (modus ==1) {drawGraph(linien.z, scaleX, scaleY);}
  if (modus ==2) {drawGraph(linien.y, scaleX, scaleY);}
  if (modus ==3) {drawGraph(linien.x, scaleX, scaleY);}
}

//die Zahlen sind entsprechend der oben angegeben Scale = 5 alle x *5
function zehnGlinie() {
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(0, (H/2)+50);
  ctx.lineTo(W, (H/2)+50);
  ctx.stroke();
}
function zehnleichtlinie() {
  ctx.strokeStyle = 'brown';
  ctx.beginPath();
  ctx.moveTo(0, (H/2)+100);
  ctx.lineTo(W, (H/2)+100);
  ctx.stroke();
}
function zehnschwerlinie() {
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
  ctx.moveTo(0, (H/2)-0);
  ctx.lineTo(W, (H/2)-0);
  ctx.stroke();
}


function drawGraph(linien, scaleX, scaleY) {  
  ctx.save();
  ctx.translate(0, H/2); 
  ctx.lineWidth = 4
  ctx.strokeStyle = "green";
  if (min >= 1){ctx.strokeStyle = "red";}
  if (min >= 2){ ctx.strokeStyle = "violet";}
  if (min >= 3){ ctx.strokeStyle = "rgb(255, 255, 0)";
}
  ctx.beginPath();
  var len = linien.length;
  ctx.moveTo(0, linien[0] * scaleY);
  for(var i = 0; i < len; i++){
    ctx.lineTo(i*scaleX, linien[i]*scaleY);
   }
  ctx.stroke();
  ctx.restore();
}

//get Float32Array of length initialized to 0
function getInitArr(length) {
  var arr = new Float32Array(length);
  return arr;
}

//zieht eine Probe aus doSample und fügt sie zeitlich hinten an den Array an und malt so die Linie
function shift(arr, datum) {
  var ret = arr[0];
  for (var i = 1; i < arr.length; i++) { arr[i - 1] = arr[i]; }
  arr[arr.length - 1] = datum;
  return ret;
}

//stopuhr
var sec = 0;
var min = "";
function tock(){
  document.getElementById("sekAn").innerHTML= sec
  document.getElementById("minAn").innerHTML= min
    sec = sec+1;
    if (sec >= 60) {sec = 0,min++;}
              }
function uhrlos() {i =setInterval(tock, 1000); }
   
function neu(){
  sec = 0;
  min =0;
  Zahlsquats1 = 0;
  Zahlsquats2 = 0;
  Zahlsquats3 = 0;
  document.getElementById("A1").innerHTML = Zahlsquats1;
  document.getElementById("A2").innerHTML = Zahlsquats2;
  document.getElementById("A3").innerHTML = Zahlsquats3;
  document.getElementById("wdiv").style.display =""
  document.getElementById("startb").style.display =""
  document.getElementById("Anzeige").style.display="none"
  removeEventListener("devicemotion", handleMotionEvent)
  removeEventListener("devicemotion", doSample)
  clearInterval(i)
}


i = 0
function audioc(){
var context = new AudioContext()
var o = context.createOscillator()
var  g = context.createGain()
o.connect(g)
g.connect(context.destination)
g.gain.exponentialRampToValueAtTime( 0.0001, context.currentTime + 1)
i = i + 1
if (i == 1){var frequency = nv["C4"]}
else {var frequency = nv["G4"]}
o.frequency.value = frequency
o.start(0)
o.stop(0.1)}
