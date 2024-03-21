const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // console.log(req)

    const authcookie = req.cookies.authcookie;
    console.log(authcookie);
    console.log("check for the frontend");
    jwt.verify(authcookie, process.env.JSON_SECRET_KEY, (err, data) => {
        if (!authcookie) {
            console.log("Unauthorized: No token provided")
            return res.status(401).send("Unauthorized: No token provided");
        }

        if(err) res.status(403);
        else {
            req.userId = data.userId;
            next();  
        }
    });
}

module.exports = {
    verifyToken
}