## dom-ease
a simple and super fast DOM animation library

## rationale
This is a simple library to animate DOM objects. It does not have all the bells and whistles of a library like [Velocity.js](http://velocityjs.org/), but it gets the job done with a nice event system.

## features
Currently, the library only has a limited set of features. I'll add more as I need them.

* top / left in px
* transform.scale
* transform.scaleX / transform.scaleY (these are separate animations from transforms.scale()) 
* color animation (one or more colors to cycle through, including the current color)
* backgroundColor animation (one or more background colors to cycle through, including the current color)
* width / height in px
* opacity

## Installation

    npm i pixi-ease

## Live Demo
https://davidfig.github.io/pixi-ease/
    
## Simple Usage
```js
    const Ease = require('dom-ease')

    let ease = new Ease()
    const div = document.getElementById('test)
    ease.add(div, { x: 100, y: 200 }, { reverse: true, repeat: true, duration: 2000, ease: 'easeInOutQuad' })

## API
```js
    /**
     * @param {object} [options]
     * @param {number} [options.duration=1000] default duration
     * @param {(string|function)} [options.ease=penner.linear] default ease
     * @param {(string|function)} [options.autostart=true]
     *
     * @fires complete
     */
    constructor(options)

    /**
     * fires when there are no more animations for any element
     * @event complete
     * @type {DomEase}
     */


    /**
     * start animation loop
     */
    start()

    /**
     * start an animation
     * @param {(HTMLElement|HTMLElement[])} element
     * @param {object} animate
     * @param {object} [options]
     * @param {number} [options.duration]
     * @param {(string|function)} [options.ease]
     * @param {(boolean|number)} [options.repeat]
     * @param {boolean} [options.reverse]
     */
    add(element, animate, options)

    /**
     * remove animation(s)
     * @param {object|array} animate - the animation (or array of animations) to remove; can be null
     * @inherited from yy-loop
     */
    remove(animate)

    /**
     * remove all animations from list
     * @inherited from yy-loop
     */
    removeAll()

    /**
     * update frame
     * @param {number} elapsed time in ms
     */
    update(elapsed)

    /**
     * number of animations
     * @type {number}
     */
    get count()

    /**
     * number of active animations
     * @type {number}
     */
    get countRunning()

```
## License 
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
