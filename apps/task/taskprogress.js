// taskprogress.js - Updated with Task 6
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
        },
        'task4_call_dyere': {
            id: 'task4_call_dyere',
            title: 'Call To Dyere',
            description: 'Call Dyere from the phone app to get more information',
            completed: false,
            unlocks: 'Dad contact unlocked & location clue',
            type: 'call'
        },
        'task5_talk_dad': {
            id: 'task5_talk_dad',
            title: 'Talk to Eric\'s Dad',
            description: 'Interview Eric\'s father for family perspective and clues',
            completed: false,
            unlocks: 'Laptop clue and garage evidence',
            type: 'chat'
        },
        'task6_unlock_instashan': {  // ✅ NEW TASK 6
            id: 'task6_unlock_instashan',
            title: 'Unlock Instashan ID',
            description: 'Complete your Instashan profile setup to unlock your unique Instashan ID',
            completed: false,
            unlocks: 'Eric\'s social media evidence access',
            type: 'navigation'
        }
    },

    // Initialize
    init() {
        if (!localStorage.getItem('taskProgress')) {
            this.saveProgress();
        } else {
            this.loadProgress();
        }

        window.addEventListener('storage', (e) => {
            if (e.key === 'taskProgress') {
                this.loadProgress();
                this.notifyChanges();
            }
        });

        window.addEventListener('taskProgressUpdated', (e) => {
            console.log('📢 Task progress updated:', e.detail);
        });

        console.log('✅ Task Progress System Ready - 6 Tasks');
    },

    completeTask(taskId) {
        if (this.tasks[taskId]) {
            this.tasks[taskId].completed = true;
            this.saveProgress();
            this.notifyChanges();

            // Also update gameTasks progress for Task Manager
            this.updateGameTasks(taskId);

            // ✅ AUTOMATICALLY UNLOCK DAD'S CONTACT WHEN TASK 4 COMPLETES
            if (taskId === 'task4_call_dyere') {
                this.unlockDadContact();
            }

            console.log(`✅ Task completed: ${taskId}`);

            // Play completion sound
            this.playCompletionSound();
        }
    },

    // ✅ NEW FUNCTION: Unlock Dad's contact
    unlockDadContact() {
        const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');
        extendedProgress.unlock_dad = true;
        localStorage.setItem('extendedProgress', JSON.stringify(extendedProgress));
        console.log('🔓 Dad\'s contact unlocked via TaskProgress system!');
    },

    updateGameTasks(taskId) {
        const progress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
        progress[taskId] = true;
        localStorage.setItem('taskProgress', JSON.stringify(progress));
        localStorage.setItem('taskProgressUpdate', Date.now());
    },

    isTaskCompleted(taskId) {
        return this.tasks[taskId]?.completed || false;
    },

    getAllTasks() {
        return this.tasks;
    },

    getCompletedCount() {
        return Object.values(this.tasks).filter(task => task.completed).length;
    },

    getTotalCount() {
        return Object.keys(this.tasks).length;
    },

    saveProgress() {
        const progress = {};
        Object.keys(this.tasks).forEach(taskId => {
            progress[taskId] = this.tasks[taskId].completed;
        });
        localStorage.setItem('taskProgress', JSON.stringify(progress));
        localStorage.setItem('lastTaskUpdate', Date.now());
    },

    loadProgress() {
        const progress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
        Object.keys(this.tasks).forEach(taskId => {
            if (progress[taskId] !== undefined) {
                this.tasks[taskId].completed = progress[taskId];
            }
        });
    },

    notifyChanges() {
        const event = new CustomEvent('taskProgressUpdated', {
            detail: { 
                tasks: this.tasks,
                completedCount: this.getCompletedCount()
            }
        });
        window.dispatchEvent(event);

        localStorage.setItem('taskProgressUpdate', Date.now());

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

    playCompletionSound() {
        const taskSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
        taskSound.volume = 0.3;
        taskSound.play().catch(e => {
            console.log('Task sound error:', e);
        });
    },

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

        setTimeout(() => {
            if (popup.parentElement) {
                popup.remove();
            }
        }, 5000);
    },

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