


/*
let sensor = new Accelerometer();
sensor.start();

sensor.onreading = function() 
{sx();
zahl()
console.log("Acceleration along X-axis: " + sensor.x);
console.log("Acceleration along Y-axis: " + sensor.y);
console.log("Acceleration along Z-axis: " + sensor.z);

}


document.get
sensor.onerror = event => console.log(event.error.name, event.error.message);




function sx(){
document.getElementById("sensorx").innerHTML = sensor.x;      
document.getElementById("sensory").innerHTML = sensor.y; 
document.getElementById("sensorz").innerHTML = sensor.z;
document.getElementById("squats").innerHTML = squat;

}

function zahl (){
if (sensor.y > 10)  {
     squat + 1 
    } 
} 
*/
let squat = "0";
function handleMotionEvent(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
  document.getElementById("sensorx2").innerHTML = x   
  document.getElementById("sensory2").innerHTML = y
  document.getElementById("sensorz2").innerHTML = z
  document.getElementById("squats").innerHTML = squat;
    console.log(x);
    console.log(y);
    console.log(z);
if (y > 10) {alert ("eine Kniebeuge")
} 

}
  
 





    // Do something awesome.


window.addEventListener("devicemotion", handleMotionEvent, true);

