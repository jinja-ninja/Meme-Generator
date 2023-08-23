'use strict'

let gImgs
let gImgId = 1

_createImages()
function _createImages() {
    const images = [
        addImage(['arms', 'spread', 'woman']),
        addImage(['donald', 'trump', 'politics'])
    ]
    gImgs = images
}

function addImage(keywords) {
    const img = {
        url: `images/${gImgId}.jpg`,
        id: gImgId++,
        keywords
    }
    return img
}

function getImages() {
    return gImgs
}