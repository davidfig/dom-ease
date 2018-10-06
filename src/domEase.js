const EventEmitter = require('eventemitter3')
const Penner = require('penner')

const Ease = require('./ease')

/**
 * Manages all eases
 * @extends EventEmitter
 * @example
 * var Ease = require('dom-ease');
 * var ease = new Ease({ duration: 3000, ease: 'easeInOutSine' });
 *
 * var test = document.getElementById('test')
 * ease.add(test, { left: 20, top: 15, opacity: 0.25 }, { repeat: true, reverse: true })
 */
class DomEase extends EventEmitter
{
    /**
     * @param {object} [options]
     * @param {number} [options.duration=1000] default duration
     * @param {(string|function)} [options.ease=penner.linear] default ease
     * @param {(string|function)} [options.autostart=true]
     * @param {number} [options.maximumFrameRate=16.667]
     * @param {boolean} [options.pauseOnBlur] pause timer on blur, resume on focus
     * @fires DomEase#each
     * @fires DomEase#complete
     */
    constructor(options)
    {
        super()
        this.options = options || {}
        this.options.duration = this.options.duration || 1000
        this.options.ease = this.options.ease || Penner.linear
        this.options.maximumFrameRate = this.options.maximumFrameRate || 16.667
        this.list = []
        this.empty = true
        if (!this.options.autostart)
        {
            this.start()
        }
        if (this.options.pauseOnBlur)
        {
            window.addEventListener('blur', () => this.blur())
            window.addEventListener('focus', () => this.focus())
        }
    }

    /**
     * start animation loop (automatically called unless options.autostart=false)
     */
    start()
    {
        if (!this._requested)
        {
            this._requested = true
            this.loop()
            this.running = true
        }
    }

    blur()
    {
        if (this.running)
        {
            this.stop()
            this.running = true
        }
    }

    focus()
    {
        if (this.running)
        {
            this.start()
        }
    }

    loop(time)
    {
        if (time)
        {
            let elapsed = this._last ? time - this._last : 0
            elapsed = elapsed > this.options.maximumFrameRate ? this.options.maximumFrameRate : elapsed
            this.update(elapsed)
        }
        this._last = time
        this._requestId = window.requestAnimationFrame((time) => this.loop(time))
    }

    /**
     * stop animation loop
     */
    stop()
    {
        if (this._requested)
        {
            window.cancelAnimationFrame(this._requestId)
            this._requested = false
            this.running = false
        }
    }

    /**
     * add ease(s) to one or more elements
     * @param {(HTMLElement|HTMLElement[])} element(s)
     * @param {object} params
     * @param {number} [params.left] in px
     * @param {number} [params.top] in px
     * @param {number} [params.width] in px
     * @param {number} [params.height] in px
     * @param {number} [params.scale]
     * @param {number} [params.scaleX]
     * @param {number} [params.scaleY]
     * @param {number} [params.opacity]
     * @param {(color|color[])} [params.color]
     * @param {(color|color[])} [params.backgroundColor]
     * @param {object} [options]
     * @param {number} [options.duration]
     * @param {(string|function)} [options.ease]
     * @param {(boolean|number)} [options.repeat]
     * @param {boolean} [options.reverse]
     * @returns {(Ease|Ease[])} ease(s) for each element
     */
    add(element, params, options)
    {
        // set up default options
        options = options || {}
        options.duration = typeof options.duration !== 'undefined' ? options.duration : this.options.duration
        options.ease = options.ease || this.options.ease
        if (typeof options.ease === 'string')
        {
            options.ease = Penner[options.ease]
        }
        if (Array.isArray(element))
        {
            const eases = []
            for (let el of element)
            {
                const ease = new Ease(el, params, options)
                this.list.push(ease)
                eases.push(ease)
            }
            return eases
        }
        else
        {
            const ease = new Ease(element, params, options)
            this.list.push(ease)
            return ease
        }
    }

    /**
     * remove all eases on element
     * @param {HTMLElement} element
     */
    removeObjectEases(element)
    {
        const list = this.list
        for (let i = 0, _i = list.length; i < _i; i++)
        {
            const ease = list[i]
            if (ease.element === element)
            {
                list.splice(i, 1)
                i--
                _i--
            }
        }
    }

    /**
     * remove eases using Ease object returned by add()
     * @param {Ease} ease
     */
    remove(ease)
    {
        const list = this.list
        for (let i = 0, _i = list.length; i < _i; i++)
        {
            if (list[i] === ease)
            {
                list.splice(i, 1)
                return
            }
        }
    }

    /**
     * remove all eases
     */
    removeAll()
    {
        this.list = []
    }

    /**
     * update frame; this is called automatically if start() is used
     * @param {number} elapsed time in ms
     */
    update(elapsed)
    {
        for (let i = 0, _i = this.list.length; i < _i; i++)
        {
            if (this.list[i].update(elapsed))
            {
                this.list.splice(i, 1)
                i--
                _i--
            }
        }
        this.emit('each', this)
        if (!this.empty && this.list.length === 0)
        {
            this.emit('complete', this)
            this.empty = true
        }
    }

    /**
     * number of eases
     * @returns {number}
     */
    getCount()
    {
        return this.list.length
    }
}

/**
 * fires when there are no more animations for a DOM element
 * @event DomEase#complete
 * @type {DomEase}
 */

/**
 * fires on each loop for a DOM element where there are animations
 * @event DomEase#each
 * @type {DomEase}
 */

module.exports = DomEase