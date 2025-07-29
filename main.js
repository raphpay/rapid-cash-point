// main.js
const { app, BrowserWindow, ipcMain, session } = require("electron");
const path = require("path");
const printTicket = require("./backend/printTicket");

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    (async () => {
      await createWindow();
    })();
  }
});

if (!app.isPackaged) {
  // Set Chromium log level to "fatal" (3) to suppress warnings about React Dev Tools. These would be printed in
  // the console every time the dev tools are opened in the BrowserWindow.
  // https://chromium.googlesource.com/chromium/src/+/HEAD/base/logging.h#376
  app.commandLine.appendSwitch("log-level", "3");
}

(async () => {
  await app.whenReady();
  await createWindow();
})();

async function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("set-title", (_event, title) => {
    win.setTitle(title);
  });

  ipcMain.on("request-greeting", (_event, greeting) => {
    win.webContents.send("greeting", `Hello: ${greeting}`);
  });

  ipcMain.handle("test-invoke", (_event, args) => {
    console.log("Receiving", args.username, args.password);
  });

  ipcMain.handle("print-ticket", (_event, args) => {
    return printTicket(args);
  });

  await win.loadURL(
    app.isPackaged ? getProductionFileUrl() : getDevelopmentFileUrl()
  );
}

function getDevelopmentFileUrl() {
  return new URL("http://localhost:5173").href;
}

function getProductionFileUrl() {
  return `file://${path.join(__dirname, "..", "renderer", "index.html")}`;
}
