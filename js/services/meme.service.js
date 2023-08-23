'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'black'
        }
    ]
}

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function setMemeImgId(imgId) {
    gMeme.selectedImgId = imgId
}

