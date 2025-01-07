let isFirstPlay = true;
let controlsTimeout;

document.querySelector('.video-container').addEventListener('dblclick', toggleFullscreen);

function startBox() {
  if (document.querySelector('.controls').classList.contains('hidden')) {
    startVideo();
  } else {
    togglePlay()
  }
}


function startVideo() {
  const video = document.getElementById('myVideo');
  const startButton = document.querySelector('.start-button');
  const controls = document.querySelector('.controls');

  video.play();
  startButton.style.display = 'none'; 
  controls.classList.remove('hidden'); 
  video.style.border = '2px solid #2091F9'
  isFirstPlay = false;
}


function togglePlay() {
  const video = document.getElementById('myVideo');
  const playButton = document.querySelector('.play-button');

  if (video.paused) {
    video.play();
    playButton.classList.add('paused');
  } else {
    video.pause();
    playButton.classList.remove('paused');
  }
}


function changeVolume() {
  const video = document.getElementById('myVideo');
  const volumeControl = document.getElementById('volumeControl');
  video.volume = volumeControl.value;
}

function toggleFullscreen() {
  const videoContainer = document.querySelector('.video-container');
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function showControls() {
  if (!isFirstPlay) {
    const controls = document.querySelector('.controls');
    controls.style.opacity = '1';

    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      controls.style.opacity = '0';
    }, 3000);
  }
}

function hideControls() {
  if (!isFirstPlay) {
    const controls = document.querySelector('.controls');
    controls.style.opacity = '0';
  }
}

function updateTimeline() {
  const video = document.getElementById('myVideo');
  const progressBar = document.querySelector('.progress-filled');
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}


function seekVideo(event) {
  const video = document.getElementById('myVideo');
  const progressBar = document.querySelector('.progress-bar');
  const clickX = event.offsetX;
  const barWidth = progressBar.offsetWidth;
  const newTime = (clickX / barWidth) * video.duration;
  video.currentTime = newTime;
}


const video = document.getElementById('myVideo');
video.addEventListener('timeupdate', updateTimeline);
video.addEventListener('play', () => {
  document.querySelector('.play-button').classList.add('paused');
});

video.addEventListener('pause', () => {
  document.querySelector('.play-button').classList.remove('paused');
});


const burgerBtn = document.querySelector('.burger-btn')
const menuList = document.querySelector('.menu__list')

burgerBtn.addEventListener('click', () => {
  menuList.classList.toggle('active');
  document.querySelector('.header').classList.toggle('active')
  
  if (menuList.classList.contains('active')) {
    document.body.style.overflow = "hidden";
    
  } else {
    document.body.style.overflow = "";
  }
})

