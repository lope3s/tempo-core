import {verify} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

function authenticate (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization || ''

    if (!token) return res.status(400).json({error: 'Missing token.'})

    const [, splitedToken] = token.split(" ")

    try {
        const verifyToken = verify(splitedToken, process.env.TOKEN_SECRET || '')
        
        req.body.sessionUserId = Object(verifyToken).id
        
        next();
    } catch (error) {
        return res.status(401).json({error: 'Invalid token.'})
    }
}

export default authenticate;