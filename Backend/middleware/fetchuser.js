const jwt = require('jsonwebtoken');
const jwtSignature = "helloFriends!ChaiPeelo";

const fetchUser = (req,res,next) =>{
    // get the user from the jwt token (auth-token) and id to req.  object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"});
    }
    try {
        // jwt.verify() will return the data we entered while creating AuthToken (i.e. user id) .
    /* 
        {
            user: {
                id: user.id,
            }
        } 
    */
        const data = jwt.verify(token,jwtSignature);
        // req.user contains all the details of the user
        req.user = data.user;
        next();
        
    } catch (error) {

        res.status(401).send({error:"please authenticate using a valid token"});
        
    }

}

module.exports = fetchUser;