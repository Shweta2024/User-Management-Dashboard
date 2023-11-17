const express = require('express')
const randomEmail = require('random-email')
const app = express()

const PORT = process.env.PORT || 5000

const users = [{
    username: 'shweta',
    password: '1234',
    email: randomEmail({ domain: 'gmail.com' }),
    phoneNo: '+91 9' + Math.floor(Math.random() * 1000000000),
    createdAt: new Date().toDateString()
}]

app.use(express.json())

// send the users list
app.get('/showusers', (req, res) => {
    res.json({users})
})

// retrive the user details and add it to the users list
app.post('/adduser', (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: randomEmail({domain: 'gmail.com'}), // generates a random mail of 'gmail.com' domain
        phoneNo: '+91 9'+ Math.floor(Math.random()*1000000000),
        createdAt: new Date().toDateString()
    }
    users.push(newUser)
})

app.listen(PORT, (req, res) => {
    console.log(`server started at port: 5000`)
})