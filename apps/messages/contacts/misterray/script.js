let currentStep = 0;
let messages = [];

// Questions and their fixed answers
const questions = [
    "Hello!",
    "Sir, I am Detective, working on Eric Petrove's case, Can you help me?",
    "Thanks sir, I need some information about his friends family and persons he usually talk to",
    "Sir who's Ahmet",
    "Yes, sir do you know more about him",
    "Thanks a lot sir"
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
            return "Oh, thanks I'm glad that someone is here to find, him. Yes i will be happy to help you.";
        }
        else if (question === "Thanks sir, I need some information about his friends ") {
            return "His friends are Sahil, Dyere and Ahmet.";
        }
        else if (question === "Sir who's Ahmet") {
            return "Ahmet was his friend his family belongs to a very rich famil. his family shifted him south Korea for study,";
        }
        else if (question === "Yes, sir do you know more about him") {
            return "No sorry, I don't know much about him it's my first year at the school";
        }
        else if (question === "Thanks a lot sir") {
            return "welcome mr feel free to ask anything, but now I have some work so we'll be talk later";
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
        if (currentStep >= questions.length) return;

        // Get current question
        const question = questions[currentStep];

        // Disable button immediately
        choiceButton.disabled = true;

        console.log("Sending:", question);

        // STEP 1: Send user message immediately
        addMessage(question, 'sent');

        // STEP 2: Wait 1 second and send reply
        setTimeout(() => {
            const answer = getAnswer(question);
            console.log("Replying:", answer);
            addMessage(answer, 'received');

            // Move to next question
            currentStep++;

            // Update button for next question
            setTimeout(() => {
                updateChoiceButton();
            }, 500);

        }, 1000);
    }

    // Initialize chat
    function initChat() {
        console.log("Chat started");
        updateChoiceButton();

        /*
 Add welcome message after a short delay
        setTimeout(() => {
            addMessage("Hi there! Ready to chat?", 'received');
        }, 1000);
    }
       */
    // Start everything
    updateTime();
    initChat();
    setInterval(updateTime, 60000);

    // Make function available globally
    window.selectChoice = selectChoice;
});
