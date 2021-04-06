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

var canvas = document.getElementById('canvas');
var W = canvas.width;
var H = canvas.height;
var ctx = canvas.getContext('2d');

var samples = {};

var SAMPLES_COUNT = 64;
var COLORS = {
  x: '#f00',
  y: '#0b0',
  z: '#00f'
};

var scaleX = W/SAMPLES_COUNT;
var scaleY = 10;

var isRefresh = true;

samples.x = getInitArr(SAMPLES_COUNT);
samples.y = getInitArr(SAMPLES_COUNT);
samples.z = getInitArr(SAMPLES_COUNT);

if (!window.DeviceMotionEvent){
  document.getElementById('error').innerHTML = 'Device motion API not supported';
} else {
  window.addEventListener("devicemotion", doSample, false);
  document.getElementsByTagName("body")[0].addEventListener("click", function(ev){
    isRefresh = !isRefresh;
    document.getElementById('error').innerHTML = (isRefresh ? '' : 'Paused');
  }, false);
  tick();  
}


function doSample(event) {
  shift(samples.x, event.accelerationIncludingGravity.x);
  shift(samples.y, event.accelerationIncludingGravity.y);
  shift(samples.z, event.accelerationIncludingGravity.z);
     
  // raw gyro readings
  // shift(samples.x, event.rotationRate.alpha);
  // shift(samples.y, event.rotationRate.beta);
  // shift(samples.z, event.rotationRate.gamma);
}

function tick() {
  window.requestAnimationFrame(tick);
  
  if (!isRefresh){
    return;
  }
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, W, H);
  
  drawAxis(5);
  drawGraph(samples.x, COLORS.x, scaleX, scaleY);
  drawGraph(samples.y, COLORS.y, scaleX, scaleY);
  drawGraph(samples.z, COLORS.z, scaleX, scaleY);
  drawLegend();
}

function drawAxis(grid) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(0, H/2);
  ctx.lineTo(W, H/2);
  ctx.stroke();
  
  var count = H/2 / (grid*scaleY);
  
  ctx.strokeStyle = '#bbb';
  for (var i=1; i<count; i++){
    ctx.beginPath();
    ctx.moveTo(0, H/2-i*grid*scaleY);
    ctx.lineTo(W, H/2-i*grid*scaleY);
    ctx.stroke();  
    
    ctx.beginPath();
    ctx.moveTo(0, H/2+i*grid*scaleY);
    ctx.lineTo(W, H/2+i*grid*scaleY);
    ctx.stroke();
  }
}

function drawGraph(samples, color, scaleX, scaleY) {  
  ctx.save();
  ctx.translate(0, H/2); 
  
  ctx.strokeStyle = color;
  ctx.beginPath();
  var len = samples.length;
  ctx.moveTo(0, samples[0] * scaleY);
  for(var i = 0; i < len; i++){
    ctx.lineTo(i*scaleX, samples[i]*scaleY);
  }
  ctx.stroke();
  
  ctx.restore();
}

function drawLegend() {
  var scale = 2;
  ctx.save();
  ctx.scale(2, 2);
  
  ctx.fillStyle = COLORS.x;
  ctx.fillRect(10, 10, 10, 10);
  ctx.fillStyle = '#000';
  ctx.fillText('X', 25, 20);
  
  ctx.fillStyle = COLORS.y;
  ctx.fillRect(50, 10, 10, 10);
  ctx.fillStyle = '#000';
  ctx.fillText('Y', 65, 20);
  
  ctx.fillStyle = COLORS.z;
  ctx.fillRect(90, 10, 10, 10);
  ctx.fillStyle = '#000';
  ctx.fillText('Z', 105, 20);  
  
  ctx.restore();
}


//get Float32Array of length initialized to 0
function getInitArr(length) {
  var arr = new Float32Array(length);
  for (var i = 0; i < length; i++) {
    arr[i] = 0;
    arr[i] = Math.random() * 4 - 2;
  }
  arr[length - 2] = 0.5;
  arr[length - 1] = -0.5;

  return arr;
}

//add a sample to the end of the array
function shift(arr, datum) {
  var ret = arr[0];
  for (var i = 1; i < arr.length; i++) {
    arr[i - 1] = arr[i];
  }
  arr[arr.length - 1] = datum;
  return ret;
}

