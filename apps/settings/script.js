let musicOn = true;
let soundEffectsOn = true;

/**
 * Updates the current time display
 */
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

/**
 * Shows Try Pro overlay with delayed cancel button
 */
function showTryPro() {
    const tryProOverlay = document.getElementById('tryProOverlay');
    const closeButton = document.querySelector('.close-try-pro');
    
    if (tryProOverlay && closeButton) {
        tryProOverlay.style.display = 'flex';
        
        // Hide close button initially
        closeButton.classList.remove('show');
        
        // Show close button after 1 second with animation
        setTimeout(() => {
            closeButton.classList.add('show');
        }, 1000);
    }
}

/**
 * Closes Try Pro overlay
 */
function closeTryPro() {
    const tryProOverlay = document.getElementById('tryProOverlay');
    if (tryProOverlay) {
        tryProOverlay.style.display = 'none';
    }
}

/**
 * Toggles music on/off
 */
function toggleMusic() {
    musicOn = !musicOn;
    const musicStatus = document.getElementById('musicStatus');
    if (musicStatus) {
        musicStatus.textContent = musicOn ? 'On' : 'Off';
        musicStatus.style.color = musicOn ? '#4CAF50' : '#FF6B6B';
    }
}

/**
 * Toggles sound effects on/off
 */
function toggleSoundEffects() {
    soundEffectsOn = !soundEffectsOn;
    const soundStatus = document.getElementById('soundStatus');
    if (soundStatus) {
        soundStatus.textContent = soundEffectsOn ? 'On' : 'Off';
        soundStatus.style.color = soundEffectsOn ? '#4CAF50' : '#FF6B6B';
    }
}

/**
 * Mail Us function
 */
function mailUs() {
    window.location.href = 'mailto:zeeshan40u@gmail.com';
}

/**
 * Show Help/Support
 */
function showHelp() {
    window.location.href = 'mailto:khan40u@gmail.com';
}

/**
 * Open BlitzRacer
 */
function openBlitzRacer() {
    window.open('https://blitzracer.github.io/Cargame/', '_blank');
}

/**
 * Open ZeeAi
 */
function openZeeAi() {
    window.open('https://projectsofkhan.github.io/zeeAi/', '_blank');
}

// Initialize when page loads
window.onload = function() {
    updateTime();
    setInterval(updateTime, 60000);
};