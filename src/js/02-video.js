import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
console.log(throttle);
const CURRENT_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

const timeUpdate = player.on(
  `timeupdate`,
  throttle(event => {
    localStorage.setItem(CURRENT_TIME_KEY, event.seconds);
    console.log(event.seconds);
  }, 1000)
);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const timeWatched = localStorage.getItem(CURRENT_TIME_KEY);

if (timeWatched) {
  player.setCurrentTime(`${timeWatched}`);
}
