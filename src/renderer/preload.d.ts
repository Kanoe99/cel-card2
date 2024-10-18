import { ElectronHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    electronStore: {
      set: (key: string, value: string) => Promise<void>;
      get: (key: string) => Promise<string | null>;
    };
  }
}

export {};
