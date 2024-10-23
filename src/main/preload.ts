import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  store: {
    // Sync call for getting data from the main process
    get(key: string) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    // Async call for setting data in the main process
    set(property: string, val: unknown) {
      ipcRenderer.send('electron-store-set', property, val);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

// Expose store-specific methods
contextBridge.exposeInMainWorld('electronStore', {
  set: (key: string, value: unknown) =>
    ipcRenderer.invoke('store:set', key, value),
  get: (key: string) => ipcRenderer.invoke('store:get', key),
});

export type ElectronHandler = typeof electronHandler;
