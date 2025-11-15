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

let searchHistory = [];
const HISTORY_LIMIT = 5;

const apps = [
    { id: 'messages', name: 'Messages', icon: '💬', color: '#579AD9' },
    { id: 'phone', name: 'Phone', icon: '📞', color: '#6BBF6B' },
    { id: 'mail', name: 'Mail', icon: '✉️', color: '#E06B6B' },
    { id: 'gallery', name: 'Gallery', icon: '🌄', color: '#6A618F' },
    { id: 'pixabowl', name: 'Pixabowl', icon: '📸', color: '#9B5BBE' },
    { id: 'diary', name: 'Diary', icon: '📖', color: '#A08E77' },
    { id: 'browser', name: 'Browser', icon: '🌐', color: '#5D6B9C' },
    { id: 'symmetry', name: 'Symmetry', icon: '❤️', color: '#D45A5A' },
    { id: 'settings', name: 'Settings', icon: '⚙️', color: '#555555' }
];

function loadBrowserHomePage() {
    browserUrlInput.value = 'startpage.com';

    let historyHTML = '';
    if (searchHistory.length === 0) {
        historyHTML = `<p style="color: #999; font-style: italic; font-size: 0.9rem; padding: 10px 0;">No recent searches.</p>`;
    } else {
        historyHTML = searchHistory.map(item => `
            <div class="browser-list-item" onclick="searchBrowser('${item}')">${item}</div>
        `).join('');
    }

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
        </div>`;

    browserContent.innerHTML = `
        <h4 class="browser-section-title">RECENTLY VIEWED</h4>
        <div id="recently-viewed-list">
            ${historyHTML}
        </div>
        <h4 class="browser-section-title">SUGGESTIONS</h4>
        ${suggestedHTML}
    `;
}

function updateSearchHistory(query) {
    searchHistory = searchHistory.filter(item => item !== query);
    searchHistory.unshift(query);
    if (searchHistory.length > HISTORY_LIMIT) searchHistory.pop();
}

function searchBrowser(query) {
    if (!query) return;
    updateSearchHistory(query);
    browserUrlInput.value = query;

    let resultsHTML;

    if (query.toLowerCase().includes('elmwood') || query.includes('wiki')) {
        resultsHTML = `
            <p style="color: #999; font-size: 0.8rem; margin: 0 0 10px 0; padding-top: 15px;">About 3 results (0.45 seconds)</p>
            <div class="search-result">
                <h3>Elmwood Trail Fan Wiki - Avery's Profile</h3>
                <p>averyelmwood.wiki/profile/clues_and_theories</p>
                <p>A detailed breakdown of clues collected by Avery.</p>
            </div>
        `;
    } else {
        resultsHTML = `<p style="color: #999; padding-top: 15px;">No search results found.</p>`;
    }

    browserContent.innerHTML = `<div class="browser-content-search">${resultsHTML}</div>`;
}

function initializeAppGrid() {
    apps.forEach(app => {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'app-icon';
        iconDiv.onclick = () => openApp(app.id, app.name);

        iconDiv.innerHTML = `
            <div class="app-icon-body" style="background-color: ${app.color};">${app.icon}</div>
            <div class="app-icon-label">${app.name}</div>`;

        appGrid.appendChild(iconDiv);
    });
}

function openApp(appId, appName) {
    appContentDefault.style.display = 'flex';
    appContentBrowser.style.display = 'none';

    appTitle.textContent = appName;

    if (appId === 'diary') {
        appContentText.innerHTML = `<h2>Diary App</h2><p>Notes go here.</p>`;
    } else if (appId === 'browser') {
        appContentDefault.style.display = 'none';
        appContentBrowser.style.display = 'flex';
        loadBrowserHomePage();
    } else {
        appContentText.innerHTML = `<h2>${appName}</h2><p>Under development.</p>`;
    }

    homeView.classList.add('hidden');
    appView.classList.add('active');
}

function closeApp() {
    homeView.classList.remove('hidden');
    appView.classList.remove('active');
}

window.onload = initializeAppGrid;