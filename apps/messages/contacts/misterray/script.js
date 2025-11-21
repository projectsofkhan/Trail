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
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px) scale(0.9); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
        </style>
    `;

    document.body.appendChild(popup);

    const progress = JSON.parse(localStorage.getItem('taskProgress') || '{}');
    progress['chat_mr_ray'] = true;
    localStorage.setItem('taskProgress', JSON.stringify(progress));

    console.log('✅ Mr. Ray chat completed - Sahil unlocked!');

    setTimeout(() => {
        if (popup.parentElement) popup.remove();
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const currentTimeElement = document.getElementById('current-time');
    const chatMessages = document.getElementById('chatMessages');
    const choiceButton = document.getElementById('choiceBtn');

    const sentSound = new Audio('sent.mp3');
    const receiveSound = new Audio('recieve.mp3');

    function updateTime() {
        if (currentTimeElement) {
            const now = new Date();
            const h = now.getHours();
            const m = now.getMinutes().toString().padStart(2, '0');
            currentTimeElement.textContent = `${h}:${m}`;
        }
    }

    function playSound(sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }

    function addMessage(text, type) {
        const now = new Date();
        const t = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${t}</div>
        `;

        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        messages.push({ id: messages.length + 1, content: text, time: t, type });

        if (type === 'sent') playSound(sentSound);
        else playSound(receiveSound);
    }

    function getAnswer(question) {
        const map = {
            "Hello!": "Hello?",
            "Sir, I am Detective, working on Eric Petrove's case, Can you help me?":
                "Oh, thanks I'm glad that someone is here to find him. Yes I will be happy to help you.",
            "Thanks sir, I need some information about his friends family and persons he usually talk to":
                "His friends are Sahil, Dyere and Ahmet.",
            "Sir who's Ahmet":
                "Ahmet was his friend. His family belongs to a very rich family. His family shifted him to South Korea for study.",
            "Yes, sir do you know more about him":
                "No sorry, I don't know much about him. It's my first year at the school.",
            "Thanks a lot sir":
                "Welcome Mr. Feel free to ask anything, but now I have some work so we'll talk later."
        };
        return map[question] || "Nice talking to you!";
    }

    function updateChoiceButton() {
        if (currentStep < questions.length) {
            choiceButton.textContent = questions[currentStep];
            choiceButton.disabled = false;
        } else {
            choiceButton.textContent = "Chat Ended";
            choiceButton.disabled = true;
        }
    }

    function selectChoice() {
        if (isProcessing || currentStep >= questions.length) return;

        isProcessing = true;
        const q = questions[currentStep];
        choiceButton.disabled = true;

        addMessage(q, 'sent');

        setTimeout(() => {
            const ans = getAnswer(q);
            addMessage(ans, 'received');

            currentStep++;

            if (currentStep >= questions.length) {
                setTimeout(completeMrRayChat, 1000);
            }

            setTimeout(() => {
                updateChoiceButton();
                isProcessing = false;
            }, 500);

        }, 1000);
    }

    // ✔ FIXED — initChat properly closed
    function initChat() {
        console.log("Chat started");
        updateChoiceButton();
    }

    // ✔ FIXED — event listener placed OUTSIDE initChat
    choiceButton.addEventListener('click', selectChoice);

    updateTime();
    initChat();
    setInterval(updateTime, 60000);

    window.selectChoice = selectChoice;
    window.completeMrRayChat = completeMrRayChat;
});