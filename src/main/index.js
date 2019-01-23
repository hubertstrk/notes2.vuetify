'use strict'

import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let loading
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  // splash window
  loading = new BrowserWindow({
    show: false,
    frame: false,
    height: 300,
    width: 600
  })

  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1400,
    noteIntegration: 'iframe',
    webPreferences: {
      webSecurity: false
    },
    show: false
  })

  mainWindow.webContents.once('dom-ready', () => {
    console.log('main loaded')
    setTimeout(() => {
      mainWindow.show()
      // loading.hide()
      // loading.close()
    }, 4000)
  })

  mainWindow.loadURL(winURL)

  loading.loadURL('https://dazzling-curran-2ed140.netlify.com/')
  loading.webContents.once('dom-ready', () => {
    loading.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
