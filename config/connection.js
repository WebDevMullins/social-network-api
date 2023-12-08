// Import the necessary modules
const { connect, connection } = require('mongoose')

// Connect to the MongoDB database using the provided URI or a default URI
connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB')

// Export the connection object
module.exports = connection
