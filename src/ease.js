const EventEmitter = require('eventemitter3')

const Number = require('./number')
const Color = require('./color')
const Transform = require('./transform')
const Margin = require('./margin')
const utils = require('./utils')

class Ease extends EventEmitter
{
    /**
     * Ease class returned by DomEase.add()
     * @extends EventEmitter
     * @param {HTMLElement} element
     * @param {object} params
     * @param {number} [params.left] in px
     * @param {number} [params.right] in px
     * @param {number} [params.top] in px
     * @param {number} [params.bottom] in px
     * @param {number} [params.width] in px
     * @param {number} [params.height] in px
     * @param {number} [params.scale]
     * @param {number} [params.scaleX]
     * @param {number} [params.scaleY]
     * @param {number} [params.opacity]
     * @param {number} [params.marginLeft] in px
     * @param {number} [params.marginRight] in px
     * @param {number} [params.marginTop] in px
     * @param {number} [params.marginBottom] in px
     * @param {(color|color[])} [params.color]
     * @param {(color|color[])} [params.backgroundColor]
     * @param {object} [options]
     * @param {number} [options.start] use this as the starting value
     * @param {number} [options.duration]
     * @param {(string|function)} [options.ease]
     * @param {(boolean|number)} [options.repeat]
     * @param {boolean} [options.reverse]
     * @param {number} [options.wait]
     * @returns {Ease}
     * @fires Ease#each
     * @fires Ease#complete
     * @fires Ease#loop
     * @hideconstructor
     */
    constructor(element, params, options)
    {
        super()
        this.element = element
        this.list = []
        this.time = 0
        this.duration = options.duration
        this.ease = options.ease
        this.repeat = options.repeat
        this.reverse = options.reverse
        this.wait = options.wait || 0
        for (let entry in params)
        {
            switch (entry)
            {
                case 'left':
                    this.list.push(new Number(element, entry, element.offsetLeft, params[entry], 'px'))
                    break

                case 'top':
                    this.list.push(new Number(element, entry, element.offsetTop, params[entry], 'px'))
                    break

                case 'bottom':
                    this.list.push(new Number(element, entry, element.parentNode.offsetHeight - (element.offsetTop + element.offsetHeight), params[entry], 'px'))
                    break

                case 'right':
                    this.list.push(new Number(element, entry, element.parentNode.offsetWidth - (element.offsetLeft + element.offsetWidth), params[entry], 'px'))
                    break

                case 'color':
                    this.list.push(new Color(element, 'color', params[entry], this.duration / (1 + params[entry].length)))
                    break

                case 'backgroundColor':
                    this.list.push(new Color(element, 'backgroundColor', this.duration / (1 + params[entry].length)))
                    break

                case 'scale':
                    if (this.transform)
                    {
                        this.transform.add('scaleX', params[entry])
                    }
                    else
                    {
                        this.transform = new Transform(element, 'scaleX', params[entry])
                        this.list.push(this.transform)
                    }
                    this.transform.add('scaleY', params[entry])
                    break

                case 'scaleX':
                case 'scaleY':
                    if (this.transform)
                    {
                        this.transform.add(entry, params[entry])
                    }
                    else
                    {
                        this.transform = new Transform(element, entry, params[entry])
                        this.list.push(this.transform)
                    }
                    break

                case 'opacity':
                    this.list.push(new Number(element, entry, utils.getComputed(element, 'opacity'), params[entry]))
                    break

                case 'width':
                    this.list.push(new Number(element, entry, element.offsetWidth, params[entry], 'px'))
                    break

                case 'height':
                    this.list.push(new Number(element, entry, element.offsetHeight, params[entry], 'px'))
                    break

                case 'marginLeft':
                case 'marginRight':
                case 'marginTop':
                case 'marginBottom':
                    if (this.margin)
                    {
                        this.margin.add(entry, params[entry])
                    }
                    else
                    {
                        this.margin = new Margin(element, entry, params[entry])
                        this.list.push(this.margin)
                    }
                    break

                default:
                    console.warn(entry + ' not setup for animation in dom-ease.')
            }
        }
    }

    update(elapsed)
    {
        if (this.wait)
        {
            this.wait -= elapsed
            if (this.wait < 0)
            {
                elapsed = -this.wait
                this.wait = 0
            }
            else
            {
                return
            }
        }
        const list = this.list
        let leftover = null
        this.time += elapsed
        if (this.time >= this.duration)
        {
            leftover = this.time - this.duration
            this.time -= leftover
        }
        const percent = this.ease(this.time, 0, 1, this.duration)
        for (let i = 0, _i = list.length; i < _i; i++)
        {
            list[i].update(percent, this.time)
        }
        this.emit('each', this)

        // handle end of duration
        if (leftover !== null)
        {
            if (this.reverse)
            {
                this.reverseEases()
                this.time = leftover
                this.emit('loop', this)
                if (!this.repeat)
                {
                    this.reverse = false
                }
                else if (this.repeat !== true)
                {
                    this.repeat--
                }
            }
            else if (this.repeat)
            {
                this.emit('loop', this)
                this.time = leftover
                if (this.repeat !== true)
                {
                    this.repeat--
                }
            }
            else
            {
                this.emit('complete', this)
                return true
            }
        }
    }

    reverseEases()
    {
        const list = this.list
        for (let i = 0, _i = list.length; i < _i; i++)
        {
            const ease = list[i]
            ease.reverse()
        }
    }
}

/**
 * fires when eases are complete
 * @event Ease#complete
 * @type {Ease}
 */

/**
 * fires on each loop while eases are running
 * @event Ease#each
 * @type {Ease}
 */

/**
 * fires when eases repeat or reverse
 * @event Ease#loop
 * @type {Ease}
 */

module.exports = Ease