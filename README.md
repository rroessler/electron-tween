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

Resize() utilizes the DOM window object of a BrowserWindow, and as such must be called from the Renderer process. This is because the window.resizeTo() method is faster that repeatedly calling the BrowserWindow.setBounds() method. This method can be used as:

```javascript

const { ElectronTWEEN } = require('electron-tween');

ElectronTWEEN.Resize({
    from: { x: 1024, y: 768 },  // must provide an XY object such as this
    to: { x: 640, y: 480 },     // and same here
    time: 1000,                 // transition time
    easing: 'LINEAR',           // type of easing
    start: true,                // automatically start
    onComplete: () => { }       // callback for tween completion
});

```


### Move

Move() utilizes the DOM window object of a BrowserWindow, and as such must be called from the Renderer process. This is because the window.moveTo() method is faster that repeatedly calling the BrowserWindow.setBounds() method. This method can be used as:

```javascript

const { ElectronTWEEN } = require('electron-tween');

ElectronTWEEN.Move({
    from: { x: 0, y: 0 },       // must provide an XY object such as this
    to: { x: 250, y: 250 },     // and same here
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

Curve | IN | OUT | IN_OUT 
----- | -- | --- | ------
LINEAR | x | x | x
QUAD | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:
CUBIC | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:
QUART | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:
QUINT | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:
EXPO | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:
SINE | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:
CIRC | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:
BACK | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:
ELASTIC | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:
BOUNCE | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:

These should be reference as:

```javascript

let easing = "QUART_IN";
easing = "BOUNCE_IN_OUT";
easing = "LINEAR"; // the only exception

```

## Typical Usage


## Promise Example


## License

[MIT](https://github.com/electron/electron/blob/master/LICENSE)