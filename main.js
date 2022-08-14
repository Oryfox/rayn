const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const { startAPI } = require("./rayn-api");
const Store = require("electron-store");
const store = new Store();

function createWindow() {
    const win = new BrowserWindow({
        width: store.get('width') || 800,
        height: store.get('height') || 600,
        icon: path.join(__dirname, "/icon.png"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.setFullScreen(store.get('fullscreen') || false);

    win.loadFile("dist/index.html");
    win.on('resized', () => {
        store.set('width', win.getSize()[0]);
        store.set('height', win.getSize()[1]);
        store.set('fullscreen', win.isFullScreen());
    });
}

app.whenReady()
    .then(() => startAPI())
    .then(() => {
        ipcMain.on("quit", () => {
            app.quit();
        })
        createWindow();
        setMainMenu();

        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

function setMainMenu() {
    const template = [
        {
            label: 'Rayn',
            submenu: [
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    click() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Dev Tools',
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
            ]
        }
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}