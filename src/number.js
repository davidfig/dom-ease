/**
 * create number entry
 * @private
 * @param {string} entry
 * @param {number} start
 * @param {number} to
 * @param {string} [units]
 */
module.exports = class Number
{
    constructor(element, entry, start, to, units)
    {
        this.element = element
        this.entry = entry
        this.to = to
        this.start = start
        this.delta = to - start
        this.units = units || ''
    }

    update(percent)
    {
        this.element.style[this.entry] = (this.start + this.delta * percent) + this.units
    }

    reverse()
    {
        const swap = this.to
        this.to = this.start
        this.start = swap
        this.delta = -this.delta
    }
}