import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button,Grid } from '@mui/material';
import { backend_url } from '../url/url';
import { Box } from '@mui/material'
import { Stack } from '@mui/system';

export default function PasswordForget() {
    const [email, setEmail] = useState('')
    const [tab, setTab] = useState('client')
    const nav = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = (tab === "client") ? await axios.patch(`${backend_url}/client/forgetpassword`, { email: email })
                : await axios.patch(`${backend_url}/lancer/forgetpassword`, { email: email })
            if (!response.data.error && response.data.msg) { 
                
                nav('/')
                alert(response.data.msg) 
            }
            else if(response.data.error){
                alert(response.data.error)
            }
            else{
                alert("unkown error occured")
            }
        }
        catch (err) {
            alert('Email Not Registered')
        }
    }
    return (
        <Box my={{xs:"15%",md:"10%"}} mx={{xs:2,sm:"auto"}} width={{sm:400}}>
            <Stack spacing={{ xs: 2 }}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" component="div"> Password Reset  </Typography>
                </Box>
                <Stack direction={{ sm: "row" }} spacing={{ xs: 1 }} mb={1}> 
                    <Button  variant={tab === "client" ? 'contained' : "standard"} onClick={() => setTab('client')}>Client</Button>
                    <Button  variant={tab === "lancer" ? 'contained' : "standard"} onClick={() => setTab('lancer')}>Free Lancer</Button>
                </Stack>
                <Stack spacing={{ xs: 2 }}>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <Grid container spacing={{ xs: 2 }} >
                            <Grid item xs={12}>
                                <TextField type="email" name="Email" label="Email"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Button fullWidth variant="contained" type="submit" > Send Link </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                    <Box>
                        <Button onClick={() => nav('/')}>Back</Button>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
}         