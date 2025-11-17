let currentContact = '';

/**
 * Updates the current time display
 */
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

/**
 * Opens unlocked contact - redirects to URL with contact name
 */
function openContact(contactName) {
    // Format the contact name for URL (replace spaces with %20)
    const formattedName = contactName.replace(/ /g, '%20');
    
    // Create the URL with the contact name
    const url = `https://projectsofkhan.github.io/Trail/apps/phone/${formattedName}`;
    
    // Open the URL in a new tab
    window.open(url, '_blank');
}

/**
 * Shows password prompt for locked contacts
 */
function showPasswordPrompt(contactName) {
    currentContact = contactName;
    const passwordOverlay = document.getElementById('passwordOverlay');
    const passwordContactName = document.getElementById('passwordContactName');
    const passwordInput = document.getElementById('passwordInput');
    
    if (passwordOverlay && passwordContactName && passwordInput) {
        passwordContactName.textContent = `to access ${contactName}`;
        passwordInput.value = '';
        passwordOverlay.style.display = 'flex';
        passwordInput.focus();
    }
}

/**
 * Closes password prompt
 */
function closePasswordPrompt() {
    const passwordOverlay = document.getElementById('passwordOverlay');
    if (passwordOverlay) {
        passwordOverlay.style.display = 'none';
        currentContact = '';
    }
}

/**
 * Checks password for locked contacts
 * For now, any password is valid as requested
 */
function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;
    
    // For now, any password is valid as requested
    if (password.length > 0) {
        // Format the contact name for URL (replace spaces with %20)
        const formattedName = currentContact.replace(/ /g, '%20');
        
        // Create the URL with the contact name
        const url = `https://projectsofkhan.github.io/Trail/apps/phone/${formattedName}`;
        
        // Open the URL in a new tab
        window.open(url, '_blank');
        
        closePasswordPrompt();
    } else {
        alert('❌ Please enter a password!');
        passwordInput.focus();
    }
}

// Handle Enter key in password input
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

// Initialize when page loads
window.onload = function() {
    updateTime();
    setInterval(updateTime, 60000);
};