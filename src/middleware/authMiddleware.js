// for connection establishment between pages.
// page theke page e gele actually kon user er info lagbe tha jante ekta token use kora to know which user is currently logged in
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided, deny access
    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // token valid na hole
        }

        //token valid hole user e save koro jate page gulo controller eta use kore data retrieve korte pare
        req.user = user;
        next(); // Proceed to the next middleware or the route's controller
    });
};

module.exports = authenticateToken;
