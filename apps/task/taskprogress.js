// taskprogress.js - Updated to match Task Manager
const TaskProgress = {
    // Task definitions - EXACTLY MATCHING TASK MANAGER
    tasks: {
        'chat_mr_ray': {
            id: 'chat_mr_ray',
            title: 'Talk to Mr. Ray',
            description: 'Start a conversation with Mr.Ray and know about Eric, his friend, and him.',
            completed: false,
            unlocks: 'Sahil contact',
            type: 'chat'
        },
        'talk_sahil': {
            id: 'talk_sahil',
            title: 'Talk to Sahil',
            description: "Now Talk To Sahil Eric's close friend.",
            completed: false,
            unlocks: 'Dyere contact',
            type: 'chat'
        },
        'investigate_dyere': {
            id: 'investigate_dyere',
            title: 'Investigate Dyere',
            description: 'Question the car repair guy who was close to Eric',
            completed: false,
            unlocks: 'Important clue about Eric',
            type: 'chat'
        }
    },

    // Initialize
    init() {
        if (!localStorage.getItem('taskProgress')) {
            this.saveProgress();
        } else {
            this.loadProgress();
        }

        // Listen for storage changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'taskProgress') {
                this.loadProgress();
                this.notifyChanges();
            }
        });

        // Listen for custom events
        window.addEventListener('taskProgressUpdated', (e) => {
            console.log('📢 Task progress updated:', e.detail);
        });

        console.log('✅ Task Progress System Ready');
    },

    // Complete a task
    completeTask(taskId) {
        if (this.tasks[taskId]) {
            this.tasks[taskId].completed = true;
            this.saveProgress();
            this.notifyChanges();
            
            // Also update gameTasks progress for Task Manager
            this.updateGameTasks(taskId);
            
            console.log(`✅ Task completed: ${taskId}`);
            
            // Play completion sound
            this.playCompletionSound();
        }
    },

    // Update gameTasks progress (for Task Manager)
    updateGameTasks(taskId) {
        const progress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
        progress[taskId] = true;
        localStorage.setItem('taskProgress', JSON.stringify(progress));
        
        // Trigger storage event for Task Manager
        localStorage.setItem('taskProgressUpdate', Date.now());
    },

    // Check if task is completed
    isTaskCompleted(taskId) {
        return this.tasks[taskId]?.completed || false;
    },

    // Get all tasks
    getAllTasks() {
        return this.tasks;
    },

    // Get completed tasks count
    getCompletedCount() {
        return Object.values(this.tasks).filter(task => task.completed).length;
    },

    // Get total tasks count
    getTotalCount() {
        return Object.keys(this.tasks).length;
    },

    // Save progress to localStorage
    saveProgress() {
        const progress = {};
        Object.keys(this.tasks).forEach(taskId => {
            progress[taskId] = this.tasks[taskId].completed;
        });
        localStorage.setItem('taskProgress', JSON.stringify(progress));
        localStorage.setItem('lastTaskUpdate', Date.now());
    },

    // Load progress from localStorage
    loadProgress() {
        const progress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
        Object.keys(this.tasks).forEach(taskId => {
            if (progress[taskId] !== undefined) {
                this.tasks[taskId].completed = progress[taskId];
            }
        });
    },

    // Notify all apps about changes
    notifyChanges() {
        // Dispatch custom event
        const event = new CustomEvent('taskProgressUpdated', {
            detail: { 
                tasks: this.tasks,
                completedCount: this.getCompletedCount()
            }
        });
        window.dispatchEvent(event);

        // Trigger storage event
        localStorage.setItem('taskProgressUpdate', Date.now());

        // Notify Task Manager if it's the opener
        if (window.opener && !window.opener.closed) {
            try {
                window.opener.postMessage({
                    type: 'TASK_COMPLETED',
                    taskId: Object.keys(this.tasks).find(id => !this.tasks[id].completed) || ''
                }, '*');
            } catch (e) {
                console.log('⚠️ Could not notify Task Manager');
            }
        }
    },

    // Play completion sound
    playCompletionSound() {
        const taskSound = new Audio('https://projectsofkhan.github.io/Trail/apps/task/task.mp3');
        taskSound.volume = 0.6;
        taskSound.play().catch(e => {
            console.log('Task sound error:', e);
        });
    },

    // Show completion popup
    showTaskCompletePopup(taskId) {
        const task = this.tasks[taskId];
        if (!task) return;

        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        let unlockContent = '';
        if (task.unlocks) {
            unlockContent = `
                <div style="display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.15); padding: 12px; border-radius: 10px; margin: 15px 0;">
                    <div style="font-size: 1.8rem; margin-right: 10px;">🔓</div>
                    <div style="text-align: left;">
                        <div style="font-size: 0.9rem; font-weight: 500;">Unlocked!</div>
                        <div style="font-size: 0.8rem; opacity: 0.9;">${task.unlocks}</div>
                    </div>
                </div>
            `;
        }

        popup.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #128C7E, #25D366);
                color: white;
                padding: 30px;
                border-radius: 20px;
                text-align: center;
                max-width: 280px;
                margin: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: slideUp 0.5s ease;
            ">
                <div style="font-size: 3rem; margin-bottom: 15px;">🎉</div>
                <h3 style="margin: 0 0 10px 0; font-size: 1.4rem; font-weight: 600;">Task Completed!</h3>
                <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 12px; margin: 15px 0;">
                    <div style="font-size: 1.1rem; font-weight: 500; margin-bottom: 5px;">${task.title}</div>
                    <div style="font-size: 0.9rem; opacity: 0.9;">${task.description}</div>
                </div>
                ${unlockContent}
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: white;
                    color: #128C7E;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    margin-top: 10px;
                ">Continue</button>
            </div>
            
            <style>
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px) scale(0.9); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            </style>
        `;

        document.body.appendChild(popup);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (popup.parentElement) {
                popup.remove();
            }
        }, 5000);
    },

    // Reset all progress
    resetAllProgress() {
        Object.keys(this.tasks).forEach(taskId => {
            this.tasks[taskId].completed = false;
        });
        this.saveProgress();
        this.notifyChanges();
        console.log('🔄 All task progress reset');
    }
};

// Initialize
TaskProgress.init();

// Make it global
window.TaskProgress = TaskProgress;

// Message listener
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'TASK_COMPLETED') {
        const { taskId } = event.data;
        if (taskId) {
            TaskProgress.completeTask(taskId);
        }
    }
});