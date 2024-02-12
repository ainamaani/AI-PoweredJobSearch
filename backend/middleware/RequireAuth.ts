import { Response, Request,NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import User from "../models/User";

// extend the express Request module to include the user property
declare module "express" {
    interface Request {
        user?: any;
    }
}

const RequireAuth = async(req: Request, res: Response, next: NextFunction) =>{
    // verify authentication
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(' ')[1];
    try {
        const { SECRET } = process.env;
        if(SECRET){
            const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
            // check if _id exists on the decoded token
            if(typeof decodedToken._id === 'string'){
                const { _id } = decodedToken;
                req.user = await User.findOne({ _id }).select('_id');
                next();
            }
            
            
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized" })
    }
}

export default RequireAuth;