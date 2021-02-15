//   *********
//  **********
// ***
// ***
// **********
//  **********
//         ***
//         ***
// **********
// ********* olitario


// Vid inicio, 
//3 veces prueba 1, 
//video 2, 
//3 veces prueba dos,
//video 3, 
//3 veces prueba 3.
//Finalizar
//Con cada vez que se hace cada prueba aparece el boton de iniciar 
//para que el aspirante pueda preparar la prueba.

//el boton verde al inicio activa start moment, se reproduce el video cuando este finalice se einicia el momento local, 
//cuando el momento local se repita 3 veces se avanza al sigueinte momento global

// Our input frames will come from here.
const videoElement =
  document.getElementsByClassName('input_video')[0];
const canvasElement =
  document.getElementsByClassName('output_canvas')[0];
const controlsElement =
  document.getElementsByClassName('control-panel')[0];
const canvasCtx = canvasElement.getContext('2d');

const videoScreen = document.getElementById("videoScreen");
const startButton = document.getElementById("iniciar");
const stopButton = document.getElementById("terminar");
let vidSave = document.getElementById('vid2');

// const sLSound = document.getElementsByClassName('sLocalSound');
// const eLSound = document.getElementsByClassName('eLocalSound');
// const eGSound = document.getElementsByClassName('eGlobalSound');


let start = document.getElementById('btnStart');
let stop = document.getElementById('btnStop');

var event1 = new Event('grabar');
var event2 = new Event('detener');
var iD;
var vidRegIndex = 0;


var momentIndex = 0;
var localMomentIndex = 0;
var started = [false, false, false];
var videoUrl = 3;
var enInicio = true;
var startButtonIsEnabled = false;
var stopButtonIsEnabled = false;
var enMomentoGlobalFinal = false;
var pruebaFinalizada = false;
var iniciarPuño = true;

var tiempos = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
var t0 = 0.0;
var timeIndex = 0;

var tH0 = 0.0;
var timerHand = 0.0;
// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new FPS();

var piano = Synth.createInstrument('organ');



// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
  spinner.style.display = 'none';

  document.querySelector('.message').style.display = "none";
  prepareTest();
};
function prepareTest(params) {
  startButton.style.display = "flex";
  startButtonIsEnabled = true;
  // videoScreen.load();
}

function greenTouch(params) {
  start.dispatchEvent(event1);
}

function redTouch(params) {
  vidRegIndex++;
  stop.dispatchEvent(event2);
}

function getKeyAndMove(e) {
  var key_code = e.which || e.keyCode;
  switch (key_code) {
    case 37:
      if (startButtonIsEnabled && iniciarPuño) {
        iniciarPuño = !iniciarPuño;
        greenTouch();
        sLSound = new Audio("Sounds/localStart.wav");
        sLSound.play();
        if (enInicio) {
          startMoment();
        } else {
          startLocalMoment();
        }
      } else if (stopButtonIsEnabled && !iniciarPuño) {
        sESound = new Audio("Sounds/localEnd.mp3");
        sESound.play();
        iniciarPuño = !iniciarPuño;
        redTouch();
        registrarTiempo();
        prepareLocalmoment();
      }
      break;
  }
}

function distanciaEuclidiana2(x0, y0, x1, y1) {

  return (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)
  // Math.

}

function rH(x, y) {

  if (1 - y < 0.5) {
    return;
  }
  Synth.setVolume(1 - y);
  // deb
  // if (x >= 0 && x < 0.05) {

  // setPriv('_notes', { 'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88 });

  var note = lerp(261.63, 493.88, x)
  console.log(note);
  piano.play(note, 5, 0.5);
  // return;
  // }
}

function lH(x, y) {

}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end
}

function playKey(x) {


  if (x >= 0 && x < 0.05) {
    piano.play('C', 3, 2);
    return;
  }
  if (x >= 0.05 && x < 0.1) {
    piano.play('D', 3, 2);
    return;
  }
  if (x >= 0.1 && x < 0.15) {
    piano.play('E', 3, 2);
    return;
  }
  if (x >= 0.15 && x < 0.2) {
    piano.play('F', 3, 2);
    return;
  }
  if (x >= 0.2 && x < 0.25) {
    piano.play('G', 3, 2);
    return;
  }
  if (x >= 0.25 && x < 0.3) {
    piano.play('A', 3, 2);
    return;
  }
  if (x >= 0.3 && x < 0.35) {
    piano.play('B', 3, 2);
    return;
  }
  if (x >= 0.35 && x < 0.4) {
    piano.play('C', 4, 2);
    return;
  }
  if (x >= 0.4 && x < 0.45) {
    piano.play('D', 4, 2);
    return;
  }
  if (x >= 0.45 && x < 0.5) {
    piano.play('E', 4, 2);
    return;
  }
  if (x >= 0.5 && x < 0.55) {
    piano.play('F', 4, 2);
    return;
  }
  if (x >= 0.55 && x < 0.6) {
    piano.play('G', 4, 2);
    return;
  }
  if (x >= 0.6 && x < 0.65) {
    piano.play('A', 4, 2);
    return;
  }
  if (x >= 0.65 && x < 0.7) {
    piano.play('B', 4, 2);
    return;
  }
  if (x >= 0.7 && x < 0.75) {
    piano.play('C', 5, 2);
    return;
  }
  if (x >= 0.75 && x < 0.8) {
    piano.play('D', 5, 2);
    return;
  }
  if (x >= 0.8 && x < 0.85) {
    piano.play('E', 5, 2);
    return;
  }
  if (x >= 0.85 && x < 0.9) {
    piano.play('F', 5, 2);
    return;
  } if (x >= 0.9 && x < 0.95) {
    piano.play('G', 5, 2);
    return;
  } if (x >= 0.95 && x < 1) {
    piano.play('A', 5, 2);
    return;
  }


}


function checkOnHandEnter(results) {//1
  // console.log(timerHand);

  const handLandmarks = results.multiHandLandmarks[0];


  // for (let index = 8; index < 21; index += 4) {
  //   if (handLandmarks[index].y > handLandmarks[index - 1].y

  //     ) 
  //     {
  //     playKey(handLandmarks[index].x)
  //   }
  // }


  for (let index = 0; index < results.multiHandLandmarks.length; index++) {
    const classification = results.multiHandedness[index];
    const isRightHand = classification.label === 'Right';
    const landmarks = results.multiHandLandmarks[index];
    if (isRightHand) {
      rH(handLandmarks[8].x, handLandmarks[8].y);
    }
    else {
      lH(handLandmarks[8].x, handLandmarks[8].y);
    }

    drawConnectors(
      canvasCtx, landmarks, HAND_CONNECTIONS,
      { color: isRightHand ? '#00FF00' : ' #5100d3' });
    drawLandmarks(canvasCtx, landmarks, {
      color: isRightHand ? '#00FF00' : ' #5100d3',
      fillColor: isRightHand ? ' #5100d3' : '#00FF00'
    });
  }









}

function prepareScene(params) {
  // canvasCtx.width = screen.width;
  // console.log(document.getElementsByClassName('body').width);
  // canvasCtx.height = 'auto';
  // canvasCtx.style.display = 'none';
}

function startMoment() {//Se inicia elprimer video y la primer etapa
  // console.log("strtMoment antes de if");
  if (!started[momentIndex]) {
    iD = new Date().getDate();
    //console.log("starMmoment en if Momentndex:", momentIndex);
    started[momentIndex] = true;
    startButton.style.display = "none";
    //videoScreen.style.display = "block";
    startButtonIsEnabled = false;
    //videoScreen.play();
    //videoScreen.muted = false;
    enInicio = false;
  }

}

function director(params) {//Comprueba la finalización del video
  //console.log(momentIndex); 
  //console.log("director antes de if");
  if (/*videoScreen.ended && */ started[momentIndex] && momentIndex < videoUrl && !enMomentoGlobalFinal) {
    // console.log("director en if");
    hideVideoScreen();
    setNextMoment();
    prepareLocalmoment();
  }
}

function startLocalMoment(params) {
  //hace el conteo regresivo e incia el contador

  if (localMomentIndex < 3) {
    //console.log("startlm en index, lmi:", localMomentIndex);
    //contador
    t0 = new Date().getSeconds();
    //console.log(tiempos);
    localMomentIndex++;
    startButton.style.display = "none";
    startButtonIsEnabled = false;
    stopButton.style.display = "flex";
    stopButtonIsEnabled = true;
  } else {
    // console.log("startlm en else");
    // console.log("siguiente global moment");
    nextMoment();
    localMomentIndex = 0;
  }
}



function registrarTiempo(start) {
  tiempos[timeIndex] = new Date().getSeconds() - t0;
  // console.log(timeIndex);
  timeIndex++;
  // console.log(tiempos);

}

function prepareLocalmoment(params) {
  if (localMomentIndex < 3) {

    startButton.style.display = "flex";
    startButtonIsEnabled = true;
    stopButton.style.display = "none";
    stopButtonIsEnabled = false;
  } else if (enMomentoGlobalFinal) {
    finalizarPrueba();
  }
  else {
    startLocalMoment();//Se pasa a el siguiente momento global
  }

}

// function prepareLocalmomentVideo(params) {
//   if (localMomentIndex < 3) {
//     // tiempos[timeIndex] = new Date().getSeconds() - t0;
//     // timeIndex++;
//     // console.log(tiempos);
//     startButton.style.display = "flex";
//     startButtonIsEnabled = true;
//     stopButton.style.display = "none";
//     stopButtonIsEnabled = false;
//   } else if (enMomentoGlobalFinal) {
//     finalizarPrueba();
//   }
//   else {
//     startLocalMoment();//Se pasa a el siguiente momento global
//   }

// }

function finalizarPrueba(params) {
  pruebaFinalizada = true;
  stopButton.style.display = "none";
  stopButtonIsEnabled = false;
  document.querySelector('.messageFinal').style.display = "block";
  fGSound = new Audio("Sounds/end.mp3");
  fGSound.play();
}




function nextMoment() {
  // console.log("nextMoment");
  if (!started[momentIndex]) {
    started[momentIndex] = true;
    stopButton.style.display = "none";
    stopButtonIsEnabled = false;
    // videoScreen.style.display = "block";
    // videoScreen.play();
    // videoScreen.muted = false;
  }

}

function hideVideoScreen(params) {
  // console.log("hidevs");
  if (started[momentIndex]) {
    // videoScreen.style.display = "none";
  }
}
function setNextMoment(params) {
  // console.log("setnextmoment");
  // console.log(momentIndex);
  if (momentIndex < videoUrl - 1) {
    momentIndex++;
    // videoScreen.setAttribute("src", "v" + (momentIndex + 1).toString() + ".mp4")
    // videoScreen.load();
    // videoScreen.pause();
  } else {
    enMomentoGlobalFinal = true;
  }
}


function onResults(results) {
  // Hide the spinner.
  document.body.classList.add('loaded');
  director();
  // Update the frame rate.
  fpsControl.tick();

  // Draw the overlays.
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks && results.multiHandedness) {
    checkOnHandEnter(results);

    for (let index = 0; index < results.multiHandLandmarks.length; index++) {
      const classification = results.multiHandedness[index];
      const isRightHand = classification.label === 'Right';
      const landmarks = results.multiHandLandmarks[index];
      drawConnectors(
        canvasCtx, landmarks, HAND_CONNECTIONS,
        { color: isRightHand ? '#00FF00' : ' #5100d3' });
      drawLandmarks(canvasCtx, landmarks, {
        color: isRightHand ? '#00FF00' : ' #5100d3',
        fillColor: isRightHand ? ' #5100d3' : '#00FF00'
      });
    }
  }
  // canvasCtx.style.display= "none";
  canvasCtx.restore();

}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
  }
});
hands.onResults(onResults);

/**
 * Instantiate a camera. We'll feed each frame we receive into the solution.
 */
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720
});
camera.start();
startMoment();
// prepareScene();
// Present a control panel through which the user can manipulate the solution
// options.
new ControlPanel(controlsElement, {
  selfieMode: true,
  maxNumHands: 2,
  minDetectionConfidence: 0.55,
  minTrackingConfidence: 0.55
})
  .add([
    new StaticText({ title: 'MediaPipe Hands' }),
    fpsControl,
    new Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
    new Slider(
      { title: 'Max Number of Hands', field: 'maxNumHands', range: [1, 4], step: 1 }),
    new Slider({
      title: 'Min Detection Confidence',
      field: 'minDetectionConfidence',
      range: [0, 1],
      step: 0.01
    }),
    new Slider({
      title: 'Min Tracking Confidence',
      field: 'minTrackingConfidence',
      range: [0, 1],
      step: 0.01
    }),
  ])
  .on(options => {
    videoElement.classList.toggle('selfie', options.selfieMode);
    hands.setOptions(options);
  });
// console.log(startButton.po);



// *************************************************************************

let constraintObj = {
  audio: false,
  video: {
    facingMode: "user",
    width: { min: 640, ideal: 640, max: 1920 },
    height: { min: 480, ideal: 480, max: 1080 }
  }
};
// width: 1280, height: 720  -- preference only
// facingMode: {exact: "user"}
// facingMode: "environment"

//handle older browsers that might implement getUserMedia in some way
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
  navigator.mediaDevices.getUserMedia = function (constraintObj) {
    let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise(function (resolve, reject) {
      getUserMedia.call(navigator, constraintObj, resolve, reject);
    });
  }
} else {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      devices.forEach(device => {
        console.log(device.kind.toUpperCase(), device.label);
        //, device.deviceId
      })
    })
    .catch(err => {
      console.log(err.name, err.message);
    })
}



navigator.mediaDevices.getUserMedia(constraintObj)
  .then(function (mediaStreamObj) {
    //add listeners for saving video/audio


    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let chunks = [];

    start.addEventListener('click', (ev) => {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
    })


    start.addEventListener('grabar', (ev) => {
      mediaRecorder.start();
      // console.log(mediaRecorder.state);
    })


    start.addEventListener('click', (ev) => {
      mediaRecorder.start();
      // console.log(mediaRecorder.state);
    })


    stop.addEventListener('click', (ev) => {
      mediaRecorder.stop();
      // console.log(mediaRecorder.state);
    });

    stop.addEventListener('detener', (ev) => {
      mediaRecorder.stop();
      // console.log(mediaRecorder.state);
    });


    mediaRecorder.ondataavailable = function (ev) {
      chunks.push(ev.data);

    }
    mediaRecorder.onstop = (ev) => {
      saveData();


      let blob = new Blob(chunks, { 'type': 'video/mp4;' });
      chunks = [];
      //let videoURL = window.URL.createObjectURL(blob);
      //vidSave.src = videoURL;
      var fd = new FormData();
      fd.append('upl', blob, 'video.mp4');

      const options = {
        method: 'POST',
        body: fd
      };

      fetch('/api', options);
    }
  })
  .catch(function (err) {
    console.log(err.name, err.message);
  });

saveData = () => {
  const data = {
    name: iD,
    scores: tiempos
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('/data', options)
}




