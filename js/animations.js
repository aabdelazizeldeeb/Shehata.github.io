// GSAP Animations and ScrollTriggers

export function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up animations for general elements
    gsap.utils.toArray('.fade-up').forEach(elem => {
        gsap.fromTo(elem, 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Parallax on editorial images
    gsap.utils.toArray('.img-wrapper[data-speed]').forEach(elem => {
        const speed = parseFloat(elem.dataset.speed);
        gsap.to(elem, {
            y: (i, target) => -ScrollTrigger.maxScroll(window) * (speed - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: elem,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0,
                invalidateOnRefresh: true
            }
        });
    });

    // Ken Burns effect on Hero image
    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
        gsap.to(heroImg, {
            scale: 1.15,
            y: '10%',
            ease: 'none',
            scrollTrigger: {
                trigger: '#section-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Story Sequence Reveal
    const storyItems = gsap.utils.toArray('.story-item');
    storyItems.forEach((item, i) => {
        gsap.fromTo(item, 
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    scrub: false
                }
            }
        );
    });

    // 38 Number Transition
    const hugeNumber = document.querySelector('.huge-number');
    const numContent = document.querySelector('.number-content');
    
    if (hugeNumber) {
        const tl38 = gsap.timeline({
            scrollTrigger: {
                trigger: '#section-38',
                start: 'top center',
                end: 'center center',
                scrub: 1
            }
        });
        
        tl38.fromTo(hugeNumber, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1 })
            .to(hugeNumber, { color: 'rgba(212, 175, 55, 0.2)', scale: 1.5, ease: 'power2.inOut' })
            .to(numContent, { opacity: 1, y: -50, ease: 'power2.out' }, '-=0.5');
    }
}

export function playOpeningSequence(onComplete) {
    const tl = gsap.timeline();
    
    tl.to('#op-1', { opacity: 1, duration: 2, ease: 'power2.inOut' })
      .to('#op-1', { opacity: 0, duration: 1.5, delay: 1 })
      
      .to('#op-2', { opacity: 1, duration: 1.5 })
      .to('#op-2', { opacity: 0, duration: 1, delay: 1.5 })
      
      .to('#op-3-container', { opacity: 1, scale: 1.05, duration: 2.5, ease: 'power3.out' })
      .to('#op-3-container', { opacity: 0, duration: 1, delay: 2 })
      
      .to('#op-4', { opacity: 1, duration: 1.5 })
      .to('#op-4', { opacity: 0, duration: 1, delay: 1 })
      
      .to('#op-5', { opacity: 1, duration: 1.5 })
      .to('#op-5', { opacity: 0, duration: 1, delay: 1 })
      
      .to('#enter-btn', { opacity: 1, pointerEvents: 'auto', duration: 1, onComplete });
}

export function transitionToMain() {
    gsap.to('#section-opening', { 
        y: '-100vh', 
        duration: 1.5, 
        ease: 'power4.inOut',
        onComplete: () => {
            document.getElementById('section-opening').style.display = 'none';
        }
    });
}

export function playSurpriseSequence(onComplete) {
    const reveal = document.getElementById('section-surprise-reveal');
    reveal.style.display = 'flex';
    
    // Hide main content temporarily so we focus on the reveal
    // Or just overlay it (z-index 998 is already set)
    
    const elements = gsap.utils.toArray('.fade-in-out');
    
    gsap.set(elements, { opacity: 0, y: 20 });
    
    gsap.to(reveal, { opacity: 1, duration: 1 });
    
    gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.8,
        ease: 'power3.out',
        onComplete: () => {
            // Trigger Confetti
            if (window.confetti) {
                const duration = 5 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
                
                const interval = setInterval(function() {
                    const timeLeft = animationEnd - Date.now();
                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }
                    const particleCount = 50 * (timeLeft / duration);
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
                }, 250);
            }
            if (onComplete) onComplete();
        }
    });
}

export function playFinalMontage() {
    const reveal = document.getElementById('section-surprise-reveal');
    const montage = document.getElementById('section-montage');
    const finalSection = document.getElementById('section-final');
    const container = document.getElementById('montage-container');
    
    gsap.to(reveal, { opacity: 0, duration: 1, onComplete: () => reveal.style.display = 'none' });
    
    montage.style.display = 'block';
    
    // Import siteData dynamically to get images for montage
    import('./data.js').then(({ siteData }) => {
        const images = siteData.images.slice(0, 15); // limit to 15
        
        let tl = gsap.timeline({
            onComplete: () => {
                gsap.to(montage, { opacity: 0, duration: 1, onComplete: () => montage.style.display = 'none' });
                finalSection.style.display = 'block';
                // Trigger scroll triggers for the final section manually if needed
                ScrollTrigger.refresh();
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });

        images.forEach((img, i) => {
            const imgEl = document.createElement('img');
            imgEl.src = img.url;
            imgEl.style.position = 'absolute';
            imgEl.style.top = '0';
            imgEl.style.left = '0';
            imgEl.style.width = '100%';
            imgEl.style.height = '100%';
            imgEl.style.objectFit = 'cover';
            imgEl.style.opacity = '0';
            // slight random scale/position for chaotic cinematic feel
            imgEl.style.transform = `scale(${1 + Math.random() * 0.2})`;
            container.appendChild(imgEl);
            
            // Fast rhythmic flash
            tl.to(imgEl, { opacity: 1, duration: 0.1 }, `+=${i === 0 ? 0 : 0.1}`)
              .to(imgEl, { opacity: 0, duration: 0.1 }, "+=0.3");
        });
    });
}
