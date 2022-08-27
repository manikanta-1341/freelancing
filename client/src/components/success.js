import * as React from 'react';
import { Box } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function SuccessCard() {
    const nav = useNavigate()
    return (
        <Box my={{ xs: "15%", md: "9%" }} mx={{ xs: 2, sm: "auto" }} width={{ sm: 500 }}>
            <Card width="100%">
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <CheckCircleOutlineOutlined color="success" sx={{ fontSize: 48, textalign: "center" }} />
                    <Typography sx={{ mt: 1.5 }} variant="h5" color="text.dark" gutterBottom>
                        Password Changed Successfully
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent:"center"}}>
                    {/* <Box sx={{ textAlign: "center" }}> */}
                        <Button variant="contained" size="large" onClick={() => nav('/')}>Login</Button>
                    {/* </Box> */}
                </CardActions>
            </Card>
        </Box>
    );
}