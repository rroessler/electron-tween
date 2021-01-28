# "electron-tween"

"electron-tween" is a Node Library specifically created to add tween functionality to Electron BrowserWindows.

Coming from a need at work to have more dynamic "native" window animations and nothing else being available, I decided to pull together my own tween library primarily for Electron.

## Installation

To install "electron-tween", use npm. The preferred method is to install "electron-tween" as a dependency, alongside
Electron being a development dependency.

```bash
npm install --save electron-tween
```

## Usage

As a TWEEN library, "electron-tween" has been written so that as little items from Electron are used. To do so, all functionality
of "electron-tween" relies upon being given a BrowserWindow object. Although this can be done through using Electrons remote module,
it is recommended to make use of IPC events instead to access windows/this library from the main process.

The current functionality includes:
* [Fade](#fade): Fades a BrowserWindow from a given opacity to another.
* [FadeIn](#fade_in): Fades a BrowserWindow IN to full opacity.
* [FadeOut](#fade_out): Fades a BrowserWindow OUT to full transparency.
* [Resize](#resize): Resizes a BrowserWindow to given size.
* [Move](#move): Moves a BrowserWindow to given position.

### Fade

With any BrowserWindow instance, you could fade a window from it's current opacity to another using:

```javascript

const { BrowserWindow } = require('electron');
const { ElectronTWEEN } = require('electron-tween');
let browserWin = BrowserWindow.getFocusedWindow();

ElectronTWEEN.Fade({
    win: browserWin,                    // must set a valid BrowserWindow
    from: browserWin.getOpacity(),      // retrieve the current windows opacity
    to: 0.86,                           // change to this opacity
    time: 500,                          // time it takes to transition
    easing: "QUAD_IN_OUT",              // type of easing
    start: true,                        // start immediately (otherwise returned object can be started manually
    onComplete: () => { /* ... */ }     // callback function to call when transition is complete
});

```

**Note:** It is also good to note that the BrowserWindow used here could come from the Main or Renderer process. However it is advised to run all fade methods from the Main process and keep the remote module disabled.

### FadeIn

A wrapper function for [Fade](#fade) to fade a given BrowserWindow to full opacity (alpha = 1). 

```javascript

const { BrowserWindow } = require('electron');
const { ElectronTWEEN } = require('electron-tween');
let browserWin = BrowserWindow.getFocusedWindow();

ElectronTWEEN.FadeIn({
    win: browserWin,                    // must set a valid BrowserWindow
    time: 500,                          // time it takes to transition
    easing: "LINEAR",                   // type of easing
    start: true,                        // start immediately (otherwise returned object can be started manually
    onComplete: () => { /* ... */ }     // callback function to call when transition is complete
});

```


### FadeOut

A wrapper function for [Fade](#fade) to fade a given BrowserWindow to full transparency (alpha = 0). 

```javascript

const { BrowserWindow } = require('electron');
const { ElectronTWEEN } = require('electron-tween');
let browserWin = BrowserWindow.getFocusedWindow();

ElectronTWEEN.FadeOut({
    win: browserWin,                    // must set a valid BrowserWindow
    time: 500,                          // time it takes to transition
    easing: "CIRC_IN_OUT",              // type of easing
    start: true,                        // start immediately (otherwise returned object can be started manually
    onComplete: () => { /* ... */ }     // callback function to call when transition is complete
});

```

### Resize

Resize() utilises the BrowserWindow.setBounds() method to change the BrowserWindows size. This was chosen as the native DOM window
object can only resize a window to a set limit, and used over the setSize() method as if a BrowserWindow is NOT resizeable then only setBounds() will work. This method can be used as:

```javascript

const { ElectronTWEEN } = require('electron-tween');

ElectronTWEEN.Resize({
    from: { x: 1024, y: 768 },  // if not set uses current BrowserWindow size, otherwise JUMPS to this size
    to: { x: 640, y: 480 },     // must provide an XY object such as this
    time: 1000,                 // transition time
    easing: 'LINEAR',           // type of easing
    start: true,                // automatically start
    onComplete: () => { }       // callback for tween completion
});

```


### Move

Move() utilises the BrowserWindow.setBounds() method to change the BrowserWindows position. This method can be used as:

```javascript

const { ElectronTWEEN } = require('electron-tween');

ElectronTWEEN.Move({
    from: { x: 0, y: 0 },       // if not set uses current BrowserWindow position, otherwise JUMPS to a position
    to: { x: 250, y: 250 },     // must provide an XY object such as this
    time: 1000,                 // transition time
    easing: 'EXPO_IN',           // type of easing
    start: true,                // automatically start
    onComplete: () => { }       // callback for tween completion
});

```

## Easing Types

There are multiple easing types available. These have been sourced from [easings.net](https://easings.net/) which has helpful displays and information for web based easings.

- Linear            -> LINEAR
- Quadratic         -> QUAD
- Cubic             -> CUBIC
- Quartic           -> QUART
- Quintic           -> QUINT
- Exponential       -> EXPO
- Sine              -> SINE
- Circular          -> CIRC
- Back              -> BACK
- Elastic           -> ELASTIC
- Bounce            -> BOUNCE

Alongside this, qualifiers of IN, OUT and IN_OUT are to be used to generate the full range of easing types:

Curve | nil | IN | OUT | IN_OUT 
----- | --- | -- | --- | ------
LINEAR | &#9745; | &#9746; | &#9746; | &#9746;
QUAD | &#9746; | &#9745; | &#9745; | &#9745;
CUBIC | &#9746; | &#9745; | &#9745; | &#9745;
QUART | &#9746; | &#9745; | &#9745; | &#9745;
QUINT | &#9746; | &#9745; | &#9745; | &#9745;
EXPO | &#9746; | &#9745; | &#9745; | &#9745;
SINE | &#9746; | &#9745; | &#9745; | &#9745;
CIRC | &#9746; | &#9745; | &#9745; | &#9745;
BACK | &#9746; | &#9745; | &#9745; | &#9745;
ELASTIC | &#9746; | &#9745; | &#9745; | &#9745;
BOUNCE | &#9746; | &#9745; | &#9745; | &#9745;

These should be reference as:

```javascript

let easing = "QUART_IN";
easing = "BOUNCE_IN_OUT";
easing = "LINEAR"; // the only exception

```


## Promise Example

Tween's can also be promise chained by utilising the onComplete() input property. This allows for an ease of chaining tween's after each other. In future, this will be
expanded on to allow for tween chaining regardless of utilizing built-in promises (however doing so does open up more versatility in terms of asynchronicity).

```javascript

const { ElectronTWEEN } = require('electron-tween');
let browserWin = BrowserWindow.getFocusedWindow();

new Promise(resolve => {
    ElectronTWEEN.FadeOut({
        win: browserWin,
        onComplete: () => {
            resolve();
        }
    });
}).then(() => {
    return new Promise(resolve => {
        ElectronTWEEN.FadeIn({
            win: browserWin,
            onComplete: () => {
                resolve();
            }
        });
    });
}).then(() => {
    // continue as desired
}).catch(err => {
    // error handling
});

```

## IPC Method

Although using Electron's remote module is a quick way to get access to BrowserWindows in the Renderer Process, 
it is recommended to actually run all of "electron-tween" methods from the Main Process instead. This is because
the remote module is [considered harmful](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31),
and has is a [security liability](https://github.com/electron/electron/issues/21408) waiting to occur.

As such the below method is what would be considered conventional when using this library.

**renderer.js**
```javascript
// other code...
const { ipcRenderer } = require('electron');

ipcRenderer.send('tween-window', {
    // your options should go here
});

```

**main.js**
```javascript

// previous code...
const { ipcMain, BrowserWindow } = require('electron');
const { ElectronTWEEN } = require('electron-tween');

ipcMain.on('tween-window', (event, opts) => {
    const windowToTween = BrowserWindow.getFocusedWindow();
    ElectronTWEEN.Resize({
        win: windowToTween, // presumably given ElectronTWEEN the appropriate window to be tweened
        ...opts // destructuring options, otherwise add as desired
    });
});

```


## Demo Example

To try a demo example, run the following:

```bash
git clone https://github.com/rroessler/electron-tween # clone the project repo
npm install # ensure all Electron dependencies are included (and spectre.css styling)
npm start # and run electron
```

## License

[MIT](https://github.com/electron/electron/blob/master/LICENSE)