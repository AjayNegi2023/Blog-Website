import mongoose from "mongoose"

 const Connection= async (USERNAME,PASSWORD)=>{
    const URL=`mongodb://${USERNAME}:${PASSWORD}@ac-mg80eoa-shard-00-00.kumocff.mongodb.net:27017,ac-mg80eoa-shard-00-01.kumocff.mongodb.net:27017,ac-mg80eoa-shard-00-02.kumocff.mongodb.net:27017/?ssl=true&replicaSet=atlas-mu8xa1-shard-0&authSource=admin&retryWrites=true&w=majority`;
    // const URL=`mongodb://${USERNAME}:${PASSWORD}@ac-mg80eoa-shard-00-00.kumocff.mongodb.net:27017,ac-mg80eoa-shard-00-01.kumocff.mongodb.net:27017,ac-mg80eoa-shard-00-02.kumocff.mongodb.net:27017/?ssl=true&replicaSet=atlas-mu8xa1-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
        
        mongoose.set("strictQuery", false);
        await mongoose.connect(URL, {useNewUrlParser:true});
        console.log("Db Connected successfully");
    }catch(error){
        console.log("Db Connected Error",error);
    }
}  
export default Connection