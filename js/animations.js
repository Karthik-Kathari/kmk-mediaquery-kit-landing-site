// Advanced GSAP Animations for kmk-mediaquery-kit landing page

// Initialize GSAP animations
function initializeGSAPAnimations() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Set default ease
    gsap.defaults({ ease: "power2.out" });
    
    // Initialize all animation sequences
    initializeHeroAnimations();
    initializeScrollTriggerAnimations();
    initializeInteractiveAnimations();
    initializeParallaxAnimations();
    initializeLoadingAnimations();
}

// Hero section animations
function initializeHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate hero badge
    tl.from('.hero-badge', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "back.out(1.7)"
    })
    
    // Animate hero title with split text effect
    .from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    }, "-=0.3")
    
    // Animate hero description
    .from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8
    }, "-=0.5")
    
    // Animate hero buttons with stagger
    .from('.hero-actions .cta-button', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.3")
    
    // Animate code preview
    .from('.code-preview', {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8")
    
    // Animate code content with typewriter effect
    .from('.code-line', {
        opacity: 0,
        x: 20,
        duration: 0.5,
        stagger: 0.3
    }, "-=0.5");
    
    // Animate gradient orbs
    gsap.from('.gradient-orb', {
        scale: 0,
        opacity: 0,
        duration: 2,
        stagger: 0.5,
        ease: "elastic.out(1, 0.5)",
        delay: 1
    });
}

// Scroll-triggered animations
function initializeScrollTriggerAnimations() {
    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Features grid animation
    gsap.from('.feature-card', {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.8,
        stagger: {
            amount: 1.2,
            grid: [2, 3],
            from: "start"
        },
        scrollTrigger: {
            trigger: '.features-grid',
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Feature icons animation
    gsap.utils.toArray('.feature-icon').forEach(icon => {
        gsap.from(icon, {
            rotation: 180,
            scale: 0,
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: {
                trigger: icon,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Installation section animation
    gsap.from('.install-card', {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.installation',
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Code blocks animation
    gsap.utils.toArray('.code-block').forEach(block => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: block,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
        
        tl.from(block, {
            opacity: 0,
            scale: 0.95,
            duration: 0.6
        })
        .from(block.querySelectorAll('.code-line, pre'), {
            opacity: 0,
            x: -20,
            duration: 0.4,
            stagger: 0.1
        }, "-=0.3");
    });
    
    // Usage section animations
    gsap.utils.toArray('.usage-block').forEach((block, index) => {
        gsap.from(block, {
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: block,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Folder tree animation
    gsap.from('.tree-item', {
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.folder-tree',
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Footer animation
    gsap.from('.footer-content > *', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.footer',
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
}

// Interactive animations
function initializeInteractiveAnimations() {
    // Button hover animations
    gsap.utils.toArray('.cta-button').forEach(button => {
        const icon = button.querySelector('.button-icon');
        
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (icon) {
                gsap.to(icon, {
                    x: 5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (icon) {
                gsap.to(icon, {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Feature card hover animations
    gsap.utils.toArray('.feature-card').forEach(card => {
        const icon = card.querySelector('.feature-icon');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(icon, {
                rotation: 360,
                duration: 0.8,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(icon, {
                rotation: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    });
    
    // Copy button animations
    gsap.utils.toArray('.copy-button').forEach(button => {
        button.addEventListener('click', () => {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    });
    
    // Navigation link hover animations
    gsap.utils.toArray('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -2,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Parallax animations
function initializeParallaxAnimations() {
    // Gradient orbs parallax
    gsap.utils.toArray('.gradient-orb').forEach((orb, index) => {
        gsap.to(orb, {
            y: (index + 1) * -100,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
    
    // Hero content parallax
    gsap.to('.hero-content', {
        y: -50,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
    
    // Code preview parallax
    gsap.to('.code-preview', {
        y: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
}

// Loading animations
function initializeLoadingAnimations() {
    // Loading spinner animation
    gsap.to('.loading-spinner', {
        rotation: 360,
        duration: 1,
        ease: "none",
        repeat: -1
    });
    
    // Loading text animation
    gsap.to('.loading-text', {
        opacity: 0.5,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
    });
}

// Advanced scroll animations
function initializeAdvancedScrollAnimations() {
    // Smooth scroll reveal for images
    gsap.utils.toArray('.reveal').forEach(element => {
        gsap.set(element, { clipPath: "inset(0 100% 0 0)" });
        
        gsap.to(element, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Text reveal animation
    gsap.utils.toArray('.text-reveal').forEach(text => {
        gsap.from(text, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: text,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Mouse movement animations
function initializeMouseAnimations() {
    // Cursor follow effect for hero section
    const hero = document.querySelector('.hero');
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (hero && orbs.length > 0) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = hero.getBoundingClientRect();
            
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            
            orbs.forEach((orb, index) => {
                gsap.to(orb, {
                    x: x * (index + 1) * 50,
                    y: y * (index + 1) * 50,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        });
        
        hero.addEventListener('mouseleave', () => {
            orbs.forEach(orb => {
                gsap.to(orb, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        });
    }
}

// Performance optimization
function optimizeAnimations() {
    // Reduce animations on mobile devices
    if (window.innerWidth < 768) {
        gsap.globalTimeline.timeScale(0.7);
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            gsap.globalTimeline.pause();
        } else {
            gsap.globalTimeline.resume();
        }
    });
}

// Initialize mouse animations after other animations
setTimeout(() => {
    initializeMouseAnimations();
    initializeAdvancedScrollAnimations();
    optimizeAnimations();
}, 2000);

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Clean up animations on page unload
window.addEventListener('beforeunload', () => {
    gsap.killTweensOf("*");
    ScrollTrigger.killAll();
});

// Export functions for external use
if (typeof window !== 'undefined') {
    window.GSAPAnimations = {
        initializeGSAPAnimations,
        initializeHeroAnimations,
        initializeScrollTriggerAnimations,
        initializeInteractiveAnimations,
        initializeParallaxAnimations
    };
}
