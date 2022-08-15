const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    quit: () => ipcRenderer.send('quit'),
    github: () => ipcRenderer.send('github'),
    youtube: (query) => ipcRenderer.send('youtube', query),
    devtools: () => ipcRenderer.send('devtools'),
    setToken: (token) => ipcRenderer.send('set-token', token),
    getToken: () => ipcRenderer.invoke('get-token'),
    deleteToken: () => ipcRenderer.send('delete-token'),
    resetDatabase: () => ipcRenderer.send('reset-database'),
})