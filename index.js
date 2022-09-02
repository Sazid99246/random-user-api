const express = require('express');
const app = express();
const cors = require('cors');
let users = require('./data.json');
let user;
const port = 5000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is running');
})

// get all users with query parameters
app.get('/user/all', (req, res) => {
    const { user } = req.query;
    res.send(users.slice(0, user));
})

// get random users
app.get('/user/random', (req, res) => {
    const index = Math.floor(Math.random() * users.length);
    console.log(users[index]);
    res.send(users[index]);
})

// save a user
app.post('/user/save', (req, res) => {
    users.push(req.body);
    res.send(users);
})
// update a user
app.patch('/user/update/:id', (req, res) => {
    const { id } = req.params;
    const filter = { _id: id };

    const newData = users.find(user => user.id === Number(id));
    const { name, gender, contact, address, photoURL } = req.body;
    newData.id = id;
    if (name) {
        newData.name = name;
    }
    if (gender) {
        newData.gender = gender;
    }
    if (contact) {
        newData.contact = contact;
    }
    if (address) {
        newData.address = address
    }
    if (photoURL) {
        newData.photoURL = photoURL;
    }
    res.send(newData)
})

// update multiple users

// delete a user
app.delete('/user/delete/:id', (req, res) => {
    const { id } = req.params;
    const filter = { _id: id };

    users = users.filter(user => user.id !== Number(id));
    res.send(users);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})