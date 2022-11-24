// electron/electron.js
const path = require("path")
const { app, BrowserWindow } = require("electron")

const isDev = process.env.NODE_ENV == "dev"
// const isDev = false;
let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1281,
    height: 800,
    minWidth: 600,
    minHeight: 800,
    backgroundColor: "#2d3436",
    show: false,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      webviewTag: false, 
      preload: path.join(__dirname, "preload.js"),
    },
    title: require("../package.json").electronWindowTitle,
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  )
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
