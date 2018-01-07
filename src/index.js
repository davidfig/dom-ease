const Events = require('eventemitter3')
const Penner = require('penner')
const exists = require('exists')

const Left = require('./left')
const Top = require('./top')
const Flash = require('./flash')
const ScaleX = require('./scaleX')
const ScaleY = require('./scaleY')
const Scale = require('./scale')

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
            for (let el in element)
            {
                this.add(el, animate)
            }
            return
        }

        // set up default options
        options = options || {}
        options.duration = exists(options.duration) ? options.duration : this.options.duration
        options.ease = options.ease || this.options.ease
        if (typeof options.ease === 'string')
        {
            options.ease = Penner[options.ease]
        }

        let animations
        if (element.__domEase)
        {
            animations = element.__domEase
        }
        else
        {
            this.list.push(element)
            animations = element.__domEase = { element }
        }

        // add parameters to animate
        for (let param in animate)
        {
            switch (param)
            {
                case 'x': case 'left':
                    animations[param] = new Left(element, animate[param], options)
                    break

                case 'y': case 'top':
                    animations[param] = new Top(element, animate[param], options)
                    break

                case 'flash':
                    animations[param] = new Flash(element, animate[param], options)
                    break

                case 'scale':
                    animations[param] = new Scale(element, animate[param], options)
                    break

                case 'scaleX':
                    animations[param] = new ScaleX(element, animate[param], options)
                    break

                case 'scaleY':
                    animations[param] = new ScaleY(element, animate[param], options)
                    break

                case 'element':
                    break

                default:
                    console.warn(param + ' not setup for animation in DomEase.')
            }
        }
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
            const element = this.list.pop()
            if (element.__domEase)
            {
                delete element.__domEase
            }
        }
    }

    /**
     * update frame
     * @param {number} elapsed time in ms
     */
    update(elapsed)
    {
        for (let key in this.list)
        {
            const element = this.list[key]
            const animations = element.__domEase
            for (let animation in animations)
            {
                const animate = animations[animation]
                if (animate !== element && animate.update(elapsed))
                {
                    const options = animate.options
                    if (options.reverse)
                    {
                        animate.reverse()
                        if (!options.repeat)
                        {
                            options.reverse = false
                        }
                        if (options.repeat !== true)
                        {
                            options.repeat--
                        }
                    }
                    if (options.repeat)
                    {
                        animate.repeat()
                        if (options.repeat !== true)
                        {
                            options.repeat--
                        }
                    }
                    else
                    {
                        delete animations[animation]
                    }
                }
            }
            if (Object.keys(animations) === 0)
            {
                delete this.list[element]
            }
        }
        this.emit('each', this)
        if (this.list.length === 0 && !this.empty)
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