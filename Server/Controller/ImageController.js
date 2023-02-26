import grid from 'gridfs-stream';
import mongoose from 'mongoose'
const url = 'http://localhost:8000';
const con = mongoose.connection;

let gfs, gridfsBucket;
con.once('open',()=>{
    gridfsBucket= new mongoose.mongo.GridFSBucket(con.db,{
        bucketName:'fs'
    });
    gfs=grid(con.db,mongoose.mongo);
    gfs.collection('fs');
})

export const uploadImage= (req,res)=>{
    if(!req.file){
        return res.status(404).json('File not found');

    }

    const imageUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json(imageUrl);

}

export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
       
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}