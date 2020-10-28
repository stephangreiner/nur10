let sensor = new Accelerometer();
sensor.start();

sensor.onreading = function() 
{sx();}

document.get
sensor.onerror = event => console.log(event.error.name, event.error.message);

function sx(){
document.getElementById("sensorx").innerHTML = sensor.x;      
document.getElementById("sensory").innerHTML = sensor.y; 
document.getElementById("sensorz").innerHTML = sensor.z;
}

function handleMotionEvent(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
  document.getElementById("sensorx2").innerHTML = x   
  document.getElementById("sensory2").innerHTML = y
  document.getElementById("sensorz2").innerHTML = z

   
if (z > 14) {nasedrauf()} 
} 

var squats = 0;
function nasedrauf() {
squats = squats+ 1;
document.getElementById("zeiger").innerHTML = squats;} 
  
 
window.addEventListener("devicemotion", handleMotionEvent, true);

