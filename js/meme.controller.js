'use strict'

let gElCanvas
let gCtx

function initMemeEditor(imgId) {
    DisplayMemeEditor()

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')


    setMemeImgId(imgId)
    const meme = getMeme()
    // resizeCanvas()
    renderMeme(meme)

    // window.addEventListener('resize', resizeCanvas)
}

function onDownloadClick(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}

function DisplayMemeEditor() {
    removeClass('.meme-editor-container', 'hide')
}

function renderMeme(meme) {
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 10 }
    const text = meme.lines[meme.selectedLineIdx].txt
    drawImg(meme.selectedImgId, () => drawText(text, center.x, center.y))

}

function onTextInput(text) {
    const meme = getMeme()
    setLineText(text)
    renderMeme(meme)
}

function drawText(text = 'Please enter text', x, y) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawImg(id, cb) { // Not sure I understand fully
    const elImg = new Image()
    elImg.src = `images/${id}.jpg`
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        cb()
    }
}

function resizeCanvas() {
    const elContainer = getDomElement('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth / 2
    // gElCanvas.height = elContainer.offsetHeight
}