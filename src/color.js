module.exports = class Color
{
    constructor(style, original, colors, options)
    {
        this.style = style
        if (Array.isArray(colors))
        {
            this.colors = colors
        }
        else
        {
            this.colors = [colors]
        }
        colors.push(original)
        this.interval = options.duration / colors.length
        this.options = options
        this.time = 0
    }

    update(element)
    {
        const i = Math.floor(this.time / this.interval)
        const color = this.colors[i]
        if (element.style[this.style] !== color)
        {
            element.style[this.style] = this.colors[i]
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