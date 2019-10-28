const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        if (!token) {
            return res.status(401).send("Access denied. Token not provided.");
        }
        const data = jwt.verify(token, process.env.JWT_KEY)
        if (!data) {
            throw new Error()
        }
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized' })
    }
}

module.exports = auth