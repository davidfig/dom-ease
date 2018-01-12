module.exports = class Width
{
    constructor(element, width, options)
    {
        this.element = element
        this.to = width
        this.options = options
        this.start = element.offsetWidth
        this.delta = this.to - this.start
        this.time = 0
    }

    update()
    {
        const options = this.options
        this.element.style.width = options.ease(this.time, this.start, this.delta, options.duration) + 'px'
    }

    reverse()
    {
        const swap = this.to
        this.to = this.start
        this.start = swap
        this.delta = -this.delta
    }
}