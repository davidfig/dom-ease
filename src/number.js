module.exports = class Number
{
    constructor(entry, start, to, options, units)
    {
        this.entry = entry
        this.to = to
        this.options = options
        this.start = start
        this.delta = to - start
        this.units = units || ''
        this.time = 0
    }

    update(element)
    {
        element.style[this.entry] = this.options.ease(this.time, this.start, this.delta, this.options.duration) + this.units
    }

    reverse()
    {
        const swap = this.to
        this.to = this.start
        this.start = swap
        this.delta = -this.delta
    }
}