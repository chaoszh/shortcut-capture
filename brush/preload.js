const IpcRendererUtils = require('./IpcRendererUtils')
const fs = require('fs');
// ipcRenderer.on("init", (event, data) => {
//     mainId = event.senderId;
//     const {dataURL} = JSON.parse(data);
//     window.setImage(dataURL)
//     console.log(event, data)
// })
window.ipcRendererUtils = new IpcRendererUtils({
    initCallback: (data) => {
        const {dataURL, scale} = data;
        window.setImage(dataURL, scale)
    },
    windowCloseBefore: () => {
        window.ipcRendererUtils.winClose();
    }
});
window.saveFileByBase64 = (defaultPath, base64) => {
    let savePath = utools.showSaveDialog({
        title: '保存图片',
        defaultPath,
        buttonLabel: '保存'
    })
    if (savePath) {
        const dataBuffer = Buffer.from(base64, 'base64');
        fs.writeFileSync(savePath, dataBuffer);
        utools.showNotification("保存成功")
    }
}
const { encode } = require('fast-png');
window.imageDataToBase64 = (imageData) => {
    return new Buffer(encode(imageData)).toString('base64');
}
