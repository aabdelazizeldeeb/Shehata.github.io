import { siteData } from './data.js';

// --- Media Renderers ---

export function renderOpening() {
    // Get a nice image of Ahmed and Mohammed (category: 'us')
    const openingImage = siteData.images.find(img => img.category === 'us' && img.featured);
    if (openingImage) {
        document.getElementById('op-img').src = openingImage.url;
    }
}

export function renderHero() {
    const heroImage = siteData.images.find(img => img.id === 'm-hero');
    if (heroImage) {
        const imgEl = document.getElementById('hero-img');
        imgEl.src = heroImage.url;
        imgEl.onload = () => imgEl.classList.add('loaded');
        imgEl.onerror = () => imgEl.parentElement.classList.add('error');
    }
}

export function renderManBehindMemories() {
    const grid = document.getElementById('man-grid');
    const images = siteData.images.filter(img => img.category === 'mohammed' && img.id !== 'm-hero');
    
    images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'masonry-item fade-up';
        item.innerHTML = `<img src="${img.url}" alt="Mohammed" loading="lazy" class="lightbox-trigger" data-id="${img.id}" onload="this.classList.add('loaded')">`;
        grid.appendChild(item);
    });
}

export function renderOurStory() {
    const firstUsImg = siteData.images.find(img => img.category === 'us' && img.featured);
    if (firstUsImg) {
        const imgEl = document.getElementById('our-story-img');
        imgEl.src = firstUsImg.url;
        imgEl.classList.add('lightbox-trigger');
        imgEl.dataset.id = firstUsImg.id;
        imgEl.onload = () => imgEl.classList.add('loaded');
        imgEl.onerror = () => imgEl.parentElement.classList.add('error');
    }
}

export function renderOurMemories() {
    const grid = document.getElementById('memories-grid');
    // Skip the first 'featured' one which is used in Our Story
    let skippedFirst = false;
    const images = siteData.images.filter(img => {
        if (img.category === 'us' && img.featured && !skippedFirst) {
            skippedFirst = true;
            return false;
        }
        return img.category === 'us';
    });
    
    images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'masonry-item fade-up';
        item.innerHTML = `
            <img src="${img.url}" alt="Us" loading="lazy" class="lightbox-trigger" data-id="${img.id}" onload="this.classList.add('loaded')">
            ${img.caption ? `<p class="subtitle mt-2" style="font-size: 0.875rem; text-align: center;">${img.caption}</p>` : ''}
        `;
        grid.appendChild(item);
    });
}

export function renderMasonryWall() {
    const grid = document.getElementById('masonry-wall');
    // Mix all images for the wall
    const allImages = [...siteData.images].sort(() => 0.5 - Math.random());
    
    allImages.forEach(img => {
        const item = document.createElement('div');
        item.className = 'masonry-item fade-up';
        item.innerHTML = `<img src="${img.url}" alt="Memory" loading="lazy" class="lightbox-trigger" data-id="${img.id}" onload="this.classList.add('loaded')">`;
        grid.appendChild(item);
    });
}

export function renderVideos() {
    const grid = document.getElementById('video-grid');
    siteData.videos.forEach(vid => {
        const card = document.createElement('div');
        card.className = 'video-card fade-up';
        card.innerHTML = `
            <div class="img-wrapper" style="aspect-ratio: 16/9;">
                <img src="${vid.thumbnail}" alt="${vid.title}" loading="lazy">
                <div class="play-btn-overlay" data-vid="${vid.id}"></div>
            </div>
            ${vid.title ? `<h3 class="title-medium mt-3">${vid.title}</h3>` : ''}
            ${vid.caption ? `<p class="text-body">${vid.caption}</p>` : ''}
        `;
        grid.appendChild(card);
    });
}

export function renderGoodTimes() {
    const grid = document.getElementById('good-times-grid');
    // Just pick some random images to fill
    const images = siteData.images.filter(img => img.category === 'us').slice(0, 4);
    
    images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'masonry-item fade-up';
        
        // Add slight rotation for playful feel
        const rotation = (index % 2 === 0 ? 2 : -2) + 'deg';
        item.style.transform = `rotate(${rotation})`;
        
        item.innerHTML = `<img src="${img.url}" alt="Good Times" loading="lazy" class="lightbox-trigger" data-id="${img.id}" onload="this.classList.add('loaded')">`;
        grid.appendChild(item);
    });
}

// --- Lightbox Component ---
let currentLightboxIndex = 0;
let lightboxImages = [];

export function initLightbox() {
    lightboxImages = siteData.images; // Use all images for easy navigation
    
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbCap = document.getElementById('lb-cap');
    const closeBtn = document.getElementById('lb-close');
    const prevBtn = document.getElementById('lb-prev');
    const nextBtn = document.getElementById('lb-next');
    
    // Attach click to all trigger images
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-trigger')) {
            const id = e.target.dataset.id;
            const index = lightboxImages.findIndex(img => img.id === id);
            if (index !== -1) {
                openLightbox(index);
            }
        }
    });

    const openLightbox = (index) => {
        currentLightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lbImg.src = ''; }, 300);
    };

    const updateLightbox = () => {
        const img = lightboxImages[currentLightboxIndex];
        lbImg.src = img.url;
        lbCap.textContent = img.caption || '';
    };

    const nextImage = () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
        updateLightbox();
    };

    const prevImage = () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightbox();
    };

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Keyboard nav
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // Simple swipe support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
    lightbox.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextImage();
        if (touchEndX > touchStartX + 50) prevImage();
    });
}

// --- Video Modal Component ---
export function initVideoModal() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('vm-video');
    const closeBtn = document.getElementById('vm-close');
    const bgAudio = document.getElementById('bg-audio');

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('play-btn-overlay')) {
            const id = e.target.dataset.vid;
            const vidData = siteData.videos.find(v => v.id === id);
            if (vidData) {
                video.src = vidData.url;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                // Pause background music if playing
                if (!bgAudio.paused) {
                    bgAudio.pause();
                    bgAudio.dataset.wasPlaying = "true";
                }
                video.play().catch(e => console.log("Video auto-play blocked.", e));
            }
        }
    });

    const closeVideo = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        video.pause();
        video.src = '';
        // Resume background music if it was playing
        if (bgAudio.dataset.wasPlaying === "true") {
            bgAudio.play().catch(e => console.log(e));
            bgAudio.dataset.wasPlaying = "false";
        }
    };

    closeBtn.addEventListener('click', closeVideo);
    
    // Keyboard close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeVideo();
    });
}

// --- Music Controller ---
export function initMusic() {
    const audio = document.getElementById('bg-audio');
    const control = document.getElementById('music-control');
    const icon = control.querySelector('.icon');
    
    audio.src = siteData.audio.url;
    audio.volume = 0.5;

    let isPlaying = false;

    control.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            icon.textContent = '♫';
            icon.style.opacity = '0.5';
        } else {
            audio.play().catch(e => console.log("Audio play blocked", e));
            icon.textContent = '♪';
            icon.style.opacity = '1';
        }
        isPlaying = !isPlaying;
    });

    // Expose for external calls (e.g. from Opening Sequence)
    window.startMusic = () => {
        audio.play().then(() => {
            isPlaying = true;
            icon.textContent = '♪';
            icon.style.opacity = '1';
            control.classList.add('visible');
        }).catch(e => {
            console.log("Audio play blocked by browser, requires interaction", e);
            control.classList.add('visible');
        });
    };
}
