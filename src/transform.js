module.exports = class Transform
{
    constructor(easeElement, entry, to, options)
    {
        this.easeElement = easeElement
        this.entry = entry
        this.to = to
        this.options = options
        this.start = this.calculateStart()
        this.delta = to - this.start
        this.time = 0
    }

    calculateStart()
    {
        const transforms = this.easeElement.readTransform()
        for (let i = 0, _i = transforms.length; i < _i; i++)
        {
            const transform = transforms[i]
            if (transform.name === this.entry)
            {
                switch (this.entry)
                {
                    case 'scale': case 'scaleX': case 'scaleY':
                        return parseFloat(transform.value)
                }
            }
        }
        switch (this.entry)
        {
            case 'scale': case 'scaleX': case 'scaleY':
                return 1
        }

    }

    update()
    {
        this.easeElement.changeTransform(this.entry, this.options.ease(this.time, this.start, this.delta, this.options.duration))
    }

    reverse()
    {
        const swap = this.to
        this.to = this.start
        this.start = swap
        this.delta = -this.delta
    }
}