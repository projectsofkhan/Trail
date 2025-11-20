/**
 * Back Button - Closes app tab and returns to home
 */
function initializeBackButton() {
    // Get the back button
    const backButton = document.querySelector('.back-button');
    
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            closeAppAndReturnHome();
        });
    }
    
    // Also support Android back button
    window.addEventListener('popstate', function() {
        closeAppAndReturnHome();
    });

    // Support browser back button
    window.onkeydown = function(e) {
        if (e.key === 'Escape') {
            closeAppAndReturnHome();
        }
    };
}

/**
 * Close app tab and focus home screen
 */
function closeAppAndReturnHome() {
    console.log('🔙 Closing Task Manager and returning to home...');
    
    // Try to focus the home tab first
    if (window.opener && !window.opener.closed) {
        try {
            window.opener.focus();
            console.log('✅ Home tab focused');
        } catch (error) {
            console.log('⚠️ Could not focus home tab');
        }
    }
    
    // Close this app tab
    setTimeout(() => {
        window.close();
    }, 50);
}

/**
 * AUTO-REDIRECT SYSTEM for all apps
 */
function initializeAutoRedirect() {
    window.addEventListener('beforeunload', function() {
        console.log('🔄 Task Manager closing - redirecting to home...');

        if (window.opener && !window.opener.closed) {
            try {
                window.opener.location.href = window.location.origin + '/Trail/';
                console.log('✅ Home tab redirected!');
            } catch (error) {
                console.log('⚠️ Could not redirect, focusing home tab...');
                try {
                    window.opener.focus();
                } catch (focusError) {
                    console.log('❌ Could not focus home tab');
                }
            }
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
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

/**
 * Toggles task completion
 */
function toggleTask(taskElement) {
    const checkbox = taskElement.querySelector('.task-checkbox');
    const taskTitle = taskElement.querySelector('.task-title');
    const taskDescription = taskElement.querySelector('.task-description');

    checkbox.classList.toggle('checked');

    if (checkbox.classList.contains('checked')) {
        taskTitle.style.textDecoration = 'line-through';
        taskTitle.style.opacity = '0.6';
        taskDescription.style.opacity = '0.6';
    } else {
        taskTitle.style.textDecoration = 'none';
        taskTitle.style.opacity = '1';
        taskDescription.style.opacity = '1';
    }
}

/**
 * Shows ad when hint button is clicked
 */
function showAd(event) {
    event.stopPropagation(); // Prevent task toggle

    const adOverlay = document.getElementById('adOverlay');
    const adImage = document.getElementById('adImage');
    const adTimer = document.getElementById('adTimer');
    const seeHintBtn = document.getElementById('seeHintBtn');
    const adText = document.getElementById('adText');

    // Check if all elements exist
    if (!adOverlay || !adImage || !adTimer || !seeHintBtn || !adText) {
        console.error('Ad elements not found');
        return;
    }

    // Randomly choose between ad1.jpg and ad2.png (50-50 chance)
    const randomAd = Math.random() < 0.5 ? 'ad1.jpg' : 'ad2.png';
    adImage.src = randomAd;

    // Set ad text and click behavior based on which ad
    if (randomAd === 'ad1.jpg') {
        adText.textContent = 'Play BlitzRacer Now';
        adImage.onclick = function() {
            window.open('https://blitzracer.github.io/Cargame/', '_blank');
        };
    } else {
        adText.textContent = 'ZeeAi Text To Speech App';
        adImage.onclick = function() {
            window.open('https://projectsofkhan.github.io/zeeAi/', '_blank');
        };
    }

    // Show ad overlay
    adOverlay.style.display = 'flex';
    seeHintBtn.style.display = 'none';
    adText.style.display = 'block';

    // Start 3-second timer
    let seconds = 3;
    const timer = setInterval(() => {
        seconds--;
        adTimer.textContent = `Ad ends in ${seconds}s`;

        if (seconds <= 0) {
            clearInterval(timer);
            // Show "Ad completed!" for 0.5 seconds
            adTimer.textContent = 'Ad completed!';
            setTimeout(() => {
                seeHintBtn.style.display = 'block';
                adTimer.style.display = 'none';
            }, 500);
        }
    }, 1000);
}

/**
 * Shows hint after ad is watched
 */
function showHint() {
    alert('Coming Soon');
    closeAd();
}

/**
 * Closes the ad overlay
 */
function closeAd() {
    const adOverlay = document.getElementById('adOverlay');
    const adTimer = document.getElementById('adTimer');
    const seeHintBtn = document.getElementById('seeHintBtn');
    const adText = document.getElementById('adText');
    const adImage = document.getElementById('adImage');

    if (adOverlay) adOverlay.style.display = 'none';
    if (adTimer) {
        adTimer.style.display = 'block';
        adTimer.textContent = 'Ad ends in 3s';
    }
    if (seeHintBtn) seeHintBtn.style.display = 'none';
    if (adText) adText.style.display = 'none';
    if (adImage) adImage.onclick = null;
}

// Initialize when page loads
window.onload = function() {
    updateTime();
    setInterval(updateTime, 60000);
    initializeBackButton();    // 🆕 Back button navigation
    initializeAutoRedirect();  // 🆕 Auto-redirect system
    
    console.log('📋 Task Manager Ready - Back button closes tab!');
};