require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

require('./mongo')
const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')
const userRouter = require('./controllers/users')
const regalosRouter = require('./controllers/regalos')
const listRouter = require('./controllers/lists')
const loginRouter = require('./controllers/login')
const pagosRouter = require('./controllers/pagos')
const suscribeRouter = require('./controllers/suscribe')

const app = express()

Sentry.init({
  dsn: 'https://8af4809512504d96b12e2768d122b27c@o4504735938969600.ingest.sentry.io/4504736231391232',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app })
  ],
  tracesSampleRate: 1.0
})

app.use(cors())
app.use(express.json())

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

// app.use(express.static('../app/build'))
app.use(express.static(path.join(__dirname, '../app/build')))
app.use('/api/regalos', regalosRouter)
app.use('/api/users', userRouter)
app.use('/api/lists', listRouter)
app.use('/api/login', loginRouter)
app.use('/api/pagos', pagosRouter)
app.use('/api/suscribe', suscribeRouter)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/build/index.html'))
})

app.use(notFound)

app.use(Sentry.Handlers.errorHandler())

app.use(handleErrors)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})

module.exports = { app, server }
