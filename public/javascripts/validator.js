var validator = require('validator');

const register_validation = async (req, res) => {
    if(validator.isAlpha(req.body.firstname)){
    } else {
        return res.status(501)
    }
    if(validator.isAlpha(req.body.lastname)){
    } else {
        return res.status(502)
    }
    if(validator.isEmail(req.body.email)){
    } else {
        return res.status(503)
    }
    if(validator.isEmail(req.body.confirmemail)){
    } else {
        return res.status(504)
    }
    if(validator.isEmail(req.body.confirmemail)){
    } else {
        return res.status(504)
    }
    if(validator.equals(req.body.email, req.body.confirmemail)){
    } else {
        res.status(505)
    }
    if(validator.isMobilePhone(req.body.phone)){
    } else {
        res.status(506)
    }
    if(validator.equals(req.body.password, req.body.confirmpassword)){
    } else {
        res.status(507)
    }
}

module.exports = {
    register_validation
}
