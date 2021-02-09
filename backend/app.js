const express = require('express')
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const fishRoutes = require('./routes/fish')
const commentRoutes = require('./routes/comment')
const cookieParser = require('cookie-parser')
// const cors = require('cors')
require('dotenv').config()

const app = express()

const path = require('path')


mongoose.connect(process.env.DB_CONN,
{ useNewUrlParser: true,
//   useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'))

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
//     next()
// })

// app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://fishnfollow.com') // prod
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080') // local
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Bearer')
    // res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})
    
app.use(cookieParser())

app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/auth', userRoutes)
app.use('/api/auth', fishRoutes)
app.use('/api/auth', commentRoutes)

module.exports = app
