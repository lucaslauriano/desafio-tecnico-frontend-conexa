const path = require('path')
const jsonServer = require('json-server')
const { login, authMiddleware } = require(path.join(__dirname, './Handlers/auth'))

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/login', login)

server.use(authMiddleware)

server.use(router)
server.listen(process.env.PORT || 3333, () => {
  console.log('JSON Server is running<>>', 'http://localhost:3333')
})
