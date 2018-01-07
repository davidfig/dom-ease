module.exports = class ScaleY
{
    constructor(element, y, options)
    {
        this.name = 'scaleY'
        this.element = element
        this.options = options
        this.to = y
        const transform = element.style.transform
        const scaleY = transform.indexOf('scaleY')
        if (scaleY == -1)
        {
            this.start = 1
        }
        else
        {
            const extract = transform.substring(scaleY + ('scaleY').length + 1, transform.indexOf(')', scaleY))
            this.start = parseFloat(extract)
        }
        this.delta = this.to - this.start
        this.time = 0
    }

    update(elapsed)
    {
        const options = this.options
        this.time += elapsed
        const scale = options.ease(this.time, this.start, this.delta, options.duration)
        const transform = this.element.style.transform
        const scaleY = transform.indexOf('scaleY')

        if (!transform)
        {
            this.element.style.transform = 'scaleY(' + scale + ')'
        }
        else if (scaleY == -1)
        {
            this.element.style.tranform += ' scaleY(' + scale + ')'
        }
        else
        {
            this.element.style.transform = transform.substr(0, scaleY + ('scaleY(').length) + scale + transform.indexOf(')', scaleY)
        }
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