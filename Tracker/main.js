const { app } = require("electron");

const tracker = require("./src/tracker");

app.whenReady().then(() => {
  console.log("FocusVector Tracker Started");

  tracker.start();
});

app.on("window-all-closed", () => {
  // Keep running in background
});