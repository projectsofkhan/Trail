let currentStep = 0;
let messages = [];
let isProcessing = false;

// Questions and their fixed answers
const questions = [
    "Hello Sahil, I'm a detective working on Eric Petrove's disappearance. I need to ask you a few questions.",
    "I'm trying to track his activities in the last few days before he went missing. You were close to him, right?",
    "What do you mean?",
    "About what?",
    "When was the last time you saw him?",
    "Did anything unusual happen?",
    "Why?",
    "Do you think Dyere is involved?",
    "Thank you, Sahil."
];

document.addEventListener('DOMContentLoaded', function() {
    const currentTimeElement = document.getElementById('current-time');
    const chatMessages = document.getElementById('chatMessages');
    const choiceButton = document.getElementById('choiceBtn');

    // Create audio elements for sounds
    const sentSound = new Audio('sent.mp3');
    const receiveSound = new Audio('recieve.mp3');

    // Update time
    function updateTime() {
        if (currentTimeElement) {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            currentTimeElement.textContent = `${hours}:${minutes}`;
        }
    }

    // Play sound
    function playSound(sound) {
        sound.currentTime = 0; // Reset to start
        sound.play().catch(e => {
            console.log('Audio play failed:', e);
        });
    }

    // Add message to chat
    function addMessage(text, type) {
        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${time}</div>
        `;

        // Add to chat
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 50);

        // Also add to messages array for tracking
        messages.push({
            id: messages.length + 1,
            content: text,
            time: time,
            type: type
        });

        // Play sound based on message type
        if (type === 'sent') {
            playSound(sentSound);
        } else if (type === 'received') {
            playSound(receiveSound);
        }
    }

    // Get fixed answer for question
    function getAnswer(question) {
        const answerMap = {
            "Hello Sahil, I'm a detective working on Eric Petrove's disappearance. I need to ask you a few questions.": 
                "...Eric? Why now?",
            "I'm trying to track his activities in the last few days before he went missing. You were close to him, right?": 
                "Yeah, we were close… at least we used to be.",
            "What do you mean?": 
                "Look, Eric changed a lot recently. Stopped hanging out. Stopped replying. Always stressed about… something.",
            "About what?": 
                "I don't know. He wouldn't tell me. Every time I asked, he just said: 'I'm fixing my life.' Never explained.",
            "When was the last time you saw him?": 
                "Two weeks ago. He came to meet me at the café near school. He looked tired… nervous. Kept checking his phone.",
            "Did anything unusual happen?": 
                "Yeah… He told me if anything ever happened to him… I should not trust Dyere.",
            "Why?": 
                "He didn't say. He just walked away after that. I haven't seen him since.",
            "Do you think Dyere is involved?": 
                "I'm not saying anything. Ask him yourself. I'm out of this.",
            "Thank you, Sahil.": 
                "Just find him… He didn't deserve whatever happened."
        };
        return answerMap[question] || "I don't want to talk about this anymore.";
    }

    // Update the choice button
    function updateChoiceButton() {
        if (currentStep < questions.length) {
            choiceButton.textContent = questions[currentStep];
            choiceButton.disabled = false;
        } else {
            choiceButton.textContent = "Conversation Ended";
            choiceButton.disabled = true;
            
            // Complete the task when conversation ends
            setTimeout(() => {
                completeSahilChat();
            }, 2000);
        }
    }

    // ========== TASK COMPLETION FUNCTION ==========
function completeSahilChat() {
    // Play task completion sound
    const taskSound = new Audio('https://projectsofkhan.github.io/Trail/apps/task/task.mp3');
    taskSound.volume = 0.6;
    taskSound.play().catch(e => {
        console.log('Task sound error:', e);
    });

    // ✅ USE THE TASKPROGRESS SYSTEM DIRECTLY
    if (window.TaskProgress && typeof TaskProgress.completeTask === 'function') {
        console.log('🎯 Using TaskProgress system');
        TaskProgress.completeTask('task_2');
    } else {
        console.log('⚠️ TaskProgress not found, saving directly to localStorage');
        // Direct localStorage save in the format TaskProgress uses
        const progress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
        progress['task_2'] = true;
        localStorage.setItem('taskProgress', JSON.stringify(progress));
        
        // Trigger storage event to notify other tabs
        window.dispatchEvent(new Event('storage'));
    }

    // Save extended progress for Messages app
    const extendedProgress = JSON.parse(localStorage.getItem('extendedProgress') || '{}');
    extendedProgress.chat_sahil = true;
    extendedProgress.clue_dyere_suspicion = true;
    extendedProgress.unlock_dyere = true;
    localStorage.setItem('extendedProgress', JSON.stringify(extendedProgress));

    console.log('✅ Task 2 completed!');
    console.log('🔓 Dyere contact unlocked!');
    console.log('🕵️ Clue gained: Eric warned about Dyere');

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
            <h3 style="margin: 0 0 10px 0; font-size: 1.4rem; font-weight: 600;">Task Completed</h3>
            <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 12px; margin: 15px 0;">
                <div style="font-size: 1.1rem; font-weight: 500; margin-bottom: 5px;">Interview Sahil</div>
                <div style="font-size: 0.9rem; opacity: 0.9;">Task 2 Completed Successfully</div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.15); padding: 12px; border-radius: 10px; margin: 15px 0;">
                <div style="font-size: 1.8rem; margin-right: 10px;">🔓</div>
                <div style="text-align: left;">
                    <div style="font-size: 0.9rem; font-weight: 500;">New Contact Unlocked!</div>
                    <div style="font-size: 0.8rem; opacity: 0.9;">Dyere is now Available</div>
                </div>
            </div>
            <button onclick="closePopup()" style="
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
            ">Continue Investigation</button>
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

    // Notify Task Manager app
    if (window.opener && !window.opener.closed) {
        try {
            window.opener.postMessage({
                type: 'TASK_COMPLETED',
                taskId: 'task_2'
            }, '*');
            console.log('📱 Task Manager notified about Task 2 completion');
        } catch (error) {
            console.log('⚠️ Could not notify Task Manager');
        }
    }

    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 8000);
}