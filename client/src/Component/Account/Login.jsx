import React,{ useState,useContext } from 'react'
import { Box, TextField, styled, Button, Typography } from '@mui/material'
import { API } from '../../Service/Api'
import { DataContext } from '../Context/DataProvider'
import { useNavigate } from 'react-router-dom'
const Component = styled(Box)`
width:400px;
margin:auto;
box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6);
`
const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'

})

const LoginButton = styled(Button)`
        text-transform:none;
        background:#fb641b;
        color:#fff;
        height:48px;
        border-radius: 2px;
`
const SignupButton = styled(Button)`
        text-transform:none;
        background:#fff;
        color:#2874f0;
        height:48px;
        border-radius: 2px;
        box-shadow:0 2px 4px 0 rgb(0 0 0/ 20%);
`
const Wrapper = styled(Box)`
        padding:25px 35px;
        display:flex;
        flex:1;
        flex-direction:column;
        &>div, &>button, &>p {
            margin-top:20px
        }
`
const Error = styled(Typography)`
            font-size:10px;
            color:#ff6161;
            line-height:0;
            margin-top:10px;
            font-weight:600;
`
const Text = styled(Typography)`
        color:#878787;
        font-size:16px;
`

const signupIntitalValues={
    name:'',
    username:'',
    password:''
}
const loginIntitalValues={
    username:'',
    password:''
}
const Login = ({isuserAuthenticated}) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    
    const [account , toggleAccount]=useState('login');
    const [signup,setSignup]=useState(signupIntitalValues);
    const [error,setError]=useState('');
    const [login,setLogin]= useState(loginIntitalValues);

    const navigate = useNavigate();

const {setAccount}= useContext(DataContext);
    
    const toggleSignup=()=>{
        account==='signup'?toggleAccount('login'):toggleAccount('signup')    
    }

    const onInputChnage =(event)=>{
        setSignup({...signup,[event.target.name]:event.target.value});
            // console.log(event.target.name,event.target.value)
    }

    const signupUser=async()=>{
    
       let response= await API.userSignup(signup) ;
       if(response.isSuccess){
             

           setError('');
            setSignup(signupIntitalValues);
            toggleAccount('login')
       }else{
            setError('Something went worng! Please try again later')
       }
    //    userSignup
     
    }

    const onValueChange=(event)=>{
            setLogin({...login, [event.target.name]:event.target.value})
    }
     
    const loginUser =async()=>{
       let response = await API.userLogin(login);
       if(response.isSuccess){
            setError('');
            
            sessionStorage.setItem("accessToken",`Bearer ${response.data.accessToken}`)
            sessionStorage.setItem("refreshToken",`Bearer ${response.data.refreshToken}`)

            setAccount({username:response.data.username, name:response.data.name});
            isuserAuthenticated(true);
            navigate("/")
       }
       else{
        setError('Something went worng! Please try again later')
   }


    }
    
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="Image" />
                {
                    account==='login'?
                    <Wrapper>
                    <TextField variant='standard' value={login.username} onChange={(event)=>onValueChange(event)}  name="username" label="Enter Username" />
                    <TextField variant='standard' value={login.password} onChange={(event)=>onValueChange(event)} name="password" label="Enter Password"/>
                    
                    {error && <Error>{error}</Error>}

                    <LoginButton variant='contained' onClick={()=>loginUser()}>Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignupButton onClick={()=>toggleSignup()} >Create An Account</SignupButton>
                </Wrapper> 
                :

                <Wrapper>
                <TextField variant='standard' onChange={(event)=>{onInputChnage(event)}}  name='name'     label="Enter Name" />
                <TextField variant='standard' onChange={(event)=>{onInputChnage(event)}}  name='username' label="Enter Username"/>
                <TextField variant='standard' onChange={(event)=>{onInputChnage(event)}}  name='password' label="Enter Password"/>
                
                {error && <Error>{error}</Error>}
                <SignupButton onClick={()=>signupUser()} >Signup</SignupButton>
                <Text style={{ textAlign: 'center' }}>OR</Text>
                <LoginButton variant='contained' onClick={()=>toggleSignup()}>Already have an account</LoginButton>
            </Wrapper>
                }
                 
                
            </Box>
        </Component>
    )
}

export default Login