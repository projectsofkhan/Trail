// Complete task progression system
const gameTasks = {
    'chat_mr_ray': {
        title: 'Talk to Mr. Ray',
        description: 'Start a conversation with Mr. Ray in Messages app',
        hint: 'Go to Messages app → Click Mr. Ray → Complete the conversation',
        unlocks: ['find_ahmet'] // This task unlocks the next one
    },
    'find_ahmet': {
        title: 'Find Ahmet',
        description: 'Locate Ahmet in your contacts list',
        hint: 'Check your contacts after completing Mr. Ray chat',
        unlocks: ['unlock_secret_photo']
    },
    'unlock_secret_photo': {
        title: 'Discover Secret Photo',
        description: 'Find the hidden photo in Gallery',
        hint: 'Look for new photos in Gallery after finding Ahmet',
        unlocks: [] // No more tasks for now
    }
};

// Track if user has watched hint for each task
let hintWatched = JSON.parse(localStorage.getItem('hintWatched') || '{}');

/**
 * Check if a task should be visible based on progression
 */
function shouldShowTask(taskId) {
    // First task is always visible
    if (taskId === 'chat_mr_ray') return true;
    
    // Check if any previous task that unlocks this one is completed
    for (const [prevTaskId, taskData] of Object.entries(gameTasks)) {
        if (taskData.unlocks && taskData.unlocks.includes(taskId)) {
            if (isTaskCompleted(prevTaskId)) {
                return true;
            }
        }
    }
    
    return false;
}

/**
 * Check if task is completed (with fallback)
 */
function isTaskCompleted(taskId) {
    if (typeof TaskProgress !== 'undefined') {
        return TaskProgress.isTaskCompleted(taskId);
    } else {
        const progress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
        return !!progress[taskId];
    }
}

/**
 * Get all available tasks (based on progression)
 */
function getAvailableTasks() {
    const availableTasks = [];
    
    Object.entries(gameTasks).forEach(([taskId, taskData]) => {
        if (shouldShowTask(taskId)) {
            availableTasks.push({
                id: taskId,
                ...taskData
            });
        }
    });
    
    return availableTasks;
}

/**
 * Load and display available tasks
 */
function loadRealTasks() {
    const taskList = document.getElementById('taskList');
    const hintBox = document.getElementById('hintBox');
    
    if (!taskList) return;

    taskList.innerHTML = '';

    const availableTasks = getAvailableTasks();
    
    if (availableTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                No tasks available yet. Complete previous objectives to unlock new tasks.
            </div>
        `;
        return;
    }

    availableTasks.forEach(task => {
        const isCompleted = isTaskCompleted(task.id);
        const hasWatchedHint = hintWatched[task.id];

        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${isCompleted ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <div class="task-status ${isCompleted ? 'completed' : 'pending'}">
                ${isCompleted ? '✓' : '!'}
            </div>
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
            </div>
            ${!isCompleted ? `
                <button class="hint-button" onclick="handleHint('${task.id}', event)">
                    ${hasWatchedHint ? 'Hint' : 'Get Hint'}
                </button>
            ` : ''}
        `;

        taskList.appendChild(taskElement);
    });

    // Show hint box if any task has watched hint
    showHintForWatchedTask();
}

/**
 * Handle hint button click
 */
function handleHint(taskId, event) {
    event.stopPropagation();
    
    const taskData = gameTasks[taskId];
    if (!taskData) return;

    // If user already watched hint, show it directly
    if (hintWatched[taskId]) {
        showDirectHint(taskData.hint);
    } else {
        // Show ad to get hint
        showAd(taskId);
    }
}

/**
 * Show hint directly (after watching ad)
 */
function showDirectHint(hintText) {
    const hintBox = document.getElementById('hintBox');
    const hintContent = hintBox.querySelector('.hint-content');
    
    if (hintBox && hintContent) {
        hintContent.innerHTML = `<strong>Hint:</strong> ${hintText}`;
        hintBox.style.display = 'block';
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            hintBox.style.display = 'none';
        }, 8000);
    }
}

/**
 * Show hint for any task that has been watched
 */
function showHintForWatchedTask() {
    const hintBox = document.getElementById('hintBox');
    const hintContent = hintBox.querySelector('.hint-content');
    
    // Find first unwatched task that has a hint
    const availableTasks = getAvailableTasks();
    for (const task of availableTasks) {
        if (hintWatched[task.id] && !isTaskCompleted(task.id)) {
            hintContent.innerHTML = `<strong>Hint:</strong> ${task.hint}`;
            hintBox.style.display = 'block';
            return;
        }
    }
    
    // Hide hint box if no hints to show
    hintBox.style.display = 'none';
}

/**
 * Mark hint as watched for a task
 */
function markHintAsWatched(taskId) {
    hintWatched[taskId] = true;
    localStorage.setItem('hintWatched', JSON.stringify(hintWatched));
}

/**
 * Shows ad when hint button is clicked
 */
function showAd(taskId) {
    const adOverlay = document.getElementById('adOverlay');
    const adImage = document.getElementById('adImage');
    const adTimer = document.getElementById('adTimer');
    const seeHintBtn = document.getElementById('seeHintBtn');
    const adText = document.getElementById('adText');

    if (!adOverlay || !adImage || !adTimer || !seeHintBtn || !adText) {
        console.error('Ad elements not found');
        return;
    }

    // Store task ID for hint
    seeHintBtn.setAttribute('data-taskid', taskId);

    const randomAd = Math.random() < 0.5 ? 'ad1.jpg' : 'ad2.png';
    adImage.src = randomAd;

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

    adOverlay.style.display = 'flex';
    seeHintBtn.style.display = 'none';
    adText.style.display = 'block';

    let seconds = 3;
    const timer = setInterval(() => {
        seconds--;
        adTimer.textContent = `Ad ends in ${seconds}s`;

        if (seconds <= 0) {
            clearInterval(timer);
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
    const seeHintBtn = document.getElementById('seeHintBtn');
    const taskId = seeHintBtn.getAttribute('data-taskid');
    const taskData = gameTasks[taskId];
    
    if (taskData) {
        // Mark hint as watched
        markHintAsWatched(taskId);
        
        // Show hint directly
        showDirectHint(taskData.hint);
        
        // Reload tasks to update button text
        loadRealTasks();
    }
    
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

/**
 * Back Button - Closes app tab and returns to home
 */
function initializeBackButton() {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            closeAppAndReturnHome();
        });
    }

    window.addEventListener('popstate', function() {
        closeAppAndReturnHome();
    });

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
    if (window.opener && !window.opener.closed) {
        try {
            window.opener.focus();
            console.log('✅ Home tab focused');
        } catch (error) {
            console.log('⚠️ Could not focus home tab');
        }
    }
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
 * Listen for task progress updates
 */
function initializeTaskListener() {
    window.addEventListener('taskProgressUpdated', function() {
        console.log('🔄 Task progress updated - refreshing display');
        loadRealTasks();
    });

    // Also listen for localStorage changes
    window.addEventListener('storage', function(e) {
        if (e.key === 'taskProgress' || e.key === 'taskProgressUpdate') {
            console.log('🔄 Storage change detected - refreshing tasks');
            loadRealTasks();
        }
    });

    // Refresh tasks every 2 seconds to catch progression
    setInterval(loadRealTasks, 2000);
}

// Initialize when page loads
window.onload = function() {
    updateTime();
    setInterval(updateTime, 60000);
    initializeBackButton();
    initializeAutoRedirect();
    loadRealTasks();
    initializeTaskListener();

    console.log('📋 Task Manager Ready - Fixed layout and task progression!');
};