let currentStep = 0;
let messages = [];
let isProcessing = false;

// Questions and their fixed answers
const questions = [
    "Hello!",
    "Sir, I am Detective, working on Eric Petrove's case, Can you help me?",
    "Thanks sir, I need some information about his friends family and persons he usually talk to",
    "Sir who's Ahmet",
    "Yes, sir do you know more about him",
    "Thanks a lot sir"
];

// ========== TASK COMPLETION FUNCTION ==========
function completeMrRayChat() {
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

    // Save to localStorage
    const progress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
    progress['chat_mr_ray'] = true;
    localStorage.setItem('taskProgress', JSON.stringify(progress));

    console.log('✅ Mr. Ray chat completed - Sahil unlocked!');

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 5000);
}

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
        sound.currentTime = 0;
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
        chatMessages.scrollTop = chatMessages.scrollHeight;

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
        if (question === "Hello!") {
            return "Hello?";
        }
        else if (question === "Sir, I am Detective, working on Eric Petrove's case, Can you help me?") {
            return "Oh, thanks I'm glad that someone is here to find him. Yes I will be happy to help you.";
        }
        else if (question === "Thanks sir, I need some information about his friends family and persons he usually talk to") {
            return "His friends are Sahil, Dyere and Ahmet.";
        }
        else if (question === "Sir who's Ahmet") {
            return "Ahmet was his friend. His family belongs to a very rich family. His family shifted him to South Korea for study.";
        }
        else if (question === "Yes, sir do you know more about him") {
            return "No sorry, I don't know much about him. It's my first year at the school.";
        }
        else if (question === "Thanks a lot sir") {
            return "Welcome Mr. Feel free to ask anything, but now I have some work so we'll talk later.";
        }
        else {
            return "Nice talking to you!";
        }
    }

    // Update the choice button
    function updateChoiceButton() {
        if (currentStep < questions.length) {
            choiceButton.textContent = questions[currentStep];
            choiceButton.disabled = false;
        } else {
            choiceButton.textContent = "Chat Ended";
            choiceButton.disabled = true;
        }
    }

    // Handle choice selection
    function selectChoice() {
        // Prevent double execution
        if (isProcessing || currentStep >= questions.length) return;

        isProcessing = true;
        const question = questions[currentStep];
        choiceButton.disabled = true;

        console.log("Sending:", question);
        addMessage(question, 'sent');

        setTimeout(() => {
            const answer = getAnswer(question);
            console.log("Replying:", answer);
            addMessage(answer, 'received');

            currentStep++;

            // 🆕 CHECK IF THIS WAS THE LAST MESSAGE - COMPLETE TASK
            if (currentStep >= questions.length) {
                // This was the final message - complete the task after a delay
                setTimeout(() => {
                    completeMrRayChat();
                }, 1000);
            }

            setTimeout(() => {
                updateChoiceButton();
                isProcessing = false;
            }, 500);

        }, 1000);
    }

    // Initialize chat
    function initChat() {
        console.log("Chat started");
        updateChoiceButton();

        // Welcome message after a short delay
        setTimeout(() => {
            addMessage("", 'received');
        }, 1000);
    }


    // Add event listener to the button
    choiceButton.addEventListener('click', selectChoice);

    // Start everything
    updateTime();
    initChat();
    setInterval(updateTime, 60000);

    // Make function global
    window.selectChoice = selectChoice;
    window.completeMrRayChat = completeMrRayChat;
});