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

// Observe service cards with fade-in animation
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
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
    const modal = document.getElementById('serviceModal');
    const modalIcon = modal.querySelector('.modal-icon');
    const modalTitle = modal.querySelector('.modal-title');
    const modalList = modal.querySelector('.modal-list');
    
    modalIcon.innerHTML = service.icon;
    modalTitle.textContent = service.title;
    modalList.innerHTML = '';
    
    service.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalList.appendChild(li);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Service card click handlers
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceIndex = parseInt(this.getAttribute('data-service'));
        openServiceModal(serviceIndex);
    });
});

// Modal close handlers
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

if (modalClose) {
    modalClose.addEventListener('click', closeServiceModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeServiceModal);
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeServiceModal();
    }
});
