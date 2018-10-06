function getComputed(el, style)
{
    return document.defaultView.getComputedStyle(el, '').getPropertyValue(style)
}

module.exports = {
    getComputed
}