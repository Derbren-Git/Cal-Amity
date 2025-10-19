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
  playTrack(0); // start first track when clicked
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

const icons = [
  'assets/Icon1.png',
  'assets/Icon2.png',
  'assets/Icon3.png',
  'assets/Icon4.png',
  'assets/Icon5.png',
  'assets/Icon7.png',
];

let lastUsedIcons = []; // track recent icons to avoid repeats
let spawnStep = 0; // 0=top-left, 1=bottom-right, 2=top-right, 3=bottom-left

function spawnIcon() {
  // Pick a unique icon before repeats
  let available = icons.filter((i) => !lastUsedIcons.includes(i));
  if (available.length === 0) {
    lastUsedIcons = [];
    available = [...icons];
  }
  const chosen = available[Math.floor(Math.random() * available.length)];
  lastUsedIcons.push(chosen);

  const icon = document.createElement('img');
  icon.classList.add('floating-icon');
  icon.src = chosen;

  // Edge spawn zones
  const leftZone = [0, window.innerWidth * 0.15];
  const rightZone = [window.innerWidth * 0.85, window.innerWidth];
  const topZone = [window.innerHeight * 0.1, window.innerHeight * 0.45];
  const bottomZone = [window.innerHeight * 0.55, window.innerHeight * 0.9];

  let startX, startY;
  const minDistance = 300;
  let tries = 0;

  // ✅ Pattern-based spawn
  if (spawnStep === 0) {
    // Top Left
    startX = leftZone[0] + Math.random() * (leftZone[1] - leftZone[0]);
    startY = topZone[0] + Math.random() * (topZone[1] - topZone[0]);
  } else if (spawnStep === 1) {
    // Bottom Right
    startX = rightZone[0] + Math.random() * (rightZone[1] - rightZone[0]);
    startY = bottomZone[0] + Math.random() * (bottomZone[1] - bottomZone[0]);
  } else if (spawnStep === 2) {
    // Top Right
    startX = rightZone[0] + Math.random() * (rightZone[1] - rightZone[0]);
    startY = topZone[0] + Math.random() * (topZone[1] - topZone[0]);
  } else if (spawnStep === 3) {
    // Bottom Left
    startX = leftZone[0] + Math.random() * (leftZone[1] - leftZone[0]);
    startY = bottomZone[0] + Math.random() * (bottomZone[1] - bottomZone[0]);
  }

  // Try to avoid overlaps (retry within the chosen zone)
  while (isOverlapping(startX, startY, minDistance) && tries < 20) {
    if (spawnStep === 0) {
      startX = leftZone[0] + Math.random() * (leftZone[1] - leftZone[0]);
      startY = topZone[0] + Math.random() * (topZone[1] - topZone[0]);
    } else if (spawnStep === 1) {
      startX = rightZone[0] + Math.random() * (rightZone[1] - rightZone[0]);
      startY = bottomZone[0] + Math.random() * (bottomZone[1] - bottomZone[0]);
    } else if (spawnStep === 2) {
      startX = rightZone[0] + Math.random() * (rightZone[1] - rightZone[0]);
      startY = topZone[0] + Math.random() * (topZone[1] - topZone[0]);
    } else if (spawnStep === 3) {
      startX = leftZone[0] + Math.random() * (leftZone[1] - leftZone[0]);
      startY = bottomZone[0] + Math.random() * (bottomZone[1] - bottomZone[0]);
    }
    tries++;
  }

  icon.style.left = `${startX}px`;
  icon.style.top = `${startY}px`;

  // ✅ Cycle to next step in pattern
  spawnStep = (spawnStep + 1) % 4;

  // Randomize size (~250 ± 50)
  const size = 250 + (Math.random() - 0.5) * 100;
  icon.style.width = `${size}px`;
  icon.style.height = `${size}px`;

  // ✅ Slower & more choppy bobbing
  const amp = 16 + Math.random() * 28; // vertical amplitude
  const bobDur = (1.4 + Math.random() * 0.8).toFixed(2); // ~1.4–2.2s slower
  const delay = (Math.random() * 1.5).toFixed(2);
  const steps = Math.floor(6 + Math.random() * 4); // 6–9 choppy frames

  icon.style.setProperty('--amp', `${amp}px`);
  icon.style.setProperty('--bobDur', `${bobDur}s`);
  icon.style.setProperty('--delay', `${delay}s`);
  icon.style.setProperty('--steps', steps);

  document.body.appendChild(icon);

  // Remove icon after ~10s
  setTimeout(() => icon.remove(), 10000);
}

function isOverlapping(x, y, minDist) {
  const iconsOnPage = document.querySelectorAll('.floating-icon');
  for (let el of iconsOnPage) {
    const rect = el.getBoundingClientRect();
    const elX = rect.left + rect.width / 2;
    const elY = rect.top + rect.height / 2;
    const dist = Math.hypot(elX - x, elY - y);
    if (dist < minDist) return true;
  }
  return false;
}

// Spawn every ~1.2s
setInterval(spawnIcon, 1200);
