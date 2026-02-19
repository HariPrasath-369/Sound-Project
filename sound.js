

let keyvalue;

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        const letter = btn.id.toLowerCase();
        console.log(letter);
        if(letter !== "vasu") playSound(letter);
    });
});


document.addEventListener("keypress", (key) => {
    keyvalue=key.key;
    playSound(keyvalue);
    
});
document.getElementById("vasu").addEventListener('click',()=>{
    const au= new Audio('piano/vasu_audio (1).mp4');
    au.play();
})


const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const dest = audioCtx.createMediaStreamDestination();
const mediaRecorder = new MediaRecorder(dest.stream);

let chunks = [];
let audioBlob;
let audioUrl;

mediaRecorder.ondataavailable = e => chunks.push(e.data);
mediaRecorder.onstop = () => {
    audioBlob = new Blob(chunks, { type: "audio/webm" });
    audioUrl = URL.createObjectURL(audioBlob);
    document.getElementById("player").src = audioUrl;
};

async function playSound(letter) {
        const response = await fetch('piano/' + letter + '.mp3');
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;

        source.connect(audioCtx.destination);

        source.connect(dest);

        source.start();
    
}
let co=0;
timerId=null;
let sec=0;
let min=0;
let msec=0;
let second=document.getElementById("second");
let minute=document.getElementById("minute");
let millisec=document.getElementById("millisec");


function StartTimer(){
    
    
    timerId= setInterval(() => {
        msec++;
        if(msec==100){
            sec++;
            msec=0;
        }   
        if(sec==60){
            min++;
            sec=0;
        }
        if(sec<10){
           second.innerText="0"+sec;
        }
        if(min<10){ 
             minute.innerText="0"+min;
        }
        if(msec<10){
           millisec.innerText="0"+msec;
        }
        if(sec>9){
           second.innerText=sec;
        }
        if(min>9){ 
             minute.innerText=min;
        }
        if(msec>9){
           millisec.innerText=msec;
        }
    }, 10);
    
   
}

function referesh(){
    co=0;
    sec=0;
    min=0;
    msec=0;
    clearInterval(timerId);
   
    second.innerHTML="00";
    millisec.innerHTML="00";
    minute.innerHTML="00";
    lap.innerHTML='';
    lapco=0;
}


function startRec() {
    chunks = [];
    mediaRecorder.start();
    text.innerHTML='Started recording';
    console.log("Recording Started");
    StartTimer();
}

function stopRec() {
    clearInterval(timerId);
    mediaRecorder.stop();
    text.innerHTML='Stoped recording';
    console.log("Recording Stopped");
    
}

function downloadRec() {
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "piano-recording.webm";
    text.innerHTML='downloaded successfully';
    a.click();
    referesh();
}

const text=document.getElementById("text");


// this is for me

let trainerNotes = [];
let trainerIndex = 0;
let trainerSpeed = 1000;
let trainerTimer = null;

const trainerDisplay = document.getElementById("trainerDisplay");

document.querySelectorAll(".songBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        clearTimeout(trainerTimer);
        trainerDisplay.innerHTML = "";

        const song = btn.dataset.song;
        trainerNotes = song.split(" ");
        trainerIndex = 0;

        showNextTrainerNote();
    });
});

function showNextTrainerNote(){

    if(trainerIndex >= trainerNotes.length){
        return; 
    }

    const note = trainerNotes[trainerIndex];

    const span = document.createElement("span");
    span.innerText = note.toUpperCase() + " ";
    trainerDisplay.appendChild(span);

    trainerIndex++;
    trainerTimer = setTimeout(showNextTrainerNote, trainerSpeed);
}


