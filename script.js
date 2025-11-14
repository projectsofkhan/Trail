const homeView = document.getElementById('home-view');
const appView = document.getElementById('app-view');
const appGrid = document.getElementById('appGrid');
const appTitle = document.getElementById('appTitle');
const appContentText = document.getElementById('app-content-text');

const apps = [
    { id: 'messages', name: 'Messages', icon: '💬', color: '#579AD9' },
    { id: 'phone', name: 'Phone', icon: '📞', color: '#6BBF6B' },
    { id: 'mail', name: 'Mail', icon: '✉️', color: '#E06B6B' },
    { id: 'gallery', name: 'Gallery', icon: '🌄', color: '#6A618F' },
    { id: 'pixabowl', name: 'Pixabowl', icon: '📸', color: '#9B5BBE' },
    { id: 'diary', name: 'Diary', icon: '📖', color: '#A08E77' },
    { id: 'files', name: 'Files', icon: '📁', color: '#5AA79E' },
    { id: 'symmetry', name: 'Symmetry', icon: '❤️', color: '#D45A5A' },
    { id: 'settings', name: 'Settings', icon: '⚙️', color: '#555555' }
];

function initializeAppGrid() {
    apps.forEach(app => {
        const icon = document.createElement('div');
        icon.className = 'app-icon';
        icon.onclick = () => openApp(app.id, app.name);

        icon.innerHTML = `
            <div class="app-icon-body" style="background:${app.color}">
                ${app.icon}
            </div>
            <div class="app-icon-label">${app.name}</div>
        `;

        appGrid.appendChild(icon);
    });
}

function openApp(appId, appName) {
    appTitle.textContent = appName;

    if (appId === 'diary') {
        appContentText.innerHTML = `
            <h2>The Diary App</h2>
            <p>This is where Avery stores her personal thoughts.</p>
            <div style="background:#f0f0f0; padding:15px; border-radius:8px;">
                <strong>Current Entry:</strong>
                <p style="font-style:italic;">"I need to check the coordinates Zoey sent..."</p>
            </div>
        `;
    } else {
        appContentText.innerHTML = `
            <h2>${appName}</h2>
            <p>This app is currently under construction.</p>
        `;
    }

    homeView.classList.add('hidden');
    appView.classList.add('active');
}

function closeApp() {
    homeView.classList.remove('hidden');
    appView.classList.remove('active');

    setTimeout(() => {
        appTitle.textContent = '';
        appContentText.innerHTML =
            'Welcome to the application content area. Click an icon!';
    }, 300);
}

window.onload = initializeAppGrid;