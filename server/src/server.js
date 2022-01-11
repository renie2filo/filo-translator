//* MAIN IMPORTS
const express = require('express')
const listEndpoints = require('express-list-endpoints')
const cors = require('cors')

//*MAIN ROUTE IMPORT
const router = require('./services')

//*ERRORS IMPORTS
const {
    notFound,
    unAuthorized,
    forbidden,
    badRequest,
    generalError
} = require('./errors')

//*MAIN VARIABLES
const server = express()
const PORT = process.env.PORT || 5001
const accessOrigin = process.env.NODE_ENV !== 'production' ? [process.env.FE_OFFLINE] : [process.env.FE_OFFLINE, process.env.FE_ONLINE]
const corsOptions = {
    origin: function (origin, callback) {
        if (accessOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("CORS ISSUES : Invalid origin - Check origins list"))
        }
    }
}

//*MIDDLEWARES
server.use(express.urlencoded({
    extended: true
}))
server.use(express.json())
server.use(cors(corsOptions))

//*ROUTES
server.get("/", async (req, res, next) => {
    try {
        res.send('<h1>Welcome to Filo Translator Server</h1>')
    } catch (error) {
        console.log(error)
        next(error)
    }
})
server.use('/', router)

//*ERRORS
server.use(notFound)
server.use(unAuthorized)
server.use(forbidden)
server.use(badRequest)
server.use(generalError)

//*CONSOLE LOGS
console.log('endpoints: \n', listEndpoints(server))

server.listen(PORT, () => {
    process.env.NODE_ENV !== 'production' ? console.log(`Server running OFFLINE on: http://localhost:${PORT}`) : console.log(`Server running ONLINE on port: ${PORT}`)
})