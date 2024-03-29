const express = require('express')
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const fishRoutes = require('./routes/fish')
const commentRoutes = require('./routes/comment')
const cookieParser = require('cookie-parser')
const history = require('connect-history-api-fallback')
require('dotenv').config()

const app = express()

const path = require('path')


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.HOST) // local
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Bearer')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

mongoose.connect(process.env.DB_CONN,
{ useNewUrlParser: true,
//   useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'))


app.use(cookieParser())
app.use(history())
app.use(bodyParser.json())

app.use(express.static(__dirname))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/auth', userRoutes)
app.use('/api/auth', fishRoutes)
app.use('/api/auth', commentRoutes)

module.exports = app
