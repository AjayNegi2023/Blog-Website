import React,{useState,useEffect,useContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, InputBase, TextareaAutosize, styled } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DataContext } from '../Context/DataProvider';
import {API} from '../../Service/Api'

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));
const StyledFormControl = styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row;
`

const InputTextField = styled(InputBase)`
    flex:1;
    margin:0 30px;
    font-size:25px;
`

const initialPost={
    title:'',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createdDate:new Date()
}
const TextArea=styled(TextareaAutosize)`
width:100%;
margin-top:50px;
font-size:18px;
border:none;
&:focus-visible{
    outline:none;
}
`
const CreatPost = () => {
    
    const [post,setPost]=useState(initialPost)
    const [file,setFile]= useState('')
    const {account} = useContext(DataContext)
    const location = useLocation();
    const navigate= useNavigate()

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    // console.log("Post.picture is :",post.picture);


    useEffect(() => {
        const getImage = async () => {
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                const response = await API.uploadFile(data);
                post.picture   = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
       post.username  = account.username;
    }, [file])

    const handledChange=(e)=>{
            setPost({...post,[e.target.name]:e.target.value});
    }

    const savePost= async ()=>{
        let response = await API.createPost(post);
        if(response.isSuccess){
            navigate('/');
        }
    }

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor='fileInput' >
                    <AddCircleIcon fontSize='large' color='action' />
                </label>
                <input type='file' id='fileInput'
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField placeholder='Title' name="title" onChange={(e)=>handledChange(e)} />
                <Button variant='contained' onClick={()=>savePost()}>Publish</Button>
            </StyledFormControl>

            <TextArea minRows={5} placeholder='Tell Your Story'
            onChange={(e)=>handledChange(e)} name="description"
            />

           
        </Container>
    )
}

export default CreatPost