'use strict'

let gImgs
let gImgId = 1

_createImages()
function _createImages() {
    const images = [
        addImage(['arms', 'spread', 'woman']),
        addImage(['donald', 'trump', 'politics']),
        addImage(['dogs', 'kiss', 'love']),
        addImage(['kid', 'dogs', 'sleep']),
        addImage(['kid', 'win', 'beach', 'sea']),
        addImage(['cat', 'keyboard', 'sleep']),
        addImage(['tell', 'me', 'more', 'charly', 'choclate']),
        addImage(['evil', 'toddler', 'laughing', 'beach', 'sea']),
        addImage(['what', 'would', 'you', 'do', 'haim']),
        addImage(['but', 'why', 'you']),
        addImage(['aliens', 'history', 'channel']),
        addImage(['dr', 'evil', 'vilan']),
        addImage(['kids', 'dancing', 'africa']),
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