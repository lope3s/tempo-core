import { ObjectId } from "mongodb";

 class File {
    type: string;
    size: number;
    name: string;
    key: string;
    url: string;
    createdAt: Date;
    deletedAt: null | Date;
    userId: ObjectId;
    
     constructor(
         type: string,
         size: number,
         name: string,
         key: string,
         url: string,
         userId: string
     ) {
         this.type = type;
         this.size = size;
         this.name = name;
         this.key = key;
         this.url = url;
         this.createdAt = new Date();
         this.deletedAt = null;
         this.userId = new ObjectId(userId)
     }
 }

export default File;
