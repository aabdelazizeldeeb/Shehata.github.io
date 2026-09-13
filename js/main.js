import { 
    renderOpening,
    renderHero, 
    renderManBehindMemories, 
    renderOurStory, 
    renderOurMemories, 
    renderMasonryWall, 
    renderVideos, 
    renderGoodTimes,
    initLightbox,
    initVideoModal,
    initMusic
} from './components.js';

import { 
    initAnimations, 
    playOpeningSequence, 
    transitionToMain,
    playSurpriseSequence,
    playFinalMontage
} from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render all dynamic content
    renderOpening();
    renderHero();
    renderManBehindMemories();
    renderOurStory();
    renderOurMemories();
    renderMasonryWall();
    renderVideos();
    renderGoodTimes();

    // 2. Initialize Modals & Music
    initLightbox();
    initVideoModal();
    initMusic();

    // 3. Setup interaction for Opening Sequence
    const enterBtn = document.getElementById('enter-btn');
    const mainContent = document.getElementById('main-content');
    
    // Play the cinematic text reveal on load
    playOpeningSequence(() => {
        // Callback when 'Enter' button is visible and ready
    });

    enterBtn.addEventListener('click', () => {
        // Initialize background music
        if (window.startMusic) window.startMusic();
        
        // Show main content so GSAP can calculate scroll triggers
        mainContent.style.display = 'block';
        
        // Initialize Scroll Animations
        initAnimations();
        
        // Transition screen
        transitionToMain();
    });

    // 4. Surprise Section Logic
    const surpriseBtn = document.getElementById('surprise-btn');
    const continueMontageBtn = document.getElementById('continue-montage-btn');
    
    surpriseBtn.addEventListener('click', () => {
        playSurpriseSequence();
    });
    
    continueMontageBtn.addEventListener('click', () => {
        playFinalMontage();
    });
});
