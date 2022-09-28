require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

connection.connect()

const users = [
    {
        id: 1,
        firstname: "Qudus",
        lastname: "Adedokun",
        occupation: "Jobless",
        age: 18
    },
    {
        id: 2,
        firstname: "Qudus",
        lastname: "Zubair",
        occupation: "Retired",
        age: 22
    },
    {
        id: 3,
        firstname: "Adedeji",
        lastname: "Aminah",
        occupation: "Doctor",
        age: 5
    }
]

app.get('/customer/:id', (req, res) => {
    const userid = req.params.id
    const userData = users.find((user) => user.id == userid)
    if (!userData) {
        res.status(404).send({
            message: 'User not found'
        })
    } else {
        res.status(200).send({
            message: 'User data fetched',
            data: userData
        })
    }
})

app.get('/customers', (req, res) => {
    res.status(200).send({
        message: "All customers fetched",
        data: users
    })
})

app.post('/customer', (req, res) => {
    const {firstname, lastname, phone, email} = req.body

    if(!firstname || !lastname || !occupation || !email){
        return res.status(400)
        .json(
            {message: "Please fill all fields"} )
    } else {
        


        res.status(201).json({
            message: "Customer created successfully",
            data: newUser
        })
    }
})

app.delete('/customer/delete/:userid', (req, res) => {
    let {userid} = req.params
    res.status(201).send({
        message: `Customer ${userid} deleted!`,
        data: users
    })
})