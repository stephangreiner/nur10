var modus = 1;
var audioV = 0;
var untenzahl = 0;
var KB = 0;
const KBspeich = 0;
var Probenanzahl = 500;
var ss = 0; 
var GL = 8;
var GS = 12;
var AV = 1;

window.onload = function () {
neuerTagTest();
neuerMonatTest();
standartbild()
localStorage.removeItem("LSPEICHneu")
localStorage.removeItem("KBSPEICHneu");
document.getElementById("monat").innerHTML =  localStorage.KBSPEICHmonat;
document.getElementById("monatL").innerHTML =  localStorage.LSPEICHmonat;
document.getElementById("monatKZ").innerHTML =  localStorage.KZSPEICHmonat;
document.getElementById("aktivcanvasdiv").style.display="none";
document.getElementById("Ldiv").style.display="none";
document.getElementById("aktivdiv").style.display="none";
document.getElementById("sta_div").style.display = "none";
localStorage.setItem('KBzeitspeicher', +new Date);
if (typeof localStorage.KBSPEICH ==="undefined") 
{document.getElementById("heute").innerHTML =  "0"}
else {document.getElementById("heute").innerHTML =  localStorage.KBSPEICH};

if (typeof localStorage.LSPEICH ==="undefined") 
{document.getElementById("heuteL").innerHTML =  "0"}
else {document.getElementById("heuteL").innerHTML =  localStorage.LSPEICH};

if (typeof localStorage.KZSPEICH ==="undefined") 
{document.getElementById("heuteKZ").innerHTML =  "0"}
else {document.getElementById("heuteKZ").innerHTML =  localStorage.KZSPEICH};

                            }


function sta_zeigen(){
  const monatn = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
  d = new Date();  
  let name = monatn[d.getMonth()];
  document.getElementById("datum").innerHTML = d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear();
  document.getElementById("mittelwert").innerHTML = Math.round(localStorage.KBSPEICHmonat  / d.getDate());
   document.getElementById("mittelwertKZ").innerHTML = Math.round(localStorage.KZSPEICHmonat  / d.getDate());
  document.getElementById("mittelwertL").innerHTML = Math.round(localStorage.LSPEICHmonat  / d.getDate());
 
document.getElementById("sta_div").style.display = "";
document.getElementById("aktivcanvasdiv").style.display="none";
document.getElementById("aktivdiv").style.display="none";
document.getElementById("startdiv").style.display="none";
document.getElementById("monatname").innerHTML = name;
document.getElementById("monatname2").innerHTML = name;
document.getElementById("t1").innerHTML = localStorage.getItem("Ktag1")
document.getElementById("t2").innerHTML = localStorage.getItem("Ktag2") 
document.getElementById("t3").innerHTML = localStorage.getItem("Ktag3")
document.getElementById("t4").innerHTML = localStorage.getItem("Ktag4") 
document.getElementById("t5").innerHTML = localStorage.getItem("Ktag5")
document.getElementById("t6").innerHTML = localStorage.getItem("Ktag6") 
document.getElementById("t7").innerHTML = localStorage.getItem("Ktag7")
document.getElementById("t8").innerHTML = localStorage.getItem("Ktag8") 
document.getElementById("t9").innerHTML = localStorage.getItem("Ktag9")
document.getElementById("t10").innerHTML = localStorage.getItem("Ktag10") 
document.getElementById("t11").innerHTML = localStorage.getItem("Ktag11")
document.getElementById("t12").innerHTML = localStorage.getItem("Ktag12") 
document.getElementById("t13").innerHTML = localStorage.getItem("Ktag13")
document.getElementById("t14").innerHTML = localStorage.getItem("Ktag14") 
document.getElementById("t15").innerHTML = localStorage.getItem("Ktag15")
document.getElementById("t16").innerHTML = localStorage.getItem("Ktag16") 
document.getElementById("t17").innerHTML = localStorage.getItem("Ktag17")
document.getElementById("t18").innerHTML = localStorage.getItem("Ktag18") 
document.getElementById("t19").innerHTML = localStorage.getItem("Ktag19")
document.getElementById("t20").innerHTML = localStorage.getItem("Ktag20") 
document.getElementById("t21").innerHTML = localStorage.getItem("Ktag21")
document.getElementById("t22").innerHTML = localStorage.getItem("Ktag22") 
document.getElementById("t23").innerHTML = localStorage.getItem("Ktag23")
document.getElementById("t24").innerHTML = localStorage.getItem("Ktag24") 
document.getElementById("t25").innerHTML = localStorage.getItem("Ktag25")
document.getElementById("t26").innerHTML = localStorage.getItem("Ktag26") 
document.getElementById("t27").innerHTML = localStorage.getItem("Ktag27")
document.getElementById("t28").innerHTML = localStorage.getItem("Ktag28") 
document.getElementById("t29").innerHTML = localStorage.getItem("Ktag29")
document.getElementById("t30").innerHTML = localStorage.getItem("Ktag30") 
const monate = document.getElementsByClassName("monats");
for (let i = 0; i < d.getDate() ; i++) {
 monate[i].innerHTML = (i +1) + "." + (name)
} // das ist umgesetzt von hinter dem Blook Problem ?
document.getElementById("t1L").innerHTML = localStorage.getItem("tag1")
document.getElementById("t2L").innerHTML = localStorage.getItem("tag2") 
document.getElementById("t3L").innerHTML = localStorage.getItem("tag3")
document.getElementById("t4L").innerHTML = localStorage.getItem("tag4") 
document.getElementById("t5L").innerHTML = localStorage.getItem("tag5")
document.getElementById("t6L").innerHTML = localStorage.getItem("tag6") 
document.getElementById("t7L").innerHTML = localStorage.getItem("tag7")
document.getElementById("t8L").innerHTML = localStorage.getItem("tag8") 
document.getElementById("t9L").innerHTML = localStorage.getItem("tag9")
document.getElementById("t10L").innerHTML = localStorage.getItem("tag10") 
document.getElementById("t11L").innerHTML = localStorage.getItem("tag11")
document.getElementById("t12L").innerHTML = localStorage.getItem("tag12") 
document.getElementById("t13L").innerHTML = localStorage.getItem("tag13")
document.getElementById("t14L").innerHTML = localStorage.getItem("tag14") 
document.getElementById("t15L").innerHTML = localStorage.getItem("tag15")
document.getElementById("t16L").innerHTML = localStorage.getItem("tag16") 
document.getElementById("t17L").innerHTML = localStorage.getItem("tag17")
document.getElementById("t18L").innerHTML = localStorage.getItem("tag18") 
document.getElementById("t19L").innerHTML = localStorage.getItem("tag19")
document.getElementById("t20L").innerHTML = localStorage.getItem("tag20") 
document.getElementById("t21L").innerHTML = localStorage.getItem("tag21")
document.getElementById("t22L").innerHTML = localStorage.getItem("tag22") 
document.getElementById("t23L").innerHTML = localStorage.getItem("tag23")
document.getElementById("t24L").innerHTML = localStorage.getItem("tag24") 
document.getElementById("t25L").innerHTML = localStorage.getItem("tag25")
document.getElementById("t26L").innerHTML = localStorage.getItem("tag26") 
document.getElementById("t27L").innerHTML = localStorage.getItem("tag27")
document.getElementById("t28L").innerHTML = localStorage.getItem("tag28") 
document.getElementById("t29L").innerHTML = localStorage.getItem("tag29")
document.getElementById("t30L").innerHTML = localStorage.getItem("tag30") 
document.getElementById("t31L").innerHTML = localStorage.getItem("tag31") 
  
document.getElementById("t1KZ").innerHTML = localStorage.getItem("KZtag1")
document.getElementById("t2KZ").innerHTML = localStorage.getItem("KZtag2") 
document.getElementById("t3KZ").innerHTML = localStorage.getItem("KZtag3")
document.getElementById("t4KZ").innerHTML = localStorage.getItem("KZtag4") 
document.getElementById("t5KZ").innerHTML = localStorage.getItem("KZtag5")
document.getElementById("t6KZ").innerHTML = localStorage.getItem("KZtag6") 
document.getElementById("t7KZ").innerHTML = localStorage.getItem("KZtag7")
document.getElementById("t8KZ").innerHTML = localStorage.getItem("KZtag8") 
document.getElementById("t9KZ").innerHTML = localStorage.getItem("KZtag9")
document.getElementById("t10KZ").innerHTML = localStorage.getItem("KZtag10") 
document.getElementById("t11KZ").innerHTML = localStorage.getItem("KZtag11")
document.getElementById("t12KZ").innerHTML = localStorage.getItem("KZtag12") 
document.getElementById("t13KZ").innerHTML = localStorage.getItem("KZtag13")
document.getElementById("t14KZ").innerHTML = localStorage.getItem("KZtag14") 
document.getElementById("t15KZ").innerHTML = localStorage.getItem("KZtag15")
document.getElementById("t16KZ").innerHTML = localStorage.getItem("KZtag16") 
document.getElementById("t17KZ").innerHTML = localStorage.getItem("KZtag17")
document.getElementById("t18KZ").innerHTML = localStorage.getItem("KZtag18") 
document.getElementById("t19KZ").innerHTML = localStorage.getItem("KZtag19")
document.getElementById("t20KZ").innerHTML = localStorage.getItem("KZtag20") 
document.getElementById("t21KZ").innerHTML = localStorage.getItem("KZtag21")
document.getElementById("t22KZ").innerHTML = localStorage.getItem("KZtag22") 
document.getElementById("t23KZ").innerHTML = localStorage.getItem("KZtag23")
document.getElementById("t24KZ").innerHTML = localStorage.getItem("KZtag24") 
document.getElementById("t25KZ").innerHTML = localStorage.getItem("KZtag25")
document.getElementById("t26KZ").innerHTML = localStorage.getItem("KZtag26") 
document.getElementById("t27KZ").innerHTML = localStorage.getItem("KZtag27")
document.getElementById("t28KZ").innerHTML = localStorage.getItem("KZtag28") 
document.getElementById("t29KZ").innerHTML = localStorage.getItem("KZtag29")
document.getElementById("t30KZ").innerHTML = localStorage.getItem("KZtag30") 
document.getElementById("t31KZ").innerHTML = localStorage.getItem("tag31") 
}

function neuerTagTest(){
  ld = new Date(parseInt(localStorage.getItem('KBzeitspeicher')));
  jd = new Date();
  nld = parseInt(ld.getDate())
  njd = parseInt(jd.getDate())
  if (nld!=njd){neuer_tag()}
                       }
function neuer_tag(){
  d = new Date();  
  a =  localStorage.getItem("KBSPEICH");
  localStorage.setItem("Ktag" + (d.getDate()-1), a)
  localStorage.removeItem("KBSPEICH")
  l =  localStorage.getItem("LSPEICH");
  localStorage.setItem("tag" + (d.getDate()-1), l)
  localStorage.removeItem("LSPEICH")
  k =  localStorage.getItem("KZSPEICH");
  localStorage.setItem("KZtag" + (d.getDate()-1), k)
  localStorage.removeItem("KZSPEICH")




                   }
function neuerMonatTest(){
         ld = new Date(parseInt(localStorage.getItem('KBzeitspeicher')));
         jd = new Date();
         nld = parseInt(ld.getMonth())
         njd = parseInt(jd.getMonth())
         if (nld!=njd){monatneu()}
         console.log("monatpeicher = " + nld)
         console.log("monatjezt = " + njd) 
                          }   
function monatneu(){    
  localStorage.removeItem("KBSPEICHmonat"),
  localStorage.clear();
  document.getElementById("monat").innerHTML = "0";
                        }
  

var as = document.getElementById("ansichtw") 
as.addEventListener("change", function() {
if      (as.value == "1"){AV = 1}
if      (as.value == "2"){AV = 2}
else if (as.value == "3"){AV = 3}
})      

function start() {
document.getElementById("startdiv").style.display ="none"  
if  (AV == 1){document.getElementById("aktivdiv").style.display = ""; document.getElementById("aktivcanvasdiv").style.display = "none"; }
  else if (AV == 2){ document.getElementById("aktivdiv").style.display = ""}
  else if (AV == 3){document.getElementById("aktivcanvasdiv").style.display = ""; document.getElementById("aktivdiv").style.display = "none"; }
  else {console.log("canvasanzeige")}

if (modus == 1 || 2 || 3 ){
  document.getElementById ("Ldiv").style.display ="none"
  uhrlos()
  addEventListener("devicemotion", handleMotionEvent);
  addEventListener("devicemotion", doSample);
  tick();  
}
  if (modus == 4){document.getElementById ("aktivdiv").style.display ="none"; document.getElementById ("Ldiv").style.display ="";
           }
                      }


function standartbild(){
   var  flachbild = document.createElement("img");
   flachbild.src = "media/flach.png";
   flachbild.id ="flachbild"
   flachbild.style.width = "200px";
   flachbild.style.hight = "200px";
   startb.appendChild(flachbild);
   screen.orientation.unlock()
                      }

const modusV = document.getElementById('mod');
modusV.value = 1;
modusV.min = 1;
modusV.max = 4; 


var mo = document.getElementById("mod") 
mo.addEventListener("change", function() {
if(modusV.value == "1"){ modus = 1; 
      var  flachbild = document.createElement("img");
      flachbild.src = "media/flach.png";
      flachbild.id ="flachbild"
      flachbild.style.width = "200px";
      flachbild.style.hight = "200px";
      startb.appendChild(flachbild);
      document.getElementById( "startb").style.backgroundColor = "rgb(255, 29, 29)"
      if (document.getElementById('flachbild') != null) { console.log("gibts schon");}
      if (document.getElementById('hochbild') != null) { document.getElementById('hochbild').remove();}
      if (document.getElementById('querbild') != null) { document.getElementById('querbild').remove();}
      if (document.getElementById('liegesbild') != null) { document.getElementById('liegesbild').remove();}
      else {console.log("komisch1")}
                      }


if (modusV.value == "2"){modus = 2;
     var  hochbild = document.createElement("img");
      hochbild.src = "media/hoch.png";
      hochbild.id ="hochbild";
      hochbild.style.width = "200px";
      hochbild.style.hight = "200px";
      startb.appendChild(hochbild);
      document.getElementById( "startb").style.backgroundColor = "rgb(149, 216, 32)"
      if (document.getElementById('hochbild') != null) { console.log("gibts schon");}
      if (document.getElementById('flachbild') != null) { document.getElementById('flachbild').remove()}
      if (document.getElementById('querbild') != null) { document.getElementById('querbild').remove()}
      if (document.getElementById('liegesbild') != null) { document.getElementById('liegesbild').remove();}
       else {console.log("komisch2")}
                    }
if (modusV.value == "3"){modus = 3; 
     var  querbild = document.createElement("img");
    querbild.id ="querbild";
   querbild.src = "media/quer.png";
    querbild.style.width = "200px";
    querbild.style.hight = "200px";
    startb.appendChild(querbild); 
    document.getElementById( "startb").style.backgroundColor = "rgb(55, 229, 229)"
    if (document.getElementById('querbild') != null) { console.log("querbild  gibts schon");}
    if (document.getElementById('flachbild') != null) { document.getElementById('flachbild').remove();}
    if (document.getElementById('hochbild') != null) { document.getElementById('hochbild').remove();}
    if (document.getElementById('liegesbild') != null) { document.getElementById('liegesbild').remove();}
    else{console.log("komisch3")} 
                 }

if (modusV.value == "4"){modus = 4;  var  liegesbild = document.createElement("img");
    liegesbild.id ="liegesbild";
    liegesbild.src = "media/LiegeS.png";
    liegesbild.style.width = "200px";
    liegesbild.style.hight = "200px";
    startb.appendChild(liegesbild);                 
    document.getElementById( "startb").style.backgroundColor = "rgb(247, 255, 29)";
    if (document.getElementById('liegesbild')!= null) { console.log(" liegesbild gibts schon");}
    if (document.getElementById('flachbild')!= null) { document.getElementById('flachbild').remove();}
    if (document.getElementById('hochbild') != null) { document.getElementById('hochbild').remove();}
    if (document.getElementById('querbild') != null) { document.getElementById('querbild').remove();}  
    else{console.log("komisch4")} 
                               }



                                        })  

                                        
var glw = document.getElementById("GLW") 
glw.addEventListener("change", function() {
if      (glw.value == "1"){GL = 8}
else if (glw.value == "2"){GL = 5}
else if (glw.value == "3"){GL = 0}
                                                  })  

var gsw = document.getElementById("GSW") 
gsw.addEventListener("change", function() {
if      (gsw.value == "1"){GS = 12}
else if (gsw.value == "2"){GS = 15}
else if (gsw.value == "3"){GS = 20}
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

if (modus == 1){zvar(); document.getElementById("oneb").style.backgroundColor ="red"}
if (modus == 2){yvar(); document.getElementById("oneb").style.backgroundColor ="green"}
if (modus == 3){xvar();  document.getElementById("oneb").style.backgroundColor ="blue"}


function zvar(){
console.log("squatmodus")
if (z < GL) {niedrigg()} 
if (z > GS) {hochg()}} 
                 
function yvar(){
console.log("pullmodus")
if (y < GL) {niedrigg()}
if (y > GS) {hochg()}}
                 
function xvar(){
console.log("VRmodus")
if (x < GL) {niedrigg()}
if (x > GS) {hochg()}}
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
if((milliseconds - firstExecution) > interval && ss ==1) // die Verzögerung ist wahrscheinlich unnötig
  { firstExecution = milliseconds;
    KB = KB + 1; 
ss = ss - 1;console.log("ss00 "+ ss) // setzt den aktivierung zurück  SS
    if (audioV == 0) {synthleicht()} else if (audioV == 1) {console.log("audiV1keinton" + audioV)}} else {console.log("ton komisch");}
    if (AV == 2) {bildwechselKB ()}
    document.getElementById("KB").innerHTML = KB;
    document.getElementById("Anzahl").innerHTML = KB;

    if (modus == 1){
        if (typeof(Storage) !== "undefined") {
        if (localStorage.KBSPEICH) {localStorage.KBSPEICH= Number(localStorage.KBSPEICH)+1;} 
        else {localStorage.KBSPEICH = 1;}
        document.getElementById("heute").innerHTML =  localStorage.KBSPEICH;
        } else {document.getElementById("heute").innerHTML = "komisch";}

       if (typeof(Storage) !== "undefined") {
       if (localStorage.KBSPEICHneu) {localStorage.KBSPEICHneu= Number(localStorage.KBSPEICHneu)+1;} 
       else {localStorage.KBSPEICHneu = 1;}
       } else {console.log("komisch")}

       if (typeof(Storage) !== "undefined") {
       if (localStorage.KBSPEICHmonat) {localStorage.KBSPEICHmonat= Number(localStorage.KBSPEICHmonat)+1;} 
       else {localStorage.KBSPEICHmonat = 1;}
     } else {console.log("komisch")}
   }
    
if (modus == 2){
    if (typeof(Storage) !== "undefined") {
    if (localStorage.KZSPEICH) {localStorage.KZSPEICH= Number(localStorage.KZSPEICH)+1;} 
    else {localStorage.KZSPEICH = 1;}
    document.getElementById("heuteKZ").innerHTML =  localStorage.KZSPEICH;
    } else {document.getElementById("heuteKZ").innerHTML = "komisch";}

   if (typeof(Storage) !== "undefined") {
   if (localStorage.KZSPEICHneu) {localStorage.KZSPEICHneu= Number(localStorage.KZSPEICHneu)+1;} 
   else {localStorage.KZSPEICHneu = 1;}
   } else {console.log("komisch")}

   if (typeof(Storage) !== "undefined") {
   if (localStorage.KZSPEICHmonat) {localStorage.KZSPEICHmonat= Number(localStorage.KZSPEICHmonat)+1;} 
   else {localStorage.KZSPEICHmonat = 1;}
 } else {console.log("komisch")}
}

   
   
     

 
}
                    



function bildwechselKB () {
  if      (KB === 10 || KB === 20 ||KB === 30 || KB ===40 ||KB === 50 ||
    KB === 60 ||KB === 70 || KB ===80 || KB ===90 || KB ===100 || KB ===110 || KB ===120
    ||KB === 130 || KB ===140 || KB ===150 || KB ===160 || KB ===170 
    || KB ===180 || KB ===190 || KB ===200 ) {bildKB ()}      
}  



const ONEK = document.getElementById("oneb") 
function bildKB(){
mediaV = Math.floor(Math.random() * 26) + 1
if      (mediaV==1){ONEK.style.background = "url('media/bm1.jpg') no-repeat center";}
else if (mediaV==2){ONEK.style.background = "url('media/bm2.jpg') no-repeat center";}
else if (mediaV==3){ONEK.style.background = "url('media/bm3.jpg') no-repeat center";}
else if (mediaV==4){ONEK.style.background = "url('media/bm4.jpg') no-repeat center";}
else if (mediaV==5){ONEK.style.background = "url('media/bm5.jpg') no-repeat center";}
else if (mediaV==6){ONEK.style.background = "url('media/bm6.jpg') no-repeat center";}
else if (mediaV==7){ONEK.style.background = "url('media/bm7.jpg') no-repeat center";}
else if (mediaV==8){ONEK.style.background = "url('media/bm8.jpg') no-repeat center";}
else if (mediaV==9){ONEK.style.background = "url('media/bm9.jpg') no-repeat center";}
else if (mediaV==10){ONEK.style.background = "url('media/bm10.jpg') no-repeat center";}
else if (mediaV==11){ONEK.style.background = "url('media/bm11.jpg') no-repeat center";}
else if (mediaV==12){ONEK.style.background = "url('media/bm12.jpg') no-repeat center";}
else if (mediaV==13){ONEK.style.background = "url('media/bm13.jpg') no-repeat center";}
else if (mediaV==14){ONEK.style.background = "url('media/bm14.jpg') no-repeat center";}
else if (mediaV==15){ONEK.style.background = "url('media/bm15.jpg') no-repeat center";}
else if (mediaV==16){ONEK.style.background = "url('media/bm16.jpg') no-repeat center";}
else if (mediaV==17){ONEK.style.background = "url('media/bm17.jpg') no-repeat center";}
else if (mediaV==18){ONEK.style.background = "url('media/bm18.jpg') no-repeat center";}
else if (mediaV==19){ONEK.style.background = "url('media/bm19.jpg') no-repeat center";}        
else if (mediaV==20){ONEK.style.background = "url('media/bm20.jpg') no-repeat center";}
else if (mediaV==21){ONEK.style.background = "url('media/bm21.jpg') no-repeat center";}
else if (mediaV==22){ONEK.style.background = "url('media/bm22.jpg') no-repeat center";}
else if (mediaV==23){ONEK.style.background = "url('media/bm23.jpg') no-repeat center";}
else if (mediaV==24){ONEK.style.background = "url('media/bm24.jpg') no-repeat center";}
else if (mediaV==25){ONEK.style.background = "url('media/bm25.jpg') no-repeat center";}  
else if (mediaV==26){ONEK.style.background = "url('media/bm26.jpg') no-repeat center";}
else if (mediaV==27){ONEK.style.background = "url('media/bm27.jpg') no-repeat center";}           
}  
















function synthleicht(){
  let p = Synth.createInstrument('piano');
  if (KB === 10 || KB === 20 ||KB === 30 || KB ===40 ||KB === 50 ||
    KB === 60 ||KB === 70 || KB ===80 || KB ===90 || KB ===100 || KB ===110 || KB ===120
    ||KB === 130 || KB ===140 || KB ===150 || KB ===160 || KB ===170 
    || KB ===180 || KB ===190 || KB ===200 ||KB === 210 || KB ===220 || KB ===230 || KB ===240 || KB ===250 
    || KB ===260 || KB ===270 || KB ===280 ){p.play("C",5,0.5)}
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
   
function neu(){location.reload()}





var  L = 0
function nasedrauf(){
  console.log(L)
  L = L+ 1;
  document.getElementById("LieA").innerHTML = L; 
  if (typeof(Storage) !== "undefined") {
    if (localStorage.LSPEICH) {localStorage.LSPEICH= Number(localStorage.LSPEICH)+1;} 
    else {localStorage.LSPEICH = 1;}
    document.getElementById("heute").innerHTML =  localStorage.LSPEICH;
  } else {console.log("komisch")}

  if (typeof(Storage) !== "undefined") {
   if (localStorage.LSPEICHneu) {localStorage.LSPEICHneu= Number(localStorage.LSPEICHneu)+1;} 
   else {localStorage.LSPEICHneu = 1;}
 } else {console.log("komisch")}

 if (typeof(Storage) !== "undefined") {
   if (localStorage.LSPEICHmonat) {localStorage.LSPEICHmonat= Number(localStorage.LSPEICHmonat)+1;} 
   else {localStorage.LSPEICHmonat = 1;}
 } else {console.log("komisch")}

 if (AV == 2) {bildwechsel ()}
    }

 function bildwechsel () {
      if      (L === 10 || L === 20 ||L === 30 || L ===40 ||L === 50 ||
        L === 60 ||L === 70 || L ===80 || L ===90 || L ===100 || L ===110 || L ===120
        ||L === 130 || L ===140 || L ===150 || L ===160 || L ===170 
        || L ===180 || L ===190 || L ===200 ) {bild ()}      
  }  

   
  
  const ONE = document.getElementById("LieB") 
  function bild(){
    mediaV = Math.floor(Math.random() * 26) + 1
    if      (mediaV==1){ONE.style.background = "url('media/bm1.jpg') no-repeat center";}
    else if (mediaV==2){ONE.style.background = "url('media/bm2.jpg') no-repeat center";}
    else if (mediaV==3){ONE.style.background = "url('media/bm3.jpg') no-repeat center";}
    else if (mediaV==4){ONE.style.background = "url('media/bm4.jpg') no-repeat center";}
    else if (mediaV==5){ONE.style.background = "url('media/bm5.jpg') no-repeat center";}
    else if (mediaV==6){ONE.style.background = "url('media/bm6.jpg') no-repeat center";}
    else if (mediaV==7){ONE.style.background = "url('media/bm7.jpg') no-repeat center";}
    else if (mediaV==8){ONE.style.background = "url('media/bm8.jpg') no-repeat center";}
    else if (mediaV==9){ONE.style.background = "url('media/bm9.jpg') no-repeat center";}
    else if (mediaV==10){ONE.style.background = "url('media/bm10.jpg') no-repeat center";}
    else if (mediaV==11){ONE.style.background = "url('media/bm11.jpg') no-repeat center";}
    else if (mediaV==12){ONE.style.background = "url('media/bm12.jpg') no-repeat center";}
    else if (mediaV==13){ONE.style.background = "url('media/bm13.jpg') no-repeat center";}
    else if (mediaV==14){ONE.style.background = "url('media/bm14.jpg') no-repeat center";}
    else if (mediaV==15){ONE.style.background = "url('media/bm15.jpg') no-repeat center";}
    else if (mediaV==16){ONE.style.background = "url('media/bm16.jpg') no-repeat center";}
    else if (mediaV==17){ONE.style.background = "url('media/bm17.jpg') no-repeat center";}
    else if (mediaV==18){ONE.style.background = "url('media/bm18.jpg') no-repeat center";}
    else if (mediaV==19){ONE.style.background = "url('media/bm19.jpg') no-repeat center";}        
    else if (mediaV==20){ONE.style.background = "url('media/bm20.jpg') no-repeat center";}
    else if (mediaV==21){ONE.style.background = "url('media/bm21.jpg') no-repeat center";}
    else if (mediaV==22){ONE.style.background = "url('media/bm22.jpg') no-repeat center";}
    else if (mediaV==23){ONE.style.background = "url('media/bm23.jpg') no-repeat center";}
    else if (mediaV==24){ONE.style.background = "url('media/bm24.jpg') no-repeat center";}
    else if (mediaV==25){ONE.style.background = "url('media/bm25.jpg') no-repeat center";}  
    else if (mediaV==26){ONE.style.background = "url('media/bm26.jpg') no-repeat center";}
    else if (mediaV==27){ONE.style.background = "url('media/bm27.jpg') no-repeat center";}           
    }  
