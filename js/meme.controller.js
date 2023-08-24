'use strict'

let gElCanvas
let gCtx
// let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function initMemeEditor(imgId) {
    DisplayMemeEditor()

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListiners()
    resizeCanvas()
    setMemeImgId(imgId)
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    const elImg = new Image()

    elImg.src = elImg.src = `images/${meme.selectedImgId}.jpg`
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width

    elImg.addEventListener('load', () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line, idx) => {
            if (!line.pos) line.pos = getInitialLinePos(idx)
            drawText(line, line.pos.x, line.pos.y)
            setLineDimensions(line.txt, idx)
        })

        const selectedLine = meme.lines[meme.selectedLineIdx]
        drawSelectionFrame(selectedLine.txt, selectedLine.pos.x, selectedLine.pos.y)
    })

}

function getInitialLinePos(idx) {
    if (idx === 0) return { x: gElCanvas.width / 2, y: gElCanvas.height / 10 }
    else if (idx === 1) return { x: gElCanvas.width / 2, y: gElCanvas.height * (9 / 10) }
    else return { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
}

function resizeCanvas() {
    const elContainer = getDomElement('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
}

function addListiners() {
    addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function onDownloadClick(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'Meme'
}

function DisplayMemeEditor() {
    removeClass('.meme-editor-container', 'hide')
    addClass('.meme-editor-container', 'grid')
}

function switchLine() {
    const meme = getMeme()
    meme.selectedLineIdx++
    if (meme.selectedLineIdx === meme.lines.length) meme.selectedLineIdx = 0
    renderMeme()
}

function onDown(ev) {
    const meme = getMeme()
    const pos = getEvPos(ev)
    const click = checkClick(pos)
    if (!click.isLine) return
    meme.selectedLineIdx = click.lineIdx
    renderMeme()
    // setCircleDrag(true)
    //Save the pos we start from
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { offsetX, offsetY, clientX, clientY } = ev
    // console.log('offsetX, offsetY:', offsetX, offsetY)
    // console.log(' clientX, clientY:', clientX, clientY)
}

function onIncreaseSize() {
    setFontSize(1)
    renderMeme()
}
function onDecreaseSize() {
    setFontSize(-1)
    renderMeme()
}

function onChangeTextColor(color) {
    setTextColor(color)
    renderMeme()
}

function onTextInput(text) {
    setLineText(text)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function drawSelectionFrame(text, x, y) {
    let framePadding = 10
    let measure = gCtx.measureText(text)

    gCtx.strokeStyle = 'white'
    gCtx.strokeRect((x - framePadding) - measure.actualBoundingBoxLeft,
        (y - framePadding) - measure.actualBoundingBoxAscent,
        measure.actualBoundingBoxLeft + measure.actualBoundingBoxRight + (framePadding * 2),
        measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent + (framePadding * 2));
}

function drawText(line, x, y) {
    const text = line.txt
    const txtSize = line.size
    const txtColor = line.color

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = txtColor
    gCtx.font = `${txtSize}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    } return pos
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchend', onUp)
}