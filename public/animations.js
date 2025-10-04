// Modern Tax Service Interactive Effects

document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing floating elements
    const existingFloatingElements = document.querySelectorAll('[style*="position: fixed"][style*="pointer-events: none"]');
    existingFloatingElements.forEach(element => element.remove());

    // Initialize all interactive features
    initScrollAnimations();
    addServiceCardEffects();
    initOwnerSection();
    addNavigationEffects();
    addButtonEnhancements();
    initFormValidation();
    addProgressIndicators();
    initCounterAnimations();
});

// Smooth scroll animations on page load and scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.service-card, .feature-item, .stat, .section-title').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Enhanced service card interactions
function addServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Add subtle tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });

        // Add click ripple effect
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(37, 99, 235, 0.3), transparent);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
            `;

            card.style.position = 'relative';
            card.appendChild(ripple);

            ripple.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(1)', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).addEventListener('finish', () => {
                ripple.remove();
            });
        });
    });
}

// Owner section functionality
function initOwnerSection() {
    const profilePhoto = document.querySelector('.profile-photo');
    const credentialBadges = document.querySelectorAll('.credential-badge');
    const educationItems = document.querySelectorAll('.education-item');

    // Add interactive hover effects for profile photo
    if (profilePhoto) {
        profilePhoto.addEventListener('mouseenter', () => {
            profilePhoto.style.animation = 'none';
            profilePhoto.style.transform = 'scale(1.05) rotate(2deg)';
        });

        profilePhoto.addEventListener('mouseleave', () => {
            profilePhoto.style.animation = 'profileFloat 4s ease-in-out infinite';
            profilePhoto.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Add staggered animation for credential badges
    credentialBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            badge.style.transition = 'all 0.6s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateX(0)';
        }, index * 200);
    });

    // Add pulse effect to education items when they come into view
    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    educationItems.forEach(item => {
        item.style.opacity = '0';
        observer.observe(item);
    });
}

function animateError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ef4444;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
    `;

    document.body.appendChild(errorDiv);

    errorDiv.animate([
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' },
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
    ], { duration: 300 });

    setTimeout(() => {
        errorDiv.animate([
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' }
        ], { duration: 300 }).addEventListener('finish', () => {
            errorDiv.remove();
        });
    }, 3000);
}

// Enhanced navigation effects
function addNavigationEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


// Enhanced button effects
function addButtonEnhancements() {
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .submit-btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });

        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            ripple.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(1)', opacity: 0 }
            ], {
                duration: 400,
                easing: 'ease-out'
            }).addEventListener('finish', () => {
                ripple.remove();
            });
        });
    });
}

// Form validation and enhancement
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.transform = 'scale(1.02)';
                input.style.boxShadow = '0 5px 20px rgba(37, 99, 235, 0.2)';
            });

            input.addEventListener('blur', () => {
                input.style.transform = 'scale(1)';
                input.style.boxShadow = 'none';
            });

            // Add typing effect for better UX
            input.addEventListener('input', () => {
                if (input.value.length > 0) {
                    input.style.background = 'rgba(16, 185, 129, 0.05)';
                } else {
                    input.style.background = '';
                }
            });
        });
    });
}

// Progress indicators for forms
function addProgressIndicators() {
    const forms = document.querySelectorAll('.contact-form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        const progressBar = document.createElement('div');

        progressBar.style.cssText = `
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            margin-bottom: 1rem;
            overflow: hidden;
        `;

        const progressFill = document.createElement('div');
        progressFill.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #10b981, #059669);
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 2px;
        `;

        progressBar.appendChild(progressFill);
        form.insertBefore(progressBar, form.firstChild);

        function updateProgress() {
            const filledInputs = Array.from(inputs).filter(input => input.value.trim() !== '');
            const progress = (filledInputs.length / inputs.length) * 100;
            progressFill.style.width = progress + '%';
        }

        inputs.forEach(input => {
            input.addEventListener('input', updateProgress);
        });
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const numericTarget = parseInt(target.replace(/\D/g, '')) || 0;
    const suffix = target.replace(/[\d,]/g, '');

    let current = 0;
    const increment = numericTarget / 60; // 60 frames for smooth animation

    const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
            current = numericTarget;
            clearInterval(timer);
        }

        element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16); // ~60fps
}

// Celebration particles for calculator
function createCelebrationParticles() {
    const colors = ['#10b981', '#2563eb', '#f59e0b', '#ef4444', '#8b5cf6'];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 100 + Math.random() * 100;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;

        particle.animate([
            {
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 1
            },
            {
                transform: `translate(${dx - 50}%, ${dy - 50}%) scale(1)`,
                opacity: 0.7
            },
            {
                transform: `translate(${dx * 2 - 50}%, ${dy * 2 - 50}%) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).addEventListener('finish', () => {
            particle.remove();
        });
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add custom styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #2563eb !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);