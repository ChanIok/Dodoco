
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

let version="1.1.0"
let hash

function gZip() {
    let gzip = createGzip();
    let source = createReadStream(path.resolve(__dirname, './app.asar'));
    let destination = createWriteStream(path.resolve(__dirname, './updateResources/app.asar.gz'));

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
        let latestRes={
            version:version,
            hash:hash,
            script:false
        }
        fs.writeFile(path.resolve(__dirname, './updateResources/latest.json'), JSON.stringify(latestRes, null, 4), (err) => {
            if (err) throw err
            else {}

          })
    }
})