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
* [Fade](#fade)
* [FadeIn](#fade_in)
* [FadeOut](#fade_out)
* [Resize](#resize)
* [Move](#move)

```

```