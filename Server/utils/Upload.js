import { GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
// console.log(USERNAME);
// console.log(PASSWORD)


const storage = new GridFsStorage({
    
     url:`mongodb://${USERNAME}:${PASSWORD}@ac-mg80eoa-shard-00-00.kumocff.mongodb.net:27017,ac-mg80eoa-shard-00-01.kumocff.mongodb.net:27017,ac-mg80eoa-shard-00-02.kumocff.mongodb.net:27017/?ssl=true&replicaSet=atlas-mu8xa1-shard-0&authSource=admin&retryWrites=true&w=majority`,
     options:{useNewUrlParser:true},
     file:(req,file)=>{
        const match =["image/png","image/jpg"];
        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }

     }
})

export default multer({storage}); 