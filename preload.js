const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    quit: () => ipcRenderer.send('quit'),
    github: () => ipcRenderer.send('github'),
    youtube: (query) => ipcRenderer.send('youtube', query),
})