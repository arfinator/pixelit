const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    icon: path.join(__dirname, 'docs/assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    backgroundColor: '#21383a',
    title: 'Pixelator - Image to Pixel Art Converter'
  });

  // Load the simplified desktop UI
  mainWindow.loadFile(path.join(__dirname, 'app/index.html'));

  // Open DevTools in development (optional - comment out for production)
  // mainWindow.webContents.openDevTools();

  // Remove menu bar for cleaner look (optional)
  mainWindow.setMenuBarVisibility(false);
}

// Create window when app is ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
