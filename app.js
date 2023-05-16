const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const qr = require('./public/javascripts/queries')
const port = 5000

app.use(express.static('public/images'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

//AUTHENTICATION
app.post("/register", qr.register)
app.post("/login", qr.login)
app.post("/logout", qr.logout)
//Users
app.get('/users', qr.getUsers)
app.get('/users/:id', qr.getUserById)
app.put('/users/edit/:id', qr.updateUser)
app.put('/users/delete/:id', qr.deleteUser)



