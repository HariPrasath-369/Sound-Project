

// document.getElementById("Z").addEventListener("click", () => {
//     console.log("works");
//     const au = new Audio('piano/j.mp3');
//     au.play();
// });

let keyvalue;

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        const letter = btn.id.toLowerCase();
        console.log(letter);
        playSound(letter);
    });
});

function playSound(l){

    const au= new Audio('piano/' + l + '.mp3');
    au.play();
    console.log(l);
}

document.addEventListener("keypress", (key) => {
    keyvalue=key.key;
    playSound(keyvalue);
    
});

