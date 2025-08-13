console.log("welcome");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('Gif');
let masterSongName = document.getElementById('masterSongName');

// NOTE: keep names consistent with your HTML labels
let songs = [
    { songName: "Use to be young-Miley Cyrus", filePath: "songs/1.mp3", coverPath: "covers/mileyCyrus.jpg" },
    { songName: "Single soon-Selena Gomez", filePath: "songs/2.mp3", coverPath: "covers/image-2.jpg" },
    { songName: "Mantramugdha-Satish Ghalan", filePath: "songs/3.mp3", coverPath: "covers/mantamugdha.jpg" },
    { songName: "With you-AP Dhillon", filePath: "songs/4.mp3", coverPath: "covers/image-4.jpg" },
    { songName: "My Dilema-Selena Gomez", filePath: "songs/5.mp3", coverPath: "covers/image-5.jpg" },
    { songName: "August-Taylor swift", filePath: "songs/6.mp3", coverPath: "covers/image-6.jpg" },
    { songName: "Traitor-Olivia Rodrigo", filePath: "songs/7.mp3", coverPath: "covers/image-7.jpg" },
    { songName: "Nonsense-Sabrina Carpenter", filePath: "songs/8.mp3", coverPath: "covers/image-8.jpg" },
    { songName: "Yaad-Sahil Zamir Ali", filePath: "songs/9.m4a", coverPath: "covers/image-9.jpeg" },
    { songName: "Sahiba-Aditya Rikhari", filePath: "songs/10.mp3", coverPath: "covers/image-10.jpg" },
    { songName: "Saiyara-Mohit Suri", filePath: "songs/11.mp3", coverPath: "covers/image-11.jpeg" },
];

// Keep the big title in sync on page load
masterSongName.innerText = songs[songIndex].songName;

// Utility: reset all small play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('SongItemClass')).forEach((el) => {
        el.classList.remove('fa-circle-pause');
        el.classList.add('fa-circle-play');
    });
};

// Core: play song by index
const playSong = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    makeAllPlays();
    const btn = document.getElementById(String(songIndex));
    if (btn) {
        btn.classList.remove('fa-circle-play');
        btn.classList.add('fa-circle-pause');
    }
};

// Master play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
});

// Update progress bar while playing
audioElement.addEventListener('timeupdate', () => {
    if (!isNaN(audioElement.duration) && audioElement.duration > 0) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

// Seek when dragging the range input
myProgressBar.addEventListener('input', () => {
    if (!isNaN(audioElement.duration) && audioElement.duration > 0) {
        audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    }
});

// Play/pause by clicking the small list icons
Array.from(document.getElementsByClassName('SongItemClass')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);
        // Guard: ignore if id isn't a number
        if (isNaN(clickedIndex)) return;

        // If clicking the current one while playing → pause
        if (clickedIndex === songIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } else {
            playSong(clickedIndex);
        }
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Auto-play next when a track ends
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// ABOUT BUTTON DESCRIPTION TOGGLE
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", (e) => {
        const text = e.target.textContent.trim().toLowerCase();

        if (text === "about") {
            e.preventDefault();

            let aboutBox = document.getElementById("aboutBox");
            if (!aboutBox) {
                aboutBox = document.createElement("div");
                aboutBox.id = "aboutBox";
                aboutBox.style.background = "rgba(0,0,0,0.8)";
                aboutBox.style.color = "#fff";
                aboutBox.style.padding = "15px";
                aboutBox.style.margin = "15px auto";
                aboutBox.style.borderRadius = "8px";
                aboutBox.style.width = "60%";
                aboutBox.style.textAlign = "center";
                aboutBox.style.fontSize = "1rem";
                aboutBox.style.fontFamily = "Ubuntu, sans-serif";
                aboutBox.innerHTML = "🎵 Welcome to our Music Player! Enjoy a curated selection of songs and a sleek, responsive design with smooth playback controls.";
                document.body.insertBefore(aboutBox, document.querySelector(".container"));
            } else {
                aboutBox.remove();
            }
        }
    });
});
