const activeWin = require("active-win");

let intervalId = null;

async function pollActiveWindow() {
  try {
    const window = await activeWin();

    if (!window) {
      return;
    }

    console.log({
      app: window.owner.name,
      title: window.title
    });
  } catch (error) {
    console.error(error);
  }
}

function start() {
  intervalId = setInterval(
    pollActiveWindow,
    2000
  );
}

module.exports = {
  start
};