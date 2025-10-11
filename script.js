const audio = document.getElementById('audio');
const playlistContainer = document.getElementById('playlist');
const coverArt = document.getElementById('cover-art');
const trackInfo = document.getElementById('track-info');
const timeStamp = document.getElementById('time-stamp');
const volumeSlider = document.getElementById('volume-slider');
const playPauseBtn = document.getElementById('play-pause');
const shuffleBtn = document.getElementById('shuffle-btn');
const muteBtn = document.getElementById('mute-btn');

let currentIndex = 0;
let isShuffled = false;

// Song list: easy to edit
const songs = [
  {
    title: 'Theme of Laura',
    artist: 'Akira Yamaoka',
    src: 'assets/Theme Of Laura.mp3',
    cover: 'assets/ThemeOfLaura.jpeg',
  },
  {
    title: 'Promise (Reprise)',
    artist: 'Akira Yamaoka',
    src: 'assets/Silent Hill 2 OST - Promise (Reprise).mp3',
    cover: 'assets/ThemeOfLaura.jpeg',
  },
  {
    title: 'A Stranger',
    artist: 'A Perfect Circle',
    src: 'assets/A Stranger.mp3',
    cover: 'assets/AStranger.jpeg',
  },
  {
    title: 'Flying to You',
    artist: 'Ilaria Graziano',
    src: "assets/Wolf's Rain - Flying to You, Blue.mp3",
    cover: 'assets/WolfRainOST2.png',
  },
  {
    title: 'Valse de la Lune',
    artist: 'Ilaria Graziano',
    src: "assets/Wolf's Rain - Valse De La Lune.mp3",
    cover: 'assets/WolfRainOST1.jpeg',
  },
  {
    title: 'Dogs and Angels',
    artist: 'Joyce',
    src: "assets/Wolf's Rain - Dogs and Angels.mp3",
    cover: 'assets/WolfRainOST1.jpeg',
  },
  {
    title: 'CORAÇÃO SELVAGEM',
    artist: 'Joyce',
    src: "assets/Wolf's Rain - Coracao Selvagem.mp3",
    cover: 'assets/WolfRainOST1.jpeg',
  },
  {
    title: 'Cloud 9',
    artist: 'Maaya Sakamoto',
    src: "assets/Wolf's Rain - Cloud 9.mp3",
    cover: 'assets/WolfRainOST2.png',
  },
  {
    title: 'Tell Me What the Rain Knows',
    artist: 'Maaya Sakamoto',
    src: "assets/Wolf's Rain - Tell Me What the Rain Knows.mp3",
    cover: 'assets/WolfRainOST2.png',
  },
  {
    title: 'Requiem',
    artist: 'Yoko Kanno',
    src: "assets/Wolf's Rain - Requiem.mp3",
    cover: 'assets/WolfRainOST1.jpeg',
  },
  {
    title: 'Leaving on Red Hill',
    artist: 'Yoko Kanno',
    src: "assets/Wolf's Rain - Leaving on Red Hill.mp3",
    cover: 'assets/WolfRainOST1.jpeg',
  },
  {
    title: 'Paradiso',
    artist: 'Yoko Kanno',
    src: "assets/Wolf's Rain - Paradiso.mp3",
    cover: 'assets/WolfRainOST1.jpeg',
  },
  {
    title: "Heaven's Not Enough",
    artist: 'Steve Conte',
    src: "assets/Wolf's Rain OST - Heaven's Not Enough.mp3",
    cover: 'assets/WolfRainOST2.png',
  },
  {
    title: "I Know I'm a Wolf",
    artist: 'Young Heretics',
    src: "assets/I Know I'm a Wolf - Young Heretics.mp3",
    cover: 'assets/YoungHeretics.jpeg',
  },
];

// Sort songs alphabetically
songs.sort((a, b) => a.title.localeCompare(b.title));

// Generate playlist
songs.forEach((song, index) => {
  const div = document.createElement('div');
  div.classList.add('track');
  if (index === 0) div.classList.add('active');
  div.dataset.index = index;
  div.textContent = `♡  ${song.title}`;
  playlistContainer.appendChild(div);
  div.addEventListener('click', () => playTrack(index));
});

// Initialize volume
audio.volume = 0.1;
volumeSlider.value = audio.volume;

// Play a track
function playTrack(index) {
  currentIndex = index;
  const song = songs[index];
  audio.src = song.src;
  coverArt.src = song.cover;
  trackInfo.textContent = `❤︎ ${song.title} – ${song.artist} ❤︎`;

  document.querySelectorAll('.track').forEach((t) => t.classList.remove('active'));
  document.querySelector(`.track[data-index="${index}"]`).classList.add('active');

  audio.play().catch(() => console.log('Autoplay blocked.'));
  updatePlayPauseBtn();
}

// Update play/pause button text
function updatePlayPauseBtn() {
  playPauseBtn.textContent = audio.paused ? '▶' : '⏸';
}

// Play/pause button
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) audio.play();
  else audio.pause();
  updatePlayPauseBtn();
});

// Shuffle button
shuffleBtn.addEventListener('click', () => {
  isShuffled = !isShuffled;
  shuffleBtn.classList.toggle('active', isShuffled);
});

// Next track
function nextTrack() {
  if (isShuffled) {
    let next;
    do {
      next = Math.floor(Math.random() * songs.length);
    } while (next === currentIndex && songs.length > 1);
    playTrack(next);
  } else {
    playTrack((currentIndex + 1) % songs.length);
  }
}

// Previous track
function prevTrack() {
  playTrack((currentIndex - 1 + songs.length) % songs.length);
}

// Audio ended
audio.addEventListener('ended', nextTrack);

// Keyboard / custom buttons
const controlsContainer = document.createElement('div');
controlsContainer.style.display = 'flex';
controlsContainer.style.justifyContent = 'center';
controlsContainer.style.marginTop = '5px';
const prevBtn = document.createElement('button');
prevBtn.textContent = '⏮';
prevBtn.style.marginRight = '5px';
prevBtn.addEventListener('click', prevTrack);
const nextBtn = document.createElement('button');
nextBtn.textContent = '⏭';
nextBtn.style.marginLeft = '5px';
nextBtn.addEventListener('click', nextTrack);

playPauseBtn.parentNode.insertBefore(prevBtn, playPauseBtn);
playPauseBtn.parentNode.insertBefore(nextBtn, playPauseBtn.nextSibling);

// Update timestamp
audio.addEventListener('timeupdate', () => {
  const formatTime = (t) => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
  timeStamp.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
});

// Like/Dislike buttons
document.querySelectorAll('.like-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const span = btn.querySelector('span');
    span.textContent = parseInt(span.textContent) + 1;
    btn.disabled = true;
  });
});

document.querySelectorAll('.dislike-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const span = btn.querySelector('span');
    span.textContent = parseInt(span.textContent) + 1;
    btn.disabled = true;
  });
});

// Attempt autoplay on page load
window.addEventListener('DOMContentLoaded', () => {
  playTrack(0); // Try to play first track automatically
});

const overlay = document.getElementById('start-overlay');
overlay.addEventListener('click', () => {
  playTrack(0); // start first track
  overlay.style.display = 'none'; // hide overlay
});

// Optional: update mute button if volume slider goes to 0
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
  if (audio.volume === 0) {
    audio.muted = true;
    muteBtn.textContent = '🕨';
    muteBtn.classList.add('muted');
  } else if (audio.muted) {
    audio.muted = false;
    muteBtn.textContent = '🕪';
    muteBtn.classList.remove('muted');
  }
});

const words = [
  'love',
  'hate',
  'chaos',
  'lost',
  'bleed',
  'dark',
  'scream',
  'curse',
  'shatter',
  'fuck',
];

function spawnWord() {
  const word = document.createElement('div');
  word.classList.add('floating-word');
  word.textContent = words[Math.floor(Math.random() * words.length)];

  // Divide screen into 3 horizontal zones: left, center, right
  const zonesX = [
    [0, window.innerWidth / 3],
    [window.innerWidth / 3, (2 * window.innerWidth) / 3],
    [(2 * window.innerWidth) / 3, window.innerWidth],
  ];

  // Divide screen into 3 vertical zones: top, middle, bottom
  const zonesY = [
    [0, window.innerHeight / 3],
    [window.innerHeight / 3, (2 * window.innerHeight) / 3],
    [(2 * window.innerHeight) / 3, window.innerHeight],
  ];

  // Pick a random zone for X and Y
  const zoneX = zonesX[Math.floor(Math.random() * zonesX.length)];
  const zoneY = zonesY[Math.floor(Math.random() * zonesY.length)];

  // Pick a random position inside the zone
  const startX = zoneX[0] + Math.random() * (zoneX[1] - zoneX[0]);
  const startY = zoneY[0] + Math.random() * (zoneY[1] - zoneY[0]);

  word.style.left = startX + 'px';
  word.style.top = startY + 'px';

  document.body.appendChild(word);

  // Trigger fade in + slow drift
  setTimeout(() => {
    const driftX = (Math.random() - 0.5) * 100; // horizontal drift ±50px
    const driftY = (Math.random() - 0.5) * 100; // vertical drift ±50px
    word.style.opacity = 0.5 + Math.random() * 0.4; // random semi-transparent
    word.style.transform = `translate(${driftX}px, ${driftY}px)`;
  }, 50);

  // Fade out and remove after 8 seconds
  setTimeout(() => {
    word.style.opacity = 0;
    setTimeout(() => word.remove(), 3000); // remove after fade-out
  }, 8000);
}

// Spawn a new word every 0.5 seconds
setInterval(spawnWord, 500);
