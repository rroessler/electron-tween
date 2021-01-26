# "electron-tween"

"electron-tween" is a Node Library specifically created to add tween functionality to Electron BrowserWindows.

## Installation

To install "electron-tween", use npm. The preferred method is to install "electron-tween" as a dependency, alongside
Electron being a development dependency.

```bash
npm install --save electron-tween
```

## Usage

As a TWEEN library, "electron-tween" has been written so that as little items from Electron are used. To do so, all functionality
of "electron-tween" relies either upon the DOM window object, or if imperatively needed, a chosen BrowserWindow as input.

The current functionality includes:
* [Fade](#fade): Fades a BrowserWindow from a given opacity to another.
* [FadeIn](#fade_in): Fades a BrowserWindow IN to full opacity.
* [FadeOut](#fade_out): Fades a BrowserWindow OUT to full transparency.
* [Resize](#resize): Resizes a BrowserWindow (renderer only through DOM window object)
* [Move](#move): Moves a BrowserWindow (renderer only through DOM window object)

### Fade

With any BrowserWindow instance, you could fade a window from it's current opacity to another using:

```javascript
// ...

const { ElectronTWEEN } = require('electron-tween');
let browserWin = BrowserWindow.getFocusedWindow(); // or: remote.BrowserWindow().getFocusedWindow();

ElectronTWEEN.Fade({
    win: browserWin, // must set a valid BrowserWindow
    from: browserWin.getOpacity(), // retrieve the current windows opacity
    to: 0.86, // change to this opacity
    time: 500, // time it takes to transition
    easing: "QUAD_IN_OUT", // type of easing
    start: true, // start immediately (otherwise returned object can be started manually
    onComplete: () => { /* ... */ } // callback function to call when transition is complete
});
```
