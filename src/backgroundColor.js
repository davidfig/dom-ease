module.exports = class BackgroundColor
{
    constructor(element, colors, options)
    {
        this.element = element
        if (Array.isArray(colors))
        {
            this.colors = colors
        }
        else
        {
            this.colors = [colors]
        }
        this.original = element.style.backgroundColor
        colors.push(this.original)
        this.interval = options.duration / colors.length
        this.options = options
        this.time = 0
    }

    update()
    {
        const i = Math.floor(this.time / this.interval)
        const color = this.colors[i]
        if (this.element.style.backgroundColor !== color)
        {
            this.element.style.backgroundColor = this.colors[i]
        }
    }

    reverse()
    {
        const reverse = []
        for (let color in this.colors)
        {
            reverse.unshift(this.colors[color])
        }
        reverse.push(reverse.shift())
        this.colors = reverse
    }
}