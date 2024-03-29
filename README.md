## User Data Node.js API with MongoDB and Redis

- Demo: https://samuel-laluyan.herokuapp.com/
- Postman collection: https://www.getpostman.com/collections/0ffa73f6510738c48f61
- Make a POST request create a user first `/users/` to retrieve token for accessing API

### List of routes:

| Route                                   | HTTP    | Descriptions                    |
| :-------------------------------------  | :------ | :------------------------------ |
| `/users/`                               | GET     | Get all the users               |
| `/users/:id`                            | GET     | Get a single user               |
| `/users/`                               | POST    | Create a user                   |
| `/users/accountNumber/:accountNumber`   | GET     | Get a user by accountNumber     |
| `/users/identityNumber/:identityNumber` | GET     | Get a  user by identityNumber   |
| `/users/:id`                            | DELETE  | DELETE a user                   |
| `/users/:id`                            | PUT     | Update a user with new info     |


### Usage
#### Local
```
1. Make sure you have Node.js, MongoDB and Redis on your machine
1. Rename .env-local to .env, edit .env if neccesary
2. npm install
3. node app.js

```

#### Docker
```
1. docker build -t samuel-laluyan .
2. edit ./start-docker.sh then run
```
