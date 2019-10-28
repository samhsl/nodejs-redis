const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

//Schema Id, userName, accountNumber, emailAddress, identityNumber
const userSchema = new mongoose.Schema({
    Id: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    identityNumber: {
        type: String,
        required: true
    }
})

//generateAuthToken() generate token using JWT
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    return token
}

module.exports = mongoose.model('User', userSchema)