import React, { useEffect, useState } from 'react';
import { useSearchParams} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography, TextField, Button, Grid } from '@mui/material';
import jwtDecode from 'jwt-decode'
import { backend_url } from '../url/url';
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import YupPassword from 'yup-password'
export default function ResetForm() {
    const initialValues = {
        password: "",
        conf_password: ""
    }
    const [searchParams] = useSearchParams()
    const token = jwtDecode(searchParams.get('s'))
    const nav = useNavigate()
    const tab = useState(searchParams.get('tab'))

    useEffect(() => {
        if (token.exp * 1000 <= Date.now()) {
            alert('Link Expired')
            nav('/forgetpassword')
        }
    })
    YupPassword(Yup)
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, 'Minimum 8 Characters')
            .minLowercase(1, 'Minimum One LowerCase')
            .minUppercase(1, 'Minimum One UpperCase')
            .minNumbers(1, 'Minimum One Number')
            .minSymbols(1, 'Minimum One Special Character')
            .required('Required'),
        conf_password: Yup.string().oneOf([Yup.ref('password'), null], 'Password not match').required('Required')

    })

    const handleSubmit = async (e, token) => {
        let id = window.location.pathname.split('/')[2]
        if (token.exp * 1000 >= Date.now()) {

            try {
                let response = (tab === "client") ? await axios.patch(`${backend_url}/client/savepassword/${id}`, { password: e.password })
                    : await axios.patch(`${backend_url}/lancer/savepassword/${id}`, { password: e.password })
                if (!response.data.error) {
                    nav('/success')
                }
            }
            catch (err) {
                alert('Error saving password')
                
            }

        }
        else {
            alert('Token Expired')
        }




    }

    return (
        <Box my={{ xs: "15%", md: "10%" }} mx={{ xs: 2, sm: "auto" }} width={{ sm: 500 }}>
            <Stack spacing={{ xs: 2 }}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5"> Reset Password  </Typography>
                </Box>
                <Box>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(e) => handleSubmit(e, token)}
                    >
                        {
                            (props) => {
                                return (

                                    <Form className="form" >
                                        <Stack spacing={{ xs: 2 }}>
                                            <Grid container rowSpacing={{ xs: 2 }} columnSpacing={{ sm: 2 }} mb={2}>
                                                <Grid item xs={12} >
                                                    <TextField type="password" name="password" label="Password"
                                                    fullWidth
                                                        value={props.values.password}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                        error={props.touched.password && props.errors.password && true}
                                                    />
                                                    <Typography sx={{ color: "red" }}>
                                                        {
                                                            props.touched.password && props.errors.password && props.errors.password
                                                        }
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                    fullWidth
                                                        label="Confirm Password"
                                                        type="password"
                                                        name="conf_password"
                                                        value={props.values.conf_password}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}

                                                        error={props.touched.conf_password && props.errors.conf_password && true}
                                                    />
                                                    <Typography sx={{ color: "red" }}>
                                                        {
                                                            props.touched.conf_password && props.errors.conf_password && props.errors.conf_password
                                                        }
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Box sx={{ textAlign: "center" }}>
                                                <Button fullWidth variant="contained" type="submit"> Submit </Button>
                                            </Box>
                                        </Stack>
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </Box>
            </Stack>
        </Box>

    );
} 