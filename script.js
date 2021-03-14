const path = require('path')

const fs = require('fs')

function preScript() {
    console.log("run pre script")
    changeDodoco()
}

function afterScript() {
    console.log("run after script")
}


function changeDodoco() {
    let {
        version
    } = require(path.resolve(__dirname, '../app.asar/package.json'))
    console.log(version)
    if (version <= "1.1.4") {

        let request = require(path.resolve(__dirname, "../app.asar/node_modules/request"))

        console.log('ready-to-got-Dodoco')
        let url = 'https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/updateResources/1.1.5' + '/Dodoco' + "?_=" + Date.parse(new Date()) / 1000
        //  let url = 'https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/updateTest/Dodoco' +  "?_=" + Date.parse(new Date()) / 1000
        // let url = 'http://127.0.0.1:10996/Dodoco.exe'
        let stream = fs.createWriteStream(path.resolve(__dirname, '../../Dodoco.exe'));
        request(url).pipe(stream).on("close", function (err) {
            if (err) {
                console.log("get-Dodoco-err")
            } else {
                console.log("downloaded-Dodoco");
            }
        })
    }
}

module.exports = {
    preScript,
    afterScript
}