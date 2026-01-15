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

// Advanced Intersection Observer for reveal animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
});

// Stagger animation for service cards
const serviceCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) rotateY(0deg)';
                }, index * 100);
            });
            serviceCardsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const servicesSection = document.querySelector('.services-grid');
if (servicesSection) {
    const cards = servicesSection.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) rotateY(5deg)';
        card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    });
    serviceCardsObserver.observe(servicesSection);
}

// Text reveal animation for section titles
function initTextReveal() {
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + (index < words.length - 1 ? ' ' : '');
            span.style.transitionDelay = `${index * 0.05}s`;
            title.appendChild(span);
        });
    });

    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => titleObserver.observe(title));
}

// Observe contact items with stagger
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.contact-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('revealed');
                }, index * 150);
            });
            contactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const contactSection = document.querySelector('.contact-info');
if (contactSection) {
    document.querySelectorAll('.contact-item').forEach(item => {
        item.classList.add('reveal');
    });
    contactObserver.observe(contactSection);
}

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

// Service Modal Functionality
const serviceData = {
    tr: [
        {
            title: "Statik Proje ve Teknik Kontrol",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
            items: [
                "Betonarme ve çelik yapı statik proje kontrolü",
                "Taşıyıcı sistem optimizasyonu",
                "Mevcut projelerin yönetmeliklere uygunluk incelemesi",
                "Zemin etüdü raporlarının teknik değerlendirilmesi"
            ]
        },
        {
            title: "Şantiye ve Uygulama Danışmanlığı",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
            items: [
                "Şantiye teknik müşavirliği",
                "İmalat kalite kontrolü (beton, donatı, kalıp, izolasyon)",
                "Uygulama projelerine uygunluk denetimi",
                "Şantiye organizasyonu ve iş programı takibi"
            ]
        },
        {
            title: "Metraj, Keşif ve Hakediş",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
            items: [
                "Detaylı metraj çıkarılması",
                "Yaklaşık maliyet hesapları",
                "Hakediş hazırlanması ve kontrolü",
                "Keşif artışı ve revize metraj çalışmaları"
            ]
        },
        {
            title: "Deprem Performans ve Güçlendirme Danışmanlığı",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
            items: [
                "Mevcut binalar için ön risk değerlendirmesi",
                "Karot ve donatı tespit sonuçlarının yorumlanması",
                "Deprem performans analizlerinin teknik takibi",
                "Güçlendirme alternatiflerinin teknik ve mali karşılaştırması"
            ]
        },
        {
            title: "Kentsel Dönüşüm Teknik Danışmanlığı",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
            items: [
                "Riskli yapı süreci teknik yönetimi",
                "Yeni yapı için fizibilite çalışmaları",
                "Arsa payı – inşaat alanı analizleri",
                "Maliklere teknik bilgilendirme ve raporlama"
            ]
        },
        {
            title: "İşveren Temsilciliği ve Teknik Müşavirlik",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>`,
            items: [
                "İşveren adına şantiye kontrolü",
                "Taşeron imalatlarının teknik denetimi",
                "Sözleşme ve teknik şartname hazırlanması",
                "Uyuşmazlıklarda teknik görüş raporu"
            ]
        }
    ],
    en: [
        {
            title: "Structural Design and Technical Review",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
            items: [
                "Reinforced concrete and steel structure design review",
                "Structural system optimization",
                "Compliance review of existing projects with regulations",
                "Technical evaluation of geotechnical investigation reports"
            ]
        },
        {
            title: "Construction Site and Implementation Consulting",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
            items: [
                "Construction site technical consultancy",
                "Manufacturing quality control (concrete, reinforcement, formwork, insulation)",
                "Compliance inspection with implementation projects",
                "Construction site organization and work schedule tracking"
            ]
        },
        {
            title: "Quantity Surveying, Estimation and Payment Certificates",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
            items: [
                "Detailed quantity takeoff",
                "Approximate cost calculations",
                "Preparation and review of payment certificates",
                "Estimate increases and revised quantity surveying work"
            ]
        },
        {
            title: "Seismic Performance and Strengthening Consulting",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
            items: [
                "Preliminary risk assessment for existing buildings",
                "Interpretation of core sample and reinforcement detection results",
                "Technical monitoring of seismic performance analyses",
                "Technical and cost comparison of strengthening alternatives"
            ]
        },
        {
            title: "Urban Transformation Technical Consulting",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
            items: [
                "Technical management of risky building process",
                "Feasibility studies for new construction",
                "Land share – construction area analyses",
                "Technical information and reporting to property owners"
            ]
        },
        {
            title: "Client Representation and Technical Consulting",
            icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>`,
            items: [
                "Construction site control on behalf of the client",
                "Technical supervision of subcontractor work",
                "Preparation of contracts and technical specifications",
                "Technical opinion reports in disputes"
            ]
        }
    ]
};

function getCurrentLanguage() {
    const htmlLang = document.documentElement.lang;
    return htmlLang === 'tr' ? 'tr' : 'en';
}

function openServiceModal(serviceIndex) {
    const lang = getCurrentLanguage();
    const service = serviceData[lang][serviceIndex];
    
    if (!service) {
        console.error('Service not found:', serviceIndex);
        return;
    }
    
    const modal = document.getElementById('serviceModal');
    if (!modal) {
        console.error('Modal not found');
        return;
    }
    
    const modalIcon = modal.querySelector('.modal-icon');
    const modalTitle = modal.querySelector('.modal-title');
    const modalList = modal.querySelector('.modal-list');
    
    if (modalIcon) modalIcon.innerHTML = service.icon;
    if (modalTitle) modalTitle.textContent = service.title;
    if (modalList) {
        modalList.innerHTML = '';
        service.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalList.appendChild(li);
        });
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Service card flip functionality
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card) => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            // Toggle flip class
            this.classList.toggle('flipped');
            
            // Close other flipped cards (optional - remove if you want multiple cards open)
            serviceCards.forEach(otherCard => {
                if (otherCard !== this && otherCard.classList.contains('flipped')) {
                    otherCard.classList.remove('flipped');
                }
            });
        });
    });
    
    // Close flipped cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-card')) {
            serviceCards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const parallaxValue = scrolled * 0.3;
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${parallaxValue}px)`;
                heroContent.style.opacity = Math.max(0, 1 - (scrolled / heroHeight) * 0.3);
            }
        }
    });
}

// Smooth section transitions
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (index > 0) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initServiceCards();
        initTextReveal();
        initParallax();
        initSectionTransitions();
    });
} else {
    initServiceCards();
    initTextReveal();
    initParallax();
    initSectionTransitions();
}
