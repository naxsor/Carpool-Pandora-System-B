const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const qr = require('./public/javascripts/queries')
const port = 5000

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

app.get('/users', qr.getUsers)
app.get('/users/:id', qr.getUserById)
app.post('/users', qr.createUser)
app.put('/users/:id', qr.updateUser)
app.delete('/users/:id', qr.deleteUser)

app.get('/map', function(req, res) {
  res.sendFile('/maps/index.html');
});


