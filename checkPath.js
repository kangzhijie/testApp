const fs = require('fs')
const p = require('path')
var path = '/Users/admin/Desktop/test/demo'
var times = 0

main()

function main () {
    console.log('times::', times)
    times += 1
    fs.exists(path, function (exists) {
        // console.log('start exists:', exists)
        console.log('start time:', Date.now())
        if (exists) {
            fs.readdir(path, function(err, files){
                // if (files.length == 3) {
                //     console.log('www::', Date.now())
                //     console.log('文件个数::', files.length)
                // }
                for (let i = 0; i < files.length; i++) {
                    if (files[i] != 'demo.excel') continue
                    var tmppath = path +'/' + files[i];
                    fs.stat(tmppath, function (err, stats){
                        if (err) {
                            console.log("打开文件错误" + err)
                            return
                        }
                        console.log('文件大小::', stats.size)
                        console.log('end time:', Date.now())
                    })
                }
            })
        }
    })
    setTimeout(main, 1)
}
