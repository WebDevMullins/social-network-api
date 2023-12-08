// Importing required modules
const express = require('express')
const db = require('./config/connection')
const routes = require('./routes')

// Creating an instance of express
const app = express()
const PORT = process.env.PORT || 3001

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Mounting routes
app.use(routes)

// Connecting to the database and starting the server
db.once('open', () => {
	app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`))
})
