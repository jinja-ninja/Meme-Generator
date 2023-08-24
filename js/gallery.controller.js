'use strict'

function onInit() {
    renderImages()
}

function renderImages() {
    const images = getImages()
    const strHTMLs = images.map(image =>
        `<img src="${image.url}" data-id="${image.id}" 
        onclick="onSelectImg(this.getAttribute('data-id'))">`).join('')

    setElHtml('.gallery-container', strHTMLs)
}

function onSelectImg(imgId) {
    initMemeEditor(imgId)
    document.body.scrollTop = document.documentElement.scrollTop = 0
}

function onClickFlexible() {
    const totalImages = getImages().length
    initMemeEditor(getRandomInt(1, totalImages))
}