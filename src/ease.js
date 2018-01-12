const EventEmitter = require('eventemitter3')
const Penner = require('penner')
const exists = require('exists')

const DomEaseElement = require('./easeElement')

/**
 * Manages all animations running on DOM objects
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
     * @param {boolean} [options.pauseOnBlur] pause timer on blur, resume on focus
     * @fires DomEase#complete
     * @fires DomEase#each
     */
    constructor(options)
    {
        super()
        this.options = options || {}
        this.options.duration = this.options.duration || 1000
        this.options.ease = this.options.ease || Penner.linear
        this.list = []
        this.empty = true
        if (!options.autostart)
        {
            this.start()
        }
        if (options.pauseOnBlur)
        {
            window.addEventListener('blur', () => this.blur())
            window.addEventListener('focus', () => this.focus())
        }
    }

    /**
     * start animation loop
     * alternatively, you can manually call update() on each loop
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
            const elapsed = this._last ? time - this._last : 0
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
     * add animation(s) to a DOM element
     * @param {(HTMLElement|HTMLElement[])} element
     * @param {object} params
     * @param {number} [params.left] uses px
     * @param {number} [params.top] uses px
     * @param {number} [params.width] uses px
     * @param {number} [params.height] uses px
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
     * @returns {DomEaseElement}
     */
    add(element, params, options)
    {
        // call add on all elements if array
        if (Array.isArray(element))
        {
            for (let i = 0; i < element.length; i++)
            {
                if (i === element.length - 1)
                {
                    return this.add(element[i], params, options)
                }
                else
                {
                    this.add(element[i], params, options)
                }
            }
        }

        // set up default options
        options = options || {}
        options.duration = exists(options.duration) ? options.duration : this.options.duration
        options.ease = options.ease || this.options.ease
        if (typeof options.ease === 'string')
        {
            options.ease = Penner[options.ease]
        }

        if (element.__domEase)
        {
            element.__domEase.add(params, options)
        }
        else
        {
            const domEase = element.__domEase = new DomEaseElement(element)
            domEase.add(params, options)
            this.list.push(domEase)
        }
        return element.__domEase
    }

    /**
     * remove animation(s)
     * @param {(Animation|HTMLElement)} object
     */
    remove(object)
    {
        const element = object.__domEase ? object.__domEase.element : object
        const index = this.list.indexOf(element)
        if (index !== -1)
        {
            this.list.splice(index, 1)
        }
        delete element.__domEase
    }

    /**
     * remove all animations from list
     */
    removeAll()
    {
        while (this.list.length)
        {
            const DomEaseElement = this.list.pop()
            if (DomEaseElement.element.__domEase)
            {
                delete DomEaseElement.element.__domEase
            }
        }
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
        if (!this.empty && Array.keys(this.list).length === 0 && !this.empty)
        {
            this.emit('done', this)
            this.empty = true
        }
    }

    /**
     * number of elements being DomEaseElementd
     * @returns {number}
     */
    countElements()
    {
        return this.list.length
    }

    /**
     * number of active animations across all elements
     * @returns {number}
     */
    countRunning()
    {
        let count = 0
        for (let entry of this.list)
        {
            count += Object.keys(entry) - 1
        }
        return count
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