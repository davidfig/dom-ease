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

module.exports = class Animate extends Events
{
    constructor(element)
    {
        super()
        this.element = element
        this.animations = {}
    }

    add(animate, options)
    {
        for (let entry in animate)
        {
            switch (entry)
            {
                case 'left':
                    this.animations['left'] = new Left(this.element, animate[entry], options)
                    break

                case 'top':
                    this.animations['top'] = new Top(this.element, animate[entry], options)
                    break

                case 'color':
                    this.animations[entry] = new Color(this.element, animate[entry], options)
                    break

                case 'backgroundColor':
                    this.animations[entry] = new BackgroundColor(this.element, animate[entry], options)
                    break

                case 'scale':
                    this.animations[entry] = new Scale(this.element, animate[entry], options)
                    break

                case 'scaleX':
                    this.animations[entry] = new ScaleX(this.element, animate[entry], options)
                    break

                case 'scaleY':
                    this.animations[entry] = new ScaleY(this.element, animate[entry], options)
                    break

                case 'opacity':
                    this.animations[entry] = new Opacity(this.element, animate[entry], options)
                    break

                case 'width':
                    this.animations[entry] = new Width(this.element, animate[entry], options)
                    break

                case 'height':
                    this.animations[entry] = new Height(this.element, animate[entry], options)
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
            const animate = animations[animation]
            if (animate.update(elapsed))
            {
                const options = animate.options
                if (options.reverse)
                {
                    this.emit('loop-' + animate.name, animate.element)
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
                    this.emit('complete-' + animate.name, animate.element)
                    delete animations[animation]
                }
            }
            this.emit('each-' + animate.name, animate.element)
        }
        this.emit('each', this)
        if (Object.keys(animations) === 0)
        {
            this.emit('empty', this)
            return true
        }
    }
}