const fs = require('fs')

const path = require('path')
const {
    createGzip,
    createUnzip
} = require('zlib');
const {
    pipeline
} = require('stream');

const {
    createReadStream,
    createWriteStream
} = require('fs');
const crypto = require('crypto')

let version = "1.1.0"
let hash

fs.mkdirSync(path.resolve(__dirname, `./updateResources/${version}`), {
    recursive: true
}, function (err) {
    if (err) {

    } else {
        console.log("creat done");
    }
})


function gZip() {
    let gzip = createGzip();
    let source = createReadStream(path.resolve(__dirname, './app.asar'));
    let destination = createWriteStream(path.resolve(__dirname, `./updateResources/${version}/app.asar.gz`));

    pipeline(source, gzip, destination, (err) => {
        if (err) {
            console.error('gZiperror:', err);
            process.exitCode = 1;
        }
    });
}

fs.readFile(path.resolve(__dirname, './app.asar'), function (err, res) {
    if (err) {
        throw err
    } else {
        hash = crypto.createHash('md5').update(res).digest("hex")
        console.log(hash)

        gZip()
        let latestRes = {
            version: version,
            hash: hash,
        }
        fs.writeFile(path.resolve(__dirname, './updateResources/latest.json'), JSON.stringify(latestRes, null, 4), (err) => {
            if (err) throw err
            else {}

        })
    }
})

fs.writeFileSync(path.resolve(__dirname, `./updateResources/${version}/script.js`), fs.readFileSync(path.resolve(__dirname, './script.js')))

// // 刷新缓存
//  https://purge.jsdelivr.net/gh/ChanIok/Dodoco@main/updateResources

// https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/updateResources/latest.json

// https://purge.jsdelivr.net/gh/ChanIok/Dodoco@main/updateResources/app.asar.gz
// https://purge.jsdelivr.net/gh/ChanIok/Dodoco@main/updateResources/latest.json