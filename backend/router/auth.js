const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
   const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from the authorization header

    if (token == null) {
        return res.status(401).json({ message: "Authorization token required" });
    }

    jwt.verify(token, "MaranTM", (err, user) => { // Use the user data instead of "user"
        if (err) {
            return res.status(401).json(err);
        }
        req.user = user; // Attach user token data (like user info) to request object
        next(); // Call next middleware
    });
};

module.exports = { authenticationToken };