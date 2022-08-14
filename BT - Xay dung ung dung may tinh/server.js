const http = require('http')
const url = require('url')
const Controller = require("./src/controller");
const port = 8080

let app = new Controller()


let server = http.createServer((req, res) => {
    let path = url.parse(req.url).pathname

    switch(path) {
        case '/':
            app.showMainPage(req, res)
            break
        case '/result':
            app.showMainPage(req, res)
            app.showResultPage(req, res)
            break
        default:
            app.showNotFoundPage(req, res)
            res.end()
    }
})

server.listen(port, 'localhost', () => {
    console.log(`Server is running at http://localhost:${port}`);
})