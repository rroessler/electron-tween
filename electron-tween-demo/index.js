/**
 * Typical Electron Setup.
 */
const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        backgroundColor: '#333333',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true    // only enable this if absolutely neccesary
        }
    });

    win.setMenuBarVisibility(false);

    win.loadFile('./index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});