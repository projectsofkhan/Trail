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

// ========== HELPER FUNCTIONS ==========

// Format contact name for URL - FIXED VERSION
function formatContactName(contactName) {
    if (contactName === 'Mr. Ray') return 'misterray';
    if (contactName === 'Dad') return 'dad';
    if (contactName === 'Sahil') return 'sahil';
    if (contactName === 'Dyere') return 'dyere';
    // For other contacts
    return contactName.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Smart chat navigation - checks task progress
function openChat(contactName) {
    const formattedName = formatContactName(contactName);
    const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');

    console.log(`🔍 Opening chat for: ${contactName}`);
    console.log(`🔍 Formatted name: ${formattedName}`);
    console.log(`🔍 Dad unlocked?`, extendedProgress.unlock_dad);
    console.log(`🔍 chat_dyere completed?`, TaskProgress2.isTaskCompleted('chat_dyere'));

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
        // FIXED: Check both conditions properly
        if (extendedProgress.unlock_dad === true || TaskProgress2.isTaskCompleted('chat_dyere')) {
            const realUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/index.html`;
            console.log(`🎯 DAD UNLOCKED! Redirecting to: ${realUrl}`);
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

// Add this debug function to check current state
function checkDadStatus() {
    const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');
    console.log('=== DAD STATUS CHECK ===');
    console.log('extendedProgress:', extendedProgress);
    console.log('unlock_dad:', extendedProgress.unlock_dad);
    console.log('Type of unlock_dad:', typeof extendedProgress.unlock_dad);
    console.log('chat_dyere completed:', TaskProgress2.isTaskCompleted('chat_dyere'));
    console.log('Task progress:', TaskProgress2.getProgress());
}

// Back button functionality
function initializeBackButton() {
    const backButton = document.querySelector('.back-button');
    
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔙 Back button clicked - closing app...');
            
            // Try to focus home tab
            if (window.opener && !window.opener.closed) {
                try {
                    window.opener.focus();
                } catch (error) {
                    console.log('⚠️ Could not focus home tab');
                }
            }
            
            // Close this tab
            setTimeout(() => {
                window.close();
            }, 100);
        });
    }
}

// Auto-redirect system
function initializeAutoRedirect() {
    window.addEventListener('beforeunload', function() {
        console.log('🔄 Messages closing - redirecting to home...');
        
        if (window.opener && !window.opener.closed) {
            try {
                window.opener.location.href = window.location.origin + '/Trail/';
            } catch (error) {
                console.log('⚠️ Could not redirect home');
            }
        }
    });
}

// Render contacts function
function renderContacts(filter = '') {
    const contactsList = document.getElementById('contactsList');
    if (!contactsList) {
        console.error('❌ contactsList element not found!');
        return;
    }
    
    contactsList.innerHTML = '';
    
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    filteredContacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-item';
        contactElement.onclick = () => {
            console.log(`📱 Clicked contact: ${contact.name}`);
            openChat(contact.name);
        };
        
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

// ========== INITIALIZATION ==========

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize task system
    TaskProgress2.init();
    
    // Initialize UI
    const currentTimeElement = document.getElementById('current-time');
    const searchInput = document.getElementById('searchInput');
    
    // Update time
    if (currentTimeElement) {
        function updateTime() {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            currentTimeElement.textContent = `${hours}:${minutes}`;
        }
        updateTime();
        setInterval(updateTime, 60000);
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            renderContacts(this.value);
        });
    }
    
    // Render contacts
    renderContacts();
    
    // Initialize back button
    initializeBackButton();
    
    // Initialize auto-redirect
    initializeAutoRedirect();
    
    console.log('💬 Messages App Ready!');
    checkDadStatus(); // Debug: Check Dad status on load
});

// Make functions global
window.openChat = openChat;
window.checkDadStatus = checkDadStatus;
window.TaskProgress2 = TaskProgress2;