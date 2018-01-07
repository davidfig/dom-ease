const Random = require('yy-random')
const FPS = require('yy-fps')

const html = require('./html')

const Ease = require('..')

const SIZE = 50
let y = 0, fps = new FPS(), boxes = []

let ease = new Ease({
    duration: 1500,
    ease: 'easeInOutSine'
})

function create()
{
    while (boxes.length)
    {
        const box = boxes.pop()
        document.body.removeChild(box)
    }
    y = 0
    ease.add(box(), { x: window.innerWidth - SIZE, scaleX: 2 }, { repeat: true })
    ease.add(box(), { x: window.innerWidth - SIZE, scaleY: 2 }, { repeat: true, reverse: true })
    ease.add(box(), { y: window.innerHeight - SIZE }, { repeat: true, reverse: true })
    ease.add(box(), { scale: 0 }, { repeat: true, reverse: true })
    ease.add(box(), { flash: ['transparent'] }, { repeat: true, duration: 500 })
}
create()

ease.on('each', () => fps.frame())

const buttons = html({ parent: document.body, styles: { position: 'fixed', bottom: 0, left: 0, margin: '1em' }})
const remove = html({ parent: buttons, type: 'button', styles: { margin: '5px' }, html: 'remove all animations' })
remove.onclick = () =>
{
    if (remove.innerHTML === 'remove all animations')
    {
        ease.removeAll()
        remove.innerHTML = 'add all animations'
    }
    else
    {
        ease.add(boxes[0], { x: window.innerWidth - SIZE }, { repeat: true })
        ease.add(boxes[1], { x: window.innerWidth - SIZE }, { repeat: true, reverse: true })
        ease.add(boxes[2], { y: window.innerHeight - SIZE }, { repeat: true, reverse: true })
        ease.add(boxes[3], { flash: ['transparent'] }, { repeat: true, duration: 500 })
        remove.innerHTML = 'remove all animations'
    }
}
const reset = html({ parent: buttons, type: 'button', styles: { margin: '5px' }, html: 'reset boxes' })
reset.onclick = () => create()

function box()
{
    const div = html({
        parent: document.body, styles: {
            position: 'absolute',
            top: y + 'px',
            width: SIZE + 'px',
            height: SIZE + 'px'
        }
    })
    div.style.backgroundColor = '#' + Random.color().toString(16)
    y += SIZE
    boxes.push(div)
    return div
}

window.onload = function ()
{
    require('fork-me-github')('https://github.com/davidfig/pixi-ease')
    require('./highlight')()
}