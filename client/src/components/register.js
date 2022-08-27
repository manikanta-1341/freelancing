import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import axios from 'axios'
import { backend_url } from '../url/url'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const nav = useNavigate()
    const [registerTab, SetRegisterTab] = useState('client')
    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        conf_password: ""
    }
    YupPassword(Yup);
    const ValidationSchema = Yup.object().shape({
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        email: Yup.string().test(
            (value, { createError }) => {
                if (value !== undefined && value !== "") {
                    if (!value.includes('@gmail.com') || value.split('')[0] === ".") {
                        return createError({ message: "Enter valid mail address" })
                    }
                    else {
                        return true
                    }
                }
                return true
            }
        ).required('Required'),
        password: Yup.string()
            .min(8, 'Minimum 8 Characters')
            .minLowercase(1, 'Minimum One LowerCase')
            .minUppercase(1, 'Minimum One UpperCase')
            .minNumbers(1, 'Minimum One Number')
            .minSymbols(1, 'Minimum One Special Character')
            .required('Required'),
        conf_password: Yup.string().oneOf([Yup.ref('password'), null], 'Password not match').required('Required')
    })

    const Submit = async (values, onSubmitprops) => {
        try {
            let client_values = values
            delete client_values.conf_password;
            let response = (registerTab === 'client') ? await axios.post(`${backend_url}/client/create`, {
                client: client_values
            }) :
                await axios.post(`${backend_url}/lancer/create`, {
                    lancer: client_values
                })

            response.data.msg ?  alert(response.data.msg) : alert(response.data.error)
            onSubmitprops.resetForm()
            response.data.msg && nav('/')
        }
        catch (e) {
            
            alert('Submission failed')
        }
    }
    return (
        <Box my={{xs:"15%",md:"9%"}} mx={{xs:2,sm:"auto"}} width={{sm:500}}>  
            <Stack spacing={{ xs: 2 }} m={{ sm: "auto" }}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4">Sign Up</Typography>
                </Box>

                <Stack direction={{ sm: "row" }} spacing={{ xs: 1 }} mb={1}>
                    <Button variant={registerTab === "client" ? 'contained' : "standard"} onClick={() => SetRegisterTab('client')}>Client</Button>
                    <Button variant={registerTab === "lancer" ? 'contained' : "standard"} onClick={() => SetRegisterTab('lancer')}>Free Lancer</Button>
                </Stack>

                <Formik
                    initialValues={initialValues}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, onSubmitprops) => Submit(values, onSubmitprops)}
                >
                    {
                        (props) => {
                            return (
                                <Form>
                                    <Stack spacing={{md:1}}> 
                                        <Grid container rowSpacing={{ xs: 2 }} columnSpacing={{ sm: 2 }} mb={2}>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <TextField
                                                    fullWidth
                                                    name="firstname"
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={props.values.firstname}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.firstname && props.errors.firstname && true}
                                                />
                                                <Typography sx={{ color: "red" }}>
                                                    {
                                                        props.touched.firstname && props.errors.firstname && props.errors.firstname
                                                    }
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <TextField
                                                    fullWidth
                                                    name="lastname"
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={props.values.lastname}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.lastname && props.errors.lastname && true}
                                                />
                                                {
                                                    <Typography sx={{ color: "red" }}>
                                                        {
                                                            props.touched.lastname && props.errors.lastname && props.errors.lastname
                                                        }
                                                    </Typography>
                                                }
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    fullWidth
                                                    name="email"
                                                    type="email"
                                                    placeholder="Email"
                                                    value={props.values.email}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.email && props.errors.email && true}
                                                />
                                                {
                                                    <Typography sx={{ color: "red" }}>
                                                        {
                                                            props.touched.email && props.errors.email && props.errors.email
                                                        }
                                                    </Typography>
                                                }
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <TextField
                                                    fullWidth
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    value={props.values.password}

                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.password && props.errors.password && true}
                                                />
                                                {
                                                    <Typography sx={{ color: "red" }}>
                                                        {
                                                            props.touched.password && props.errors.password && props.errors.password
                                                        }
                                                    </Typography>
                                                }
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <TextField
                                                    fullWidth
                                                    name="conf_password"
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    value={props.values.conf_password}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.conf_password && props.errors.conf_password && true}
                                                />
                                                {
                                                    <Typography sx={{ color: "red" }}>
                                                        {
                                                            props.touched.conf_password && props.errors.conf_password && props.errors.conf_password
                                                        }
                                                    </Typography>
                                                }
                                            </Grid>
                                        </Grid>
                                        <Box>
                                            <Button onClick={() => nav('/')}>Already have an account?</Button>
                                        </Box>
                                        <Box sx={{ textAlign: "center",mb:1 }}>
                                            <Button variant="contained" fullWidth type="submit">Create</Button>
                                        </Box>
                                    </Stack>
                                </Form>
                            )
                        }
                    } 

                </Formik>

            </Stack>
        </Box>
    )
}