/*function to verify token*/
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader !== 'undefined') {
        const bearer = authHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken
            /*res.send("Token verified!")*/
        next()
    } else {
        res.sendStatus(403)
    }
}
export default verifyToken;