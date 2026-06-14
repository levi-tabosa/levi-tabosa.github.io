// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Animate Skill Bars on Scroll
function animateSkillBars() {
    const skillSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-progress');

    if (skillSection) {
        const sectionPos = skillSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });

            // Remove event listener after animation
            window.removeEventListener('scroll', animateSkillBars);
        }
    }
}

window.addEventListener('scroll', animateSkillBars);

// Add Font Awesome for icons
const fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
document.head.appendChild(fontAwesome);

// Add scroll reveal effect for sections
window.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    const revealSection = function () {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.85) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styling for sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
    });

    // Run once on page load
    revealSection();

    // Run on scroll
    window.addEventListener('scroll', revealSection);
});

// Update active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Theme and Palette Switcher
const themePanel = document.getElementById('themePanel');
const themePanelToggle = document.getElementById('themePanelToggle');
const lightThemeBtn = document.getElementById('lightThemeBtn');
const darkThemeBtn = document.getElementById('darkThemeBtn');
const paletteBtns = document.querySelectorAll('.palette-btn');

if (themePanelToggle) {
    themePanelToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        themePanel.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!themePanel.contains(e.target)) {
            themePanel.classList.remove('active');
        }
    });
}

// Function to set theme (light/dark)
function setTheme(theme, save = true) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        if (darkThemeBtn) darkThemeBtn.classList.add('active');
        if (lightThemeBtn) lightThemeBtn.classList.remove('active');
        if (save) localStorage.setItem('portfolio-theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark-mode');
        if (lightThemeBtn) lightThemeBtn.classList.add('active');
        if (darkThemeBtn) darkThemeBtn.classList.remove('active');
        if (save) localStorage.setItem('portfolio-theme', 'light');
    }
}

// Function to set palette
function setPalette(palette, save = true) {
    // Remove all theme-palette classes
    document.documentElement.classList.forEach(className => {
        if (className.startsWith('theme-')) {
            document.documentElement.classList.remove(className);
        }
    });

    document.documentElement.classList.add(`theme-${palette}`);
    
    // Update active button state
    paletteBtns.forEach(btn => {
        if (btn.getAttribute('data-palette') === palette) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (save) localStorage.setItem('portfolio-palette', palette);
}

// Event listeners for theme buttons
if (lightThemeBtn) {
    lightThemeBtn.addEventListener('click', () => setTheme('light', true));
}
if (darkThemeBtn) {
    darkThemeBtn.addEventListener('click', () => setTheme('dark', true));
}

// Event listeners for palette buttons
paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const palette = btn.getAttribute('data-palette');
        setPalette(palette, true);
    });
});

// Initialize from LocalStorage or System Preferences
const savedTheme = localStorage.getItem('portfolio-theme');
const savedPalette = localStorage.getItem('portfolio-palette') || 'blue';

// Apply saved palette (sync button state, do not save to storage)
setPalette(savedPalette, false);

// Apply saved theme or default to system preference (sync button state, do not save to storage)
if (savedTheme) {
    setTheme(savedTheme, false);
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light', false);
}
