import { BrowserWindow } from "electron";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createAppWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  });

  mainWindow.loadURL(winURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

/* function createAppWindow() {
  let win = new BrowserWindow({
    width: 1000,
    height: 600
  });

  //Depending on the environment setting, load local server or prod build of Vue
  let url =
    process.env.NODE_ENV === "DEV"
      ? "http://localhost:8080/"
      : `file://${process.cwd()}/dist/index.html`;

  win.loadURL(url);

  //win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });
} */

export default createAppWindow;
