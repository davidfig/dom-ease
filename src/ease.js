const EventEmitter = require('eventemitter3')
const exists = require('exists')

class Ease extends EventEmitter
{
    /**
     * Ease class returned by DomEase.add()
     * @extends EventEmitter
     * @param {HTMLElement} element
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
        for (let entry in params)
        {
            switch (entry)
            {
                case 'left':
                    this.numberStart(entry, element.offsetLeft, params[entry], 'px')
                    break

                case 'top':
                    this.numberStart(entry, element.offsetTop, params[entry], 'px')
                    break

                case 'color':
                    this.colorStart('color', element.style.color, params[entry])
                    break

                case 'backgroundColor':
                    this.colorStart('backgroundColor', element.style.backgroundColor, params[entry])
                    break

                case 'scale':
                    this.transformStart(entry, params[entry])
                    break

                case 'scaleX':
                    this.transformStart(entry, params[entry])
                    break

                case 'scaleY':
                    this.transformStart(entry, params[entry])
                    break

                case 'opacity':
                    this.numberStart(entry, exists(element.opacity) ? parseFloat(element.opacity) : 1, params[entry])
                    break

                case 'width':
                    this.numberStart(entry, element.offsetWidth, params[entry], 'px')
                    break

                case 'height':
                    this.numberStart(entry, element.offsetHeight, params[entry], 'px')
                    break

                default:
                    console.warn(entry + ' not setup for animation in dom-ease.')
            }
        }
    }

    /**
     * create number entry
     * @private
     * @param {string} entry
     * @param {number} start
     * @param {number} to
     * @param {string} [units]
     */
    numberStart(entry, start, to, units)
    {
        const ease = { type: 'number', entry, to, start, delta: to - start, units: units || '' }
        this.list.push(ease)
    }

    numberUpdate(ease, percent)
    {
        this.element.style[ease.entry] = (ease.start + ease.delta * percent) + ease.units
    }

    /**
     * reverse number and transform
     * @private
     * @param {object} ease
     */
    easeReverse(ease)
    {
        const swap = ease.to
        ease.to = ease.start
        ease.start = swap
        ease.delta = -ease.delta
    }

    transformStart(entry, to)
    {
        const ease = { type: 'transform', entry, to }
        if (!this.transforms)
        {
            this.readTransform()
        }
        const transforms = this.transforms
        let found
        for (let i = 0, _i = transforms.length; i < _i; i++)
        {
            const transform = transforms[i]
            if (transform.name === entry)
            {
                switch (entry)
                {
                    case 'scale': case 'scaleX': case 'scaleY':
                        ease.start = parseFloat(transform.values)
                        break
                }
                found = true
                break
            }
        }
        if (!found)
        {
            switch (entry)
            {
                case 'scale': case 'scaleX': case 'scaleY':
                    ease.start = 1
            }
        }
        ease.delta = to - ease.start
        this.list.push(ease)
    }

    transformUpdate(ease, percent)
    {
        if (!this.changedTransform)
        {
            this.readTransform()
            this.changedTransform = true
        }
        const name = ease.entry
        const transforms = this.transforms
        const values = ease.start + ease.delta * percent
        for (let i = 0, _i = transforms.length; i < _i; i++)
        {
            if (transforms[i].name === name)
            {
                transforms[i].values = values
                return
            }
        }
        this.transforms.push({ name, values })
    }

    colorUpdate(ease)
    {
        const elementStyle = this.element.style
        const style = ease.style
        const colors = ease.colors
        const i = Math.floor(this.time / ease.interval)
        const color = colors[i]
        if (elementStyle[style] !== color)
        {
            elementStyle[style] = colors[i]
        }
    }

    colorReverse(ease)
    {
        const reverse = []
        const colors = ease.colors
        for (let color in colors)
        {
            reverse.unshift(colors[color])
        }
        reverse.push(reverse.shift())
        ease.colors = reverse
    }

    colorStart(style, original, colors)
    {
        const ease = { type: 'color', style }
        if (Array.isArray(colors))
        {
            ease.colors = colors
        }
        else
        {
            ease.colors = [colors]
        }
        colors.push(original)
        ease.interval = this.duration / colors.length
        this.list.push(ease)
    }

    update(elapsed)
    {
        this.changedTransform = false
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
            const ease = list[i]
            switch (ease.type)
            {
                case 'number':
                    this.numberUpdate(ease, percent)
                    break

                case 'color':
                    this.colorUpdate(ease)
                    break

                case 'transform':
                    this.transformUpdate(ease, percent)
                    break
            }
        }
        if (this.changedTransform)
        {
            this.writeTransform()
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
            if (ease.type === 'color')
            {
                this.colorReverse(ease)
            }
            else
            {
                this.easeReverse(ease)
            }
        }
    }

    readTransform()
    {
        this.transforms = []
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
                    this.transforms.push({ name, values })
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