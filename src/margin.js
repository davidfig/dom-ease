const utils = require('./utils')

const ORDER = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft']

module.exports = class Margin
{
    constructor(element, entry, to)
    {
        this.element = element
        this.margins = {
            marginTop: { start: parseInt(utils.getComputed(element, 'margin-top')) },
            marginRight: { start: parseInt(utils.getComputed(element, 'margin-right')) },
            marginBottom: { start: parseInt(utils.getComputed(element, 'margin-bottom')) },
            marginLeft: { start: parseInt(utils.getComputed(element, 'margin-left')) }
        }
        this.add(entry, to)
    }

    add(entry, to)
    {
        const margin = this.margins[entry]
        margin.animate = true
        margin.to = to
        margin.delta = to - margin.start
    }

    update(percent)
    {
        let value = ''
        for (let key of ORDER)
        {
            const margin = this.margins[key]
            if (margin.animate)
            {
                value += Math.round(margin.start + margin.delta * percent) + 'px '
            }
            else
            {
                value += margin.start + 'px '
            }
        }
        this.element.style.margin = value
    }

    reverse()
    {
        for (let order of ORDER)
        {
            const margin = this.margins[order]
            if (margin.animate)
            {
                const swap = margin.to
                margin.to = margin.start
                margin.start = swap
                margin.delta = -margin.delta
            }
        }
    }
}