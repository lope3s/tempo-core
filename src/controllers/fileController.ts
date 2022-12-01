import {Request, Response} from 'express';
import { File } from '../entities';
import {deleteFile, storeFile} from '../helpers';
import { ObjectId } from 'mongodb';

class FileController {
    async storeFile(req: Request, res: Response){
        if (!req.body.userId) return res.status(400).json({error: 'Missing user id.'})

        try {
            new ObjectId(req.body.userId)
        } catch (error) {
            return res.status(400).json({error: "Invalid ID format."})
        }

        if (Array.isArray(req.files)) {
            try {
                await Promise.all(req.files.map(async file => {
                    const fileUrl = process.env.NODE_ENV === 'dev' ? 
                    `${process.env.APP_URL}/${file.path.replace('src/', '')}` : 
                    `${process.env.APP_URL}/uploads/${file.filename}`
    
                    const fileRepresentation = new File(
                        file.mimetype, 
                        file.size, 
                        file.originalname, 
                        file.filename, 
                        fileUrl, 
                        req.body.userId
                    )
    
                    storeFile(fileRepresentation)
                }))
    
                return res.status(200).json({message: 'Sucess.'})                
            } catch (error) {
                console.log(error)
                return res.status(500).json({error: 'Internal Server Error.'})
            }
        }
    }

    async deleteFile(req: Request, res: Response) {
        if(!req.params.fileId) return res.status(400).json({error: 'Missing file id.'})

        try {
            new ObjectId(req.params.fileId)
        } catch (error) {
            return res.status(400).json({error: "Invalid ID format."})
        }

        try {
            await deleteFile(req.params.fileId)

            return res.status(204).send()
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Internal Server Error.'})
        }
    }
}

export default new FileController();