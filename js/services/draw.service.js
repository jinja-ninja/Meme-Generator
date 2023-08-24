'use strict'

let gBgColor = '#000000'
let gPenColor = '#cccccc'
let gCurrShape = 'squares'
let gIsDrag = false

function setBgColor(val) {
    gBgColor = val
}

function getBgColor() {
    return gBgColor
}

function setPenColor(val) {
    gPenColor = val
}

function getPenColor() {
    return gPenColor
}

function setDrag(bool) {
    gIsDrag = bool
}

function getDrag() {
    return gIsDrag
}

function setShape(shape) {
    gCurrShape = shape
}

function getCurrentShape() {
    return gCurrShape
}