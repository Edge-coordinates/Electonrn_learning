// The built directory structure
//
// ├─┬ dist
// │ ├─┬ electron
// │ │ ├── main.js
// │ │ └── preload.js
// │ ├── index.html
// │ ├── ...other-static-files-from-public
// │
process.env.DIST = join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, '../public')

import { join } from 'path'
import { app, BrowserWindow } from 'electron'

let win: BrowserWindow | null
// Here, you can also use other preload
const preload = join(__dirname, './preload.js')
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const url = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    width:1000,
    height:1200,
    icon: join(process.env.PUBLIC as string, 'logo.svg'),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload,
      webSecurity: false, //是否禁用同源策略(上线时删除此配置)
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (url) {
    win.loadURL(url)
  } else {
    win.loadFile(join(process.env.DIST as string, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  win = null
})

app.whenReady().then(createWindow)
