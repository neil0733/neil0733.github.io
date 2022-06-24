let track_art = document.querySelector(".track-art");
let track_Chapter = document.querySelector(".track-Chapter");
let track_name = document.querySelector(".track-name");
let track_book = document.querySelector(".track-book");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let mySidebar = document.querySelector("#mySidebar");

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    "name": "12-01",
    "Chapter": "12 Diseases of the Oral Cavity and Oropharynx",
    "book": "ENT Secrets",
    "image": "1IDnvf5MHOjkM3rZYwApMxDbWZWMI0m56",
    "path": "1L9zKDzhdlG2pCbr8WTEmPUNOhmInOGLr"
  },
  {
    "name": "12-02",
    "Chapter": "12 Diseases of the Oral Cavity and Oropharynx",
    "book": "ENT Secrets",
    "image": "1IDnvf5MHOjkM3rZYwApMxDbWZWMI0m56",
    "path": "1L9sv48i5w5fJ1-hMEUNMreMfBaVl8CwP"
  },
  {
    "name": "12-03",
    "Chapter": "12 Diseases of the Oral Cavity and Oropharynx",
    "book": "ENT Secrets",
    "image": "1IDnvf5MHOjkM3rZYwApMxDbWZWMI0m56",
    "path": "1LF3mJpPjQe1IBfhmpw1aAkmYpFRWZpZS"
  },
  {
    "name": "13-01",
    "Chapter": "13 Altered Mental Status and Coma",
    "book": "Emergency Medicine Secrets",
    "image": "1wJ1WNArZ54S2reFDfnrG86CdnvBtAeDt",
    "path": "1RGKkXsMLK_2Rec-yoQNpbu7-wiUBnbQu"
  },
  {
    "name": "13-02",
    "Chapter": "13 Altered Mental Status and Coma",
    "book": "Emergency Medicine Secrets",
    "image": "1wJ1WNArZ54S2reFDfnrG86CdnvBtAeDt",
    "path": "1w9T-0XrJ_krmHg2tPoi8IXll9KYG7tqS"
  },
  {
    "name": "13-03",
    "Chapter": "13 Altered Mental Status and Coma",
    "book": "Emergency Medicine Secrets",
    "image": "1wJ1WNArZ54S2reFDfnrG86CdnvBtAeDt",
    "path": "1wLj0d8yq0ILU-MUfWSrBrfLAxECu_EAD"
  }
];

document.body.onload = addElement;
function addElement () {
  for(i=0;i<track_list.length;i++){
	  var newBtn = document.createElement("button");
	  var j = i + 1;
	  var newContent = document.createTextNode(track_list[i].Chapter + track_list[i].name);
	  newBtn.appendChild(newContent);
	  newBtn.value = i;
	  newBtn.onclick = function() {selectTrack(this)};
	  mySidebar.appendChild(newBtn);
  };
};
function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = "https://drive.google.com/uc?export=download&id=" + track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(https://drive.google.com/uc?export=download&id=" + track_list[track_index].image + ")";
  track_Chapter.textContent = track_list[track_index].Chapter;
  track_name.textContent = track_list[track_index].name;
  track_book.textContent = track_list[track_index].book;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function selectTrack(track) {
  track_index = track.value;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

//side bar
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}