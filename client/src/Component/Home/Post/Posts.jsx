import React,{useEffect, useState} from 'react';
import { Box, Grid } from '@mui/material';
import {API} from '../../../Service/Api'
import Post from './Post';
import { useSearchParams,Link } from 'react-router-dom';
const  Posts=()=> {
    const [post,setPost]=useState([]);
    const [searchParams]= useSearchParams();

    const category= searchParams.get('category')

    useEffect(()=>{
            const fetchData=async()=>{
                 const response=   await API.getAllPosts({category:category || ''});
                 if(response.isSuccess){
                    setPost(response.data);
                 }
            }

            fetchData();
    },[category])
  return (
    <>
        
                  {
                     post && post.length > 0 ? post.map(post=>(
                                <Grid item lg={3} sm={4} xs={12} >
                                  <Link style={{textDecoration:'none', color:'inherit'}} to={`details/${post._id}` } id={post.id}>
                                <Post post={post}/>
                                </Link>
                                </Grid>
                    )):
                     <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}> No Data available to Display</Box>
                  }
        
    </>
  )
}

export default Posts