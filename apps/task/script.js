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
    
    // Randomly choose between ad1.jpg and ad2.png (50-50 chance)
    const randomAd = Math.random() < 0.5 ? 'ad1.jpg' : 'ad2.png';
    adImage.src = randomAd;
    
    // Set ad text and click behavior based on which ad
    if (randomAd === 'ad1.jpg') {
        adText.textContent = 'Play BlitzRacer Now';
        adText.style.display = 'block';
        adImage.onclick = function() {
            window.open('https://blitzracer.github.io/Cargame/', '_blank');
        };
    } else {
        adText.textContent = 'ZeeAi Text To Speech App';
        adText.style.display = 'block';
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
    
    adOverlay.style.display = 'none';
    adTimer.style.display = 'block';
    seeHintBtn.style.display = 'none';
    adText.style.display = 'none';
    adTimer.textContent = 'Ad ends in 3s';
    
    // Reset image click handler
    const adImage = document.getElementById('adImage');
    adImage.onclick = null;
}

// Initialize when page loads
window.onload = function() {
    updateTime();
    setInterval(updateTime, 60000);
};