const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')
const ErrorResponse = require('../utils/errorResponse')

exports.protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // Bearer jwttokenwjekrwjrkweokrweo
        // Get the jwt of first split array
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        return next(new ErrorResponse("Not authorization to this route", 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
        const user = await UserModel.findById(decoded.id)

        if(!user){
            return next(new ErrorResponse("No user found with this id", 404))
        }

        req.user = user;

        next()
    } catch (error) {
        return next(new ErrorResponse("Not authorization to this route", 401))
    }
}