module.exports = class Transform
{
    constructor(element, entry, to)
    {
        this.element = element
        this.transforms = []
        const transform = element.style.transform
        let inside, name = '', values
        for (let i = 0, _i = transform.length; i < _i; i++)
        {
            const letter = transform[i]
            if (inside)
            {
                if (letter === ')')
                {
                    inside = false
                    this.transforms.push({ name, values })
                    name = ''
                }
                else
                {
                    values += letter
                }
            }
            else
            {
                if (letter === '(')
                {
                    values = ''
                    inside = true
                }
                else if (letter !== ' ')
                {
                    name += letter
                }
            }
        }
        this.add(entry, to)
    }

    add(entry, to)
    {
        for (let transform of this.transforms)
        {
            if (transform.name === entry)
            {
                transform.start = parseFloat(transform.values)
                transform.to = to
                transform.delta = transform.to - transform.start
                return
            }
        }
        this.transforms.push({ name: entry, start: 1, to, delta: to - 1 })
    }

    update(percent)
    {
        for (let transform of this.transforms)
        {
            transform.values = transform.start + transform.delta * percent
        }
        let s = ''
        for (let transform of this.transforms)
        {
            s += transform.name + '(' + transform.values + ') '
        }
        this.element.style.transform = s
    }

    reverse()
    {
        for (let transform of this.transforms)
        {
            const swap = transform.to
            transform.to = transform.start
            transform.start = swap
            transform.delta = -transform.delta
        }
    }
}