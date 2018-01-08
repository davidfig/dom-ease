const Events = require('eventemitter3')

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

class DomEaseElement extends Events
{
    /**
     * each DOM element has its own DomEaseElement object returned by add() or accessed through HTMLElement.__domEase
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
        this.animations = {}
    }

    add(DomEaseElement, options)
    {
        for (let entry in DomEaseElement)
        {
            switch (entry)
            {
                case 'left':
                    this.animations['left'] = new Left(this.element, DomEaseElement[entry], options)
                    break

                case 'top':
                    this.animations['top'] = new Top(this.element, DomEaseElement[entry], options)
                    break

                case 'color':
                    this.animations[entry] = new Color(this.element, DomEaseElement[entry], options)
                    break

                case 'backgroundColor':
                    this.animations[entry] = new BackgroundColor(this.element, DomEaseElement[entry], options)
                    break

                case 'scale':
                    this.animations[entry] = new Scale(this.element, DomEaseElement[entry], options)
                    break

                case 'scaleX':
                    this.animations[entry] = new ScaleX(this.element, DomEaseElement[entry], options)
                    break

                case 'scaleY':
                    this.animations[entry] = new ScaleY(this.element, DomEaseElement[entry], options)
                    break

                case 'opacity':
                    this.animations[entry] = new Opacity(this.element, DomEaseElement[entry], options)
                    break

                case 'width':
                    this.animations[entry] = new Width(this.element, DomEaseElement[entry], options)
                    break

                case 'height':
                    this.animations[entry] = new Height(this.element, DomEaseElement[entry], options)
                    break

                default:
                    console.warn(entry + ' not setup for animation in DomEase.')
            }
        }
    }

    update(elapsed)
    {
        const animations = this.animations
        for (let animation in animations)
        {
            const DomEaseElement = animations[animation]
            if (DomEaseElement.update(elapsed))
            {
                const options = DomEaseElement.options
                if (options.reverse)
                {
                    this.emit('loop-' + DomEaseElement.name, DomEaseElement.element)
                    DomEaseElement.reverse()
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
                    DomEaseElement.repeat()
                    if (options.repeat !== true)
                    {
                        options.repeat--
                    }
                }
                else
                {
                    this.emit('complete-' + DomEaseElement.name, DomEaseElement.element)
                    delete animations[animation]
                }
            }
            this.emit('each-' + DomEaseElement.name, DomEaseElement.element)
        }
        this.emit('each', this)
        if (Object.keys(animations) === 0)
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