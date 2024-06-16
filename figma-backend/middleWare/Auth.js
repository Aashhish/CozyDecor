import Jwt from "jsonwebtoken";

export const applyMiddleWare = (req, res, next) => {
    const Token = req.headers.authorization;
    if (!Token) {
        return res.status(400).json({ message: "Token Not Found" });
    }
    try {
        const tokenWithoutBearer = Token.split(" ")[1];
        const decode = Jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY)
        req.user = decode.userId;
        next();
    }
    catch(err){
        console.log(err, "Somr thing went wrong");
        return res.status(400).json({message: "Token is not valid"});
    }
}