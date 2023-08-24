'use strict'

const FONT_DIFF = 5


let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Enter Text Here',
        size: 40,
        color: 'black',
        font: 'Impact',
        align: 'center',
        isDrag: false
    }]
}

function getMeme() {
    return gMeme
}

function setMemeImgId(imgId) {
    gMeme.selectedImgId = imgId
}

function setTextAlignment(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function setLineDrag(bool) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = bool
}

function setLineFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}
function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff * FONT_DIFF
}

function setTextColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function addCharToLine(char) {
    gMeme.lines[gMeme.selectedLineIdx].txt += char
}

function addLine() {
    gMeme.selectedLineIdx += 1
    gMeme.lines = [...gMeme.lines, _createLine()]
}

function moveRowYAxis(diff) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += diff * 10
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function _createLine() {
    return {
        txt: 'Enter Text Here',
        size: 40,
        color: 'black',
        font: 'Impact',
        align: 'center',
        isDrag: false
    }
}

function getMemsFromStorage() {
    let savedMems = loadFromStorage('savedMems')
    if (!savedMems || !savedMems.length) savedMems = []
    return savedMems
}

function saveMemeToStorage() {
    const savedMems = getMemsFromStorage()
    savedMems.push(structuredClone(gMeme))
    saveToStorage('savedMems', savedMems)
}

function deleteSelectedLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function checkClick(clickedPos) {
    const click = { isLine: false }
    gMeme.lines.forEach((line, idx) => {
        const lineStartX = line.pos.x - (line.width / 2)
        const lineStartY = line.pos.y - (line.height / 2)

        if (clickedPos.x > lineStartX && clickedPos.x < (lineStartX + line.width)
            && clickedPos.y > lineStartY && clickedPos.y < (lineStartY + line.height)) {
            click.isLine = true
            click.lineIdx = idx
            return click
        }
    })
    return click
}

function setLineDimensions(text, lineIdx) {
    let measure = gCtx.measureText(text)
    gMeme.lines[lineIdx].height = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent
    gMeme.lines[lineIdx].width = measure.actualBoundingBoxLeft + measure.actualBoundingBoxRight
}
