"use strict";
const { app, BrowserWindow, session } = require('electron');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const fetch = require('node-fetch'); // required 'fetch'

ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    blocker.enableBlockingInSession(session.defaultSession);
});



async function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 450,
        height: 700,
        title: 'YouTube Music',
        icon: './img/ytm_favicon.png',
        autoHideMenuBar: true,
        backgroundColor: '#000000',
        webPreferences: {
            nodeIntegration: true
        }
    })

    if (session.defaultSession === undefined) {
        throw new Error('defaultSession is undefined');
    }

    let blocker = await ElectronBlocker.fromPrebuiltAdsOnly(fetch); // ads only
    blocker.enableBlockingInSession(session.defaultSession);

    blocker.on('request-blocked', function() {
        console.log('blocked');
    });


    // load external URL
    win.loadURL('https://music.youtube.com');

    // Open the DevTools.
    // win.webContents.openDevTools()


    // Add custom CSS
    let contents = win.webContents
    contents.on('did-finish-load', function () {
        // contents.insertCSS('ytmusic-popup-container {display: none !important;}')
    })
}

app.allowRendererProcessReuse = false


// Create app window
app.on('ready', createWindow)



// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})