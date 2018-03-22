// get elements

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Build functions

function togglePlay() {
    var method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    var icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
   
}

function handleProgress() {
    var percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    var scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; 
    video.currentTime = scrubTime;
}
// Hook up event listeners
toggle.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach( range => range.addEventListener('change', handleRangeUpdate));

var mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => {mousedown = true});
progress.addEventListener('mouseup', () => {mousedown = false});
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));