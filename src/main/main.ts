import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import Store from 'electron-store';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

// Define the store type, allowing string keys and unknown value types
interface StoreType {
  [key: string]: unknown;
}

// Initialize electron-store with a custom directory for storage
const store = new Store<StoreType>({
  cwd: path.join(__dirname, '../electron-store'), // Store location
});

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info'; // Set log level
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify(); // Auto-update check
  }
}

let mainWindow: BrowserWindow | null = null;

// Listen for requests to get values from the store
ipcMain.on('electron-store-get', (event, key: string) => {
  try {
    // @ts-ignore
    event.returnValue = store.get(key); // Fetch value from store
  } catch (error) {
    console.error(`Error fetching value for key "${key}":`, error);
    event.returnValue = null;
  }
});

// Listen for requests to set values in the store
ipcMain.on('electron-store-set', (event, key: string, val: unknown) => {
  try {
    // @ts-ignore
    store.set(key, val); // Store the key-value pair
  } catch (error) {
    console.error(`Error setting value for key "${key}":`, error);
  }
});

// Example IPC handler for communication testing
ipcMain.on('ipc-example', (event, arg: string) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

// Enable source map support in production
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

// Check if the app is in debug mode
const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

// Enable Electron debugging in development
if (isDebug) {
  require('electron-debug')();
}

// Install dev tools extensions (e.g., React Developer Tools)
const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

ipcMain.handle('store:set', async (event, key: string, value: unknown) => {
  try {
    // @ts-ignore
    store.set(key, value);
  } catch (error) {
    console.error(`Error setting store value for key "${key}":`, error);
  }
});

ipcMain.handle('store:get', async (event, key: string) => {
  try {
    // @ts-ignore
    return store.get(key);
  } catch (error) {
    console.error(`Error getting store value for key "${key}":`, error);
    return null;
  }
});

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  new AppUpdater();
};

// Handle application lifecycle events
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
