
import { Box, Button, Grid, Select, TextField, Typography,MenuItem,InputAdornment  } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import axios from 'axios'
import { backend_url } from '../../url/url'
export default function PostCreation() {

    const initialValues = {
        title: "",
        description: "",
        deadline: "",
        frequency: "d",
        pay: "",
        language: "",

    }
    YupPassword(Yup);
    const ValidationSchema = Yup.object().shape({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        deadline: Yup.number().typeError('Numbers Only').required('Required'),
        pay: Yup.number().typeError('Numbers Only').required('Required'),
        language: Yup.string().required('Required')
    })

    const Submit =async(values,onSubmitprops)=>{
        try{
            let client_values = values
            client_values.deadline +=client_values.frequency
            client_values.pay += '$'
            delete client_values.frequency;
            let response = await axios.put(`${backend_url}/client/create/post/6307abd558c327079bfbe5da`,{
                ...client_values
            })
            
            response.data.msg? alert(response.data.msg): alert(response.data.error)
            onSubmitprops.resetForm()
        }
        catch(e){
            alert("Submission Failed")
        }
    }
    return (
        <Box  >
            <Formik
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                
                onSubmit={(values, onSubmitprops) => Submit(values, onSubmitprops)}
            >
                {
                    (props) => {
                        return (
                            <Form>
                                
                                <Grid container  rowSpacing={{xs:2,md:2}} columnSpacing={{sm:2}}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            fullWidth
                                            name="title"
                                            type="text"
                                            placeholder="Post title"
                                            value={props.values.title}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.title && props.errors.title && true}
                                        />
                                        <Typography sx={{ color: "red" }}>
                                            {
                                                props.touched.title && props.errors.title && props.errors.title
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            fullWidth
                                            name="description"
                                            type="text"
                                            placeholder="Describe..."
                                            multiline
                                            rows={5}
                                            value={props.values.description}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.description && props.errors.description && true}
                                        />
                                        {
                                            <Typography sx={{ color: "red" }}>
                                                {
                                                    props.touched.description && props.errors.description && props.errors.description
                                                }
                                            </Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            name="deadline"
                                            type="text"
                                            placeholder="Deadline"
                                            value={props.values.deadline}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.deadline && props.errors.deadline && true}
                                        />
                                        {
                                            <Typography sx={{ color: "red" }}>
                                                {
                                                    props.touched.deadline && props.errors.deadline && props.errors.deadline
                                                }
                                            </Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Select
                                            fullWidth
                                            name="frequency"
                                            value={props.values.frequency}
                                        >
                                            <MenuItem selected value="d">Days</MenuItem>
                                            <MenuItem value="m">Month</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            name="pay"
                                            placeholder="Payout"
                                            value={props.values.pay}
                                            InputProps={{
                                                endAdornment:<InputAdornment position="end">$</InputAdornment>
                                            }}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.pay && props.errors.pay && true}
                                        />
                                        {
                                            <Typography sx={{ color: "red" }}>
                                                {
                                                    props.touched.pay && props.errors.pay && props.errors.pay
                                                }
                                            </Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            name="language"
                                            type="text"
                                            placeholder="Working Language"
                                            value={props.values.language}
                                            helperText="Ex: python,javascript"
                                            
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.language && props.errors.language && true}
                                        />
                                        {
                                            <Typography sx={{ color: "red" }}>
                                                {
                                                    props.touched.language && props.errors.language && props.errors.language
                                                }
                                            </Typography>
                                        }
                                    </Grid>
                                </Grid>
                                <Box sx={{mt:6,textAlign: "center"}} >
                                <Button fullWidth variant="contained" type="submit">Create</Button>
                                </Box>
                                
                            </Form>
                        )
                    }
                }

            </Formik>
        </Box>
    )
}