// Middleware-function for logging the methods
module.exports = (req, res, next) => {

// Log the request method and the URL
    console.log(`${req.method} request for '${req.url}'`);

// Move on to next middleware or rute
    next();
};