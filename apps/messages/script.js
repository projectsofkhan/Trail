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
        if (!localStorage.getItem('extendedProgress')) {
            localStorage.setItem('extendedProgress', JSON.stringify({}));
        }
    },

    completeTask(taskId) {
        const progress = this.getProgress();
        progress[taskId] = true;
        localStorage.setItem('taskProgress', JSON.stringify(progress));
        this.showTaskCompletePopup(taskId);
        console.log(`✅ Task completed: ${taskId}`);
        
        // Check for Dad unlock condition (Mr. Ray + Sahil + Dyere completed)
        this.checkDadUnlockCondition();
    },

    isTaskCompleted(taskId) {
        const progress = this.getProgress();
        return !!progress[taskId];
    },

    getProgress() {
        return JSON.parse(localStorage.getItem('taskProgress') || '{}');
    },

    checkDadUnlockCondition() {
        // Dad gets unlocked when ALL THREE are completed:
        // 1. chat_mr_ray (Mr. Ray)
        // 2. chat_sahil (Sahil) 
        // 3. unlock_dyere (Dyere) - from extendedProgress
        const progress = this.getProgress();
        const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');
        
        const isMrRayDone = progress.chat_mr_ray;
        const isSahilDone = progress.chat_sahil;
        const isDyereDone = extendedProgress.unlock_dyere;
        
        // If all three are true and Dad isn't already unlocked
        if (isMrRayDone && isSahilDone && isDyereDone && !extendedProgress.unlock_dad) {
            // Unlock Dad
            extendedProgress.unlock_dad = true;
            localStorage.setItem('extendedProgress', JSON.stringify(extendedProgress));
            
            // Show special Dad unlock notification
            setTimeout(() => {
                this.showDadUnlockPopup();
            }, 1000);
            
            console.log('🎉 Dad contact unlocked! All three tasks completed.');
        }
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
    },

    showDadUnlockPopup() {
        // Create special Dad unlock popup
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            animation: fadeIn 0.5s ease;
        `;

        popup.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #1a237e, #0d47a1);
                color: white;
                padding: 35px;
                border-radius: 25px;
                text-align: center;
                max-width: 320px;
                margin: 20px;
                box-shadow: 0 25px 50px rgba(0,0,0,0.4);
                animation: slideUp 0.7s ease;
                border: 2px solid rgba(255,255,255,0.1);
            ">
                <div style="font-size: 4rem; margin-bottom: 20px;">🏆</div>
                <h2 style="margin: 0 0 15px 0; font-size: 1.8rem; font-weight: 700;">TASK 4 COMPLETED!</h2>
                
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin: 20px 0;">
                    <div style="font-size: 1rem; opacity: 0.9; margin-bottom: 10px;">You've successfully completed:</div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <span style="color: #4CAF50; margin-right: 8px;">✓</span>
                            <span>Chat with Mr. Ray</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <span style="color: #4CAF50; margin-right: 8px;">✓</span>
                            <span>Chat with Sahil</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <span style="color: #4CAF50; margin-right: 8px;">✓</span>
                            <span>Chat with Dyere</span>
                        </div>
                    </div>
                </div>
                
                <div style="
                    background: linear-gradient(to right, rgba(255,215,0,0.2), rgba(255,215,0,0.1));
                    border: 2px solid rgba(255,215,0,0.3);
                    padding: 20px;
                    border-radius: 15px;
                    margin: 25px 0;
                    text-align: left;
                ">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <div style="font-size: 2.5rem; margin-right: 15px;">👨</div>
                        <div>
                            <div style="font-size: 1.3rem; font-weight: 600; color: #FFD700;">DAD UNLOCKED!</div>
                            <div style="font-size: 0.95rem; opacity: 0.9;">Your father is now available to talk</div>
                        </div>
                    </div>
                    <div style="font-size: 0.9rem; padding-left: 10px; border-left: 3px solid #FFD700; margin-top: 10px;">
                        <em>"Dinner at 7" - Dad</em>
                    </div>
                </div>
                
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: linear-gradient(to right, #FFD700, #FFC400);
                    color: #1a237e;
                    border: none;
                    padding: 15px 40px;
                    border-radius: 30px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    cursor: pointer;
                    margin-top: 10px;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(255,215,0,0.3);
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Continue to Messages
                </button>
                
                <div style="margin-top: 20px; font-size: 0.85rem; opacity: 0.7;">
                    New story chapter unlocked!
                </div>
            </div>
            
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(50px) scale(0.8);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
            </style>
        `;

        document.body.appendChild(popup);

        // Add pulsing animation to the trophy
        setTimeout(() => {
            const trophy = popup.querySelector('div[style*="font-size: 4rem"]');
            if (trophy) {
                trophy.style.animation = 'pulse 2s infinite';
            }
        }, 1000);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (popup.parentElement) {
                popup.remove();
            }
        }, 8000);
    }
};

// Initialize task system
TaskProgress2.init();

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
        if (TaskProgress2.isTaskCompleted('chat_mr_ray')) {
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
    // Dyere requires Sahil task completion
    else if (contactName === 'Dyere') {
        const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');
        if (extendedProgress.unlock_dyere) {
            // Dyere unlocked - go to real chat
            const realUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/index.html`;
            console.log(`🔓 Dyere chat unlocked - redirecting to: ${realUrl}`);
            window.location.href = realUrl;
        } else {
            // Dyere not unlocked - go to locked page
            const lockedUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/locked.html`;
            console.log(`🔒 Dyere chat locked - redirecting to: ${lockedUrl}`);
            window.location.href = lockedUrl;
        }
    }
    // ✅ DAD: Unlocked after completing Mr. Ray + Sahil + Dyere
    else if (contactName === 'Dad') {
        const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');
        if (extendedProgress.unlock_dad) {
            // Dad unlocked - go to real chat
            const realUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/index.html`;
            console.log(`🔓 Dad chat unlocked - redirecting to: ${realUrl}`);
            window.location.href = realUrl;
        } else {
            // Dad not unlocked - go to locked page
            const lockedUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/locked.html`;
            console.log(`🔒 Dad chat locked - redirecting to: ${lockedUrl}`);
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
    if (!contactsList) {
        console.error('❌ contactsList element not found!');
        console.error('Looking for element with id="contactsList"');
        return;
    }

    console.log('🔄 Rendering contacts...');
    
    contactsList.innerHTML = '';

    const filteredContacts = contacts.filter(contact => {
        // Apply search filter
        return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    console.log(`📱 Found ${filteredContacts.length} contacts to display`);

    filteredContacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-item';
        contactElement.onclick = () => {
            console.log(`👆 Clicked on ${contact.name}`);
            playClickSound();
            openChat(contact.name);
        };

        contactElement.innerHTML = `
            <div class="contact-avatar">${contact.avatar}</div>
            <div class="contact-info">
                <div class="contact-name">${contact.name}</div>
                <div class="contact-last-message">${contact.lastMessage}</div>
            </div>
            <div class="contact-meta">
                <div class="message-time">${contact.time}</div>
                ${contact.unread > 0 ? `<div class="unread-badge">${contact.unread}</div>` : ''}
            </div>
        `;

        contactsList.appendChild(contactElement);
    });
    
    console.log('✅ Contacts rendered successfully');
}

function playClickSound() {
    const sound = new Audio('../../sounds/click.mp3');
    sound.volume = 0.3;
    sound.play().catch(e => console.log('Sound error:', e));
}

// Simple back button function
function closeAppAndReturnHome() {
    console.log('🔙 Closing Messages and returning to home...');
    
    // Try to close the window
    if (window.opener && !window.opener.closed) {
        try {
            window.opener.focus();
        } catch (error) {
            console.log('⚠️ Could not focus home tab');
        }
    }
    
    setTimeout(() => {
        window.close();
    }, 50);
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM Content Loaded - Initializing Messages App...');
    
    // Initialize task system
    TaskProgress2.init();
    
    // Update time
    const currentTimeElement = document.getElementById('current-time');
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
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log('🔍 Searching for:', this.value);
            renderContacts(this.value);
        });
    }
    
    // Render contacts initially
    renderContacts();
    
    // Add back button event listener
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            closeAppAndReturnHome();
        });
    }
    
    console.log('💬 Messages App Ready!');
});

// Make functions globally available
window.openChat = openChat;
window.renderContacts = renderContacts;
window.closeAppAndReturnHome = closeAppAndReturnHome;