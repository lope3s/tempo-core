import {Request, Response} from 'express';
import {getUser} from '../helpers';
import {User} from '../entities';
import {sign} from 'jsonwebtoken';

class LoginController {
    async loginUser(req: Request, res: Response){
        if (!req.body.email) return res.status(400).json({error: 'Missing email.'})

        if (!req.body.password) return res.status(400).json({error: 'Missing password.'})

        try {
            const user = await getUser({email: req.body.email})
            
            if (!user) return res.status(404).json({error: 'User not found.'})

            if (!(user.password === User.hashPassword(req.body.password))) 
                return res.status(400).json({error: 'E-mail or password wrong.'})

            const token = sign({id: user._id}, process.env.TOKEN_SECRET || '', {expiresIn: '7d'})

            return res.status(200).json({token})
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Internal Server Error.'})
        }
    }
}

export default new LoginController();