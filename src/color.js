module.exports = class Color
{
    constructor(element, style, colors, interval)
    {
        this.element = element
        this.style = style
        if (Array.isArray(colors))
        {
            this.colors = colors
        }
        else
        {
            this.colors = [colors]
        }
        this.colors.push(element.style[style])
        this.interval = interval
    }

    update(percent, time)
    {
        const elementStyle = this.element.style
        const style = this.style
        const colors = this.colors
        const i = Math.floor(time / this.interval)
        const color = colors[i]
        if (elementStyle[style] !== color)
        {
            elementStyle[style] = colors[i]
        }
    }

    reverse()
    {
        const reverse = []
        const colors = this.colors
        for (let color in colors)
        {
            reverse.unshift(colors[color])
        }
        reverse.push(reverse.shift())
        this.colors = reverse
    }
}