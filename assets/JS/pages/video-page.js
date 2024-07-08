const video = document.getElementById('video')

const player = videojs(video, {
    controls : true,
    playbackRates : [0.5, 1, 1.25, 1.5, 2, 4],
    inactivityTimeout : 3000,
})