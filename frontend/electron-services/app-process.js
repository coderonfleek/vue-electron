const { BrowserWindow } = require("electron");

function createAppWindow() {
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
}

module.exports = createAppWindow;
