const express = require('express')
const randomEmail = require('random-email')
const app = express()

const users = [{
    username: 'shweta',
    password: '1234',
    email: randomEmail({ domain: 'gmail.com' }),
    phoneNo: '+91 9' + Math.floor(Math.random() * 1000000000),
    createdAt: new Date().toDateString()
}]

app.use(express.json())

app.get('/showusers', (req, res) => {
    res.json({users})
})

app.post('/adduser', (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: randomEmail({domain: 'gmail.com'}),
        phoneNo: '+91 9'+ Math.floor(Math.random()*1000000000),
        createdAt: new Date().toDateString()
    }
    users.push(newUser)
    console.log("users:-")
    console.log(users)
})

app.listen(5000, (req, res) => {
    console.log(`server started at port: 5000`)
})