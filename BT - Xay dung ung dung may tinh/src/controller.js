const fs = require('fs')
const qs  = require('qs')
let result

class Controller {

    showMainPage(req, res) {
        if (req.method === 'GET') {
            this.getTemplate('./views/calculator.html').then(data => {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data)
                res.end()
            })
        } else {
            let data = ''
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end' , () => {
                let dataForm = qs.parse(data)
                console.log(dataForm)
                if (dataForm.a === '' || dataForm.b === '') {
                    this.showNotFoundPage(req, res)
                }
                if (dataForm.pheptinh === '/' && +dataForm.b === 0 ) {
                    this.showNotFoundPage(req, res)
                } else {
                    switch (dataForm.pheptinh) {
                        case '+':
                            result = +dataForm.a + +dataForm.b
                            break
                        case '-':
                            result = +dataForm.a - +dataForm.b
                            break
                        case '*':
                            result = +dataForm.a * +dataForm.b
                            break
                        case '/':
                            result = +dataForm.a / +dataForm.b
                            break
                    }
                }
            })
        }
    }

    getTemplate( filename) {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, 'utf-8' , (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }

    showResultPage(req, res) {
        this.getTemplate('./views/result.html').then(data => {
            data = data.replace('.', result)
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()
        })
    }

    showNotFoundPage(req, res) {
        this.getTemplate('./views/notFound.html').then(data => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()
        })
    }

}

module.exports = Controller