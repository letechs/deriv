import './Home.css'
import Button from '@mui/material/Button';
import TokenIcon from '@mui/icons-material/Token';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useRef, useState } from 'react';
import App3 from '../App3';
import { Checkbox, FormControlLabel, InputAdornment } from '@mui/material';
import Dashboard from './Dashboard';

const Home = (props) => {

    const inToken = useRef(null);

    const handleClick = async (e) => {
        props.verify(inToken.current.value)
        // submit(inToken.current.value)
    }

    return (
        <>
            <div className='container-fluid home'>
                <div className='text-center'>
                    <div className='row justify-content-center' style={{ height: '100vh' }}>
                        <div className='align-self-center col-lg-5 col-md-5 col-sm-8 border rounded-5 login'>
                            <p>Powered by</p>
                            <p>Welcome to Free bot trading platform</p>
                            <p> <Button variant="outlined" startIcon={<AccountCircleIcon />}>Create Account</Button></p>

                            <p> <Button variant="contained" color="secondary" startIcon={<LoginIcon />}>Login Deriv Account</Button> </p>

                            <div className='row justify-content-around mb-3'>
                                <div >
                                    <Box>
                                        <TextField
                                            size="small"
                                            type="password"
                                            inputRef={inToken}
                                            label="Enter your token"
                                        />

                                        <Button type="submit" variant="contained" color="secondary" startIcon={<LoginIcon />} onClick={handleClick}>Submit</Button>

                                    </Box>

                                    <FormControlLabel
                                        value="top"
                                        control={<Checkbox />}
                                        label="Remember your token"
                                    />

                                </div>

                            </div>
                            <p>Generate your token (Read & Trade) here</p>

                            <Box sx={{ sx: { m: 1 } }}>
                                <Fab size="small" color="primary" aria-label="add" ><InstagramIcon /></Fab>
                                <Fab size="small" color="error" aria-label="add"><YouTubeIcon /></Fab>
                            </Box>
                        </div>
                    </div>
                </div>


            </div >

        </>
    )
}

export default Home;