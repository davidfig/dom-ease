module.exports = class Height
{
    constructor(element, height, options)
    {
        this.element = element
        this.to = height
        this.options = options
        this.start = element.offsetHeight
        this.delta = this.to - this.start
        this.time = 0
    }

    update()
    {
        const options = this.options
        this.element.style.height = options.ease(this.time, this.start, this.delta, options.duration) + 'px'
    }

    reverse()
    {
        const swap = this.to
        this.to = this.start
        this.start = swap
        this.delta = -this.delta
    }
}