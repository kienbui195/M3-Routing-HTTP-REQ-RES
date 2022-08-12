const http = require('http')
const url  = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const fs = require('fs')

let handlers = {}

handlers.products = (req, res) => {
    fs.readFile('./views/products.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        res.end()
    })
}

handlers.users = (req, res) => {
    fs.readFile('./views/users.html', (err, data) => {
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write(data)
        res.end()
    })
}

handlers.notFound = (req, res) => {
    fs.readFile('./views/notFound.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        res.end()
    })
}

let server = http.createServer((req,res) => {
    let parseUrl = url.parse(req.url, true)
    let path = parseUrl.pathname
    let trimPath = path.replace(/^\/+|\/+$/g, '')
    let chosenHandler = (typeof router[trimPath] !== 'undefined') ? router[trimPath] : handlers.notFound
    chosenHandler(req,res)
})

server.listen(8080, () => {
    console.log(`Server is running at http://localhost:8080`)
})

let router = {
    'users' : handlers.users,
    'products' : handlers.products
}
