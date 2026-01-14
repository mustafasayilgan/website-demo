// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Skip if it's a language link
        if (href.includes('index')) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Scroll indicator fade out
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const heroHeight = document.querySelector('.hero').offsetHeight;
        const scrollPosition = window.pageYOffset;
        const opacity = Math.max(0, 1 - (scrollPosition / heroHeight) * 2);
        scrollIndicator.style.opacity = opacity;
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-black);
        font-weight: 600;
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);
