const { remote } = require('electron');

// If allowing remote module then tween methods can be called from
// renderer process. This is NOT advisable though and common practice
// of disabling remote access and requesting Window Changes via IPC
// events is recommended.
const BrowserWindow = remote.BrowserWindow;
const { ElectronTWEEN } = require('../electron-tween');

/**
 * Implementing IPC requests after DOM content is loaded and can be used.
 */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function () { HandleButtonClick(this); });
    });
});

function HandleButtonClick(btn) {
    // set some initial items
    btn.disabled = true;
    const win = BrowserWindow.getFocusedWindow();

    // retrieve the easing type
    const easing = document.getElementById('easing').value + '_' + document.getElementById('easing-qualifier').value;

    // switch based on button chosen
    switch (btn.id.toUpperCase()) {
        case 'FADE':
            // display of promises being used to CHAIN tweens
            new Promise(resolve => {
                ElectronTWEEN.FadeOut({
                    win,
                    easing,
                    onComplete: () => {
                        resolve();
                    }
                });
            }).then(() => {
                ElectronTWEEN.FadeIn({
                    win,
                    easing,
                    onComplete: () => {
                        btn.disabled = false;
                    }
                });
            }).catch(/* Empty Catch */);
            break;
        case 'MOVE':
            // expects to be from the renderer process
            let startX = window.screenX;
            let startY = window.screenY;

            new Promise(resolve => {
                ElectronTWEEN.Move({
                    from: { x: startX, y: startY },
                    to: { x: 0, y: 0 },
                    easing,
                    onComplete: () => {
                        resolve();
                    }
                });
            }).then(() => {
                return new Promise(resolve => {
                    ElectronTWEEN.Move({
                        easing,
                        onComplete: () => {
                            resolve();
                        }
                    });
                });
            }).then(() => {
                ElectronTWEEN.Move({
                    from: { x: 250, y: 250 },
                    to: { x: startX, y: startY },
                    easing,
                    onComplete: () => {
                        btn.disabled = false;
                    }
                });
            }).catch(/* Empty Catch */);
            break;
        case 'EXPAND':
            // expects to be from the renderer process
            ElectronTWEEN.Resize({
                from: { x: 640, y: 480 },
                to: { x: 1024, y: 768 },
                easing,
                onComplete: () => {
                    document.getElementById('shrink').disabled = false;
                }
            });
            break;
        case 'SHRINK':
            // expects to be from the renderer process
            ElectronTWEEN.Resize({
                easing,
                onComplete: () => {
                    document.getElementById('expand').disabled = false;
                }
            });
            break;
        default:
            console.error('Incorrect Button Value');
            break;
    }
}