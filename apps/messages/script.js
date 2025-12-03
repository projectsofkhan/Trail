// Updated contacts data - All contacts visible but most locked
const contacts = [
    { name: 'Mr. Ray', avatar: '👨‍💼', lastMessage: 'Eric Where are you?', time: '10:30 AM', unread: 1 },
    { name: 'Dyere', avatar: '👨‍🔧', lastMessage: 'The repair is done', time: 'Yesterday', unread: 0 },
    { name: 'Sahil', avatar: '👨‍🎓', lastMessage: 'Hey Eric Come where are you?', time: 'Yesterday', unread: 0 },
    { name: 'Mom', avatar: '👩', lastMessage: 'Hey come home son.', time: '11/15/23', unread: 0 },
    { name: 'Sister', avatar: '👧', lastMessage: 'Hey bro we are missing you where are you?', time: '11/14/23', unread: 0 },
    { name: 'Feisher', avatar: '👨‍💻', lastMessage: 'Code review done', time: '11/13/23', unread: 0 },
    { name: 'Dad', avatar: '👨', lastMessage: 'Dinner at 7', time: '11/12/23', unread: 0 },
    { name: 'Layari', avatar: '👩‍🎨', lastMessage: 'Design ready', time: '11/11/23', unread: 0 },
    { name: 'Dan', avatar: '👨‍💼', lastMessage: 'Project launch', time: '11/10/23', unread: 0 },
    { name: 'Falco', avatar: '👨‍✈️', lastMessage: 'Flight confirmed', time: '11/09/23', unread: 0 }
];

// ========== TASK PROGRESSION SYSTEM ==========
const TaskProgress2 = {
    init() {
        if (!localStorage.getItem('taskProgress')) {
            localStorage.setItem('taskProgress', JSON.stringify({}));
        }
        // Initialize extended progress for additional unlocks
        if (!localStorage.getItem('extendedProgress')) {
            localStorage.setItem('extendedProgress', JSON.stringify({
                unlock_dyere: false,
                unlock_dad: false
            }));
        }
    },

    completeTask(taskId) {
        const progress = this.getProgress();
        progress[taskId] = true;
        localStorage.setItem('taskProgress', JSON.stringify(progress));
        
        // Check for chain unlocks
        this.checkUnlocks(taskId);
        
        this.showTaskCompletePopup(taskId);
        console.log(`✅ Task completed: ${taskId}`);
    },

    // Check for additional unlocks based on task completion
    checkUnlocks(taskId) {
        const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');
        
        // If "chat_dyere" task is completed (Task 4), unlock Dad
        if (taskId === 'chat_dyere') {
            extendedProgress.unlock_dad = true;
            localStorage.setItem('extendedProgress', JSON.stringify(extendedProgress));
            console.log('🔓 Dad contact unlocked!');
        }
        
        // If "chat_sahil" task is completed, unlock Dyere
        if (taskId === 'chat_sahil') {
            extendedProgress.unlock_dyere = true;
            localStorage.setItem('extendedProgress', JSON.stringify(extendedProgress));
            console.log('🔓 Dyere contact unlocked!');
        }
    },

    isTaskCompleted(taskId) {
        const progress = this.getProgress();
        return !!progress[taskId];
    },

    getProgress() {
        return JSON.parse(localStorage.getItem('taskProgress') || '{}');
    },

    showTaskCompletePopup(taskId) {
        if (taskId === 'chat_mr_ray') {
            // Create beautiful popup for Mr. Ray completion
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
                        transition: all 0.2s ease;
                    ">Continue</button>
                </div>
                
                <style>
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { 
                            opacity: 0;
                            transform: translateY(30px) scale(0.9);
                        }
                        to { 
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                </style>
            `;

            document.body.appendChild(popup);
        }
        // Add popup for Dyere completion (Task 4)
        else if (taskId === 'chat_dyere') {
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
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 30px;
                    border-radius: 20px;
                    text-align: center;
                    max-width: 300px;
                    margin: 20px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    animation: slideUp 0.5s ease;
                ">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🎯</div>
                    <h3 style="margin: 0 0 10px 0; font-size: 1.4rem; font-weight: 600;">Task 4 Completed!</h3>
                    <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 12px; margin: 15px 0;">
                        <div style="font-size: 1.1rem; font-weight: 500; margin-bottom: 5px;">Chat with Dyere</div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">You've completed the repair task</div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.15); padding: 12px; border-radius: 10px; margin: 15px 0;">
                        <div style="font-size: 1.8rem; margin-right: 10px;">🔓</div>
                        <div style="text-align: left;">
                            <div style="font-size: 0.9rem; font-weight: 500;">Family Contact Unlocked!</div>
                            <div style="font-size: 0.8rem; opacity: 0.9;">Dad is now available</div>
                        </div>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove(); window.location.reload();" style="
                        background: white;
                        color: #667eea;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 25px;
                        font-weight: 600;
                        font-size: 1rem;
                        cursor: pointer;
                        margin-top: 10px;
                        transition: all 0.2s ease;
                    ">Continue</button>
                </div>
                
                <style>
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { 
                            opacity: 0;
                            transform: translateY(30px) scale(0.9);
                        }
                        to { 
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                </style>
            `;

            document.body.appendChild(popup);
        }
    }
};

// Initialize task system when the app loads
TaskProgress2.init();

// Format contact name for URL
function formatContactName(contactName) {
    if (contactName === 'Mr. Ray') return 'misterray';
    return contactName.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Smart chat navigation - checks task progress
function openChat(contactName) {
    const formattedName = formatContactName(contactName);
    const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');

    // Only Mr. Ray is always unlocked
    if (contactName === 'Mr. Ray') {
        const realUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/index.html`;
        console.log(`🔓 Mr. Ray chat - redirecting to: ${realUrl}`);
        window.location.href = realUrl;
    } 
    // Sahil requires Mr. Ray task completion
    else if (contactName === 'Sahil') {
        if (TaskProgress2.isTaskCompleted('chat_mr_ray')) {
            const realUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/index.html`;
            console.log(`🔓 Sahil chat unlocked - redirecting to: ${realUrl}`);
            window.location.href = realUrl;
        } else {
            const lockedUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/locked.html`;
            console.log(`🔒 Sahil chat locked - redirecting to: ${lockedUrl}`);
            window.location.href = lockedUrl;
        }
    }
    // Dyere requires Sahil task completion
    else if (contactName === 'Dyere') {
        if (extendedProgress.unlock_dyere || TaskProgress2.isTaskCompleted('chat_sahil')) {
            const realUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/index.html`;
            console.log(`🔓 Dyere chat unlocked - redirecting to: ${realUrl}`);
            window.location.href = realUrl;
        } else {
            const lockedUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/locked.html`;
            console.log(`🔒 Dyere chat locked - redirecting to: ${lockedUrl}`);
            window.location.href = lockedUrl;
        }
    }
    // ✅ Dad requires Dyere task completion (Task 4)
    else if (contactName === 'Dad') {
        if (extendedProgress.unlock_dad || TaskProgress2.isTaskCompleted('chat_dyere')) {
            const realUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/index.html`;
            console.log(`🔓 Dad chat unlocked - redirecting to: ${realUrl}`);
            window.location.href = realUrl;
        } else {
            const lockedUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/locked.html`;
            console.log(`🔒 Dad chat locked - redirecting to: ${lockedUrl}`);
            window.location.href = lockedUrl;
        }
    }
    // All other contacts are locked for now
    else {
        const lockedUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/locked.html`;
        console.log(`🔒 ${contactName} chat locked - redirecting to: ${lockedUrl}`);
        window.location.href = lockedUrl;
    }
}

// ========== CONTACT RENDERING FUNCTIONS ==========

// Render contacts - All visible, no lock icons
function renderContacts(filter = '') {
    const contactsList = document.getElementById('contactsList');
    if (!contactsList) {
        console.error('❌ contactsList element not found!');
        return;
    }

    contactsList.innerHTML = '';

    const filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    filteredContacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-item';
        contactElement.onclick = () => openChat(contact.name);

        contactElement.innerHTML = `
            <div class="contact-avatar">${contact.avatar}</div>
            <div class="contact-info">
                <div class="contact-name">${contact.name}</div>
                <div class="contact-last-message">${contact.lastMessage}</div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end;">
                <div class="message-time">${contact.time}</div>
                ${contact.unread > 0 ? `<div class="unread-badge">${contact.unread}</div>` : ''}
            </div>
        `;

        contactsList.appendChild(contactElement);
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const currentTimeElement = document.getElementById('current-time');
    const contactsList = document.getElementById('contactsList');
    const searchInput = document.getElementById('searchInput');

    // Update time
    function updateTime() {
        if (currentTimeElement) {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            currentTimeElement.textContent = `${hours}:${minutes}`;
        }
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            renderContacts(this.value);
        });
    }

    // Initialize everything
    updateTime();
    renderContacts();
    setInterval(updateTime, 60000);

    console.log('💬 Messages App Ready - Contacts rendered!');
});

// Make functions global
window.openChat = openChat;