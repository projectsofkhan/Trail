// DOM Elements
const homeView = document.getElementById('home-view');
const appView = document.getElementById('app-view');
const standardAppHeader = document.getElementById('standardAppHeader');
const appGrid = document.getElementById('appGrid');
const appTitle = document.getElementById('appTitle');
const appContentDefault = document.getElementById('app-content-default');
const appContentBrowser = document.getElementById('app-content-browser');
const appContentText = document.getElementById('app-content-text');
const browserContent = document.getElementById('browserContent');
const browserUrlInput = document.getElementById('browserUrlInput');
const currentTimeElement = document.getElementById('current-time');

// Global state for search history
let searchHistory = [];
const HISTORY_LIMIT = 5; // Max number of items to show

// Define app data (Symmetry app removed)
const apps = [
    { id: 'messages', name: 'Messages', icon: '💬', color: '#579AD9', col: 0 },
    { id: 'phone', name: 'Phone', icon: '📞', color: '#6BBF6B', col: 1 },
    { id: 'mail', name: 'Mail', icon: '✉️', color: '#E06B6B', col: 2 },
    { id: 'gallery', name: 'Gallery', icon: '🌄', color: '#6A618F', col: 3 },
    
    { id: 'Instashan', name: 'Instashan', icon: 'https://projectsofkhan.github.io/pythontodoapp/instashan.jpg', color: '#9B5BBE', col: 0 },
    { id: 'diary', name: 'Diary', icon: '📖', color: '#A08E77', col: 1 },
    { id: 'browser', name: 'Browser', icon: '🌐', color: '#5D6B9C', col: 2 },
    
    { id: 'settings', name: 'Settings', icon: '⚙️', color: '#555555', col: 0 }
];

/**
 * Updates the current time display
 */
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    currentTimeElement.textContent = `${hours}:${minutes}`;
}

/**
 * Loads the browser's home page with search history and suggested links.
 */
function loadBrowserHomePage() {
    browserUrlInput.value = 'startpage.com';

    // --- 1. Construct Recently Viewed Section (Cached History) ---
    let historyHTML = '';
    if (searchHistory.length === 0) {
        historyHTML = `<p style="color: #999; font-style: italic; font-size: 0.9rem; padding: 10px 0;">No recent searches.</p>`;
    } else {
        // Generate list items from the history array
        historyHTML = searchHistory.map(item => `
            <div class="browser-list-item" onclick="searchBrowser('${item}')">${item}</div>
        `).join('');
    }

    // --- 2. Construct Suggested/Placeholder Section ---
    const suggestedHTML = `
        <div class="browser-suggested-tiles">
            <div class="suggestion-tile" onclick="searchBrowser('averyelmwood.wiki')">
                <span class="icon">🌐</span> About Avery
            </div>
            <div class="suggestion-tile" onclick="searchBrowser('file://storage/imagemap.png')">
                <span class="icon">🗺️</span> imagemap.png
            </div>
            <div class="suggestion-tile" onclick="searchBrowser('file://storage/imageschool.png')">
                <span class="icon">🏫</span> imageschool.png
            </div>
            <div class="suggestion-tile" onclick="searchBrowser('local.news/missing')">
                <span class="icon">🚨</span> Missing Persons Report
            </div>
        </div>
    `;

    browserContent.innerHTML = `
        <div class="browser-content">
            
            <h4 class="browser-section-title">RECENTLY VIEWED</h4>
            <div id="recently-viewed-list">
                ${historyHTML}
            </div>
            
            <h4 class="browser-section-title">SUGGESTIONS</h4>
            ${suggestedHTML}
            
        </div>
    `;
}

/**
 * Updates the search history array.
 */
function updateSearchHistory(query) {
    // Remove the query if it already exists to move it to the front
    searchHistory = searchHistory.filter(item => item !== query);
    
    // Add the new query to the front
    searchHistory.unshift(query);
    
    // Limit the history size
    if (searchHistory.length > HISTORY_LIMIT) {
        searchHistory.pop();
    }
}

/**
 * Simulates a search result for the browser app based on a query.
 */
function searchBrowser(query) {
    if (!query) return;

    updateSearchHistory(query);
    browserUrlInput.value = query; // Update URL bar
    
    let resultsHTML;
    
    if (query.toLowerCase().includes('elmwood') || query.toLowerCase().includes('wiki') || query.toLowerCase().includes('averyelmwood.wiki')) {
        resultsHTML = `
            <p style="color: #999; font-size: 0.8rem; margin: 0 0 10px 0; padding-top: 15px;">About 3 results (0.45 seconds) for "${query}"</p>
            <div class="search-result">
                <h3>Elmwood Trail Fan Wiki - Avery's Profile</h3>
                <p>averyelmwood.wiki/profile/clues_and_theories</p>
                <p>A detailed breakdown of all known clues collected by Avery during her search for Zoey. Last updated: 14/11/2025.</p>
            </div>

            <div class="search-result">
                <h3>Local News: Missing Hiker Found?</h3>
                <p>local.news/mystery/hiker_found_nov_14</p>
                <p>Police confirm a missing hiker was located near the Whispering Pines trail entrance, but the identity has not yet been released.</p>
            </div>
        `;
    } else if (query.toLowerCase().includes('map') || query.includes('imagemap')) {
         resultsHTML = `
            <p style="color: #999; font-size: 0.8rem; margin: 0 0 10px 0; padding-top: 15px;">About 1 result (0.12 seconds) for "${query}"</p>
            <div class="search-result">
                <h3>Zoey's Last Known Location - Map Data</h3>
                <p>maps.com/search?q=Zoey's_location</p>
                <p>Map showing the dense forest coordinates Zoey last sent. Warning: Area inaccessible by road.</p>
                <div style="background-color: #555; height: 200px; display: flex; align-items: center; justify-content: center; margin-top: 10px; border-radius: 5px;">
                    [Simulated Map Image of Elmwood Trail]
                </div>
            </div>
        `;
    } else {
        resultsHTML = `<p style="color: #999; padding-top: 15px;">No search results found for "${query}".</p>`;
    }
    
    browserContent.innerHTML = `<div class="browser-content-search">${resultsHTML}</div>`;
}

/**
 * Initializes the home screen grid by creating HTML elements for each app.
 */
function initializeAppGrid() {
    apps.forEach(app => {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'app-icon';
        iconDiv.setAttribute('data-app-id', app.id);
        iconDiv.onclick = () => openApp(app.id, app.name);

        iconDiv.innerHTML = `
            <div class="app-icon-body" style="background-color: ${app.color};">
                ${app.icon}
            </div>
            <div class="app-icon-label">${app.name}</div>
        `;
        appGrid.appendChild(iconDiv);
    });
}

/**
 * Opens the selected application with a slide-in animation.
 */
function openApp(appId, appName) {
    // Reset app content views
    appContentDefault.style.display = 'flex';
    appContentBrowser.style.display = 'none';
    appView.classList.remove('browser-mode');
    standardAppHeader.style.display = 'flex';

    // Update the app title
    appTitle.textContent = appName;
    
    if (appId === 'diary') {
        appContentText.innerHTML = `
            <h2>The Diary App (Phone Notes)</h2>
            <p>This is where Avery stores her crucial clues and personal thoughts. The light background makes reading easy!</p>
            <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin-top: 20px; color: #333;">
                <strong>Current Entry:</strong>
                <p style="margin-top: 5px; font-style: italic;">"I need to check the last coordinates that Zoey sent me before everything went quiet. The weather was strange that night..."</p>
            </div>
        `;
    } else if (appId === 'browser') {
        // Configure Browser View (Dark Mode)
        appView.classList.add('browser-mode');
        standardAppHeader.style.display = 'none'; // Hide light header
        appContentDefault.style.display = 'none';
        appContentBrowser.style.display = 'flex';
        loadBrowserHomePage();
        
    } else {
        // Default App View (Light Mode)
        appContentText.innerHTML = `
            <h2>Welcome to the ${appName}</h2>
            <p>This app is currently under construction. You are now inside the primary application view.</p>
        `;
    }

    // Apply animation classes
    homeView.classList.add('hidden');
    appView.classList.add('active');
}

/**
 * Closes the current application and returns to the home screen.
 */
function closeApp() {
    // Apply reverse animation classes
    homeView.classList.remove('hidden');
    appView.classList.remove('active');
    
    // Clear content after the animation is visually complete and reset mode
    setTimeout(() => {
        appTitle.textContent = '';
        appContentText.innerHTML = 'Welcome to the application content area. Click on an icon on the home screen to launch an app!';
        appView.classList.remove('browser-mode');
    }, 300); // Matches the CSS transition duration
}

/**
 * Attempts to enter fullscreen mode for the entire document.
 */
function enterFullscreen() {
    const element = document.documentElement; // Target the whole page for true fullscreen
    
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestfullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }

    // Once fullscreen is requested, remove the listener to prevent repeated calls
    document.body.removeEventListener('click', enterFullscreen);
    document.body.removeEventListener('touchstart', enterFullscreen);
}

// --- Initialization ---
window.onload = function() {
    initializeAppGrid();
    updateTime();
    setInterval(updateTime, 60000); // Update time every minute
    
    // Attach listeners for both click (mouse/tap) and touchstart (mobile)
    document.body.addEventListener('click', enterFullscreen);
    document.body.addEventListener('touchstart', enterFullscreen);
};