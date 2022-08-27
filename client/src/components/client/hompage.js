import {
    Box, Button, Table, TableBody, TableHead, TableCell, TableRow, Typography, AppBar, Toolbar,
    Stack, CardActions, CardContent, Card
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_POST_USER } from '../../redux/actions/actions'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import PostCreation from '../client/postCreation';
import {  ErrorOutline } from "@mui/icons-material";


export default function ClientHompageCheck() {
    const [tokencheck] = useState(window.sessionStorage.getItem('token'))
    const nav = useNavigate()
    if (tokencheck) {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }
    return (
        tokencheck ? <>
            <ClientHompage />
        </>
            :
            <>
                <Card sx={{ width: '100%', maxWidth: "40%", mx: "auto", mt: "12%", p: "2%", backgroundColor: "#e9e9e9" }} variant="outlined">
                    <CardContent>
                        <Typography sx={{ textAlign: "center" }} variant="h5" color="dark">Please Login To Access The Content</Typography>
                    </CardContent>
                    <CardActions>
                        <Button sx={{ mx: "auto", fontSize: "1.5rem" }} onClick={() => nav('/')}>Login</Button>
                    </CardActions>
                </Card>
            </>
    );
}
const ClientHompage = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const post = useSelector(state => state.user_posts)
    const fetch_post_status = useSelector(state => state.fetch_post_user_status)
    const client_details = jwtDecode(window.sessionStorage.getItem('token')).client
    const [addPost, setAddPost] = useState(false)
    useEffect(() => {
        dispatch(FETCH_POST_USER(client_details._id))
    }, [dispatch,client_details._id])

    const Logout = () => {
        window.sessionStorage.removeItem('token')
        nav('/')
    }
    return (
        fetch_post_status === "success" &&
        <Stack spacing={{ xs: 4 }} sx={{ mx: 1, mb: 4 }}>
            <AppBar sx={{ zIndex: 1, position: "static" }}>
                <Toolbar sx={{ justifyContent: "end" }}>
                    <Stack direction={{ sm: "row" }} spacing={{ md: 4 }} alignItems="center">
                        <Button onClick={() => Logout()} sx={{ color: "white" }}>Logout</Button>
                        <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>{`welcome ${client_details.firstname} ${client_details.lastname}`}</Typography>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Stack spacing={4}>
                <Box>
                    <Button variant="contained" onClick={() => setAddPost(!addPost)}> Add Project</Button>
                </Box>
                {
                    addPost ? <PostCreation /> : null
                }
                <Box sx={{ borderLeft: "0.5rem solid #4a148c", p: "1rem", backgroundColor: "#4a148c21" }}>
                    <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>Your recent project's</Typography>
                </Box>
                {
                    post[0].projects.length > 1 ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>Project</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>Free Lancer</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    post[0].projects.map((p_obj, i) => {
                                        return (
                                            <TableRow key={p_obj._id}>
                                                <TableCell>
                                                    <Box>
                                                        <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>Title</Typography>
                                                        <Typography>{p_obj.title}</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>description</Typography>
                                                        <Typography>{p_obj.description}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Box>
                                                        <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>name</Typography>
                                                        <Typography>{p_obj.viewed[i].name}</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>contact</Typography>
                                                        <Typography>{p_obj.viewed[i].email}</Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                        :
                        <Card elevation={4} sx={{ mt: "5%" }}>
                            <CardContent sx={{ display : "flex", justifyContent:"center"}} >
                                <Stack  spacing={{ xs: 1 }} mb={1} sx={{textAlign: "center",alignItems:"center" }} >
                                    <ErrorOutline color="error" fontSize="large"></ErrorOutline>
                                    <Typography variant="h5" color="text.secondary">No Projects ! Post One</Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                }
            </Stack>


        </Stack>
    )
}