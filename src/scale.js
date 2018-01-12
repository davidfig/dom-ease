module.exports = class Scale
{
    constructor(element, value, options)
    {
        this.element = element
        this.options = options
        this.to = value
        const transform = element.style.transform
        const scale = transform.indexOf('scale(')
        if (scale == -1)
        {
            this.start = 1
        }
        else
        {
            const extract = transform.substring(scale + ('scale(').length, transform.indexOf(')', scale))
            this.start = parseFloat(extract)
        }
        this.delta = this.to - this.start
        this.time = 0
    }

    update()
    {
        const options = this.options
        const value = options.ease(this.time, this.start, this.delta, options.duration)
        const transform = this.element.style.transform
        const scale = transform.indexOf('scale(')
        if (!transform)
        {
            this.element.style.transform = 'scale(' + value + ')'
        }
        else if (scale == -1)
        {
            this.element.style.transform += ' scale(' + value + ')'
        }
        else
        {
            this.element.style.transform = transform.substr(0, scale + ('scale(').length) + value + transform.substr(transform.indexOf(')'))
        }
    }

    reverse()
    {
        const swap = this.to
        this.to = this.start
        this.start = swap
        this.delta = -this.delta
    }
}