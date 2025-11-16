// DOM Elements
const appGrid = document.getElementById('appGrid');
const currentTimeElement = document.getElementById('current-time');

// App data with new folder structure
const apps = [
    { id: 'messages', name: 'Messages', icon: '💬', color: '#579AD9', file: 'apps/messages/index.html' },
    { id: 'phone', name: 'Phone', icon: '📞', color: '#6BBF6B', file: 'apps/phone/index.html' },
    { id: 'mail', name: 'Mail', icon: '✉️', color: '#E06B6B', file: 'apps/mail/index.html' },
    { id: 'gallery', name: 'Gallery', icon: '🌄', color: '#6A618F', file: 'apps/gallery/index.html' },
    { id: 'pixabowl', name: 'Instashan', icon: '<img src="https://projectsofkhan.github.io/pythontodoapp/instashan.jpg" style="width: 28px; height: 28px; border-radius: 6px;">', color: '#9B5BBE', file: 'apps/pixabowl/index.html' },
    { id: 'diary', name: 'Diary', icon: '📖', color: '#A08E77', file: 'apps/diary/index.html' },
    { id: 'browser', name: 'Browser', icon: '🌐', color: '#5D6B9C', file: 'apps/browser/index.html' },
    { id: 'settings', name: 'Settings', icon: '⚙️', color: '#555555', file: 'apps/settings/index.html' }
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
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    
    // Remove listeners after first successful attempt
    document.body.removeEventListener('click', enterFullscreen);
    document.body.removeEventListener('touchstart', enterFullscreen);
}

// Initialize
window.onload = function() {
    initializeAppGrid();
    updateTime();
    setInterval(updateTime, 60000);
    
    // Initial fullscreen setup
    document.body.addEventListener('click', enterFullscreen);
    document.body.addEventListener('touchstart', enterFullscreen);
};