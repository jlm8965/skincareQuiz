////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const mongoose = require("mongoose")

const path = require("path")
const SkincareRouter = require('./controllers/skincare.js')
const UserRouter = require('./controllers/user.js')
const CommentRouter = require('./controllers/comment.js')

const middleware = require('./utils/middleware')


const User = require("./models/user")

// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////home route/////
app.get("/", (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/skincares')
  } else {
      res.render('/index.liquid')
  }
})

////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/comments', CommentRouter)
app.use('/skincares', SkincareRouter)

////renders error page, gets the error from url request query
app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('/index.liquid', { loggedIn, username, userId })
})

app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('/error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})



//////////////////////////////
//      App Listener        //
//////////////////////////////
const PORT = process.env.PORT
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})