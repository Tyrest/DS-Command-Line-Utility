const ipc = require("electron").ipcRenderer;
const FitAddon = require("xterm-addon-fit").FitAddon;

const term = new Terminal({
  cursorBlink: true,
  cursorStyle: "bar",
  fontFamily: "Fira Code",
  fontSize: 14,
  fontWeight: "normal",
  fontWeightBold: "bold",
  lineHeight: 1,
  letterSpacing: 0,
  theme: {
    background: "#1e1e1e",
    foreground: "#ffffff",
    cursor: "#ffffff",
    cursorAccent: "#ffffff",
    selection: "#ffffff",
  },
});

const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById("terminal"));
fitAddon.fit();

term.onData((e) => {
  ipc.send("terminal-into", e);
  fitAddon.fit();
});

ipc.on("terminal-incData", (event, data) => {
  term.write(data);
});