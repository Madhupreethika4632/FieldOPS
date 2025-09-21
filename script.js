// Initialize animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initParticleSystem();
    initSmoothScrolling();
    initNavbarEffects();
    initFormAnimations();
    initGlobeAnimation();
    initCardAnimations();
});

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('step')) {
                    animateStep(entry.target);
                }
                
                if (entry.target.classList.contains('glass-panel')) {
                    animatePanel(entry.target);
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.step, .glass-panel, .timeline-item, .dashboard-3d, .agent-phone-3d, .contact-form-3d, .keyword'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Particle system for hero background
function initParticleSystem() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;

    // Create additional dynamic particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${getRandomColor()};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s infinite linear;
        `;
        particleContainer.appendChild(particle);
    }
}

function getRandomColor() {
    const colors = ['#3B82F6', '#8B5CF6', '#14B8A6', '#F97316'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Form interactions and animations
function initFormAnimations() {
    const formInputs = document.querySelectorAll('input, textarea');
    const buttons = document.querySelectorAll('.cta-button');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (input.parentElement) {
                input.parentElement.style.transform = 'translateY(-2px)';
                input.parentElement.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.2)';
            }
        });
        
        input.addEventListener('blur', () => {
            if (input.parentElement) {
                input.parentElement.style.transform = 'translateY(0)';
                input.parentElement.style.boxShadow = 'none';
            }
        });
        
        // Type animation effect
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                input.style.color = '#3B82F6';
            } else {
                input.style.color = '#FFFFFF';
            }
        });
    });
    
    // Button hover effects
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const glow = button.querySelector('.button-glow');
            if (glow) {
                glow.style.opacity = '0.8';
                glow.style.transform = 'scale(1.1)';
            }
            
            // Ripple effect
            createRipple(button, e);
        });
        
        button.addEventListener('mouseleave', () => {
            const glow = button.querySelector('.button-glow');
            if (glow) {
                glow.style.opacity = '0';
                glow.style.transform = 'scale(1)';
            }
        });
        
        button.addEventListener('click', (e) => {
            createRipple(button, e);
            
            // Button press animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
}

// Create ripple effect for buttons
function createRipple(button, event) {
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Globe animation enhancements
function initGlobeAnimation() {
    const globe = document.querySelector('.globe');
    const pins = document.querySelectorAll('.pin');
    
    if (!globe) return;
    
    // Mouse interaction with globe
    globe.addEventListener('mouseenter', () => {
        globe.style.animationPlayState = 'paused';
        globe.style.transform = 'rotateY(var(--mouse-x, 0deg)) rotateX(calc(10deg + var(--mouse-y, 0deg)))';
    });
    
    globe.addEventListener('mouseleave', () => {
        globe.style.animationPlayState = 'running';
        globe.style.transform = '';
    });
    
    globe.addEventListener('mousemove', (e) => {
        const rect = globe.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const rotateX = (y - 0.5) * 30;
        const rotateY = (x - 0.5) * 30;
        
        globe.style.setProperty('--mouse-x', rotateY + 'deg');
        globe.style.setProperty('--mouse-y', rotateX + 'deg');
    });
    
    // Enhanced pin animations
    pins.forEach((pin, index) => {
        pin.addEventListener('click', () => {
            // Create verification complete animation
            const checkmark = document.createElement('div');
            checkmark.className = 'pin-checkmark';
            checkmark.innerHTML = '✓';
            checkmark.style.cssText = `
                position: absolute;
                top: -10px;
                left: -10px;
                width: 20px;
                height: 20px;
                background: #10B981;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                transform: scale(0);
                animation: checkmarkPop 1s ease forwards;
            `;
            
            pin.appendChild(checkmark);
            
            setTimeout(() => {
                checkmark.remove();
            }, 1000);
        });
    });
}

// Floating cards animation
function initCardAnimations() {
    const completionCards = document.querySelectorAll('.completion-card');
    
    completionCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) rotateY(5deg) scale(1.05)';
            card.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
        
        // Random animation trigger
        setTimeout(() => {
            triggerCardAnimation(card);
        }, Math.random() * 5000 + 2000);
    });
}

function triggerCardAnimation(card) {
    card.style.animation = 'none';
    setTimeout(() => {
        card.style.animation = 'cardFloat 6s ease-in-out infinite';
    }, 100);
    
    // Repeat randomly
    setTimeout(() => {
        triggerCardAnimation(card);
    }, Math.random() * 10000 + 5000);
}

// Step animation
function animateStep(stepElement) {
    const stepVisual = stepElement.querySelector('.step-visual');
    const stepContent = stepElement.querySelector('.step-content');
    
    if (stepVisual) {
        stepVisual.style.transform = 'translateY(-20px)';
        stepVisual.style.opacity = '0';
        
        setTimeout(() => {
            stepVisual.style.transition = 'all 0.8s ease';
            stepVisual.style.transform = 'translateY(0)';
            stepVisual.style.opacity = '1';
        }, 200);
    }
    
    if (stepContent) {
        stepContent.style.transform = 'translateY(20px)';
        stepContent.style.opacity = '0';
        
        setTimeout(() => {
            stepContent.style.transition = 'all 0.8s ease';
            stepContent.style.transform = 'translateY(0)';
            stepContent.style.opacity = '1';
        }, 400);
    }
}

// Panel animation
function animatePanel(panel) {
    panel.style.transform = 'rotateY(90deg) scale(0.8)';
    panel.style.opacity = '0';
    
    setTimeout(() => {
        panel.style.transition = 'all 1s ease';
        panel.style.transform = 'rotateY(0deg) scale(1)';
        panel.style.opacity = '1';
    }, 100);
}

// Timeline item animation
function animateTimelineItem(item) {
    const content = item.querySelector('.timeline-content');
    const marker = item.querySelector('.timeline-marker');
    
    if (content) {
        content.style.transform = 'translateX(-50px)';
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.style.transition = 'all 0.8s ease';
            content.style.transform = 'translateX(0)';
            content.style.opacity = '1';
        }, 300);
    }
    
    if (marker) {
        marker.style.transform = 'translateX(-50%) scale(0)';
        
        setTimeout(() => {
            marker.style.transition = 'all 0.6s ease';
            marker.style.transform = 'translateX(-50%) scale(1)';
        }, 100);
    }
}

// Parallax scrolling effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.orb, .floating-particles');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // Dashboard and phone floating effects
    const dashboard = document.querySelector('.dashboard-3d');
    const phone = document.querySelector('.agent-phone-3d');
    
    if (dashboard) {
        const dashboardOffset = dashboard.getBoundingClientRect().top;
        if (dashboardOffset < window.innerHeight && dashboardOffset > -200) {
            const rotation = (dashboardOffset - window.innerHeight / 2) * 0.02;
            dashboard.style.transform = `rotateY(${-10 + rotation}deg) rotateX(${5 + rotation * 0.5}deg)`;
        }
    }
    
    if (phone) {
        const phoneOffset = phone.getBoundingClientRect().top;
        if (phoneOffset < window.innerHeight && phoneOffset > -200) {
            const rotation = (phoneOffset - window.innerHeight / 2) * 0.02;
            phone.style.transform = `rotateY(${15 - rotation}deg) rotateX(${-5 - rotation * 0.5}deg)`;
        }
    }
});

// Add CSS for animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes checkmarkPop {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.2);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-10vh) translateX(50px);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
`;
document.head.appendChild(dynamicStyles);

// Touch device optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Optimize animations for touch devices
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        .touch-device .orb {
            animation-duration: 30s;
        }
        
        .touch-device .globe {
            animation-duration: 25s;
        }
        
        .touch-device .floating-particles {
            animation-duration: 25s;
        }
    `;
    document.head.appendChild(touchStyle);
}

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
    document.body.classList.add('low-performance');
    
    const lowPerfStyle = document.createElement('style');
    lowPerfStyle.textContent = `
        .low-performance .orb,
        .low-performance .floating-particles {
            animation: none;
        }
        
        .low-performance .globe {
            animation-duration: 40s;
        }
    `;
    document.head.appendChild(lowPerfStyle);
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.cta-button');
        const buttonText = submitButton.querySelector('span:last-child');
        const originalText = buttonText ? buttonText.textContent : 'Send Message';
        
        // Animate button
        if (buttonText) {
            buttonText.textContent = 'Sending...';
        }
        submitButton.style.background = 'linear-gradient(45deg, #10B981, #059669)';
        
        // Simulate form submission
        setTimeout(() => {
            if (buttonText) {
                buttonText.textContent = 'Message Sent!';
            }
            
            setTimeout(() => {
                if (buttonText) {
                    buttonText.textContent = originalText;
                }
                submitButton.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}