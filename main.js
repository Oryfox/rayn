const { app, BrowserWindow, Menu, ipcMain, shell, dialog } = require("electron");
const path = require("path");
const { startAPI } = require("./rayn-api");
const Store = require("electron-store");
const store = new Store();
const fetch = require('electron-fetch').default;

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
        if (process.platform === 'darwin') {
            store.set('fullscreen', win.isFullScreen());
            if (!win.isFullScreen()) {
                store.set('width', win.getSize()[0]);
                store.set('height', win.getSize()[1]);
            }
        } else {
            store.set('width', win.getSize()[0]);
            store.set('height', win.getSize()[1]);
        }
    });
}

app.whenReady()
    .then(() => startAPI())
    .then(() => {
        ipcMain.on("quit", () => {
            if (dialog.showMessageBoxSync(BrowserWindow.getAllWindows()[0], {
                buttons: ["Yes", "No"],
                message: "Are you sure you want to quit?"
            }) === 0) {
                app.quit();
            }
        })
        ipcMain.on('github', () => {
            shell.openExternal("https://github.com/Oryfox/rayn")
        })
        ipcMain.on('youtube', (event, query) => {
            fetch("https://yt.oryfox.de/?query=" + query)
                .then(response => response.json())
                .then(json => {
                    shell.openExternal(json[0].url)
                })
        })
        setMainMenu();
        createWindow();

        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });

app.on("window-all-closed", () => {
    app.quit();
});

function setMainMenu() {
    if (process.platform === 'darwin') {
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
    } else {
        Menu.setApplicationMenu(null);
    }
}