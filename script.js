// DOM Elements
const appGrid = document.getElementById('appGrid');
const currentTimeElement = document.getElementById('current-time');

// App data with new folder structure
const apps = [
    { id: 'messages', name: 'Messages', icon: '💬', color: '#579AD9', file: 'apps/messages/index.html' },
    { id: 'phone', name: 'Phone', icon: '📞', color: '#6BBF6B', file: 'apps/phone/index.html' },
    { id: 'gallery', name: 'Gallery', icon: '🌄', color: '#6A618F', file: 'apps/gallery/index.html' },
    { id: 'pixabowl', name: 'Instashan', icon: 'https://projectsofkhan.github.io/pythontodoapp/instashan.jpg', color: '#9B5BBE', file: 'apps/instashan.html' },
    { id: 'diary', name: 'Diary', icon: '📖', color: '#A08E77', file: 'apps/diary/index.html' },
    { id: 'browser', name: 'Browser', icon: '🌐', color: '#5D6B9C', file: 'apps/browser/index.html' },
    { id: 'taskmanager', name: 'Tasks', icon: '📋', color: '#FF6B6B', file: 'apps/task/index.html' },
    { id: 'settings', name: 'Settings', icon: '⚙️', color: '#555555', file: 'apps/settings/index.html' }
];

// Sound system - FIXED: Use single audio element and reuse it
let clickSound = null;

/**
 * RELIABLE CLICK SOUND - Works EVERY time
 */
function playClickSound() {
    // If sound doesn't exist or is invalid, create it
    if (!clickSound || clickSound.readyState === 0) {
        clickSound = new Audio('sounds/click.mp3');
        clickSound.volume = 0.3;
        clickSound.preload = 'auto';
    }
    
    // Reset and play - this ensures it works every time
    clickSound.currentTime = 0;
    
    // Play with multiple fallbacks
    const playPromise = clickSound.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // If play fails, create a fresh sound and try again
            console.log('Sound play failed, creating fresh sound...');
            clickSound = new Audio('sounds/click.mp3');
            clickSound.volume = 0.3;
            clickSound.currentTime = 0;
            clickSound.play().catch(e => {
                // Final fallback - use Web Audio API
                playFallbackSound();
            });
        });
    }
}

/**
 * Fallback sound using Web Audio API
 */
function playFallbackSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log('All sound methods failed');
    }
}

/**
 * Updates the current time display
 */
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    if (currentTimeElement) {
        currentTimeElement.textContent = `${hours}:${minutes}`;
    }
}

/**
 * Initializes the home screen grid - FIXED: Prevent default and use playClickSound
 */
function initializeAppGrid() {
    if (!appGrid) return;

    apps.forEach(app => {
        const iconLink = document.createElement('a');
        iconLink.className = 'app-icon';
        iconLink.href = app.file;
        iconLink.target = "_self";

        // Check if icon is a URL (image) or emoji
        const iconContent = app.icon.startsWith('http') 
            ? `<img src="${app.icon}" style="width: 100%; height: 100%; border-radius: 12px; object-fit: cover;" alt="${app.name}">`
            : `<div style="font-size: 28px; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">${app.icon}</div>`;

        iconLink.innerHTML = `
            <div class="app-icon-body" style="background-color: ${app.color}; padding: 0; overflow: hidden;">
                ${iconContent}
            </div>
            <div class="app-icon-label">${app.name}</div>
        `;
        
        // FIXED: Add click event listener to play sound BEFORE navigation
        iconLink.addEventListener('click', function(e) {
            playClickSound();
            // Allow default navigation to happen
        });
        
        appGrid.appendChild(iconLink);
    });
}

/**
 * Enhanced fullscreen functionality
 */
function enterFullscreen() {
    const element = document.documentElement;

    // Check if already in fullscreen
    if (document.fullscreenElement || document.webkitFullscreenElement || 
        document.mozFullScreenElement || document.msFullscreenElement) {
        return;
    }

    // Try different fullscreen methods
    if (element.requestFullscreen) {
        element.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestfullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }

    // Remove listeners after first successful attempt
    document.body.removeEventListener('click', enterFullscreen);
    document.body.removeEventListener('touchstart', enterFullscreen);
}

// Automatic click sounds for all interactive elements - IMPROVED
function setupClickSounds() {
    document.addEventListener('click', function(event) {
        // Check if element is clickable
        const target = event.target;
        const isClickable = (
            target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.closest('.app-icon') ||
            target.closest('.contact-item') ||
            target.closest('.page-item') ||
            target.hasAttribute('onclick') ||
            target.classList.contains('clickable') ||
            (target.parentElement && target.parentElement.classList.contains('clickable'))
        );

        if (isClickable) {
            playClickSound();
        }
    });
}

// Initialize everything - IMPROVED
window.onload = function() {
    initializeAppGrid();
    updateTime();
    setupClickSounds();

    setInterval(updateTime, 60000);

    // Initial fullscreen setup
    document.body.addEventListener('click', enterFullscreen);
    document.body.addEventListener('touchstart', enterFullscreen);
    
    console.log('Home screen loaded with RELIABLE click sounds!');
};

// FIXED: Add this to handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible again (user came back from an app)
        // Reset the sound system
        if (clickSound) {
            clickSound.currentTime = 0;
        }
    }
});