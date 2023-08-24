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
}