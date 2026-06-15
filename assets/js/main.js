// Configuration
const bingApiUrl = "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1";
const corsAnywhereUrl = "https://cors.whoops.space/";
const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': 'https://zhanghuid.github.io'
};

// DOM Elements
const skeletonBg = document.getElementById('skeletonBg');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('themeIcon');

// Theme Management
let isDarkTheme = false;

// Check for saved theme preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkTheme();
    } else {
        enableLightTheme();
    }
}

function toggleTheme() {
    if (isDarkTheme) {
        enableLightTheme();
    } else {
        enableDarkTheme();
    }
}

function enableDarkTheme() {
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    isDarkTheme = true;
    localStorage.setItem('theme', 'dark');
}

function enableLightTheme() {
    document.body.classList.remove('dark-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    isDarkTheme = false;
    localStorage.setItem('theme', 'light');
}

// Intersection Observer for lazy loading the background image
if (skeletonBg) {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            fetch(corsAnywhereUrl + bingApiUrl, { headers: headers })
                .then(response => response.json())
                .then(data => {
                    const imageUrl = `https://www.bing.com${data.images[0].urlbase}_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp&rs=1&c=4&qlt=100&uhd=1&uhdwidth=3840&uhdheight=2160`;
                    loadImage(imageUrl);
                })
                .catch(error => {
                    console.error("Error fetching image:", error);
                    // Fallback to a default image
                    loadImage('https://source.unsplash.com/random/1920x1080/?nature,landscape');
                });
            observer.unobserve(skeletonBg); // Stop observing after the image is loaded
        }
    }, { threshold: 0.1 });

    observer.observe(skeletonBg);
}

function loadImage(imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
        const skeletonBgElement = document.querySelector('.skeleton-bg');
        skeletonBgElement.style.backgroundImage = `url(${imageUrl})`;
        skeletonBgElement.classList.add('loaded');
        adjustTextColor(imageUrl);
        
        // Add a class to body to indicate image is loaded
        document.body.classList.add('bg-loaded');
        
        // Show content with animation
        setTimeout(() => {
            document.querySelector('.skeleton').style.display = 'none';
            document.querySelector('.content').style.display = 'block';
            
            // Animate tech badges sequentially
            const badges = document.querySelectorAll('.tech-badge');
            badges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.classList.add('animated');
                }, index * 150);
            });
        }, 500); // Slight delay for smooth transition
    };
    img.onerror = () => {
        console.error("Error loading image:", imageUrl);
        // Try a fallback image from Unsplash
        if (!imageUrl.includes('unsplash')) {
            loadImage('https://source.unsplash.com/random/1920x1080/?nature,landscape');
        }
    };
}

function adjustTextColor(imageUrl) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = () => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);

            let brightness = 0;
            let totalPixels = 0;

            // Sample the image at specific points rather than analyzing every pixel
            // This is more efficient for large images
            const sampleSize = 10; // Sample every 10th pixel
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            
            for (let i = 0; i < imageData.data.length; i += (4 * sampleSize)) {
                const r = imageData.data[i];
                const g = imageData.data[i + 1];
                const b = imageData.data[i + 2];
                brightness += (r * 0.299 + g * 0.587 + b * 0.114); // Weighted brightness formula
                totalPixels++;
            }

            if (totalPixels > 0) {
                brightness /= totalPixels;
            }

            // If we're in dark mode, don't override the theme
            if (!isDarkTheme) {
                if (brightness < 128) {
                    // Dark image, use light text
                    document.documentElement.style.setProperty('--text-color', '#f0f0f0');
                    document.documentElement.style.setProperty('--card-bg', 'rgba(30, 30, 30, 0.8)');
                } else {
                    // Light image, use dark text
                    document.documentElement.style.setProperty('--text-color', '#333');
                    document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.8)');
                }
            }
        } catch (error) {
            console.error('Error analyzing image:', error);
        }
    };
    
    img.onerror = () => {
        console.error("Error loading image for color analysis:", imageUrl);
    };
}

// Add interactive elements and event listeners
function setupInteractiveElements() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Add hover effects to tech badges
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach(badge => {
        badge.addEventListener('mouseover', () => {
            badge.style.transform = 'translateY(-5px) scale(1.05)';
        });
        badge.addEventListener('mouseout', () => {
            badge.style.transform = '';
        });
    });
    
    // Add typing effect to the tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        
        // Start typing effect after content is displayed
        setTimeout(typeWriter, 1000);
    }
}

// Initialize the page
function init() {
    initTheme();
    setupInteractiveElements();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);