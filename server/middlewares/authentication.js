const { verifyToken } = require('../helpers/jwt')
const User  = require('../models/user')

function authentication(req, res, next) {
  try {
    req.decoded = verifyToken(req.headers.token)
    User.findOne({ _id: req.decoded._id })
      .then(result => {
        if (!result) {
          next({ status: 401, message: "Unauthorized" })
        } else {
          next()
        }
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}

module.exports = authentication