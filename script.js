// Create home screen app icons
const appGrid = document.getElementById("appGrid");
const appView = document.getElementById("app-view");
const homeView = document.getElementById("home-view");
const appTitle = document.getElementById("appTitle");
const appContent = document.getElementById("app-content-text");

const apps = [
    { name: "Messages", content: "Open Messages App" },
    { name: "Photos", content: "Your Gallery" },
    { name: "Browser", content: "Welcome to Browser" },
    { name: "Clock", content: "Clock is running..." },
    { name: "Maps", content: "Find your way!" },
    { name: "Notes", content: "Your notes appear here." }
];

apps.forEach(app => {
    const wrapper = document.createElement("div");
    wrapper.style.textAlign = "center";
    
    const icon = document.createElement("div");
    icon.classList.add("app-icon");
    icon.onclick = () => openApp(app.name, app.content);

    const label = document.createElement("div");
    label.style.color = "white";
    label.style.marginTop = "6px";
    label.style.fontSize = "11px";
    label.innerText = app.name;

    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    appGrid.appendChild(wrapper);
});

function openApp(name, content) {
    appTitle.innerText = name;
    appContent.innerText = content;

    homeView.style.transform = "translateX(-100%)";
    appView.style.transform = "translateX(0)";
}

function closeApp() {
    homeView.style.transform = "translateX(0)";
    appView.style.transform = "translateX(100%)";
}