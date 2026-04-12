const slide = document.getElementById('carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let counter = 0;
let images = [];

// 1. Fetch images from JSON
fetch('image-gallery.json')
    .then(response => response.json())
    .then(data => {
        images = data;
        data.forEach(img => {
            const imageElement = document.createElement('img');
            imageElement.src = img.url;
            imageElement.alt = img.caption || 'Roadmap Image';
            imageElement.style.width = '590px';
            imageElement.style.height = '590px';
            imageElement.style.objectFit = 'center';
            slide.appendChild(imageElement);
        });
    });

// 2. Function to move slide
function updateSlide() {
    const size = slide.children[0].clientWidth;
    slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

// 3. Next/Prev Button Logic
nextBtn.addEventListener('click', () => {
    if (counter >= images.length - 1) counter = -1;
    counter++;
    updateSlide();
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) counter = images.length;
    counter--;
    updateSlide();
});

// 4. Automatic Animation (Change every 3 seconds)
setInterval(() => {
    nextBtn.click();
}, 3000);


/* for the image scroll effect with Marquee Html element  */


const marquee = document.getElementById('marquee-content');

fetch('image-gallery.json')
    .then(res => res.json())
    .then(data => {
        // Create a function to add images to the DOM
        const renderImages = (list) => {
            list.forEach(item => {
                const img = document.createElement('img');
                img.src = item.url;
                img.alt = "St. Cecilia Choir";
                marquee.appendChild(img);
            });
        };

        // Render once...
        renderImages(data);
        // ...and render again immediately after to create the loop
        renderImages(data);
    })
    .catch(err => console.error("Error loading choir images:", err));



    //for video gallery section

    let videoList = [];
let currentIdx = 0;

const videoElem = document.getElementById('main-video');
const videoSource = videoElem.querySelector('source');
const titleElem = document.getElementById('video-title');
const NextBtn = document.getElementById('nextVid');
const PrevBtn = document.getElementById('prevVid');

// 1. Fetch the Video Data
fetch('video-gallery.json')
    .then(response => response.json())
    .then(data => {
        videoList = data;
        updateVideo(); // Load the first video
    });

// 2. Function to Update the Player
function updateVideo() {
    if (videoList.length > 0) {
        const currentVideo = videoList[currentIdx];
        
        // Change the source and the title
        videoSource.src = currentVideo.url;
        titleElem.innerText = currentVideo.title;

        // Must call .load() when changing sources dynamically
        videoElem.load();
        videoElem.play();
    }
}

// 3. Button Listeners
NextBtn.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % videoList.length;
    updateVideo();
});

PrevBtn.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + videoList.length) % videoList.length;
    updateVideo();
});


// for mute and unmute video in the video gallery section

const volumeBtn = document.getElementById('volume-toggle');
const volumeIcon = document.getElementById('volume-icon');
const Video = document.getElementById('main-video');

volumeBtn.addEventListener('click', () => {
    if (Video.muted) {
        Video.muted = false; // Turn sound ON
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-up');
    } else {
        Video.muted = true; // Turn sound OFF
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
    }
});

// IMPORTANT: When the user clicks "Next" or "Prev", keep their volume choice!
// If they unmuted the first video, the next one should also stay unmuted.
function updateVideo() {
    if (videoList.length > 0) {
        const currentVideo = videoList[currentIdx];
        videoSource.src = currentVideo.url;
        titleElem.innerText = currentVideo.title;

        Video.load();
        
        // We don't reset video.muted here, so the user's preference persists
        Video.play();
    }
}