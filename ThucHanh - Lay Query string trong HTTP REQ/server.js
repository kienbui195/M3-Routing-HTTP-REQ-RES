const http = require('http')
const url  = require('url')
let StringDecoder = require('string_decoder').StringDecoder

let server = http.createServer((req,res) => {

    let parseUrl = url.parse(req.url, true)
    let queryStringObject = parseUrl.query
    console.log(queryStringObject)
    res.end(`Hello Node JS`)
    console.log(`Done`)
})

server.listen('8080', () => {
    console.log(`Server is running in http://localhost:8080`)
})



