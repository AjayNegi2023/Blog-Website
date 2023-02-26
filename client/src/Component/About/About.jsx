import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Email } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Project-Blog Website 2023</Typography>
                <Text variant='h4' color="darkblue">Ajay Negi</Text>
                <Text variant="h5">I am a 3rd year student who is currently pursuing his B-Tech(2020-2024) at Uttaranchal University Dehradun,Uttarakhand.
                    <br />
                    I have built a Blog website If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/AjayNegi2023" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/ajay-negi-852870243/" target="_blank" color="inherit"><LinkedInIcon /></Link>
                    </Box>
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;
