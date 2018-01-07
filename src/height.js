module.exports = class Height
{
    constructor(element, height, options)
    {
        this.name = 'height'
        this.element = element
        this.to = height
        this.options = options
        this.start = element.offsetHeight
        this.delta = this.to - this.start
        this.time = 0
    }

    update(elapsed)
    {
        const options = this.options
        this.time += elapsed
        this.element.style.height = options.ease(this.time, this.start, this.delta, options.duration) + 'px'
        if (this.time >= options.duration)
        {
            return true
        }
    }

    repeat()
    {
        this.time = 0
    }

    reverse()
    {
        const swap = this.to
        this.to = this.start
        this.start = swap
        this.delta = -this.delta
    }
}