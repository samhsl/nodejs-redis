const redis = require('redis');
const client = redis.createClient({
    port      : process.env.REDIS_PORT,
    host      : process.env.REDIS_URL,
    password  : process.env.REDIS_PASSWORD
});

function cacheByAccountNumber(req, res, next) {
    let accountNumberID = 'accountNumber:' + req.params.id
    client.get(accountNumberID, function (err, data) {
        if (err) throw err;

        if (data != null) {
            console.log("Using cache", data)
            res.status(201).json(JSON.parse(data))
        } else {
            next();
        }
    });
}

function cacheByIdentityNumber(req, res, next) {
    let identityNumber = 'identityNumber:' + req.params.id
    client.get(identityNumber, function (err, data) {
        if (err) throw err;

        if (data != null) {
            console.log("Using cache", data)
            res.status(201).json(JSON.parse(data))
        } else {
            next();
        }
    });
}

module.exports = { cacheByAccountNumber, cacheByIdentityNumber }