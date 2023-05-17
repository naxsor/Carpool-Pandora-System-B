const db = require("./db.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {register_validation} = require("./validator");



require('dotenv').config()

//AUTHENTICATION
const register = (req, res) =>{
    //Check For Existing User
    const x = register_validation(req, res)
    if (res.statusCode !== 200){
        return res.status(res.statusCode).json("No Alphanumeric on name")
    }

    const q = 'SELECT * FROM member WHERE email = $1 AND "isDeleted" = false'

    db.query(q, [req.body.email],(err, data)=>{
        if(err) {
            return res.json(err)
        }
        if (data.rows.length !== 0) return res.status(403).json("User already exists")

        //Hash Password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO member(firstname, lastname, contact_number, email, password) VALUES ($1, $2, $3, $4, $5)"
        const values = [
            req.body.firstname,
            req.body.lastname,
            req.body.phone,
            req.body.email,
            hash
        ]

        db.query(q,[...values], (err, data) =>{
            if(err) {
                console.log(err.stack)
                return res.json(err)
            }
            return res.status(200).json("User has been created.")
        })
    })

}

const login = (req, res) =>{
    //Check User
    const q = 'SELECT * FROM member WHERE email = $1 AND "isDeleted" = false'
    db.query(q, [req.body.email], (err,data)=>{
        if (err) {
            console.log(err)
            return res.json(err);}
        if(data.rows.length === 0) return res.status(404).json("User not found");

        //Check password
        const correctPassword = bcrypt.compareSync(req.body.password, data.rows[0].password);

        if(!correctPassword) return res.status(400).json("Wrong email or password")
        
        const user = { email: req.body.email}
        const accessToken = generateAccessToken(user)

        // console.log(accessToken) //For testing
        // res.cookie("access_token", accessToken, {
        //     httpOnly:true
        // }).status(200).json(`Logged in as user with ID: ${data.rows[0].id}`)
        res.cookie("access_token", accessToken, {httpOnly:true}).status(200).json({accessToken:accessToken})

    })
} 
const logout = (req, res) =>{
    res.clearCookie("access_token", {
        // sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
}
function authenticateToken(req,res,next){
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    const token = req.cookies.access_token
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        }, (err, decoded) =>{
            if(err) {
                req.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                next();
            }
        })
    }
}
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

//USERS
const getUsers = (request, response) => {
    db.query('SELECT * FROM member WHERE "isDeleted" = false', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM member WHERE id = $1 AND "isDeleted" = false', [id], (error, results) => {
        if (error) {
            throw error
        }
        if(results.rows.length  === 0) return response.status(404).json("User not found");
        response.status(200).json(results.rows)
    })
}

// const createUser = (request, response) => {
//     const { firstname, lastname } = request.body

//     db.query('INSERT INTO member (firstname, lastname) VALUES ($1, $2)', [firstname, lastname], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send(`User added with ID: ${results.insertId}`)
//     })
// }

const updateUser = (req, res) => {
    //Check for existing user
    const q = 'SELECT * FROM member WHERE id = $1 AND "isDeleted" = false'

    db.query(q, [req.params.id],(err, data)=>{
        if(err) {
            return res.json(err)
        }
        if (data.rows.length === 0) return res.status(409).json("User not found")

        const q = "UPDATE member SET firstname = $1, lastname = $2, contact_number = $3, driving_licence_number = $4, driving_licence_exp = $5 WHERE id = $6"
        const userId = req.params.id
        const values = [
            req.body.firstname,
            req.body.lastname,
            req.body.contact_number,
            req.body.driving_licence_number,
            req.body.driving_licence_exp
        ]

        db.query(q, [...values, userId ], (err,data)=>{
            if (err) return res.json(err);
            return res.status(200).json(`Updated user with ID: ${userId}`)
        })
    })    
}

// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)

//     db.query('DELETE FROM member WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(`User deleted with ID: ${id}`)
//     })
// }
const deleteUser = (req, res) => {
    
    const q = 'UPDATE member SET "isDeleted" = true WHERE id = $1'
    console.log(req.params.id)
    db.query(q, [req.params.id], (err,data)=>{
        if (err) return res.json(err);
        return res.status(200).json(`Deleted user with ID: ${req.params.id}`)
    })
}

//RIDES
const createRide = (req, res) =>{
    
    const q1 = 'SELECT * FROM member WHERE email = $1 AND "isDeleted" = false'

    db.query(q1, [req.body.email] /*[req.user.email]*/, (err, data) =>{
        if(err) {
            return res.json(err)
        }
        if(data.rows.length === 0) return res.status(409).json("User not found")

        const q2 = "INSERT INTO luggage_size(description) values($1) RETURNING id"

        const member_id = data.rows[0].id

        db.query(q2, [req.body.luggage_size], (err, data)=>{
            if(err) {
                return res.json(err)
            }
            const q3 = "INSERT INTO ride(member_id, travel_start, source_city_id, destination_city_id, seats_available, luggage_size_id, created_on) VALUES ($1, $2, $3, $4, $5, $6, now())"
        
            const luggage_size_id = data.rows[0].id
            const values = [
                member_id,
                req.body.travel_start,
                req.body.source_city_id,
                req.body.destination_city_id,
                req.body.seats_available,
                luggage_size_id
            ]

            db.query(q3, [...values], (err, data)=>{
                if(err) {
                    return res.json(err)
                }
                return res.status(200).json("Ride has been created.")
            })
        })
    })
}

const getCities = (req, res) =>{
    db.query('SELECT * FROM city', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    //Authentication
    register,
    login,
    logout,
    authenticateToken,
    //Users
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    //Rides
    createRide,
    getCities
}