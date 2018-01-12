const exists = require('exists')

module.exports = class Opacity
{
    constructor(element, opacity, options)
    {
        this.element = element
        this.to = opacity
        this.options = options
        this.start = exists(element.opacity) ? parseFloat(element.opacity) : 1
        this.delta = this.to - this.start
        this.time = 0
    }

    update()
    {
        const options = this.options
        this.element.style.opacity = options.ease(this.time, this.start, this.delta, options.duration)
    }

    reverse()
    {
        const swap = this.to
        this.to = this.start
        this.start = swap
        this.delta = -this.delta
    }
}