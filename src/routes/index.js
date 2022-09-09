const express = require("express");
const passport = require("passport");

const emojis = require('./emojis.routes')
const user = require('./user.routes')
const list = require('./list.routes')
const todo = require('./todo.routes')
const router = express.Router()

// Root endpoint
router.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        msg1: 'API Service Endpoint 👋🙂',
        msg2: 'Saying HI from ExpressJS/NodeJS',
        msg3: 'Created for Todo Project 2022',
        msg4: 'By: Sepehr'
    })
})

// Import routes
router.use('/emojis', emojis)
router.use('/user', user)
router.use('/list', passport.authenticate("jwt", { session: false }), list)
router.use('/todo', passport.authenticate("jwt", { session: false }), todo)

module.exports = router
