/* const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let url =
  process.env.NODE_ENV === "DEV"
    ? "http://localhost:8080/"
    : `file://${process.cwd()}/dist/index.html`;

app.on("ready", () => {
  let window = new BrowserWindow({ width: 900, height: 6580 });
  window.loadURL(url);
}); */

const { app } = require("electron");

const createAuthWindow = require("./electron-services/auth-process");
const createAppWindow = require("./electron-services/app-process");
const authService = require("./electron-services/auth-service");

async function showWindow() {
  try {
    await authService.refreshTokens();
    return createAppWindow();
  } catch (err) {
    createAuthWindow();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", showWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  // On macOS, it's common to re-create a window in the app when the
  // dock icon is clicked, and there are no other windows open.
  /* if (win === null) {
    showWindow();
  } */
});
