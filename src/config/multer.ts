import { Request } from "express";
import multer, {FileFilterCallback} from 'multer';

const SIZE_LIMIT = 5 * 1024 * 1024

const storageConfig = {
    local: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, 'src/uploads/')
        },
        filename(req, file, callback) {
            callback(null, Date.now() + '-' + file.originalname)
        },
    })
}

const multerConfig = {
    storage: storageConfig.local,
    limits: {
        fileSize: SIZE_LIMIT,
    },
    fileFilter: (req: Request<any, any, any, any, Record<string, any>>, file: any, cb: FileFilterCallback) => {
        const allowedMimes = [
            'image/png',
            'image/webp',
            'image/jpeg'
        ]

        const isFileMimeAllowed = allowedMimes.find(mimes => file.mimetype === mimes)
        
        if(isFileMimeAllowed) return cb(null, true)

        return cb(new Error('Invalid file type.'))
    }
}

export default multerConfig;