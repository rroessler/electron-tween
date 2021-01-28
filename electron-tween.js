/**
 * ElectronTWEEN class contains static methods to "tween" properties such as opacity, size
 * and position of the Electron BrowserWindow.
 */
class ElectronTWEEN {
    /**
     * Fades a BrowserWindow as per the options given. Expects a BrowserWindow
     * to be given.
     * 
     * @param {Object} opts                         Options object.
     * @param {Electron.BrowserWindow} opts.win     BrowserWindow to fade.
     * @param {Number} opts.from                    Opacity to fade FROM.
     * @param {Number} opts.to                      Opacity to fade TO.
     * @param {Number} opts.time                    Time to take to fade.
     * @param {String} opts.easing                  Easing type used for fade.
     * @param {Boolean} opts.start                  Boolean to set whether to start automatically.
     * @param {Function} opts.onComplete           Function to run on completion of the tween.
     */
    static Fade(opts) {
        // assign default options
        const defs = {
            win: null,
            from: 0,
            to: 1,
            time: 1000,
            easing: 'LINEAR',
            start: true,
            onComplete: () => { }
        };
        opts = { ...defs, ...opts };

        // check that the time value given is valid
        try {
            ElectronTWEEN.IsValidTime(opts.time);
        } catch (err) { throw err; }

        // check the window is valid and exists
        try {
            ElectronTWEEN.IsValidWindow(opts.win);
        } catch (err) { throw err; }

        const opacity = { a: opts.from };
        const tween = new SimpleTWEEN(opacity)
            .To({ a: opts.to }, opts.time)
            .SetEasing(opts.easing)
            .OnUpdate((op) => {
                opts.win.setOpacity(op.a);
            });

        if (opts.start) {
            tween.Start(opts.onComplete);
        }

        return tween;
    }

    /**
     * Fades a desired BrowserWindow to full opacity.
     * 
     * @param {Object} opts                         Options object.
     * @param {Electron.BrowserWindow} opts.win     BrowserWindow to fade.
     * @param {Number} opts.time                    Time to take to fade.
     * @param {String} opts.easing                  Easing type used for fade.
     * @param {Boolean} opts.start                  Boolean to set whether to start automatically.
     * @param {Function} opts.onComplete           Function to run on completion of the tween.
     */
    static FadeIn(opts) {
        // assigning default options
        let defs = {
            win: null,
            time: 1000,
            easing: 'LINEAR',
            start: true,
            onComplete: () => { }
        };
        opts = { ...defs, ...opts };

        // check that the time value given is valid
        try {
            ElectronTWEEN.IsValidTime(opts.time);
        } catch (err) { throw err; }

        // check the window is valid and exists
        try {
            ElectronTWEEN.IsValidWindow(opts.win);
        } catch (err) { throw err; }

        // return the fade sequence
        return ElectronTWEEN.Fade({
            ...{
                from: opts.win.getOpacity(),
                to: 1
            }, ...opts
        });
    }

    /**
     * Fades a desired BrowserWindow to complete transparency.
     * 
     * @param {Object} opts                         Options object.
     * @param {Electron.BrowserWindow} opts.win     BrowserWindow to fade.
     * @param {Number} opts.time                    Time to take to fade.
     * @param {String} opts.easing                  Easing type used for fade.
     * @param {Boolean} opts.start                  Boolean to set whether to start automatically.
     * @param {Function} opts.onComplete           Function to run on completion of the tween.
     */
    static FadeOut(opts) {
        // assigning default options
        let defs = {
            win: null,
            time: 1000,
            easing: 'LINEAR',
            start: true,
            onComplete: () => { }
        };
        opts = { ...defs, ...opts };

        // check that the time value given is valid
        try {
            ElectronTWEEN.IsValidTime(opts.time);
        } catch (err) { throw err; }

        // check the window is valid and exists
        try {
            ElectronTWEEN.IsValidWindow(opts.win);
        } catch (err) { throw err; }

        // return the fade sequence
        return ElectronTWEEN.Fade({
            ...{
                from: opts.win.getOpacity(),
                to: 0
            }, ...opts
        });
    }

    /**
     * Resizes a BrowserWindow to a given size. Recommended
     * 
     * @param {Object} opts                         Options object.
     * @param {Electron.BrowserWindow} opts.win     BrowserWindow to fade.
     * @param {Object} opts.from                    XY Object.
     * @param {Number} opts.from.x                  'x' item of XY object.
     * @param {Number} opts.from.y                  'y' item of XY object.
     * @param {Object} opts.to                      XY Object.
     * @param {Number} opts.to.x                    'x' item of XY object.
     * @param {Number} opts.to.y                    'y' item of XY object.
     * @param {Number} opts.time                    Time to take to fade.
     * @param {String} opts.easing                  Easing type used for fade.
     * @param {Boolean} opts.start                  Boolean to set whether to start automatically.
     * @param {Function} opts.onComplete            Function to run on completion of the tween.
     */
    static Resize(opts) {
        // assign default options
        const defs = {
            win: null,
            from: null,
            to: { x: 640, y: 600 },
            time: 1000,
            easing: 'LINEAR',
            start: true,
            onComplete: () => { }
        };
        opts = { ...defs, ...opts };

        // update all nullish items that are allowed
        opts.from = opts.from ?? { x: opts.win.getSize()[0], y: opts.win.getSize()[1] }; // if FROM is null set as window's current value

        // check that the time value given is valid
        try {
            ElectronTWEEN.IsValidTime(opts.time);
        } catch (err) { throw err; }

        // check the window is valid and exists
        try {
            ElectronTWEEN.IsValidWindow(opts.win);
        } catch (err) { throw err; }


        // make sure both the from and to are valid
        try {
            ElectronTWEEN.IsValidXY(opts.from);
            ElectronTWEEN.IsValidXY(opts.to);
        } catch (err) { throw err; }

        const tween = new SimpleTWEEN(opts.from)
            .To(opts.to, opts.time)
            .SetEasing(opts.easing)
            .OnUpdate((size) => {
                // ensure all values are integers and >= 0
                size.x = Math.max(Math.round(size.x), 0);
                size.y = Math.max(Math.round(size.y), 0);
                opts.win.setSize(size.x, size.y);
            });

        if (opts.start) {
            tween.Start(opts.onComplete);
        }

        return tween;
    }

    /**
     * Moves a BrowserWindow using in-built DOM window variable.
     * 
     * @param {Object} opts                         Options object.
     * @param {Electron.BrowserWindow} opts.win     BrowserWindow to fade.
     * @param {Object} opts.from                    XY Object.
     * @param {Number} opts.from.x                  'x' item of XY object.
     * @param {Number} opts.from.y                  'y' item of XY object.
     * @param {Object} opts.to                      XY Object.
     * @param {Number} opts.to.x                    'x' item of XY object.
     * @param {Number} opts.to.y                    'y' item of XY object.
     * @param {Number} opts.time                    Time to take to fade.
     * @param {String} opts.easing                  Easing type used for fade.
     * @param {Boolean} opts.start                  Boolean to set whether to start automatically.
     * @param {Function} opts.onComplete            Function to run on completion of the tween.
     */
    static Move(opts) {
        // assign default options
        const defs = {
            win: null,
            from: null,
            to: { x: 250, y: 250 },
            time: 1000,
            easing: 'LINEAR',
            start: true,
            onComplete: () => { }
        };
        opts = { ...defs, ...opts };

        // update all nullish items that are allowed
        opts.from = opts.from ?? { x: opts.win.getBounds().x, y: opts.win.getBounds().y }; // if FROM is null set as window's current value

        // check that the time value given is valid
        try {
            ElectronTWEEN.IsValidTime(opts.time);
        } catch (err) { throw err; }

        // check the window is valid and exists
        try {
            ElectronTWEEN.IsValidWindow(opts.win);
        } catch (err) { throw err; }

        // make sure both the from and to are valid
        try {
            ElectronTWEEN.IsValidXY(opts.from);
            ElectronTWEEN.IsValidXY(opts.to);
        } catch (err) { throw err; }

        const tween = new SimpleTWEEN(opts.from)
            .To(opts.to, opts.time)
            .SetEasing(opts.easing)
            .OnUpdate((pos) => {
                // ensure all positions are rounded to integers and >= 0
                pos.x = Math.max(Math.round(pos.x), 0);
                pos.y = Math.max(Math.round(pos.y), 0);
                opts.win.setBounds({ x: pos.x, y: pos.y });
            });

        if (opts.start) {
            tween.Start(opts.onComplete);
        }

        return tween;
    }

    /**
     * Returns the available tween methods for use on which operating systems.
     */
    static Status() {
        // returns the status of what can be done on the specified operating system
        switch (process.platform) {
            case 'win32':
                break;
            case 'darwin':
                break;
            default: // linux
                break;
        }
    }

    /**
     * Checks if a given BrowserWindow is valid for Tweening.
     * 
     * @param {Electron.BrowserWindow} win      Electron BrowserWindow to Tween. 
     */
    static IsValidWindow(win) {
        // check the window is valid and exists
        if (win == null || typeof win !== 'object') {
            throw new ReferenceError('Cannot TWEEN undefined, null or non-BrowserWindows.');
        }
    }

    /**
     * Validates whether a given object is valid XY coord / size.
     * 
     * @param {Object} objXY    XY object to validate.
     */
    static IsValidXY(objXY) {
        for (let key of Object.keys(objXY)) {
            if (key !== 'x' && key !== 'y') {
                throw new TypeError('Given To/From is of an invalid object type. Must be of a type {x: ..., y:, ...}.');
            }
        }
    }

    /**
     * Determines whether the time input given is a valid integer.
     * 
     * @param {Number} time     Presumed time integer value > 0.
     */
    static IsValidTime(time) {
        if (time === NaN || time <= 0) {
            throw new TypeError(`Invalid transition time. Must be an integer and greater than 0.`);
        }
    }
};

class SimpleTWEEN {
    /**
     * On construction, we take in a set of initial values which is comprised
     * of an object with simple properties (all of which must be numeric);
     * 
     * @param {Object} _values              Initial tween values.
     * @param {Number} _refreshRate         Refresh Rate at which the TWEEN updates (ms).
     */
    constructor(_values, _refreshRate = 10) {
        // assign simple tween values
        this.initValues = _values;
        this.refreshRate = _refreshRate;
        this.timer = 0;

        // validate the initial values are all simple numerics
        try {
            SimpleTWEEN.Validate(this.initValues);
        } catch (err) {
            // invalid object given
            this.state = 'INVALID'; // toggle state to invalid
            throw err;
        }

        // set an initial state
        this.state = 'IDLE';
    }


    /**
     * Sets the TO values for the Tween Process.
     * 
     * @param {Object} _newValues       Object of values to tween to.
     * @param {Number} _time            Total time it takes to tween.
     */
    To(_newValues, _time) {
        if (this.state !== 'IDLE') {
            throw new ReferenceError('Can only call method .To() after SimpleTWEEN construction.');
        }

        // assign new values
        this.newValues = _newValues;
        this.time = _time;

        // validate the new values
        try {
            SimpleTWEEN.Validate(this.newValues);
        } catch (err) {
            // invalid object given
            this.state = 'INVALID'; // toggle state to invalid
            throw err;
        }

        // toggle state to constructed
        this.state = 'CONSTRUCTED';
        return this; // allow chaining
    }


    /**
     * Sets the EASING multiplier to be used.
     * 
     * @param {String} EASING       String name denoting the Easing Type.
     */
    SetEasing(EASING = 'LINEAR') {
        if (this.state !== 'CONSTRUCTED') {
            throw new ReferenceError('Can only call method .SetEasing() after SimpleTWEEN.To().');
        }

        // set the updateable items
        this.volatileItems = {};

        // and set a common multiplier for easing
        this.multiplier = num => { return 1; }

        switch (EASING) {
            /**
             * All multiplier functions here have utilised the easing functions
             * found over at https://easings.net/
             * 
             * It really is fuul of brilliantly helpful easing displays / information.
             */
            case 'SINE_IN':
                this.multiplier = x => {
                    return 1 - Math.cos((x * Math.PI) / 2);
                }
                break;
            case 'SINE_OUT':
                this.multiplier = x => {
                    return Math.sin((x * Math.PI) / 2);
                }
                break;
            case 'SINE_IN_OUT':
                this.multiplier = x => {
                    return -(Math.cos(Math.PI * x) - 1) / 2;
                }
                break;
            case 'QUAD_IN':
                this.multiplier = x => {
                    return x * x;
                }
                break;
            case 'QUAD_OUT':
                this.multiplier = x => {
                    return 1 - (1 - x) * (1 - x);
                }
                break;
            case 'QUAD_IN_OUT':
                // update the multplier to be quadratic in/out
                this.multiplier = x => {
                    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
                }
                break;
            case 'CUBIC_IN':
                this.multiplier = x => {
                    return x ** 3;
                }
                break;
            case 'CUBIC_OUT':
                this.multiplier = x => {
                    return 1 - Math.pow(1 - x, 3);
                }
                break;
            case 'CUBIC_IN_OUT':
                // update the multplier to be cubic in/out
                this.multiplier = x => {
                    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
                }
                break;
            case 'QUART_IN':
                this.multiplier = x => {
                    return x ** 4;
                }
                break;
            case 'QUART_OUT':
                this.multiplier = x => {
                    return 1 - Math.pow(1 - x, 4);
                }
                break;
            case 'QUART_IN_OUT':
                // update the multplier to be quintic in/out
                this.multiplier = x => {
                    return x < 0.5 ? 8 * x ** 4 : 1 - Math.pow(-2 * x + 2, 4) / 2;
                }
                break;
            case 'QUINT_IN':
                this.multiplier = x => {
                    return x ** 5;
                }
                break;
            case 'QUINT_OUT':
                this.multiplier = x => {
                    return 1 - Math.pow(1 - x, 5);
                }
                break;
            case 'QUINT_IN_OUT':
                this.multiplier = x => {
                    return x < 0.5 ? 16 * x ** 5 : 1 - Math.pow(-2 * x + 2, 5) / 2;
                }
                break;
            case 'EXPO_IN':
                this.multiplier = x => {
                    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
                }
                break;
            case 'EXPO_OUT':
                this.multiplier = x => {
                    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
                }
                break;
            case 'EXPO_IN_OUT':
                this.multiplier = x => {
                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                                : (2 - Math.pow(2, -20 * x + 10)) / 2;
                }
                break;
            case 'CIRC_IN':
                this.multiplier = x => {
                    return 1 - Math.sqrt(1 - Math.pow(x, 2));
                }
                break;
            case 'CIRC_OUT':
                this.multiplier = x => {
                    return Math.sqrt(1 - Math.pow(x - 1, 2));
                }
                break;
            case 'CIRC_IN_OUT':
                this.multiplier = x => {
                    return x < 0.5
                        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
                }
                break;
            case 'BACK_IN':
                this.multiplier = x => {
                    const c1 = 1.70158;
                    const c3 = c1 + 1;

                    return c3 * x ** 3 - c1 * x * x;
                }
                break;
            case 'BACK_OUT':
                this.multiplier = x => {
                    const c1 = 1.70158;
                    const c3 = c1 + 1;

                    return 1 + c3 * math.pow(x - 1, 3) + c1 * math.pow(x - 1, 2);
                }
                break;
            case 'BACK_IN_OUT':
                this.multiplier = x => {
                    const c1 = 1.70158;
                    const c2 = c1 * 1.525;

                    return x < 0.5
                        ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                        : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
                }
                break;
            case 'ELASTIC_IN':
                this.multiplier = x => {
                    const c4 = (2 * Math.PI) / 3;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
                }
                break;
            case 'ELASTIC_OUT':
                this.multiplier = x => {
                    const c4 = (2 * Math.PI) / 3;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
                }
                break;
            case 'ELASTIC_IN_OUT':
                // update the multplier to be elastic in/out
                this.multiplier = x => {
                    const c5 = (2 * Math.PI) / 4.5;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : x < 0.5
                                ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                                : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
                }
                break;
            case 'BOUNCE_IN':
                this.multiplier = x => {
                    return 1 - easeOutBounce(x);
                }
                break;
            case 'BOUNCE_OUT':
                this.multiplier = x => {
                    return easeOutBounce(x);
                }
                break;
            case 'BOUNCE_IN_OUT':
                this.multiplier = x => {
                    return x < 0.5
                        ? (1 - easeOutBounce(1 - 2 * x)) / 2
                        : (1 + easeOutBounce(2 * x - 1)) / 2;
                }
                break;
            default:
                EASING = 'LINEAR';
                break;
        }

        // and set the easing type
        this.EASING = EASING;

        // just do a general calculation of steps
        for (let [key, value] of Object.entries(this.initValues)) {
            this.volatileItems[key] = {
                value,  // set value
                step: (this.newValues[key] - value) * (this.refreshRate / this.time) // and set the expected step (mostly only used for linear items)
            };
        }

        // and update state
        this.state = 'WAITING';
        return this;

        /**
         * Anonymous function to help consolidate the ease type of BOUNCE.
         * 
         * @param {Number} x        Number to ease to (between 0 -> 1).
         */
        function easeOutBounce(x) {
            const n1 = 7.5625;
            const d1 = 2.75;

            if (x < 1 / d1) {
                return n1 * x * x;
            } else if (x < 2 / d1) {
                return n1 * (x -= 1.5 / d1) * x + 0.75;
            } else if (x < 2.5 / d1) {
                return n1 * (x -= 2.25 / d1) * x + 0.9375;
            } else {
                return n1 * (x -= 2.625 / d1) * x + 0.984375;
            }
        }
    }

    /**
     * Sets a function call to run on each update of the tween items.
     * 
     * @param {Function} _updateCallback    Update to run upon tween updates.
     */
    OnUpdate(_updateCallback = (items = null) => { }) {
        if (this.state !== 'WAITING') {
            throw new ReferenceError('Can only call method .OnUpdate() after SimpleTWEEN.Easing().');
        }

        // assign callback values and update the state
        this.onUpdateCallback = _updateCallback;
        this.state = 'READY';
        return this;
    }


    /**
     * Starts the TWEEN process. Runs an interval that updates based on the
     * refresh rate given. On complete it runs a given complete function,
     * otherwise does nothing.
     * 
     * @param {Function} _onComplete        Function to run on completion. Does
     *                                      not run if an error occurs.
     */
    Start(_onComplete = () => { }) {
        if (this.state !== 'READY') {
            throw new ReferenceError('Can only call method .Start() after SimpleTWEEN.OnUpdate().');
        }

        // call the initial values firstly
        this.onUpdateCallback(this.DemodifyItems()); // we call demodify to convert volatile to stable return values

        // and construct the interval to update values over
        this.tweenInterval = setInterval(() => {
            // check if timer should have concluded
            if (this.timer >= this.time) {
                this.onUpdateCallback(this.newValues);
                this.state = 'FINISHED';
                clearInterval(this.tweenInterval);

                // and run the on complete function
                _onComplete();
                return;
            }

            // update values
            this.UpdateValues();

            // attempt to call update value
            try {
                // call the data callback if needed
                this.onUpdateCallback(this.DemodifyItems());
            } catch (err) {
                // anytime an error occurs here we cancel the current operation
                this.state = 'ERROR';
                clearInterval(this.tweenInterval);
                throw err;
            }

            // increment the timer when haven't reached finish
            this.timer += this.refreshRate;
        }, this.refreshRate);

        // and set a final state to block continuation of methods
        this.state = 'RUNNING';

        // and finally return this as we want to allow cancelling
        return this;
    }

    Cancel() {
        if (this.state !== 'RUNNING') {
            throw new ReferenceError('Can not Cancel SimpleTWEEN as it is not RUNNING.');
        }

        if (!this.tweenInterval) {
            // silently return if tweenInterval is nothing as should not reach here if this
            // is the case
            return;
        }

        // and stop the tween interval
        clearInterval(this.tweenInterval);
    }

    /**
     * Validates given values object to ensure NO nested properties, and all
     * properties are only defined by numerics. Static method so that values can
     * be pre-checked before even constructing a new tween instance.
     * 
     * @param {Object} values       Values object to be validated.
     */
    static Validate(values) {
        if (typeof values !== 'object') {
            throw new TypeError('Invalid values object. Expected an object with numbered properties ( SimpleTWEEN::new() ).');
        }

        for (let [key, val] of Object.entries(values)) {
            if (typeof values[key] !== 'number' || typeof val !== 'number') {
                throw new ReferenceError(`Invalid property value given. Expected type "number" except received "${typeof val}". Found on value key "${key}" ( SimpleTWEEN::new() ).`);
            }
        }
    }


    /**
     * Modifies each volatile items value property as per the EASING specified.
     */
    UpdateValues() {
        switch (this.EASING) {
            case 'LINEAR':
                for (let [key, item] of Object.entries(this.volatileItems)) {
                    this.volatileItems[key].value += item.step;
                }
                break;
            default:
                for (let key of Object.keys(this.volatileItems)) {
                    this.volatileItems[key].value = this.initValues[key] + (this.newValues[key] - this.initValues[key]) * this.multiplier(this.timer / this.time);
                }

                break;
        }
    }


    /**
     * Retrieves the items values to return the user's given update function.
     */
    DemodifyItems() {
        let _items = {};
        for (let [key, item] of Object.entries(this.volatileItems)) {
            _items[key] = item.value;
        }

        return _items;
    }
};

module.exports = {
    SimpleTWEEN,
    ElectronTWEEN
}