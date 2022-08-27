import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { APPLY_POST, FETCH_POST } from "../../redux/actions/actions"
import { Box, Card, CardActions, CardContent, Typography, Button, AppBar, Toolbar } from '@mui/material'
import jwtDecode from "jwt-decode"
import { Stack } from "@mui/system"
import { useNavigate } from "react-router-dom"


export default function PostsCheck(){
    const [tokencheck] = useState(window.sessionStorage.getItem('l_token'))
    const nav = useNavigate()
    if (tokencheck) {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }
    return (
        tokencheck ? <>
            <Posts />
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


const Posts = ()=> {
    const lancer_info = jwtDecode(window.sessionStorage.getItem('l_token')).lancer
    const dispatch = useDispatch()
    const nav = useNavigate()
    const posts = useSelector(state => state.posts)
    const posts_fetch_apiStatus = useSelector(state => state.fetch_post_status)
    useEffect(() => {
        dispatch(FETCH_POST())
    }, [dispatch])

    const Apply_post = (client_id, project_id) => {
        dispatch(APPLY_POST(
            {
                lancer_id: lancer_info._id,
                details: {
                    client_id: client_id,
                    project_id: project_id,
                    lancer: {
                        name: lancer_info.firstname+" "+lancer_info.lastname,
                        email: lancer_info.email
                    }
                }
            }
        ))
        dispatch(FETCH_POST())
    }

    const Logout = () => {
        window.sessionStorage.removeItem('l_token')
        nav('/')
    }

    return (
        posts_fetch_apiStatus === "pending" ?
            <Box></Box>
            : posts_fetch_apiStatus === "success" ?
            
                <Stack spacing={{xs:4}}>
                    <AppBar sx={{ zIndex: 1, position: "static" }}>
                        <Toolbar sx={{ justifyContent: "end" }}>
                            <Stack direction={{ sm: "row" }} spacing={{ md: 4 }} alignItems="center">
                                <Button onClick={() => Logout()} sx={{ color: "white" }}>Logout</Button>
                                <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>welcome&nbsp;{lancer_info.firstname + " " + lancer_info.lastname}</Typography>
                            </Stack>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{display: "flex", justifyContent:"space-around",alignItems: "center" }}>
                        {
                            posts.map((obj) => {
                                return (
                                    obj.projects.map((p_obj, p_i) => {
                                        return (
                                            p_obj.applied !== "yes" &&
                                            <Card elevation={4} key={obj._id}> 
                                                <CardContent>
                                                    <Box> 
                                                        <Typography variant="h5" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>title</Typography>
                                                        <Typography variant="h6" sx={{ textTransform: "capitalize"}}>{p_obj.title}</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="h5" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>description</Typography>
                                                        <Typography variant="h6" sx={{ textTransform: "capitalize"}}>{p_obj.description}</Typography>

                                                    </Box>
                                                    <Stack direction="row" spacing={{md:4}}>
                                                        <Box>
                                                            <Typography variant="h5" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>deadline</Typography>
                                                            <Typography variant="h6" sx={{ textTransform: "capitalize"}}>{p_obj.deadline}</Typography>

                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h5" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>pay</Typography>
                                                            <Typography variant="h6" sx={{ textTransform: "capitalize"}}>{p_obj.pay}</Typography>

                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h5" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>Languages</Typography>

                                                            <Typography variant="h6" sx={{ textTransform: "capitalize"}}>{p_obj.language}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </CardContent>
                                                <CardActions>
                                                    <Button onClick={() => Apply_post(obj._id, p_obj._id)}>Apply</Button>
                                                </CardActions>
                                            </Card>
                                        )
                                    })
                                )
                            })
                        }
                    </Box>
                </Stack>
                : posts_fetch_apiStatus === "failed" &&
                <Box></Box>
    )
}