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
        historyHTML = `<p style="color: #999;">No recent searches.</p>`;
    } else {
        historyHTML = searchHistory
            .map(item => `<div class="browser-list-item" onclick="searchBrowser('${item}')">${item}</div>`)
            .join('');
    }

    const suggestedHTML = `
        <div class="browser-suggested-tiles">
            <div class="suggestion-tile" onclick="searchBrowser('averyelmwood.wiki')">🌐 About Avery</div>
            <div class="suggestion-tile" onclick="searchBrowser('file://storage/imagemap.png')">🗺️ imagemap.png</div>
            <div class="suggestion-tile" onclick="searchBrowser('local.news/missing')">🚨 Missing Person</div>
        </div>
    `;

    browserContent.innerHTML = `
        <h4 class="browser-section-title">RECENTLY VIEWED</h4>
        ${historyHTML}

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

    if (query.toLowerCase().includes('elmwood')) {
        resultsHTML = `
            <div class="search-result">
                <h3>Elmwood Trail Fan Wiki - Avery's Profile</h3>
                <p>averyelmwood.wiki/profile</p>
                <p>All known clues collected by Avery.</p>
            </div>
        `;
    } else {
        resultsHTML = `<p style="color:#bbb;">No results found for "${query}".</p>`;
    }

    browserContent.innerHTML = resultsHTML;
}

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

function openApp(appId, appName) {
    appContentDefault.style.display = 'flex';
    appContentBrowser.style.display = 'none';
    standardAppHeader.style.display = 'flex';
    appView.classList.remove('browser-mode');

    appTitle.textContent = appName;

    if (appId === 'diary') {
        appContentText.innerHTML = `
            <h2>Diary</h2>
            <p>\"I need to check Zoey's last coordinates...\"</p>
        `;
    } else if (appId === 'browser') {
        standardAppHeader.style.display = 'none';
        appView.classList.add('browser-mode');
        appContentDefault.style.display = 'none';
        appContentBrowser.style.display = 'flex';
        loadBrowserHomePage();
    } else {
        appContentText.innerHTML = `<h2>${appName}</h2><p>This app is under construction.</p>`;
    }

    homeView.classList.add('hidden');
    appView.classList.add('active');
}

function closeApp() {
    homeView.classList.remove('hidden');
    appView.classList.remove('active');
}

window.onload = initializeAppGrid;