const Events = require('eventemitter3')
const Penner = require('penner')
const exists = require('exists')

const Animate = require('./src/animate')

module.exports = class DomEase extends Events
{
    /**
     * @param {object} [options]
     * @param {number} [options.duration=1000] default duration
     * @param {(string|function)} [options.ease=penner.linear] default ease
     * @param {(string|function)} [options.autostart=true]
     * @fires complete
     * @fires each
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
        }
    }

    /**
     * this is the object return by calling add()
     * @typedef Animation
     * @type {object}
     * @property {number} time - current time
     * @property {object} options - options passed (be careful changing these)
     * @fires each
     * @fires complete
     * @fires loop - called when animation repeats or reverses
     */

    /**
     * start an animation
     * @param {(HTMLElement|HTMLElement[])} element
     * @param {object} animate (currently supports x, y, flash)
     * @param {object} [options]
     * @param {number} [options.duration]
     * @param {(string|function)} [options.ease]
     * @param {(boolean|number)} [options.repeat]
     * @param {boolean} [options.reverse]
     * @returns {Animation}
     */
    add(element, animate, options)
    {
        // call add on all elements if array
        if (Array.isArray(element))
        {
            for (let i = 0; i < element.length; i++)
            {
                if (i === element.length - 1)
                {
                    return this.add(element[i], animate, options)
                }
                else
                {
                    this.add(element[i], animate, options)
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
            element.__domEase.add(animate, options)
        }
        else
        {
            const domEase = element.__domEase = new Animate(element)
            domEase.add(animate, options)
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
            const animate = this.list.pop()
            if (animate.element.__domEase)
            {
                delete animate.element.__domEase
            }
        }
    }

    /**
     * update frame
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
     * number of elements being animated
     * @type {number}
     */
    get countElements()
    {
        return this.list.length
    }

    /**
     * number of active animations across all elements
     * @type {number}
     */
    get countRunning()
    {
        let count = 0
        for (let entry of this.list)
        {
            count += Object.keys(entry) - 1
        }
        return count
    }

    /**
     * fires when there are no more animations
     * @event complete
     * @type {(DomEase|Animation)}
     */

    /**
     * fires on each loop where there are animations
     * @event each
     * @type {(DomEase|Animation)}
     */

    /**
     * fires when an animation repeats or reverses
     * @event loop
     * @type {Animation}
     */
}