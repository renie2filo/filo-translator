//*MAIN IMPORTS
const router = require('express').Router()
//*SERICES ROUTES IMPORTS

router.get('/test', async (req, res, next) => {
    try {
        res.send('Test')
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = router