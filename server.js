const connect = require("connect")
const serveStatic = require("serve-static")
const path = require('path')

const projPath = process.cwd()
const app = connect()
app.use(serveStatic(projPath))

// 修改侦听服务器端口
const port = 2001
app.listen(port)
console.info(`Listen on Port ${port}`)