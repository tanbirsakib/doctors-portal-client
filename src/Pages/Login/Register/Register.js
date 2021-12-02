import { Alert, Button, Container, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import login from '../../../images/login.png'
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const { registerNewUser, loading, aurthError, user } = useAuth();
    const [loginData, setLoginData] = useState({});
    const history = useHistory()
    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;

        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        console.log(newLoginData)
        setLoginData(newLoginData)
    }
    const handleSubmit = (e) => {
        if (loginData.password !== loginData.password2) {
            alert('Your password didnt matched')
            return;
        }
        registerNewUser(loginData.email, loginData.password, loginData.name, history);
        console.log("the name frog reg panel", loginData.name)
        e.preventDefault()
    }
    return (
        <div>
            <Navigation></Navigation>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ mt: 8 }} variant="body1" gutterBottom component="div">
                            Register
                        </Typography>
                        {!loading && <form onSubmit={handleSubmit}>
                        <TextField
                                onBlur={handleOnBlur}
                                name="name"
                                sx={{ width: "75%" }}
                                id="outlined-basic"
                                label="Your Name"
                                variant="standard" />
                            <TextField
                                onBlur={handleOnBlur}
                                name="email"
                                type="email"
                                sx={{ width: "75%" }}
                                id="outlined-basic"
                                label="Your Email"
                                variant="standard" />
                            <TextField
                                onBlur={handleOnBlur}
                                name="password"
                                sx={{ width: "75%" }}
                                id="outlined-basic"
                                type="password"
                                label="Password"
                                variant="standard" />
                            <TextField
                                onBlur={handleOnBlur}
                                name="password2"
                                sx={{ width: "75%" }}
                                id="outlined-basic"
                                type="password"
                                label="Confirm Password"
                                variant="standard" />
                            <NavLink to="/login">
                                <Button sx={{ width: "75%" }} type="submit">Already have an account? Go to login </Button>
                            </NavLink>
                            <Button style={{ backgroundColor: "#30b8aa", color: "white" }} sx={{ width: "75%" }} type="submit">Sing Up </Button>
                        </form>}
                        {
                            loading &&
                            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                                <LinearProgress color="secondary" />
                            </Stack>
                        }
                        {user.email && <Alert sx={{ mt: 1 }} severity="success">Registered Successfully</Alert>}
                        {aurthError && <Alert sx={{ mt: 1 }} severity="error">{aurthError}</Alert>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img style={{ width: "100%" }} src={login} alt="" />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Register;