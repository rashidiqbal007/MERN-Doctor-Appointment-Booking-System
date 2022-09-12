const jwt = require("jsonwebtoken");

// in req body we will have token in the headers part, if token is valid then we move to next

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        // verify token validity . first parameter token, 2nd is secret key in env file , decoded will have userID

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            if (err) {
                console.log(err)
                return res.status(401).send({
                    message: "Auth Failed, Token Invalid!",
                    success: false,
                });
            }
            
            // else will have success part and we call next function, reqbody we will attach user id
            else {
                req.body.userId = decoded.id;
                
                next();
            //    console.log("token verified")
            }

        });
    } catch (error) {
        return res.status(401).send({
            message: "Auth Failed.",
            success: false,
        }
        );
    }
} 
