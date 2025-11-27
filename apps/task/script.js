// Complete task progression system
const gameTasks = {
    'chat_mr_ray': {
        title: 'Talk to Mr. Ray',
        description: 'Start a conversation with Mr.Ray and know about Eric, his friend, and him.',
        hint: 'Go to Messages app → Click on Mr. Ray → Complete all conversation steps',
        unlocks: ['talk_sahil']
    },
    'talk_sahil': {
        title: 'Talk to Sahil',
        description: 'Now Talk To Sahil Eric\'s close friend.',
        hint: 'Go to Messages app → Click On Sahil → Complete All Conversation.',
        unlocks: ['unlock_dyere'] // No more tasks for now
    }
};

let hintWatched = JSON.parse(localStorage.getItem('hintWatched') || '{}');

// Short helper functions
function isTaskCompleted(taskId) {
    if (typeof TaskProgress !== 'undefined') {
        return TaskProgress.isTaskCompleted(taskId);
    }
    const progress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
    return !!progress[taskId];
}

function shouldShowTask(taskId) {
    if (taskId === 'chat_mr_ray') return true;
    for (const [prevTaskId, taskData] of Object.entries(gameTasks)) {
        if (taskData.unlocks && taskData.unlocks.includes(taskId)) {
            if (isTaskCompleted(prevTaskId)) return true;
        }
    }
    return false;
}

function getAvailableTasks() {
    return Object.entries(gameTasks)
        .filter(([taskId]) => shouldShowTask(taskId))
        .map(([taskId, taskData]) => ({ id: taskId, ...taskData }));
}

// Main task loading
function loadRealTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;

    const availableTasks = getAvailableTasks();
    
    taskList.innerHTML = availableTasks.length === 0 ? `
        <div class="empty-state">No tasks available. Complete previous objectives.</div>
    ` : '';

    availableTasks.forEach(task => {
        const completed = isTaskCompleted(task.id);
        const watchedHint = hintWatched[task.id];

        const taskElement = document.createElement('div');
        taskElement.className = `compact-task-item ${completed ? 'completed' : ''}`;
        taskElement.onclick = () => showTaskDetails(task);
        taskElement.innerHTML = `
            <div class="compact-task-status ${completed ? 'completed' : 'pending'}">
                ${completed ? '✓' : '!'}
            </div>
            <div class="compact-task-content">
                <div class="compact-task-title">${task.title}</div>
                <div class="compact-task-description">${task.description}</div>
            </div>
            ${!completed ? `
                <button class="compact-hint-button" onclick="handleHint('${task.id}', event)">
                    ${watchedHint ? 'Hint' : 'Get Hint'}
                </button>
            ` : ''}
        `;
        taskList.appendChild(taskElement);
    });

    showHintForWatchedTask();
}

// Task details modal
function showTaskDetails(task) {
    const overlay = document.getElementById('taskDetailsOverlay');
    const title = document.getElementById('taskDetailsTitle');
    const description = document.getElementById('taskDetailsDescription');
    const hintSection = document.getElementById('taskDetailsHintSection');
    const hintText = document.getElementById('taskDetailsHint');

    if (overlay && title && description) {
        title.textContent = task.title;
        description.textContent = task.description;
        
        if (hintWatched[task.id] && !isTaskCompleted(task.id)) {
            hintText.textContent = task.hint;
            hintSection.style.display = 'block';
        } else {
            hintSection.style.display = 'none';
        }
        
        overlay.style.display = 'flex';
    }
}

function closeTaskDetails() {
    const overlay = document.getElementById('taskDetailsOverlay');
    if (overlay) overlay.style.display = 'none';
}

// Hint system
function handleHint(taskId, event) {
    event.stopPropagation();
    const task = gameTasks[taskId];
    if (!task) return;

    hintWatched[taskId] ? showDirectHint(task.hint) : showAd(taskId);
}

function showDirectHint(hint) {
    const hintBox = document.getElementById('hintBox');
    const hintContent = hintBox.querySelector('.hint-content');
    if (hintBox && hintContent) {
        hintContent.innerHTML = `<strong>Hint:</strong> ${hint}`;
        hintBox.style.display = 'block';
        setTimeout(() => hintBox.style.display = 'none', 8000);
    }
}

function showHintForWatchedTask() {
    const hintBox = document.getElementById('hintBox');
    const hintContent = hintBox.querySelector('.hint-content');
    const task = getAvailableTasks().find(t => hintWatched[t.id] && !isTaskCompleted(t.id));
    
    if (task && hintBox && hintContent) {
        hintContent.innerHTML = `<strong>Hint:</strong> ${task.hint}`;
        hintBox.style.display = 'block';
    } else if (hintBox) {
        hintBox.style.display = 'none';
    }
}

function markHintAsWatched(taskId) {
    hintWatched[taskId] = true;
    localStorage.setItem('hintWatched', JSON.stringify(hintWatched));
}

// Ad system
function showAd(taskId) {
    const elements = ['adOverlay', 'adImage', 'adTimer', 'seeHintBtn', 'adText']
        .map(id => document.getElementById(id));
    
    if (elements.some(el => !el)) return;

    const [overlay, image, timer, hintBtn, text] = elements;
    hintBtn.setAttribute('data-taskid', taskId);

    const randomAd = Math.random() < 0.5 ? 'ad1.jpg' : 'ad2.png';
    image.src = randomAd;

    if (randomAd === 'ad1.jpg') {
        text.textContent = 'Play BlitzRacer Now';
        image.onclick = () => window.open('https://blitzracer.github.io/Cargame/', '_blank');
    } else {
        text.textContent = 'ZeeAi Text To Speech App';
        image.onclick = () => window.open('https://projectsofkhan.github.io/zeeAi/', '_blank');
    }

    overlay.style.display = 'flex';
    hintBtn.style.display = 'none';
    text.style.display = 'block';

    let seconds = 3;
    const countdown = setInterval(() => {
        seconds--;
        timer.textContent = `Ad ends in ${seconds}s`;
        if (seconds <= 0) {
            clearInterval(countdown);
            timer.textContent = 'Ad completed!';
            setTimeout(() => {
                hintBtn.style.display = 'block';
                timer.style.display = 'none';
            }, 500);
        }
    }, 1000);
}

function showHint() {
    const hintBtn = document.getElementById('seeHintBtn');
    const taskId = hintBtn.getAttribute('data-taskid');
    const task = gameTasks[taskId];
    
    if (task) {
        markHintAsWatched(taskId);
        showDirectHint(task.hint);
        loadRealTasks();
    }
    closeAd();
}

function closeAd() {
    const elements = ['adOverlay', 'adTimer', 'seeHintBtn', 'adText', 'adImage']
        .map(id => document.getElementById(id));
    
    const [overlay, timer, hintBtn, text, image] = elements;
    
    if (overlay) overlay.style.display = 'none';
    if (timer) {
        timer.style.display = 'block';
        timer.textContent = 'Ad ends in 3s';
    }
    if (hintBtn) hintBtn.style.display = 'none';
    if (text) text.style.display = 'none';
    if (image) image.onclick = null;
}

// App functionality
function initializeBackButton() {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeAppAndReturnHome();
        });
    }

    window.addEventListener('popstate', closeAppAndReturnHome);
    window.onkeydown = (e) => e.key === 'Escape' && closeAppAndReturnHome();
}

function closeAppAndReturnHome() {
    console.log('🔙 Closing Task Manager...');
    if (window.opener && !window.opener.closed) {
        try {
            window.opener.focus();
        } catch (error) {
            console.log('⚠️ Could not focus home tab');
        }
    }
    setTimeout(() => window.close(), 50);
}

function initializeAutoRedirect() {
    window.addEventListener('beforeunload', () => {
        if (window.opener && !window.opener.closed) {
            try {
                window.opener.location.href = window.location.origin + '/Trail/';
            } catch (error) {
                try {
                    window.opener.focus();
                } catch (focusError) {
                    console.log('❌ Could not focus home tab');
                }
            }
        }
    });
}

function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

function initializeTaskListener() {
    window.addEventListener('taskProgressUpdated', loadRealTasks);
    window.addEventListener('storage', (e) => {
        if (e.key === 'taskProgress' || e.key === 'taskProgressUpdate') {
            loadRealTasks();
        }
    });
    setInterval(loadRealTasks, 2000);
}

// Initialize app
window.onload = function() {
    updateTime();
    setInterval(updateTime, 60000);
    initializeBackButton();
    initializeAutoRedirect();
    loadRealTasks();
    initializeTaskListener();
    console.log('📋 Task Manager Ready - Compact design with details modal!');
};