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
    },

    completeTask(taskId) {
        const progress = this.getProgress();
        progress[taskId] = true;
        localStorage.setItem('taskProgress', JSON.stringify(progress));
        this.showTaskCompletePopup(taskId);
        console.log(`✅ Task completed: ${taskId}`);
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
            // Create beautiful popup
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

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (popup.parentElement) {
                    popup.remove();
                }
            }, 5000);
        }
    }
};

// Initialize task system
TaskProgress.init();

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
    console.log('🔙 Closing Messages and returning to home...');

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
        console.log('🔄 Messages closing - redirecting to home...');

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

// Format contact name for URL
function formatContactName(contactName) {
    if (contactName === 'Mr. Ray') return 'misterray';
    return contactName.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Smart chat navigation - checks task progress
function openChat(contactName) {
    const formattedName = formatContactName(contactName);
    
    // Only Mr. Ray is always unlocked
    if (contactName === 'Mr. Ray') {
        // Mr. Ray always goes to real chat
        const realUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/index.html`;
        console.log(`🔓 Mr. Ray chat - redirecting to: ${realUrl}`);
        window.location.href = realUrl;
    } 
    // Sahil requires Mr. Ray task completion
    else if (contactName === 'Sahil') {
        if (TaskProgress.isTaskCompleted('chat_mr_ray')) {
            // Task completed - go to real chat
            const realUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/index.html`;
            console.log(`🔓 Sahil chat unlocked - redirecting to: ${realUrl}`);
            window.location.href = realUrl;
        } else {
            // Task not completed - go to individual locked page
            const lockedUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/locked.html`;
            console.log(`🔒 Sahil chat locked - redirecting to: ${lockedUrl}`);
            window.location.href = lockedUrl;
        }
    }
    // All other contacts are locked for now (individual locked pages)
    else {
        const lockedUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/locked.html`;
        console.log(`🔒 ${contactName} chat locked - redirecting to: ${lockedUrl}`);
        window.location.href = lockedUrl;
    }
}

// Render contacts - All visible, no lock icons
function renderContacts(filter = '') {
    const contactsList = document.getElementById('contactsList');
    if (!contactsList) return;

    contactsList.innerHTML = '';

    const filteredContacts = contacts.filter(contact => {
        // Apply search filter
        return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    filteredContacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-item';
        contactElement.onclick = () => openChat(contact.name);

        // NO LOCK ICONS - All contacts look the same
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

    updateTime();
    renderContacts();
    setInterval(updateTime, 60000);
    initializeBackButton();    // 🆕 Back button navigation
    initializeAutoRedirect();  // 🆕 Auto-redirect system

    console.log('💬 Messages App Ready - Task progression system active!');
});

// Make functions global
window.openChat = openChat;

function playClickSound() {
    const sound = new Audio('../../sounds/click.mp3');
    sound.volume = 0.3;
    sound.play().catch(e => console.log('Sound error:', e));
}