const EventEmitter = require('eventemitter3')
const exists = require('exists')

const Color = require('./color')
const Transform = require('./transform')
const Number = require('./number')

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
        const element = this.element
        for (let entry in params)
        {
            switch (entry)
            {
                case 'left':
                    this.eases['left'] = new Number(entry, element.offsetLeft, params[entry], options, 'px')
                    break

                case 'top':
                    this.eases['top'] = new Number(entry, element.offsetTop, params[entry], options, 'px')
                    break

                case 'color':
                    this.eases[entry] = new Color('color', element.style.color, params[entry], options)
                    break

                case 'backgroundColor':
                    this.eases[entry] = new Color('backgroundColor', element.style.backgroundColor, params[entry], options)
                    break

                case 'scale':
                    this.eases[entry] = new Transform(this, entry, params[entry], options)
                    break

                case 'scaleX':
                    this.eases[entry] = new Transform(this, entry, params[entry], options)
                    break

                case 'scaleY':
                    this.eases[entry] = new Transform(this, entry, params[entry], options)
                    break

                case 'opacity':
                    this.eases[entry] = new Number(entry, exists(element.opacity) ? parseFloat(element.opacity) : 1, params[entry], options)
                    break

                case 'width':
                    this.eases[entry] = new Number(entry, element.offsetWidth, params[entry], options, 'px')
                    break

                case 'height':
                    this.eases[entry] = new Number(entry, element.offsetHeight, params[entry], options, 'px')
                    break

                default:
                    console.warn(entry + ' not setup for animation in DomEase.')
            }
        }
    }

    update(elapsed)
    {
        this.transforms = this.readTransform()
        const element = this.element
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
            ease.update(element)
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
        this.writeTransform()
        this.emit('each', this)
        if (Object.keys(eases) === 0)
        {
            this.emit('empty', this)
            return true
        }
    }

    readTransform()
    {
        const transforms = []
        const transform = this.element.style.transform
        let inside, name = '', values
        for (let i = 0, _i = transform.length; i < _i; i++)
        {
            const letter = transform[i]
            if (inside)
            {
                if (letter === ')')
                {
                    inside = false
                    transforms.push({ name, values })
                    name = ''
                }
                else
                {
                    values += letter
                }
            }
            else
            {
                if (letter === '(')
                {
                    values = ''
                    inside = true
                }
                else if (letter !== ' ')
                {
                    name += letter
                }
            }
        }
        return transforms
    }

    changeTransform(name, values)
    {
        const transforms = this.transforms
        for (let i = 0, _i = transforms.length; i < _i; i++)
        {
            if (transforms[i].name === name)
            {
                transforms[i].values = values
                return
            }
        }
        this.transforms.push({name, values})
    }

    writeTransform()
    {
        const transforms = this.transforms
        let s = ''
        for (let i = 0, _i = transforms.length; i < _i; i++)
        {
            const transform = transforms[i]
            s += transform.name + '(' + transform.values + ')'
        }
        this.element.style.transform = s
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