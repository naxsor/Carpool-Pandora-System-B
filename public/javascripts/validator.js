var validator = require('validator');

const register_validation = async (req, res) => {
    if(validator.isEmail(req.body.email)){
        console.log("IS EMAIL")
    }
}

module.exports = {
    register_validation
}
