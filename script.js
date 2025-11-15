const homeView = document.getElementById("home-view");
const appView = document.getElementById("app-view");
const standardAppHeader = document.getElementById("standardAppHeader");
const appGrid = document.getElementById("appGrid");
const appTitle = document.getElementById("appTitle");
const appContentDefault = document.getElementById("app-content-default");
const appContentBrowser = document.getElementById("app-content-browser");
const appContentText = document.getElementById("app-content-text");
const browserContent = document.getElementById("browserContent");
const browserUrlInput = document.getElementById("browserUrlInput");

let searchHistory = [];

const apps = [
    { id: "messages", name: "Messages", icon: "💬", color: "#579AD9" },
    { id: "phone", name: "Phone", icon: "📞", color: "#6BBF6B" },
    { id: "mail", name: "Mail", icon: "✉️", color: "#E06B6B" },
    { id: "gallery", name: "Gallery", icon: "🌄", color: "#6A618F" },
    { id: "pixabowl", name: "Pixabowl", icon: "📸", color: "#9B5BBE" },
    { id: "diary", name: "Diary", icon: "📖", color: "#A08E77" },
    { id: "browser", name: "Browser", icon: "🌐", color: "#5D6B9C" },
    { id: "symmetry", name: "Symmetry", icon: "❤️", color: "#D45A5A" },
    { id: "settings", name: "Settings", icon: "⚙️", color: "#555555" }
];

function loadBrowserHomePage() {
    browserUrlInput.value = "startpage.com";

    browserContent.innerHTML = `
        <p style="color:#aaa;margin-bottom:10px;">No recent searches.</p>
        <div class="suggestion-tile" onclick="searchBrowser('averyelmwood.wiki')">🌐 About Avery</div>
        <div class="suggestion-tile" onclick="searchBrowser('imagemap.png')">🗺️ imagemap.png</div>
        <div class="suggestion-tile" onclick="searchBrowser('imageschool.png')">🏫 imageschool.png</div>
        <div class="suggestion-tile" onclick="searchBrowser('local.news/missing')">🚨 Missing Persons Report</div>
    `;
}

function searchBrowser(q) {
    if (!q) return;
    browserUrlInput.value = q;

    browserContent.innerHTML = `
        <p style="color:#aaa;">Search results for: ${q}</p>
        <div class="suggestion-tile">No real results (demo)</div>
    `;
}

function initializeAppGrid() {
    apps.forEach(app => {
        const div = document.createElement("div");
        div.className = "app-icon";
        div.innerHTML = `
            <div class="app-icon-body" style="background:${app.color}">${app.icon}</div>
            <div class="app-icon-label">${app.name}</div>
        `;
        div.onclick = () => openApp(app.id, app.name);
        appGrid.appendChild(div);
    });
}

function openApp(id, name) {
    homeView.classList.add("hidden");
    appView.classList.remove("hidden");

    appTitle.textContent = name;

    appContentBrowser.classList.add("hidden");
    appContentDefault.classList.remove("hidden");

    if (id === "browser") {
        appContentDefault.classList.add("hidden");
        appContentBrowser.classList.remove("hidden");
        loadBrowserHomePage();
    } else if (id === "diary") {
        appContentText.innerHTML = "Diary is empty.";
    } else {
        appContentText.innerHTML = name + " app is under development.";
    }
}

function closeApp() {
    appView.classList.add("hidden");
    homeView.classList.remove("hidden");
}

window.onload = initializeAppGrid;