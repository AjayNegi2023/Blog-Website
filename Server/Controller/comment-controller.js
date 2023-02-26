import Comment from "../Model/Comment.js"
export const newComment=async (request,response)=>{
   try{
           const comment=await new Comment(request.body);
           comment.save();
           response.status(200).json({msg:"Comment saved Successfully"});
   }catch(error){
            response.status(500).json({error:error.message});

   }
}
export const getAllComments=async (request,response)=>{
   try{
           const comments=await Comment.find({postId:request.params.id})
         
           response.status(200).json(comments);
   }catch(error){
            response.status(500).json({error:error.message});

   }
}
export const deleteComment=async (request,response)=>{
   try{
           const comment=await Comment.findById(request.params.id);
           await comment.delete();
         
           response.status(200).json({msg:'Comment Deleted Successfully'});
   }catch(error){
            response.status(500).json({error:error.message});

   }
}