// Main JavaScript file for kmk-mediaquery-kit landing page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeApp();
});

function initializeApp() {
    // Remove loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 1000);

    // Initialize components
    initializeNavigation();
    initializeScrollProgress();
    initializeSmoothScroll();
    initializeCopyButtons();
    initializeAOS();
    initializeIntersectionObserver();
    initializeParallax();
    
    // Initialize GSAP animations after a short delay
    setTimeout(() => {
        initializeGSAPAnimations();
    }, 1200);
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        // Hide navbar when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// Scroll progress indicator
function initializeScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.transform = `scaleX(${progress / 100})`;
    }
    
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
}

// Smooth scrolling for navigation links
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const getStartedBtn = document.getElementById('get-started-btn');
    
    function smoothScrollTo(target) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScrollTo(target);
        });
    });
    
    // Get Started button smooth scroll to features
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            smoothScrollTo('#features');
        });
    }
}

// Copy to clipboard functionality
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const textToCopy = this.getAttribute('data-copy');
            const originalText = this.innerHTML;
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Show success feedback
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    Copied!
                `;
                this.style.background = 'var(--success-color)';
                this.style.color = 'white';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    this.style.color = '';
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
                
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Show success feedback
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    Copied!
                `;
                this.style.background = 'var(--success-color)';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    this.style.color = '';
                }, 2000);
            }
        });
    });
}

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
            anchorPlacement: 'top-bottom',
            disable: false
        });
        
        // Force refresh after initialization
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    } else {
        // Fallback: Make all AOS elements visible if AOS doesn't load
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }
}

// Intersection Observer for enhanced animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Add animation classes
                if (target.classList.contains('feature-card')) {
                    target.style.animationDelay = `${Math.random() * 0.5}s`;
                    target.classList.add('fade-in-up');
                }
                
                if (target.classList.contains('code-block')) {
                    target.classList.add('slide-in-up');
                }
                
                // Unobserve after animation
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const featureCards = document.querySelectorAll('.feature-card');
    const codeBlocks = document.querySelectorAll('.code-block');
    
    featureCards.forEach(card => observer.observe(card));
    codeBlocks.forEach(block => observer.observe(block));
}

// Parallax scrolling effects
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax, { passive: true });
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add hover effects to interactive elements
function initializeHoverEffects() {
    const buttons = document.querySelectorAll('.cta-button');
    const featureCards = document.querySelectorAll('.feature-card');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Initialize hover effects
setTimeout(initializeHoverEffects, 1500);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Refresh AOS on resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250));

// Add loading class to body for CSS transitions
document.body.classList.add('loading');

window.addEventListener('load', () => {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Service worker registration (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
