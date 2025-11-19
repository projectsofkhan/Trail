// DOM Elements
const appGrid = document.getElementById('appGrid');
const currentTimeElement = document.getElementById('current-time');
const controlPanel = document.getElementById('controlPanel');
const statusBar = document.getElementById('statusBar');
const musicToggleText = document.getElementById('musicToggleText');
const musicStatusIndicator = document.getElementById('musicStatusIndicator');

// App data
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

// Music state
let musicOn = false;
let currentMusic = null;
let bgMusic1 = null;
let bgMusic2 = null;

// Pull-down variables
let startY = 0;
let isDragging = false;

/**
 * Initialize music system
 */
function initializeMusic() {
    bgMusic1 = document.getElementById('bgMusic1');
    bgMusic2 = document.getElementById('bgMusic2');
    
    if (bgMusic1) bgMusic1.volume = 0.05;
    if (bgMusic2) bgMusic2.volume = 0.05;
    
    updateMusicUI();
}

/**
 * Update music control UI
 */
function updateMusicUI() {
    if (musicToggleText) {
        musicToggleText.textContent = musicOn ? 'Turn Off Music' : 'Turn On Music';
    }
    if (musicStatusIndicator) {
        musicStatusIndicator.className = musicOn ? 'status-indicator' : 'status-indicator off';
    }
}

/**
 * Toggle music on/off
 */
function toggleMusic() {
    if (musicOn) {
        // Turn off music
        musicOn = false;
        currentMusic = null;
        if (bgMusic1) bgMusic1.pause();
        if (bgMusic2) bgMusic2.pause();
    } else {
        // Turn on music (default to Music One)
        playMusicOne();
    }
    updateMusicUI();
    closeControlPanel();
}

/**
 * Play Music One
 */
function playMusicOne() {
    if (bgMusic1) {
        if (bgMusic2) bgMusic2.pause();
        bgMusic1.currentTime = 0;
        bgMusic1.play().catch(e => {
            document.addEventListener('click', () => bgMusic1.play(), {once: true});
        });
        musicOn = true;
        currentMusic = 'music1';
    }
    updateMusicUI();
    closeControlPanel();
}

/**
 * Play Music Two
 */
function playMusicTwo() {
    if (bgMusic2) {
        if (bgMusic1) bgMusic1.pause();
        bgMusic2.currentTime = 0;
        bgMusic2.play().catch(e => {
            document.addEventListener('click', () => bgMusic2.play(), {once: true});
        });
        musicOn = true;
        currentMusic = 'music2';
    }
    updateMusicUI();
    closeControlPanel();
}

/**
 * Open control panel
 */
function openControlPanel() {
    controlPanel.classList.add('open');
}

/**
 * Close control panel
 */
function closeControlPanel() {
    controlPanel.classList.remove('open');
}

/**
 * Initialize pull-down functionality
 */
function initializePullDown() {
    let startY = 0;
    let isDragging = false;

    statusBar.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        isDragging = true;
        e.preventDefault();
    });

    statusBar.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        
        // Only trigger if pulling down (positive diff) and significant movement
        if (diff > 60) {
            openControlPanel();
            isDragging = false;
        }
    });

    statusBar.addEventListener('touchend', function() {
        isDragging = false;
    });

    // Also support mouse for testing
    statusBar.addEventListener('mousedown', function(e) {
        startY = e.clientY;
        isDragging = true;
    });

    statusBar.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const currentY = e.clientY;
        const diff = currentY - startY;
        
        if (diff > 60) {
            openControlPanel();
            isDragging = false;
        }
    });

    statusBar.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (controlPanel.classList.contains('open') && 
            !controlPanel.contains(e.target) && 
            !statusBar.contains(e.target)) {
            closeControlPanel();
        }
    });
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
 * Initializes the home screen grid
 */
function initializeAppGrid() {
    if (!appGrid) return;

    apps.forEach(app => {
        const iconLink = document.createElement('a');
        iconLink.className = 'app-icon';
        iconLink.href = app.file;
        iconLink.target = "_blank";

        const iconContent = app.icon.startsWith('http') 
            ? `<img src="${app.icon}" style="width: 100%; height: 100%; border-radius: 12px; object-fit: cover;" alt="${app.name}">`
            : `<div style="font-size: 28px; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">${app.icon}</div>`;

        iconLink.innerHTML = `
            <div class="app-icon-body" style="background-color: ${app.color}; padding: 0; overflow: hidden;">
                ${iconContent}
            </div>
            <div class="app-icon-label">${app.name}</div>
        `;
        appGrid.appendChild(iconLink);
    });
}

// Initialize everything
window.onload = function() {
    initializeAppGrid();
    updateTime();
    initializeMusic();
    initializePullDown();

    setInterval(updateTime, 60000);
};