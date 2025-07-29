const { contextBridge, ipcRenderer } = require("electron");

const ipcHandler = {
  send(channel, ...args) {
    ipcRenderer.send(channel, ...args);
  },
  invoke(channel, ...args) {
    return ipcRenderer.invoke(channel, ...args);
  },
  once(channel, callback) {
    ipcRenderer.once(channel, (_event, ...args) => callback(...args));
  },
  on(channel, callback) {
    const subscription = (_event, ...args) => callback(...args);
    ipcRenderer.on(channel, subscription);
    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
  clear(channel) {
    ipcRenderer.removeAllListeners(channel);
  },
  testInvoke: (args) => ipcRenderer.invoke("test-invoke", args),
  printTicket: (args) => ipcRenderer.invoke("print-ticket", args),
};

contextBridge.exposeInMainWorld("ipc", ipcHandler);
