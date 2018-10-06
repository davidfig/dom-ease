const Random = require('yy-random')
const FPS = require('yy-fps')
const Velocity = require('velocity-animate')

const html = require('./html')

const Ease = require('../src/domEase')

const SIZE = 50
let y = 0, ease, fps = new FPS(), boxes = []

function create()
{
    if (!ease)
    {
        ease = new Ease({
            duration: 2000,
            ease: 'easeInOutSine',
            pauseOnBlur: true
        })
    }
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
    const right = box('right')
    right.style.right = 0
    ease.add(right, { right: SIZE }, { repeat: true, reverse: true })
    ease.add(box('marginLeft'), { marginLeft: 30 }, { repeat: true, reverse: true })
    ease.add(box('marginRight'), { marginLeft: -30 }, { repeat: true, reverse: true })
    const bottom = box('bottom')
    bottom.style.bottom = 0
    bottom.style.top = 'unset'
    ease.add(bottom, { bottom: SIZE }, { repeat: true, reverse: true })
}

// compare speed with velocity-animate
function createVelocity()
{
    const duration = 2000
    const easing = 'easeInOutSine'
    Velocity(box('scaleX'), { scaleX: 2 }, { duration, easing, loop: true })
    Velocity(box('scaleY'), { scaleY: 2 }, { duration, easing, loop: true })
    Velocity(box('top/left'), { left: window.innerWidth / 2, top: window.innerHeight / 2 }, { duration, easing, loop: true })
    Velocity(box('scale'), { scale: 0 }, { duration, easing, loop: true })
    // Velocity(box('backgroundColor'), { backgroundColor: ['red', 'blue', 'transparent'] }, { duration, easing, loop: true })
    Velocity(box('opacity'), { opacity: 0 }, { duration, easing, loop: true })
    Velocity(box('width'), { width: SIZE * 2 }, { duration, easing, loop: true })
    Velocity(box('height'), { height: 0 }, { duration, easing, loop: true })
    // Velocity(box('color'), { color: ['green', 'yellow', 'purple'] }, { duration, easing, loop: true })
}
// createVelocity()
create()

function update()
{
    fps.frame()
    requestAnimationFrame(update)
}
update()

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