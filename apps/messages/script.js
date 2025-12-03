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
        console.log('🔄 Initializing Messages Task System...');
        
        // Load progress from localStorage (sync with Task Manager)
        const taskProgress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
        const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');
        
        console.log('📊 Task Manager progress:', taskProgress);
        console.log('📊 Extended progress:', extendedProgress);
        
        if (!localStorage.getItem('taskProgress')) {
            localStorage.setItem('taskProgress', JSON.stringify({}));
        }
        if (!localStorage.getItem('extendedProgress')) {
            localStorage.setItem('extendedProgress', JSON.stringify({}));
        }
    },

    // This function syncs with Task Manager's task IDs
    isTaskCompleted(taskId) {
        const taskProgress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
        return !!taskProgress[taskId];
    },

    // This checks if Dad should be unlocked (after Task 4)
    checkDadUnlockCondition() {
        const taskProgress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
        const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');
        
        // Dad gets unlocked when task4_call_dyere is completed
        const isTask4Done = taskProgress.task4_call_dyere;
        
        console.log('🔍 Checking Dad unlock condition:');
        console.log('   - task4_call_dyere completed:', isTask4Done);
        console.log('   - Dad already unlocked:', extendedProgress.unlock_dad);
        
        if (isTask4Done && !extendedProgress.unlock_dad) {
            // Unlock Dad
            extendedProgress.unlock_dad = true;
            localStorage.setItem('extendedProgress', JSON.stringify(extendedProgress));
            
            // Show special Dad unlock notification
            setTimeout(() => {
                this.showDadUnlockPopup();
            }, 1000);
            
            console.log('🎉 Dad contact unlocked! Task 4 completed.');
        }
    },

    // Show Dad unlock popup when Task 4 is completed
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
                    <div style="font-size: 1rem; opacity: 0.9; margin-bottom: 10px;">You've successfully completed Task 4</div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <span style="color: #4CAF50; margin-right: 8px;">✓</span>
                            <span>Call to Dyere</span>
                        </div>
                        <div style="font-size: 0.9rem; margin-top: 5px; color: #FFD700;">
                            New information about Eric's location found!
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
                    Task 5 unlocked: Talk to Eric's Dad
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

// Format contact name for URL
function formatContactName(contactName) {
    if (contactName === 'Mr. Ray') return 'misterray';
    return contactName.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Smart chat navigation - checks task progress (SYNCED WITH TASK MANAGER)
function openChat(contactName) {
    const formattedName = formatContactName(contactName);
    const taskProgress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
    const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');

    console.log(`🔍 Opening chat for ${contactName}`);
    console.log('   Task progress:', taskProgress);
    console.log('   Extended progress:', extendedProgress);

    // Only Mr. Ray is always unlocked
    if (contactName === 'Mr. Ray') {
        // Mr. Ray always goes to real chat
        const realUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/index.html`;
        console.log(`🔓 Mr. Ray chat - redirecting to: ${realUrl}`);
        window.location.href = realUrl;
    } 
    // Sahil requires Mr. Ray task completion
    else if (contactName === 'Sahil') {
        if (taskProgress.chat_mr_ray) {
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
    // Dyere requires Sahil task completion (using Task Manager's talk_sahil)
    else if (contactName === 'Dyere') {
        if (taskProgress.talk_sahil) {
            // Task completed - go to real chat
            const realUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/index.html`;
            console.log(`🔓 Dyere chat unlocked - redirecting to: ${realUrl}`);
            window.location.href = realUrl;
        } else {
            // Task not completed - go to locked page
            const lockedUrl = `https://projectsofkhan.github.io/Trail/apps/messages/contacts/${formattedName}/locked.html`;
            console.log(`🔒 Dyere chat locked - redirecting to: ${lockedUrl}`);
            window.location.href = lockedUrl;
        }
    }
    // ✅ DAD: Unlocked after completing Task 4 (task4_call_dyere)
    else if (contactName === 'Dad') {
        if (extendedProgress.unlock_dad || taskProgress.task4_call_dyere) {
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
    
    // Check if Dad should be unlocked (on page load)
    TaskProgress2.checkDadUnlockCondition();
    
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
    
    // Listen for task updates from Task Manager
    window.addEventListener('storage', function(e) {
        if (e.key === 'taskProgress' || e.key === 'extendedProgress') {
            console.log('📢 Storage updated, checking Dad unlock...');
            TaskProgress2.checkDadUnlockCondition();
        }
    });
    
    console.log('💬 Messages App Ready - Synced with Task Manager!');
});

// Make functions globally available
window.openChat = openChat;
window.renderContacts = renderContacts;
window.closeAppAndReturnHome = closeAppAndReturnHome;