// DOM Elements
const appGrid = document.getElementById('appGrid');
const currentTimeElement = document.getElementById('current-time');

// App data with direct GitHub Pages URLs
const apps = [
    { id: 'messages', name: 'Messages', icon: '💬', color: '#579AD9', file: 'https://projectsofkhan.github.io/Trail/apps/messages.html' },
    { id: 'phone', name: 'Phone', icon: '📞', color: '#6BBF6B', file: 'https://projectsofkhan.github.io/Trail/apps/phone.html' },
    { id: 'mail', name: 'Mail', icon: '✉️', color: '#E06B6B', file: 'https://projectsofkhan.github.io/Trail/apps/mail.html' },
    { id: 'gallery', name: 'Gallery', icon: '🌄', color: '#6A618F', file: 'https://projectsofkhan.github.io/Trail/apps/gallery.html' },
    { id: 'pixabowl', name: 'Pixabowl', icon: '📸', color: '#9B5BBE', file: 'https://projectsofkhan.github.io/Trail/apps/pixabowl.html' },
    { id: 'diary', name: 'Diary', icon: '📖', color: '#A08E77', file: 'https://projectsofkhan.github.io/Trail/apps/diary.html' },
    { id: 'browser', name: 'Browser', icon: '🌐', color: '#5D6B9C', file: 'https://projectsofkhan.github.io/Trail/apps/browser.html' },
    { id: 'settings', name: 'Settings', icon: '⚙️', color: '#555555', file: 'https://projectsofkhan.github.io/Trail/apps/settings.html' }
];

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
 * Initializes the home screen grid
 */
function initializeAppGrid() {
    if (!appGrid) return;
    
    apps.forEach(app => {
        const iconLink = document.createElement('a');
        iconLink.className = 'app-icon';
        iconLink.href = app.file;
        iconLink.target = "_self";
        
        iconLink.innerHTML = `
            <div class="app-icon-body" style="background-color: ${app.color};">
                ${app.icon}
            </div>
            <div class="app-icon-label">${app.name}</div>
        `;
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
        return; // Already in fullscreen, do nothing
    }
    
    // Try different fullscreen methods
    if (element.requestFullscreen) {
        element.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    
    // Remove listeners after first successful attempt
    document.body.removeEventListener('click', enterFullscreen);
    document.body.removeEventListener('touchstart', enterFullscreen);
}

/**
 * Handle exit fullscreen
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Fullscreen change handler
 */
function handleFullscreenChange() {
    const isFullscreen = document.fullscreenElement || 
                        document.webkitFullscreenElement || 
                        document.mozFullScreenElement || 
                        document.msFullscreenElement;
    
    if (!isFullscreen) {
        // Re-add listeners if user exits fullscreen
        document.body.addEventListener('click', enterFullscreen);
        document.body.addEventListener('touchstart', enterFullscreen);
    }
}

// Initialize
window.onload = function() {
    initializeAppGrid();
    updateTime();
    setInterval(updateTime, 60000);
    
    // Add fullscreen event listeners
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    // Initial fullscreen setup
    document.body.addEventListener('click', enterFullscreen);
    document.body.addEventListener('touchstart', enterFullscreen);
    
    // Add keyboard support for fullscreen (for testing)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'f' || e.key === 'F') {
            enterFullscreen();
        }
        if (e.key === 'Escape') {
            exitFullscreen();
        }
    });
};

// Handle page visibility changes (for mobile devices)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible again, re-initialize if needed
        updateTime();
    }
});