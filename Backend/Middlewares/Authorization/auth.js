// const CustomError = require("../../Helpers/error/CustomError");
// const User = require("../../Models/user")
// const jwt = require("jsonwebtoken");
// const asyncErrorWrapper =require("express-async-handler")
// const { isTokenIncluded ,getAccessTokenFromHeader} = require("../../Helpers/auth/tokenHelpers");


// const getAccessToRoute = asyncErrorWrapper(async(req,res,next) =>{

//     const {JWT_SECRET_KEY} =process.env ;

//     if(!isTokenIncluded(req)) {

//         return next(new CustomError("You are not authorized to access this route ", 401))
//     }

//     const accessToken = getAccessTokenFromHeader(req)

//     const decoded = jwt.verify(accessToken,JWT_SECRET_KEY) ;

//     const user = await User.findById(decoded.id)
   
//     if(!user) {
//         return next(new CustomError("You are not authorized to access this route ", 401))
//     }

//     req.user = user ; 

//     next()

// })



// module.exports ={getAccessToRoute}




const CustomError = require("../../Helpers/error/CustomError");
const User = require("../../Models/user");
const jwt = require("jsonwebtoken");
const asyncErrorWrapper = require("express-async-handler");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../Helpers/auth/tokenHelpers");

// Middleware to check if the user is authenticated (logged in)
const getAccessToRoute = asyncErrorWrapper(async (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;

  // Check if a token is included in the request headers
  if (!isTokenIncluded(req)) {
    return next(
      new CustomError("You are not authorized to access this route", 401)
    );
  }

  // Get the access token from the header
  const accessToken = getAccessTokenFromHeader(req);

  // Verify the token and decode the user's ID
  const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);

  // Find the user in the database based on the decoded ID
  const user = await User.findById(decoded.id);

  // If no user is found, the token is invalid or the user no longer exists
  if (!user) {
    return next(
      new CustomError("You are not authorized to access this route", 401)
    );
  }

  // Attach the user object to the request for subsequent middleware/controllers
  req.user = user;

  next();
});

// Middleware to check if the authenticated user has the 'admin' role
const getAdminAccess = (req, res, next) => {
  // This middleware must be used AFTER getAccessToRoute,
  // as it relies on req.user being populated.
  if (req.user.role !== "admin") {
    return next(
      new CustomError("Only admins are authorized to access this route", 403)
    );
  }
  next();
};

module.exports = {
  getAccessToRoute,
  getAdminAccess,
};