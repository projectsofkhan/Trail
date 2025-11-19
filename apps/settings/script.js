let musicOn = false;
let soundEffectsOn = true;
let currentMusic = null;
let bgMusic1 = null;
let bgMusic2 = null;

/**
 * Initializes background music
 */
function initializeMusic() {
    bgMusic1 = document.getElementById('bgMusic1');
    bgMusic2 = document.getElementById('bgMusic2');
    
    if (bgMusic1) {
        bgMusic1.volume = 0.05; // 5% volume - very low
    }
    if (bgMusic2) {
        bgMusic2.volume = 0.05; // 5% volume - very low
    }
    
    // Update button status to show "Off"
    const musicStatus = document.getElementById('musicStatus');
    if (musicStatus) {
        musicStatus.textContent = 'Off';
        musicStatus.style.color = '#FF6B6B';
    }
}

/**
 * Shows music selection overlay
 */
function showMusicSelection() {
    const musicSelectionOverlay = document.getElementById('musicSelectionOverlay');
    if (musicSelectionOverlay) {
        musicSelectionOverlay.style.display = 'flex';
    }
}

/**
 * Closes music selection overlay
 */
function closeMusicSelection() {
    const musicSelectionOverlay = document.getElementById('musicSelectionOverlay');
    if (musicSelectionOverlay) {
        musicSelectionOverlay.style.display = 'none';
    }
}

/**
 * Turns off music completely
 */
function turnOffMusic() {
    musicOn = false;
    currentMusic = null;
    
    // Stop all music
    if (bgMusic1) {
        bgMusic1.pause();
        bgMusic1.currentTime = 0;
    }
    if (bgMusic2) {
        bgMusic2.pause();
        bgMusic2.currentTime = 0;
    }
    
    // Update UI
    const musicStatus = document.getElementById('musicStatus');
    if (musicStatus) {
        musicStatus.textContent = 'Off';
        musicStatus.style.color = '#FF6B6B';
    }
    
    // Close the selection overlay
    closeMusicSelection();
}

/**
 * Selects and plays the chosen music
 */
function selectMusic(musicType) {
    // Stop any currently playing music
    if (bgMusic1) bgMusic1.pause();
    if (bgMusic2) bgMusic2.pause();
    
    let selectedMusic = null;
    
    if (musicType === 'music1') {
        selectedMusic = bgMusic1;
        currentMusic = 'music1';
    } else if (musicType === 'music2') {
        selectedMusic = bgMusic2;
        currentMusic = 'music2';
    }
    
    if (selectedMusic) {
        // Turn music ON
        musicOn = true;
        selectedMusic.currentTime = 0;
        
        selectedMusic.play().catch(error => {
            console.log('Failed to play music:', error);
            document.addEventListener('click', function startMusic() {
                selectedMusic.play().catch(e => console.log('Still failed to play music'));
                document.removeEventListener('click', startMusic);
            }, { once: true });
        });
        
        // Update UI
        const musicStatus = document.getElementById('musicStatus');
        if (musicStatus) {
            musicStatus.textContent = 'On';
            musicStatus.style.color = '#4CAF50';
        }
    }
    
    // Close the selection overlay
    closeMusicSelection();
}

/**
 * Toggles music on/off
 */
function toggleMusic() {
    if (!musicOn) {
        // If music is off, show selection
        showMusicSelection();
        return;
    }
    
    // If music is on, turn it off
    turnOffMusic();
}

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

/**
 * Keep music playing in background - prevents auto-pause
 */
function keepMusicAlive() {
    if (musicOn && currentMusic) {
        let currentPlayer = currentMusic === 'music1' ? bgMusic1 : bgMusic2;
        if (currentPlayer && currentPlayer.paused) {
            // If music got paused by browser, restart it
            currentPlayer.play().catch(e => {
                console.log('Background music restarted');
            });
        }
    }
}

// Initialize when page loads
window.onload = function() {
    updateTime();
    setInterval(updateTime, 60000);
    initializeMusic();
    
    // Start background music keeper
    setInterval(keepMusicAlive, 10000); // Check every 10 seconds
};

// Handle page visibility changes - MUSIC CONTINUES IN BACKGROUND
document.addEventListener('visibilitychange', function() {
    if (musicOn && currentMusic) {
        let currentPlayer = currentMusic === 'music1' ? bgMusic1 : bgMusic2;
        if (currentPlayer) {
            if (document.hidden) {
                // Page is in background - DON'T pause, let music continue
                console.log('Music continues playing in background');
                // Ensure music is still playing
                if (currentPlayer.paused) {
                    currentPlayer.play().catch(e => {});
                }
            } else {
                // Page is visible again - ensure music is playing
                if (currentPlayer.paused) {
                    currentPlayer.play().catch(e => {});
                }
            }
        }
    }
});

// Prevent browser from auto-pausing music
window.addEventListener('beforeunload', function() {
    // This helps keep audio context alive
    if (bgMusic1) bgMusic1.load();
    if (bgMusic2) bgMusic2.load();
});

// Additional protection: resume music on any user interaction
document.addEventListener('click', function() {
    if (musicOn && currentMusic) {
        let currentPlayer = currentMusic === 'music1' ? bgMusic1 : bgMusic2;
        if (currentPlayer && currentPlayer.paused) {
            currentPlayer.play().catch(e => {});
        }
    }
});