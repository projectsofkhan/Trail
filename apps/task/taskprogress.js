// taskprogress.js - Central Task Progress System
const TaskProgress = {
    // Task definitions
    tasks: {
        'chat_mr_ray': {
            id: 'chat_mr_ray',
            title: 'Chat with Mr. Ray',
            description: 'Talk to Mr. Ray to get information about Eric',
            completed: false,
            unlocks: 'Sahil contact'
        }
        // Add more tasks here later
    },

    // Initialize
    init() {
        if (!localStorage.getItem('taskProgress')) {
            this.saveProgress();
        } else {
            this.loadProgress();
        }
        
        // Listen for storage changes (cross-tab communication)
        window.addEventListener('storage', (e) => {
            if (e.key === 'taskProgress') {
                this.loadProgress();
                this.notifyChanges();
            }
        });
    },

    // Complete a task
    completeTask(taskId) {
        if (this.tasks[taskId]) {
            this.tasks[taskId].completed = true;
            this.saveProgress();
            this.notifyChanges();
            this.showTaskCompletePopup(taskId);
            console.log(`✅ Task completed: ${taskId}`);
        }
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
        localStorage.setItem('lastUpdate', Date.now()); // Trigger storage event
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
            detail: { tasks: this.tasks }
        });
        window.dispatchEvent(event);
        
        // Also trigger storage event for cross-tab communication
        localStorage.setItem('taskProgressUpdate', Date.now());
    },

    // Show completion popup
    showTaskCompletePopup(taskId) {
        if (taskId === 'chat_mr_ray') {
            const popup = document.createElement('div');
            popup.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;

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
                        <div style="font-size: 1.1rem; font-weight: 500; margin-bottom: 5px;">Chat with Mr. Ray</div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">Completed Successfully</div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.15); padding: 12px; border-radius: 10px; margin: 15px 0;">
                        <div style="font-size: 1.8rem; margin-right: 10px;">🔓</div>
                        <div style="text-align: left;">
                            <div style="font-size: 0.9rem; font-weight: 500;">New Contact Unlocked!</div>
                            <div style="font-size: 0.8rem; opacity: 0.9;">Sahil is now available</div>
                        </div>
                    </div>
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
            `;

            document.body.appendChild(popup);
            setTimeout(() => popup.remove(), 5000);
        }
    }
};

// Initialize
TaskProgress.init();

// Make it global
window.TaskProgress = TaskProgress;