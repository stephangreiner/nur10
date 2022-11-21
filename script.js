var modus = 1;
var audioV = 0;
var untenzahl = 0;
var KB = 0;
const KBspeich = 0;
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

neuerTagTest()
localStorage.setItem('zeitladenspeicher', +new Date);
if (typeof localStorage.KBSPEICH ==="undefined") 
{; document.getElementById("Gesamtanzeige").innerHTML =  "0"}
else {document.getElementById("Gesamtanzeige").innerHTML =  localStorage.KBSPEICH};

function neuerTagTest(){
  ld = new Date(parseInt(localStorage.getItem('zeitladenspeicher')));
  jd = new Date();
  nld = parseInt(ld.getDate())
  njd = parseInt(jd.getDate())
  if (nld!=njd){LSGneu(),document.getElementById("t").innerHTML = "Guten Morgen"}
  }
  function LSGneu(){localStorage.clear(),document.getElementById("Gesamtanzeige").innerHTML = "0";}
  






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
    if      (ach.value == "0"){audioV = 0; document.getElementById("audioW").style.backgroundColor = "#737373"}
    else if (ach.value == "1"){audioV = 1; document.getElementById("audioW").style.backgroundColor = "#d83535"}
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
if (z < 5) {niedrigg()} 
if (z > 15) {hochg()} 
               }
     

function yvar(){
   console.log("pullmodus")
     if (y < 0) {niedrigg()}
  if (y > 20) {hochg()} 
              }   

function xvar(){
  console.log("VRmodus")
   if (x < 0) {niedrigg()}
   if (x > 20) {hochg()} 
              }   

            }

var firstExecution = 0; // Store the first execution time
var interval = 100; // 2 millisekunden
function hochg() {
var date = new Date();
var milliseconds = date.getTime(); 
    if((milliseconds - firstExecution) > interval) 
    {firstExecution = milliseconds;
      untenzahl = untenzahl+ 1;
      document.getElementById("A1").innerHTML = untenzahl;
 if (ss == 0) {ss = ss + 1;console.log("ss11 "+ ss)} // startet die aktivierung
 else {console.log("komischss" + ss)}
    } 
  else {console.log("zufrüh" + interval);}
                 }


function niedrigg() {
var date = new Date();
var milliseconds = date.getTime(); 
  if((milliseconds - firstExecution) > interval && ss ==1) 
  {firstExecution = milliseconds;
    KB = KB + 1;
    document.getElementById("KB").innerHTML = KB;
    if (typeof(Storage) !== "undefined") {
      if (localStorage.KBSPEICH) {localStorage.KBSPEICH= Number(localStorage.KBSPEICH)+1;} 
      else {localStorage.KBSPEICH = 1;}
                                     document.getElementById("Gesamtanzeige").innerHTML =  localStorage.KBSPEICH;
                                     } else {document.getElementById("Gesamtanzeige").innerHTML = "Sorry, dein Speicher ist komisch";}
  
  
  


    ss = ss - 1;console.log("ss00 "+ ss) // setzt den aktivierung zurück  SS

      if (audioV == 0) {console.log("audiV" + audioV)}
      else if (audioV == 1) {synthleicht()}   
  } 
else {console.log("zufrüh" +interval);}

                     }

function synthleicht(){
  let p = Synth.createInstrument('piano');
  if (KB === 10 || KB === 20 ||KB === 30 || KB ===40 ||KB === 50 ||
    KB === 60 ||KB === 70 || KB ===80 || KB ===90 || KB ===100 || KB ===110 || KB ===120
    ||KB === 130 || KB ===140 || KB ===150 || KB ===160 || KB ===170 
    || KB ===180 || KB ===190 || KB ===200  ){p.play("C",5,0.5)}
  else (p.play("C",4,0.5))
   }


                 

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
  document.getElementById("LSGdiv").style.display ="none"
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
  untenzahl = 0;
  Zahlsquats2 = 0;
  KB = 0;
  document.getElementById("A1").innerHTML = untenzahl;
  document.getElementById("A2").innerHTML = Zahlsquats2;
  document.getElementById("A3").innerHTML = KB;
  document.getElementById("wdiv").style.display =""
  document.getElementById("startb").style.display =""
  document.getElementById("Anzeige").style.display="none"
  removeEventListener("devicemotion", handleMotionEvent)
  removeEventListener("devicemotion", doSample)
  clearInterval(i)
}


