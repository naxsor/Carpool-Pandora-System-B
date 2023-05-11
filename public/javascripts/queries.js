const { Client } = require('pg');

const client = new Client({
    connectionString: "postgres://bafkxklkudbvfy:72af3637c6d2591b6d556b60f5799de351172996092c34f1c13fc9e78e2d664b@ec2-3-208-74-199.compute-1.amazonaws.com:5432/d6hhevruj3roie",
    ssl: {
        rejectUnauthorized: false
    }
});

const getUsers = (request, response) => {
    client.query('SELECT * FROM member', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('SELECT * FROM member WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { firstname, lastname } = request.body

    client.query('INSERT INTO member (firstname, lastname) VALUES ($1, $2)', [firstname, lastname], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    client.query(
        'UPDATE member SET firstname = $1, lastname = $2 WHERE id = $3',
        [firstname, lastname, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('DELETE FROM member WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}