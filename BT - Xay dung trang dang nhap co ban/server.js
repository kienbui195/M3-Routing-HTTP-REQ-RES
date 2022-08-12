const http = require('http')
const url  = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const fs = require('fs')

let handlers = {}

handlers.home = (req, res) => {
    fs.readFile('./views/home.html', (err, data) => {
        if (err) {
            console.log(err.message)
        }
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        res.end()
    })
}

handlers.login = (req, res) => {
    fs.readFile('./views/login.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        res.end()
    })
}

handlers.profile = (req, res) => {
    fs.readFile('./views/profile.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
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
    let path = url.parse(req.url, true).pathname
    let trimPath = path.replace(/^\/+|\/+$/g, '')
    let chosenHandler
    if (typeof router[trimPath] === 'undefined') {
        chosenHandler = handlers.notFound
    } else {
        chosenHandler = router[trimPath]
    }
    chosenHandler(req, res)
})

server.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`)
})

let router = {
    'home' : handlers.home,
    'login' : handlers.login,
    'profile' : handlers.profile
}