/**
 * addEventListener contextmenu
 * Description: Removes context menus on long touch hold
 */
window.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

/**
 * posX, posY
 * Description: The global variables we need access to in order to change the
 * velocity of our character.
 */
var posX = 0;
var posY = 0;

var android = !(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);


var controller = new Controller();
controller.connect();
controller.startCommunication();


/*
  setInterval updateVelocity
  inputs: posX, posY
  Description:
    Every 20 milliseconds, it will call updateVelocity in communication/client.js. 
  author: Alex Leonetti
*/
setInterval(function(){
  controller.updateVelocity(posX, posY);
}, 25);




////////////////////////////////////
// Accelerometer logic... 
////////////////////////////////////


var x = 0, y = 0,
    vx = 0, vy = 0,
  ax = 0, ay = 0;
  
if (window.DeviceMotionEvent != undefined) {
  window.ondevicemotion = function(e) {
    $("#accelerationX").html(e.accelerationIncludingGravity.x);
    $("#accelerationY").html(e.accelerationIncludingGravity.y);
    $("#accelerationZ").html(e.accelerationIncludingGravity.z);

    // if (android) {

    //   if (e.accelerationIncludingGravity.z < 0) {
    //     controller.pressA();
    //   }

    //   if (e.accelerationIncludingGravity.z > 0) {
    //     controller.releaseA();
    //   }


    // } else {

    //   if (e.accelerationIncludingGravity.z > 0) {
    //     controller.pressA();
    //   }

    //   if (e.accelerationIncludingGravity.z < 0) {
    //     controller.releaseA();
    //   }
    // }


    if (Math.abs(e.accelerationIncludingGravity.y) > 1.5) {
      posX = e.accelerationIncludingGravity.y * 10;
    } else {
      posX = 0;
    }

    

    if ( e.rotationRate ) {
      $("#rotationAlpha").innerHTML = e.rotationRate.alpha;
      $("#rotationBeta").innerHTML = e.rotationRate.beta;
      $("#rotationGamma").innerHTML = e.rotationRate.gamma;
    }   
  }
} 





/**
 * controller
 * Description: Creates a new controller instance and connects it up to the
 * communication lines
 */
var controller = new Controller();
controller.connect();
controller.startCommunication();

/**
 * control decelerate button
 * Description: When the decelerate button is touched, it will invoke
 * deceleration on the ship. When the decelerate button touch event has ended,
 * it will cause deceleration on the ship to stop. Velocity at this point in
 * time should remain at a constant (i.e. whatever the velocity was at the point
 * of button release).
 */
$('.control__decelerate--button')
.on('touchstart', function() {
  console.log('decelerate start');
  this.classList.add('is-pressed');
  controller.decelerateStart();
})
.on('touchend', function() {
  console.log('decelerate end');
  this.classList.remove('is-pressed');
  controller.decelerateEnd();
});

/**
 * control accelerate button
 * Description: When the accelerate button is touched, it will invoke
 * acceleration on the ship. When the accelerate button touch event has ended,
 * it will cause acceleration on the ship to stop. Velocity at this point in
 * time should remain at a constant (i.e. whatever the velocity was at the point
 * of button release).
 */
$('.control__accelerate--button')
.on('touchstart', function() {
  console.log('accelerate start');
  this.classList.add('is-pressed');
  controller.accelerateStart();
})
.on('touchend', function() {
  console.log('accelerate end');
  this.classList.remove('is-pressed');
  controller.accelerateStart();
});