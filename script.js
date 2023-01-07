const ONE = document.getElementById("oneb");
var L = 0;
const LSPEICH= 0;
var Ton =1;
var  bildV =1;
var fl = [];
var  tl = [];
let p = Synth.createInstrument('piano');
let o = Synth.createInstrument('organ');


window.onload = function () {
   neuerTagTest();
   neuerMonatTest() 
   localStorage.removeItem("LSPEICHneu")
   document.getElementById("monat").innerHTML =  localStorage.LSPEICHmonat;
   document.getElementById("aktivdiv").style.display = "none";
   document.getElementById("klavierdiv").style.display = "none";
   document.getElementById("sta_div").style.display = "none";
   localStorage.setItem('zeitladenspeicher', +new Date);
   if (typeof localStorage.LSPEICH ==="undefined") 
   {document.getElementById("heute").innerHTML =  "0"}
   else {document.getElementById("heute").innerHTML =  localStorage.LSPEICH};
}

function sta_zeigen(){
const monatn = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
d = new Date();  
let name = monatn[d.getMonth()];
document.getElementById("datum").innerHTML = d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear();
document.getElementById("mittelwert").innerHTML = Math.round(localStorage.LSPEICHmonat  / d.getDate())
document.getElementById("sta_div").style.display = "";
document.getElementById("Einstellungsdiv").style.display = "none"
document.getElementById("monatname").innerHTML = name
document.getElementById("monatname2").innerHTML = name
document.getElementById("t1").innerHTML = localStorage.getItem("tag1")
document.getElementById("t2").innerHTML = localStorage.getItem("tag2") 
document.getElementById("t3").innerHTML = localStorage.getItem("tag3")
document.getElementById("t4").innerHTML = localStorage.getItem("tag4") 
document.getElementById("t5").innerHTML = localStorage.getItem("tag5")
document.getElementById("t6").innerHTML = localStorage.getItem("tag6") 
document.getElementById("t7").innerHTML = localStorage.getItem("tag7")
document.getElementById("t8").innerHTML = localStorage.getItem("tag8") 
document.getElementById("t9").innerHTML = localStorage.getItem("tag9")
document.getElementById("t10").innerHTML = localStorage.getItem("tag10") 
document.getElementById("t11").innerHTML = localStorage.getItem("tag11")
document.getElementById("t12").innerHTML = localStorage.getItem("tag12") 
document.getElementById("t13").innerHTML = localStorage.getItem("tag13")
document.getElementById("t14").innerHTML = localStorage.getItem("tag14") 
document.getElementById("t15").innerHTML = localStorage.getItem("tag15")
document.getElementById("t16").innerHTML = localStorage.getItem("tag16") 
document.getElementById("t17").innerHTML = localStorage.getItem("tag17")
document.getElementById("t18").innerHTML = localStorage.getItem("tag18") 
document.getElementById("t19").innerHTML = localStorage.getItem("tag19")
document.getElementById("t20").innerHTML = localStorage.getItem("tag20") 
document.getElementById("t21").innerHTML = localStorage.getItem("tag21")
document.getElementById("t22").innerHTML = localStorage.getItem("tag22") 
document.getElementById("t23").innerHTML = localStorage.getItem("tag23")
document.getElementById("t24").innerHTML = localStorage.getItem("tag24") 
document.getElementById("t25").innerHTML = localStorage.getItem("tag25")
document.getElementById("t26").innerHTML = localStorage.getItem("tag26") 
document.getElementById("t27").innerHTML = localStorage.getItem("tag27")
document.getElementById("t28").innerHTML = localStorage.getItem("tag28") 
document.getElementById("t29").innerHTML = localStorage.getItem("tag29")
document.getElementById("t30").innerHTML = localStorage.getItem("tag30") 
document.getElementById("t31").innerHTML = localStorage.getItem("tag31") 
const monate = document.getElementsByClassName("monats");
for (let i = 0; i < d.getDate() ; i++) {
 monate[i].innerHTML = (i+1) + "." + (name)

}
                    }

var t = document.getElementById("Tonwahl") 
t.addEventListener("change", function() {
if (t.value == "1"){Ton = 1;document.getElementById("Tonwahl").style.backgroundColor ="#f7ff1d"}
else if (t.value == "2"){Ton = tl;document.getElementById("Tonwahl").style.backgroundColor ="#f7ff1d",vorschau()} //toleiter
else if (t.value == "3"){Ton = fl;document.getElementById("Tonwahl").style.backgroundColor ="#f7ff1d",document.getElementById("C4").style.backgroundColor = "",vorschau()} 
else if (t.value == "4"){Ton = 2;document.getElementById("Tonwahl").style.backgroundColor ="#737373"} 

  })// Enten
var b = document.getElementById("Bildwahl") 
b.addEventListener("change", function() {
    if (b.value == "1"){bildV = 1;document.getElementById("Bildwahl").style.backgroundColor ="#737373"}
    else if (b.value == "2"){bildV = 2;document.getElementById("Bildwahl").style.backgroundColor ="#f7ff1d"}  
    else if (b.value == "3"){bildV = 3;document.getElementById("Bildwahl").style.backgroundColor ="#f7ff1d"}   
  })

function start(){
document.getElementById("sta_div").style.display = "none";
document.getElementById("Einstellungsdiv").style.display = "none"
if      (bildV == 1) {document.getElementById("aktivdiv").style.display = ""; screen.orientation.unlock()}
else if (bildV == 2) {document.getElementById("aktivdiv").style.display = ""; screen.orientation.lock("portrait")}
else if (bildV == 3)  {document.getElementById("klavierdiv").style.display = "";screen.orientation.lock("landscape-primary")}
}

function nasedrauf(){
console.log(Ton)
L = L+ 1;
document.getElementById("Anzahl").innerHTML = L; 
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

if (bildV == 2) {bildwechsel ()}
else {}

if (Ton == 1) {synthding()}
else if (Ton == tl || Ton == fl) {synth()}
else {console.log("ton aus")}


                                    }


function neuerTagTest(){
     ld = new Date(parseInt(localStorage.getItem('zeitladenspeicher')));
     jd = new Date();
     nld = parseInt(ld.getDate())
     njd = parseInt(jd.getDate())
     if (nld!=njd){neu_tag(),document.getElementById("t").innerHTML = "Guten Morgen"}
     }


function neu_tag(){
d = new Date();  
a =  localStorage.getItem("LSPEICH");
localStorage.setItem("tag" + (d.getDate()-1), a)
localStorage.removeItem("LSPEICH")

}

function neuerMonatTest(){
          ld = new Date(parseInt(localStorage.getItem('zeitladenspeicher')));
          jd = new Date();
          nld = parseInt(ld.getMonth())
          njd = parseInt(jd.getMonth())
          if (nld!=njd){monatneu()}
          }
     
function monatneu(){    
localStorage.removeItem("LSPEICHmonat","tag1","tag2","tag3","tag4","tag5","tag6","tag7","tag8","tag9","tag10","tag11","tag12","tag12","tag14","tag15",
"tag16","tag17","tag18","tag19","tag2ß","tag21","tag22","tag23","tag24","tag25","tag26","tag27","tag28","tag29","tag30","tag31");
document.getElementById("monat").innerHTML = "0";}
               
               

function zurueck(){ location.reload();}
function bildwechsel () {
         if      (L === 10 || L === 20 ||L === 30 || L ===40 ||L === 50 ||
           L === 60 ||L === 70 || L ===80 || L ===90 || L ===100 || L ===110 || L ===120
           ||L === 130 || L ===140 || L ===150 || L ===160 || L ===170 
           || L ===180 || L ===190 || L ===200 ) {bild ()}      
     }    
     
function synthding() {
     if (L === 10 || L === 20 ||L === 30 || L ===40 ||L === 50 ||
       L === 60 ||L === 70 || L ===80 || L ===90 || L ===100 || L ===110 || L ===120
       ||L === 130 || L ===140 || L ===150 || L ===160 || L ===170 
       || L ===180 || L ===190 || L ===200 ||L === 210 || L ===220 || L ===230 || L ===240 || L ===250 
       || L ===260 || L ===270 || L ===280 ){p.play("C",5,0.5)}
     else (p.play("C",4,0.5))
      }
     
let   d = 1
function synth(){
if     (L==1){if(Ton==tl){o.play("C",4,d)} else if(Ton==fl){o.play("D",4,3)}}                     
else if(L==2){if(Ton==tl){o.play("D",4,d)} else if(Ton==fl){o.play("A",4,3)}} 
else if(L==3){if(Ton==tl){o.play("E",4,d)} else if (Ton ==fl){o.play("D",4,3)}}
else if(L==4){if(Ton==tl){o.play("F",4,d)} else if (Ton==fl){o.play("E",4,0.5)}}
else if(L==5){if(Ton==tl){o.play("G",4,d)} else if(Ton ==fl){o.play("F#",4,0.5)}}
else if(L==6){if(Ton==tl){o.play("A",4,d)} else if (Ton ==fl){o.play("G",4,3)}}
else if(L==7){if(Ton==tl){o.play("B",4,d)} else if (Ton==fl){o.play("F#",4,3)}} 
else if(L==8){if(Ton==tl){o.play("C",5,d)} else if (Ton==fl){o.play("E",4,3)}}
else if(L==9){if(Ton==tl){o.play("D",5,d)} else if (Ton==fl){o.play("A",3,0.5)}} 
else if(L==10){if(Ton==tl){o.play("E",5,d)} else if (Ton==fl){o.play("B",3,3)}}
else if(L==11){if(Ton==tl){o.play("F",5,d)} else if(Ton==fl){o.play("C#",4,3)}}
else if(L==12){if(Ton==tl){o.play("G",5,d)} else if(Ton==fl){o.play("D",4,3)}}
else if(L==13){if(Ton==tl){o.play("A",5,d)} else if(Ton==fl){o.play("E",4,1)}}
else if(L==14){if(Ton==tl){o.play("B",5,d)} else if(Ton==fl){o.play("F#",4,1)}}
else if(L==15){if(Ton==tl){o.play("C",6,d)} else if (Ton==fl){o.play("G",4,1)}}
else if(L==16){if(Ton==tl){o.play("D",6,d)} else if(Ton==fl){o.play("F#",4,1.5)}} 
else if(L==17){if(Ton==tl){o.play("E",6,d)} else if(Ton==fl){o.play("E",4,3)}}
else if(L==18){if(Ton==tl){o.play("F",6,d)} else if(Ton==fl){o.play("D",4,3)}} 
else if(L==19){if(Ton==tl){o.play("G",6,d)} else if(Ton==fl){o.play("D",4,3)}}
else if(L==20){if(Ton==tl){o.play("A",5,d)} else if(Ton==fl){o.play("A",4,3)}}
else if(L==21){if(Ton==tl){o.play("B",5,d)} else if(Ton==fl){o.play("D",4,3)}}
else if(L==22){if(Ton==tl){o.play("C",1,d)} else if(Ton==fl){o.play("E",4,0.5)}}
else if(L==23){if(Ton==tl){o.play("D",1,d)} else if(Ton==fl){o.play("F#",4,0.5)}}
else if(L==24){if(Ton==tl){o.play("E",1,1)} else if(Ton==fl){o.play("G",4,3)}}
else if(L==25){if(Ton==tl){o.play("F",1,1)} else if(Ton==fl){o.play("F#",4,3)}}
else if(L==26){if(Ton==tl){o.play("G",1,1)} else if(Ton==fl){o.play("E",4,3)}}
else if(L==27){if(Ton==tl){o.play("A",1,1)} else if(Ton==fl){o.play("A",3,0.5)}}
else if(L==28){if(Ton==tl){o.play("B",1,1)} else if(Ton==fl){o.play("B",3,3)}}
else if(L==29){if(Ton==tl){o.play("C",2,1)} else if(Ton==fl){o.play("C#",4,3)}}
else if(L==30){if(Ton==tl){o.play("D",2,1)} else if(Ton==fl){o.play("D",4,3)}}
else if(L==31){if(Ton==tl){o.play("E",2,1)} else if(Ton==fl){o.play("E",4,1)}}
else if(L==32){if(Ton==tl){o.play("F",2,1)} else if(Ton==fl){o.play("F#",4,1)}}
else if(L==33){if(Ton==tl){o.play("G",2,1)} else if(Ton==fl){o.play("G",4,1)}}
else if(L==34){if(Ton==tl){o.play("A",2,1)} else if(Ton==fl){o.play("F#",4,1.5)}}
else if(L==35){if(Ton==tl){o.play("B",2,1)} else if(Ton==fl){o.play("E",4,3)}}
else if(L==36){if(Ton==tl){o.play("C",3,1)} else if(Ton==fl){o.play("D",4,3)}}
else if(L==37){if(Ton==tl){o.play("D",3,1)} else if(Ton==fl){o.play("C#",4,1)}}
else if(L==38){if(Ton==tl){o.play("E",3,1)} else if(Ton==fl){o.play("F#",4,1)}}
else if(L==39){if(Ton==tl){o.play("F",3,1)} else if(Ton==fl){o.play("A",4,0.5)}}
else if(L==40){if(Ton==tl){o.play("G",3,1)} else if(Ton==fl){o.play("C#",5,0.5)}}
else if(L==41){if(Ton==tl){o.play("A",3,1)} else if(Ton==fl){o.play("B",4,1.5)}}
else if(L==42){if(Ton==tl){o.play("B",5,1)} else if (Ton==fl){o.play("C#",4,1)}}
else if(L==43){if(Ton==tl){o.play("C",4,1)} else if (Ton==fl){o.play("F",4,1)}}
else if(L==44){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("A",4,0.5)}} 
else if(L==45){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("C#",5,0.5)}} 
else if(L==46){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("B",4,1.5)}}
else if(L==47){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("C#",4,1)}}
else if(L==48){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("F",4,1)}}
else if(L==49){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("A",4,1)}}
else if(L==50){if(Ton==tl){o.play("G",5,1)} else if(Ton==fl){o.play("C#",5,1.5)}}
else if(L==51){if(Ton==tl){o.play("G",5,1)} else if(Ton==fl){o.play("B",4,1)}}
else if(L==52){if(Ton==tl){o.play("G",5,1)} else if(Ton==fl){o.play("A",4,1)}}
else if(L==53){if(Ton==tl){o.play("G",5,1)} else if(Ton==fl){o.play("A",4,1.5)}}
else if(L==54){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("F#",4,1)}} 
else if(L==55){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("A",4,0.5)}}
else if(L==56){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("F#",4,0.5)}}
else if(L==57){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("G",4,3)}}
else if(L==58){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("D",4,3)}}
else if(L==59){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("A",4,3)}}
else if(L==60){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("D",4,3)}}
else if(L==61){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("E",4,1)}}
else if(L==62){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("F#",4,0.5)}}
else if(L==63){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("G",4,3)}}
else if(L==64){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("F#",4,3)}}
else if(L==65){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("E",4,3)}} 
else if(L==66){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("A",3,0.5)}}
else if(L==67){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("B",3,3)}}
else if(L==68){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("C#",4,3)}}
else if(L==69){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("D",4,3)}}
else if(L==70){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("E",4,1)}}
else if(L==71){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("F#",4,1)}}
else if(L==72){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("G",4,1)}}
else if(L==73){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("F#",4,3)}}
else if(L==74){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("E",4,3)}}
else if(L==75){if(Ton==tl){o.play("G",5,1)} else if (Ton==fl){o.play("D",4,3)}}

}




function bild(){
mediaV = Math.floor(Math.random() * 25) + 1
console.log("medienvariable:", mediaV);
if      (mediaV==1){ONE.style.background = "url('bilder/bm1.jpg') no-repeat center";}
else if (mediaV==2){ONE.style.background = "url('bilder/bm2.jpg') no-repeat center";}
else if (mediaV==3){ONE.style.background = "url('bilder/bm3.jpg') no-repeat center";}
else if (mediaV==4){ONE.style.background = "url('bilder/bm4.jpg') no-repeat center";}
else if (mediaV==5){ONE.style.background = "url('bilder/bm5.jpg') no-repeat center";}
else if (mediaV==6){ONE.style.background = "url('bilder/bm6.jpg') no-repeat center";}
else if (mediaV==7){ONE.style.background = "url('bilder/bm7.jpg') no-repeat center";}
else if (mediaV==8){ONE.style.background = "url('bilder/bm8.jpg') no-repeat center";}
else if (mediaV==9){ONE.style.background = "url('bilder/bm9.jpg') no-repeat center";}
else if (mediaV==10){ONE.style.background = "url('bilder/bm10.jpg') no-repeat center";}
else if (mediaV==11){ONE.style.background = "url('bilder/bm11.jpg') no-repeat center";}
else if (mediaV==12){ONE.style.background = "url('bilder/bm12.jpg') no-repeat center";}
else if (mediaV==13){ONE.style.background = "url('bilder/bm13.jpg') no-repeat center";}
else if (mediaV==14){ONE.style.background = "url('bilder/bm14.jpg') no-repeat center";}
else if (mediaV==15){ONE.style.background = "url('bilder/bm15.jpg') no-repeat center";}
else if (mediaV==16){ONE.style.background = "url('bilder/bm16.jpg') no-repeat center";}
else if (mediaV==17){ONE.style.background = "url('bilder/bm17.jpg') no-repeat center";}
else if (mediaV==18){ONE.style.background = "url('bilder/bm18.jpg') no-repeat center";}
else if (mediaV==19){ONE.style.background = "url('bilder/bm19.jpg') no-repeat center";}        
else if (mediaV==20){ONE.style.background = "url('bilder/bm20.jpg') no-repeat center";}
else if (mediaV==21){ONE.style.background = "url('bilder/bm21.jpg') no-repeat center";}
else if (mediaV==22){ONE.style.background = "url('bilder/bm22.jpg') no-repeat center";}
else if (mediaV==23){ONE.style.background = "url('bilder/bm23.jpg') no-repeat center";}
else if (mediaV==24){ONE.style.background = "url('bilder/bm24.jpg') no-repeat center";}
else if (mediaV==25){ONE.style.background = "url('bilder/bm25.jpg') no-repeat center";}            
}  



d = 1
function plus(){L = L+1, console.log(L),vorschau(),d = 1,console.log(d)}
function dlang (){d = 2; console.log(d)
                        if(d = 2)  {document.getElementById("bla").style.backgroundColor = "#e6e600"}}
function dkurz (){d = 0.5;  if(d = 0.5)  {document.getElementById("bku").style.backgroundColor = "#e6e600"}; console.log(d)}
function C4_click () {p.play("C",4,d),plus()}
function D4_click () {p.play("D",4,d),plus()}
function E4_click () {p.play("E",4,d),plus()}
function F4_click () {p.play("F",4,d),plus()}
function G4_click () {p.play("G",4,d),plus()}
function A4_click () {p.play("A",4,d),plus()}
function B4_click () {p.play("B",4,d),plus()}
function C5_click () {p.play("C",5,d),plus()}
function D5_click () {p.play("D",5,d),plus()}
function E5_click () {p.play("E",5,d),plus()}
function F5_click () {p.play("F",5,d),plus()}
function G5_click () {p.play("G",5,d),plus()}
function A5_click () {p.play("A",5,d),plus()}
function B5_click () {p.play("B",5,d),plus()}
function Cis4_click () {p.play("C#",4,d),plus()}
function Dis4_click () {p.play("D#",4,d),plus()}
function Fis4_click () {p.play("F#",4,d),plus()}
function Gis4_click () {p.play("G#",4,d),plus()}
function Ais4_click () {p.play("A#",4,d),plus()}
function Cis5_click () {p.play("C#",5,d),plus()}
function Dis5_click () {p.play("D#",5,d),plus()}
function Fis5_click () {p.play("F#",5,d),plus()}
function Gis5_click () {p.play("G#",5,d),plus()}
function Ais5_click () {p.play("A#",5,d),plus()}
function Eflex5_click (){plus()}

function vorschau(){
if(L==0){
  if(Ton==tl){document.getElementById("C4").style.backgroundColor = "blue",document.getElementById("D4").style.backgroundColor = ""}
  else if(Ton==fl){document.getElementById("D4").style.backgroundColor = "yellow",
                  document.getElementById("bla").style.backgroundColor = "yellow", console.log ("L" +L)}}
else if(L==1){
     if(Ton==tl){document.getElementById("D4").style.backgroundColor = "blue";document.getElementById("C4").style.backgroundColor = ""}
     else if(Ton==fl){document.getElementById("A4").style.backgroundColor = "yellow";
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("D4").style.backgroundColor = "",console.log (L)}}                     
else if(L==2){
     if(Ton==tl){document.getElementById("E4").style.backgroundColor = "blue",document.getElementById("D4").style.backgroundColor = ""}
     else if(Ton==fl){document.getElementById("D4").style.backgroundColor = "yellow";
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("A4").style.backgroundColor = "",
                     console.log ("L" +L)}} 
else if(L==3){
      if(Ton==tl){document.getElementById("F4").style.backgroundColor = "blue",document.getElementById("E4").style.backgroundColor = ""}
      else if (Ton ==fl){document.getElementById("E4").style.backgroundColor = "yellow",
                        document.getElementById("D4").style.backgroundColor = "",
                        document.getElementById("bla").style.backgroundColor = "", 
                        document.getElementById("bku").style.backgroundColor = "yellow",
                        console.log ("L" +L)}}
else if(L==4){
     if(Ton==tl){document.getElementById("G4").style.backgroundColor = "blue", document.getElementById("F4").style.backgroundColor = ""}
     else if (Ton==fl){document.getElementById("Fis4").style.backgroundColor = "yellow";
                      document.getElementById("E4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                      document.getElementById("bku").style.backgroundColor = "yellow",
                      console.log ("L" +L)}}
else if(L==5){
     if(Ton==tl){document.getElementById("A4").style.backgroundColor = "blue", document.getElementById("G4").style.backgroundColor = ""} 
     else if(Ton ==fl){
                      document.getElementById("G4").style.backgroundColor = "yellow",
                      document.getElementById("Fis4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "yellow",
                      document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==6){
      if(Ton==tl){document.getElementById("B4").style.backgroundColor = "blue", document.getElementById("A4").style.backgroundColor = ""}
      else if (Ton ==fl){document.getElementById("Fis4").style.backgroundColor = "yellow",
                        document.getElementById("G4").style.backgroundColor = "",
                        document.getElementById("bla").style.backgroundColor = "yellow",
                        document.getElementById("bku").style.backgroundColor = "",
                        console.log ("L" +L)}}
else if(L==7){
      if(Ton==tl){document.getElementById("C5").style.backgroundColor = "blue", document.getElementById("B4").style.backgroundColor = ""}
      else if (Ton==fl){document.getElementById("E4").style.backgroundColor = "yellow",
                       document.getElementById("Fis4").style.backgroundColor = "",
                       document.getElementById("bla").style.backgroundColor = "yellow",
                        document.getElementById("bku").style.backgroundColor = "",
                       
                       console.log ("L" +L)}} 
else if(L==8){
     if(Ton==tl){document.getElementById("D5").style.backgroundColor = "blue", document.getElementById("C5").style.backgroundColor = ""}
     else if (Ton==fl){document.getElementById("Eflex5").style.backgroundColor = "red",
                      document.getElementById("E4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                      document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==9){
  if(Ton==tl){document.getElementById("E5").style.backgroundColor = "blue", document.getElementById("D5").style.backgroundColor = ""}
  else if (Ton==fl){document.getElementById("Eflex5").style.backgroundColor = "red",
                   p.play("A",3,1),console.log (L)} } 
else if(L==10){
     if(Ton==tl){document.getElementById("F5").style.backgroundColor = "blue", document.getElementById("E5").style.backgroundColor = ""}
     else if (Ton==fl){document.getElementById("Cis4").style.backgroundColor = "yellow",
                      document.getElementById("Eflex5").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "yellow",
                      document.getElementById("bku").style.backgroundColor = "",

                      p.play("B",3,1),console.log ("L" +L)}}
else if(L==11)
     {if(Ton==tl){document.getElementById("G5").style.backgroundColor = "blue", document.getElementById("F5").style.backgroundColor = ""}
     else if(Ton==fl){document.getElementById("D4").style.backgroundColor = "yellow",
                     document.getElementById("Cis4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==12){
     if(Ton==tl){document.getElementById("A5").style.backgroundColor = "blue", document.getElementById("G5").style.backgroundColor = ""}
     else if(Ton==fl){document.getElementById("E4").style.backgroundColor = "yellow",
                     document.getElementById("D4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "yellow",

                     console.log ("L" +L)}}
else if(L==13){
     if(Ton==tl){document.getElementById("B5").style.backgroundColor = "blue", document.getElementById("A5").style.backgroundColor = ""}
     else if(Ton==fl){document.getElementById("Fis4").style.backgroundColor = "yellow",
                     document.getElementById("E4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "yellow",
                     console.log ("L" +L)}}
else if(L==14){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("G4").style.backgroundColor = "yellow",
                     document.getElementById("Fis4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if (L==15){
     if(Ton==tl){}
     else if (Ton==fl){document.getElementById("Fis4").style.backgroundColor = "yellow",
                      document.getElementById("G4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "yellow",
                      document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +"L" +L)}}
else if(L==16){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("E4").style.backgroundColor = "yellow",
                     document.getElementById("Fis4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}} 
else if(L==17){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("D4").style.backgroundColor = "yellow",
                     document.getElementById("E4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==18){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("D4").style.backgroundColor = "yellow",
                     document.getElementById("E4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}} 
else if(L==19){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("A4").style.backgroundColor = "yellow",
                     document.getElementById("D4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "yellow",
                     console.log ("L" +L)}} 
else if(L==20){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("D4").style.backgroundColor = "yellow",
                     document.getElementById("A4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "Yellow",
                     
                     console.log ("L" +L)}}
else if(L==21){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("E4").style.backgroundColor = "yellow",
                     document.getElementById("D4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "Yellow",                    
                     console.log ("L" +L)}}
else if(L==22){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("Fis4").style.backgroundColor = "yellow",
                     document.getElementById("E4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "Yellow",
                     document.getElementById("bku").style.backgroundColor = "",               
                     console.log ("L" +L)}}
else if(L==23){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("G4").style.backgroundColor = "blue",
                     document.getElementById("Fis4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "", 
                     console.log ("L" +L)}}
else if(L==24){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("Fis4").style.backgroundColor = "blue",
                     document.getElementById("G4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "", 
                     console.log ("L" +L)}}
else if(L==25){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("E4").style.backgroundColor = "yellow",
                     document.getElementById("Fis4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",                   
                     console.log ("L" +L)}}
else if(L==26){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("Eflex5").style.backgroundColor = "red",
                     document.getElementById("E4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "", 
                     console.log ("L" +L)}}
else if(L==27){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("Eflex5").style.backgroundColor = "red",
                     document.getElementById("E4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",    
                     p.play("A",3,1),console.log ("L" +L)}}
else if(L==28){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("Cis4").style.backgroundColor = "yellow",
                     document.getElementById("Eflex5").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",
                     p.play("B",3,1),console.log ("L" +L)}}
else if(L==29){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("D4").style.backgroundColor = "yellow",
                     document.getElementById("Cis4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==30){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("E4").style.backgroundColor = "yellow",
                     document.getElementById("D4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==31){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("Fis4").style.backgroundColor = "yellow",
                     document.getElementById("E4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==32){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("G4").style.backgroundColor = "yellow",
                     document.getElementById("Fis4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "yellow",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log (L)}}
else if(L==33){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("Fis4").style.backgroundColor = "yellow",
                     document.getElementById("G4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==34){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("E4").style.backgroundColor = "yellow",
                     document.getElementById("Fis4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==35){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("D4").style.backgroundColor = "blue",
                     document.getElementById("E4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==36){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("Cis4").style.backgroundColor = "yellow",
                     document.getElementById("D4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==37){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("Fis4").style.backgroundColor = "blue",
                     document.getElementById("Cis4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "yellow",
                     console.log ("L" +L)}}
else if(L==38){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("A4").style.backgroundColor = "blue",
                     document.getElementById("Fis4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "yellow",
                     console.log ("L" +L)}}
else if(L==39){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("Cis5").style.backgroundColor = "blue",
                     document.getElementById("A4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "yellow",
                     console.log ("L" +L)}}
else if(L==40){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("B4").style.backgroundColor = "blue",
                     document.getElementById("Cis5").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "yellow",
                     console.log ("L" +L)}}
else if(L==41){
     if(Ton==tl){}
     else if(Ton==fl){document.getElementById("Cis4").style.backgroundColor = "blue",
                     document.getElementById("B4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==42){
     if(Ton==tl){}
     else if (Ton==fl){document.getElementById("F4").style.backgroundColor = "blue",
                      document.getElementById("Cis4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==43){
     if(Ton==tl){}
     else if (Ton==fl){document.getElementById("A4").style.backgroundColor = "blue",
                      document.getElementById("F4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==44){
     if(Ton==tl){}
     else if (Ton==fl){document.getElementById("Cis5").style.backgroundColor = "blue",
                      document.getElementById("A4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}} 
else if(L==45){
     if(Ton==tl){}
     else if (Ton==fl){document.getElementById("B4").style.backgroundColor = "blue",
                      document.getElementById("Cis5").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}} 
else if(L==46){
     if(Ton==tl){}
     else if (Ton==fl){document.getElementById("Cis4").style.backgroundColor = "blue",
                      document.getElementById("B4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==47){
     if(Ton==tl){}
     else if (Ton==fl){document.getElementById("F4").style.backgroundColor = "blue",
                      document.getElementById("Cis4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==48){
     if(Ton==tl){}
     else if (Ton==fl){document.getElementById("A4").style.backgroundColor = "blue",
                      document.getElementById("F4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==49){
     if(Ton==tl){}
     else if (Ton==fl){document.getElementById("Cis5").style.backgroundColor = "blue",
                      document.getElementById("A4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==50){
     if(Ton==tl){} 
     else if(Ton==fl){document.getElementById("B4").style.backgroundColor = "blue",
                     document.getElementById("Cis5").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==51){
     if(Ton==tl){} 
     else if(Ton==fl){document.getElementById("A4").style.backgroundColor = "blue",
                     document.getElementById("B4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==52){
     if(Ton==tl){} 
     else if(Ton==fl){document.getElementById("A4").style.backgroundColor = "blue",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",

                     console.log ("L" +L)}}
else if(L==53){
     if(Ton==tl){} 
     else if(Ton==fl){document.getElementById("Fis4").style.backgroundColor = "blue",
                     document.getElementById("A4").style.backgroundColor = "",
                     document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                     console.log ("L" +L)}}
else if(L==54){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("A4").style.backgroundColor = "blue",
                      document.getElementById("Fis4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==55){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("Fis4").style.backgroundColor = "blue",
                      document.getElementById("A4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==56){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("G4").style.backgroundColor = "blue",
                      document.getElementById("Fis4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==57){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("D4").style.backgroundColor = "blue",
                      document.getElementById("G4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==58){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("A4").style.backgroundColor = "blue",
                      document.getElementById("D4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==59){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("D4").style.backgroundColor = "blue",
                      document.getElementById("A4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==60){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("E4").style.backgroundColor = "blue",
                      document.getElementById("D4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==61){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("Fis4").style.backgroundColor = "blue",
                      document.getElementById("E4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==62){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("G4").style.backgroundColor = "blue",
                      document.getElementById("Fis4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==63){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("Fis4").style.backgroundColor = "blue",
                      document.getElementById("G4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==64){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("E4").style.backgroundColor = "blue",
                      document.getElementById("Fis4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                     document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==65){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("Eflex5").style.backgroundColor = "red",
                      document.getElementById("E4").style.backgroundColor = "",
                      console.log ("L" +L)}} 
else if(L==66){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("Eflex5").style.backgroundColor = "red",
                      document.getElementById("E4").style.backgroundColor = "",
                      console.log ("L" +L),
                      o.play("A",3,0.5)}}
else if(L==67){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("Cis4").style.backgroundColor = "blue",
                      document.getElementById("Eflex5").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                      document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L),o.play("B",3,3)}}
else if(L==68){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("D4").style.backgroundColor = "blue",
                      document.getElementById("Cis4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                      document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==69){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("E4").style.backgroundColor = "blue",
                      document.getElementById("D4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                      document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==70){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("Fis4").style.backgroundColor = "blue",
                      document.getElementById("E4").style.backgroundColor = ""
                      document.getElementById("bla").style.backgroundColor = "",
                      document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==71){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("G4").style.backgroundColor = "yellow",
                      document.getElementById("Fis4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "",
                      document.getElementById("bku").style.backgroundColor = "yellow",
                      console.log ("L" +L)}}
else if(L==72){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("Fis4").style.backgroundColor = "yellow",
                      document.getElementById("G4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "yellow",
                      document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==73){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("E4").style.backgroundColor = "yellow",
                      document.getElementById("Fis4").style.backgroundColor = "",
                      document.getElementById("bla").style.backgroundColor = "yellow",
                      document.getElementById("bku").style.backgroundColor = "",
                      console.log ("L" +L)}}
else if(L==74){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("E4").style.backgroundColor = "yellow",
     document.getElementById("D4").style.backgroundColor = "",
     document.getElementById("bla").style.backgroundColor = "yellow",
     document.getElementById("bku").style.backgroundColor = "",
     console.log (L)}}
else if(L==75){
     if(Ton==tl){} 
     else if (Ton==fl){document.getElementById("D4").style.backgroundColor = ""}}
}
