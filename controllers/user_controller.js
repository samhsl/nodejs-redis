const User = require('../models/user')
const redis = require('redis');
const client = redis.createClient({
    port      : process.env.REDIS_PORT,
    host      : process.env.REDIS_URL,
    password  : process.env.REDIS_PASSWORD
});

const getUsers = async(req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createUser = async(req, res) => {
    const user = new User({
        Id: req.body.Id,
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber
    })

    try {
        const newUser = await user.save()
        const token = await user.generateAuthToken()
        res.status(201).json({newUser,token})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getUserByAccountNumber = async(req, res) => {
    let accountNumberParams = req.params.id
    try {
      user = await User.findOne({accountNumber: accountNumberParams})
      if (user == null) {
        return res.status(404).json({ message: 'Cant find user by accountNumber'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
    
    res.user = user
    let accountNumberID = "accountNumber:" + req.params.id
    client.setex(accountNumberID, 3600, JSON.stringify(res.user))
    res.json(res.user)
}

const getUserByIdentityNumber = async(req, res) => {
    let identityNumberParams = req.params.id
    try {
      user = await User.findOne({identityNumber: identityNumberParams})
      if (user == null) {
        return res.status(404).json({ message: 'Cant find user by accountNumber'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
    
    res.user = user
    let identityNumber = "identityNumber:" + req.params.id
    client.setex(identityNumber, 3600, JSON.stringify(res.user))
    console.log("Using cache", res.user)
    res.json(res.user)
}

const updateUser = async(req, res) => {
    const id = req.params.id;
    User.findOne({Id : id}).then((user) => {
        if (user == null) {
            return res.status(404).json({ message: 'Cant find user'})
        }
        userData = user;
        return user.updateOne(req.body);
    }).then((user) => {
        let accountNumber = 'accountNumber:' + req.body.accountNumber
        let identityNumber = 'identityNumber:' + req.body.identityNumber
        console.log(accountNumber)
        client.del(accountNumber)
        client.del(identityNumber)
        res.status(200).json({
            message: `Success Updated an User`,
            user: userData
        });
    }).catch((err) => {
        res.status(404).json({
            message: err.message
        });
    });
}

const deleteUser = async(req, res) => {
    const id = req.params.id;
    let userData;
    User.findOne({Id : id}).then((user) => {
        if (user == null) {
            return res.status(404).json({ message: 'Cant find user'})
        }
        userData = user;
        return user.remove();
    }).then((user) => {
        let accountNumber = 'accountNumber:' + userData.accountNumber
        let identityNumber = 'identityNumber:' + userData.identityNumber
        client.del(accountNumber)
        client.del(identityNumber)
        res.status(200).json({
            message: `Success Deleted an User`,
            user: userData
        });
    }).catch((err) => {
        res.status(404).json({
            message: err.message
        });
    });
}

module.exports = { getUsers, createUser, getUserByAccountNumber, getUserByIdentityNumber, updateUser, deleteUser }