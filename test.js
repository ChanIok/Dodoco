let jsdelivrUrl = 'https://cdn.jsdelivr.net/gh/ChanIok/Dodoco@main/updateResources/'

const axios = require('axios')


const https = require("https")
https.get(jsdelivrUrl + 'latest.json' + '?_=' + Date.parse(new Date()) / 1000, (res) => {


    res.on('data', (d) => {
        process.stdout.write(d);
    });

}).on('error', (e) => {
    console.error(e);
});
// 获取最新版本信息

// console.log("start-to-getVersion")
// axios({
//     url: jsdelivrUrl + 'latest.json',
//     // url: 'http://127.0.0.1:10996/latest.json',
//     method: 'get',
//     params: {
//         t: Date.parse(new Date()) / 1000
//     },
//     timeout: 20000,
// }).then(function (latestResData) {


//     latestRes = latestResData.data
//     console.log(latestRes)
// }, function (err) {

//     console.log("get-latest-err")
// })