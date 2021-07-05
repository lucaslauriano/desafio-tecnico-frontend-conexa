const path = require('path')
const { DOCTOR_AUTH, FAKE_TOKEN } = require(path.join(__dirname, '../constants'))

const validateAuth = ({ email, password }) =>
  email === DOCTOR_AUTH.email && password === DOCTOR_AUTH.password

const login = (request, response) => {
  const { email, password } = request.body

  if (!validateAuth({ email, password }))
    return response.status(401).json({ message: 'Incorrect credentials' })

  return response.json({ name: DOCTOR_AUTH.name, token: FAKE_TOKEN })
}

const validateToken = token => [FAKE_TOKEN, `Bearer ${FAKE_TOKEN}`].includes(token)

const authMiddleware = (req, res, next) =>
  validateToken(req.headers.authorization)
    ? next()
    : res.status(403).json({ message: 'Invalid auth' })

module.exports = {
  login,
  authMiddleware,
}
