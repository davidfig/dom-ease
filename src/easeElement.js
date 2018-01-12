const EventEmitter = require('eventemitter3')

const Left = require('./left')
const Top = require('./top')
const Color = require('./color')
const BackgroundColor = require('./backgroundColor')
const ScaleX = require('./scaleX')
const ScaleY = require('./scaleY')
const Scale = require('./scale')
const Opacity = require('./opacity')
const Width = require('./width')
const Height = require('./height')

class DomEaseElement extends EventEmitter
{
    /**
     * each DOM element has its own DomEaseElement object returned by add() or accessed through HTMLElement.__domEase
     * @extends EventEmitter
     * @fires DomEaseElement#each-*
     * @fires DomEaseElement#complete-*
     * @fires DomEaseElement#loop-* - called when animation repeats or reverses
     */
    constructor(element)
    {
        super()

        /**
         * element being animated
         * @member {HTMLElement}
         */
        this.element = element
        this.eases = {}
    }

    add(params, options)
    {
        for (let entry in params)
        {
            switch (entry)
            {
                case 'left':
                    this.eases['left'] = new Left(this.element, params[entry], options)
                    break

                case 'top':
                    this.eases['top'] = new Top(this.element, params[entry], options)
                    break

                case 'color':
                    this.eases[entry] = new Color(this.element, params[entry], options)
                    break

                case 'backgroundColor':
                    this.eases[entry] = new BackgroundColor(this.element, params[entry], options)
                    break

                case 'scale':
                    this.eases[entry] = new Scale(this.element, params[entry], options)
                    break

                case 'scaleX':
                    this.eases[entry] = new ScaleX(this.element, params[entry], options)
                    break

                case 'scaleY':
                    this.eases[entry] = new ScaleY(this.element, params[entry], options)
                    break

                case 'opacity':
                    this.eases[entry] = new Opacity(this.element, params[entry], options)
                    break

                case 'width':
                    this.eases[entry] = new Width(this.element, params[entry], options)
                    break

                case 'height':
                    this.eases[entry] = new Height(this.element, params[entry], options)
                    break

                default:
                    console.warn(entry + ' not setup for animation in DomEase.')
            }
        }
    }

    update(elapsed)
    {
        const eases = this.eases
        for (let key in eases)
        {
            const ease = eases[key]
            ease.time += elapsed
            let leftover = null
            if (ease.time >= ease.options.duration)
            {
                leftover = ease.time - ease.options.duration
                ease.time -= leftover
            }
            ease.update()
            if (leftover !== null)
            {
                const options = ease.options
                if (options.reverse)
                {
                    this.emit('loop-' + key, ease.element)
                    ease.reverse()
                    ease.time = leftover
                    if (!options.repeat)
                    {
                        options.reverse = false
                    }
                    else if (options.repeat !== true)
                    {
                        options.repeat--
                    }
                }
                else if (options.repeat)
                {
                    this.emit('loop-' + key, ease.element)
                    ease.time = leftover
                    if (options.repeat !== true)
                    {
                        options.repeat--
                    }
                }
                else
                {
                    this.emit('complete-' + key, ease.element)
                    delete eases[key]
                }
            }
            this.emit('each-' + key, ease.element)
        }
        this.emit('each', this)
        if (Object.keys(eases) === 0)
        {
            this.emit('empty', this)
            return true
        }
    }
}

/**
 * fires when there are no more animations
 * where name is the name of the element being DomEaseElementd (e.g., complete-left fires when left finishes animating)
 * @event DomEaseElement#complete-*
 * @type {DomEaseElement}
 */

/**
 * fires on each loop where there are animations
 * where name is the name of the element being DomEaseElementd (e.g., complete-left fires when left finishes animating)
 * @event DomEaseElement#each-*
 * @type {DomEaseElement}
 */

/**
 * fires when an animation repeats or reverses
 * where name is the name of the element being DomEaseElementd (e.g., complete-left fires when left finishes animating)
 * @event DomEaseElement#loop-*
 * @type {DomEaseElement}
 */

module.exports = DomEaseElement