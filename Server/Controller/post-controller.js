import Post from "../Model/Post.js"

export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();
        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getAllPosts= async (request,response)=>{
    let category= request.query.category;
    let posts;
    try {
        if(category){
             posts= await Post.find({categories:category})
        }else{
             posts= await Post.find({})
        }
        
          response.status(200).json(posts);
    } catch (error) {
         response.status(500).json({msg:"error Message"});
    }
}

export const getPost =async (request,response)=>{
    try {
          const post = await Post.findById(request.params.id);
           response.status(200).json(post);
    } catch (error) {
           response.status(500).json({msg:error});
    }
}
export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
           return  response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        return response.status(200).json({msg : 'post updated successfully'});
    } catch (error) {
        return response.status(500).json(error);
    }
}

export const deletePost =async (request,response)=>{
    try {
          const post = await Post.findById(request.params.id);
          if(!post){
            return response.status(404).json({msg:"Post Not Found"});
          }
          await post.delete();
           response.status(200).json({msg:"Delete Successfully!"});
    } catch (error) {
           response.status(500).json({error:error.message});
    }
}