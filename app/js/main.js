let isFirstPlay = true; // Флаг для отслеживания первого воспроизведения
let controlsTimeout;

document.querySelector('.video-container').addEventListener('dblclick', toggleFullscreen);

function startBox() {
  if (document.querySelector('.controls').classList.contains('hidden')) {
    startVideo();
  } else {
    togglePlay()
  }
}

// Функция запуска видео при первом клике
function startVideo() {
  const video = document.getElementById('myVideo');
  const startButton = document.querySelector('.start-button');
  const controls = document.querySelector('.controls');

  video.play();
  startButton.style.display = 'none'; // Скрываем центральную кнопку
  controls.classList.remove('hidden'); // Показываем меню управления
  video.style.border = '2px solid #2091F9'
  isFirstPlay = false;
}

// Переключение воспроизведения
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

// Управление громкостью
function changeVolume() {
  const video = document.getElementById('myVideo');
  const volumeControl = document.getElementById('volumeControl');
  video.volume = volumeControl.value;
}

// Переключение полноэкранного режима
function toggleFullscreen() {
  const videoContainer = document.querySelector('.video-container');
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Автоскрытие элементов управления
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

// Обновление таймлайна
function updateTimeline() {
  const video = document.getElementById('myVideo');
  const progressBar = document.querySelector('.progress-filled');
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Перемотка видео при клике на таймлайне
function seekVideo(event) {
  const video = document.getElementById('myVideo');
  const progressBar = document.querySelector('.progress-bar');
  const clickX = event.offsetX;
  const barWidth = progressBar.offsetWidth;
  const newTime = (clickX / barWidth) * video.duration;
  video.currentTime = newTime;
}


const video = document.getElementById('myVideo');
video.addEventListener('timeupdate', updateTimeline); // Обновляем таймлайн
video.addEventListener('play', () => {
  document.querySelector('.play-button').classList.add('paused');
});

video.addEventListener('pause', () => {
  document.querySelector('.play-button').classList.remove('paused');
});
