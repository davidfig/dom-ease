module.exports = class ScaleX
{
    constructor(element, x, options)
    {
        this.element = element
        this.options = options
        this.to = x
        const transform = element.style.transform
        const scaleX = transform.indexOf('scaleX')
        if (scaleX == -1)
        {
            this.start = 1
        }
        else
        {
            const extract = transform.substring(scaleX + ('scaleX').length + 1, transform.indexOf(')', scaleX))
            this.start = parseFloat(extract)
        }
        this.delta = this.to - this.start
        this.time = 0
    }

    update()
    {
        const options = this.options
        const scale = options.ease(this.time, this.start, this.delta, options.duration)
        const transform = this.element.style.transform
        const scaleX = transform.indexOf('scaleX')

        if (!transform)
        {
            this.element.style.transform = 'scaleX(' + scale + ')'
        }
        else if (scaleX == -1)
        {
            this.element.style.transform += ' scaleX(' + scale + ')'
        }
        else
        {
            this.element.style.transform = transform.substr(0, scaleX + ('scaleX(').length) + scale + transform.indexOf(')', scaleX)
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