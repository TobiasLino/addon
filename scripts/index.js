const { app, BrowserWindow } = require('electron')
const { add } = require("../build/Release/addon.node")

const jsAddNum = (num) => {
    let result = num;
    for (let i = 0; i < 1000000000; ++i) {
        result = result + 333;
    }
    return result;
};

function addNum(number) {
    console.time("C++")
    console.log(add(number))
    console.timeEnd("C++")
    console.log(">>>>>>>>>>>>>>>>>>>>")
    console.time("JS")
    console.log(jsAddNum(number))
    console.timeEnd("JS")

    var location = document.getElementById("calc")
    var html = "<div>" + add(number) + "</div>";

    location.innerHTML = html;
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('views/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().lenght === 0) {
        createWindow()
    }
})

