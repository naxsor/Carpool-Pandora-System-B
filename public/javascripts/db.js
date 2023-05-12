const Pool = require('pg').Pool

const db = new Pool({
    connectionString: "postgres://bafkxklkudbvfy:72af3637c6d2591b6d556b60f5799de351172996092c34f1c13fc9e78e2d664b@ec2-3-208-74-199.compute-1.amazonaws.com:5432/d6hhevruj3roie",
    ssl:true,
    ssl: {
        rejectUnauthorized: false
    }
})

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Connected to Database');
});

module.exports = db