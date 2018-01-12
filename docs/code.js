const Random = require('yy-random')
const FPS = require('yy-fps')

const html = require('./html')

const Ease = require('../src/ease')

const SIZE = 75
let y = 0, fps = new FPS(), boxes = []

let ease = new Ease({
    duration: 2000,
    ease: 'easeInOutSine',
    pauseOnBlur: true
})

function create()
{
    while (boxes.length)
    {
        const box = boxes.pop()
        document.body.removeChild(box)
    }
    y = 0
    ease.add(box('scaleX'), { scaleX: 2 }, { repeat: true })
    ease.add(box('scaleY'), { scaleY: 2 }, { repeat: true, reverse: true })
    ease.add(box('top/left'), { left: window.innerWidth / 2, top: window.innerHeight / 2 }, { repeat: true, reverse: true })
    ease.add(box('scale'), { scale: 0 }, { repeat: true, reverse: true })
    ease.add(box('backgroundColor'), { backgroundColor: ['red', 'blue', 'transparent'] }, { repeat: true, duration: 500 })
    ease.add(box('opacity'), { opacity: 0 }, { repeat: true, reverse: true })
    ease.add(box('width'), { width: SIZE * 2 }, { repeat: true, reverse: true })
    ease.add(box('height'), { height: 0 }, { repeat: true, reverse: true })
    ease.add(box('color'), { color: ['green', 'yellow', 'purple'] }, { repeat: true, reverse: true })
}
create()

ease.on('each', () => fps.frame())

const buttons = html({ parent: document.body, styles: { position: 'fixed', bottom: 0, left: 0, margin: '1em' }})
const remove = html({ parent: buttons, type: 'button', styles: { margin: '5px' }, html: 'cancel all animations' })
remove.onclick = () =>
{
    if (remove.innerHTML === 'cancel all animations')
    {
        ease.removeAll()
        remove.innerHTML = 'add all animations'
    }
    else
    {
        ease.add(boxes[0], { scaleX: 2 }, { repeat: true })
        ease.add(boxes[1], { scaleY: 2 }, { repeat: true, reverse: true })
        ease.add(boxes[2], { left: window.innerWidth / 2, top: window.innerHeight / 2 }, { repeat: true, reverse: true })
        ease.add(boxes[3], { scale: 0 }, { repeat: true, reverse: true })
        ease.add(boxes[4], { backgroundColor: ['red', 'blue', 'transparent'] }, { repeat: true, duration: 500 })
        ease.add(boxes[5], { opacity: 0 }, { repeat: true, reverse: true })
        ease.add(boxes[6], { width: SIZE * 2 }, { repeat: true, reverse: true })
        ease.add(boxes[7], { height: 0 }, { repeat: true, reverse: true })
        ease.add(boxes[8], { color: ['green', 'yellow', 'purple'] }, { repeat: true, reverse: true })
        remove.innerHTML = 'cancel all animations'
    }
}
const reset = html({ parent: buttons, type: 'button', styles: { margin: '5px' }, html: 'reset boxes' })
reset.onclick = () => create()

const api = html({ parent: buttons, type: 'button', styles: { margin: '5px' }, html: 'API documentation' })
api.onclick = () => window.location.href = 'jsdoc/'

function box(words)
{
    const div = html({
        parent: document.body, styles: {
            position: 'absolute',
            top: y + 'px',
            width: SIZE + 'px',
            color: 'white',
            height: SIZE + 'px',
        }
    })
    div.style.backgroundColor = '#' + Random.color().toString(16)
    if (words)
    {
        const text = html({
            parent: div, html: words, styles:
                {
                    'text-align': 'center',
                    'margin-top': '50%',
                    transform: 'translate(0, -50%)'
                }
        })
        if (text.scrollWidth > SIZE)
        {
            text.style.fontSize = '0.5em'
        }
    }
    y += SIZE
    boxes.push(div)
    return div
}

window.onload = function ()
{
    require('fork-me-github')('https://github.com/davidfig/pixi-ease')
    require('./highlight')()
}