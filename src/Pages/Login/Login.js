import { Alert, Button, Container, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import React, { useState } from 'react';
import Navigation from '../Shared/Navigation/Navigation';
import login from '../../images/login.png'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { signInUser, loading, user, aurthError, googleSignIn } = useAuth();
    const [loginData, setLoginData] = useState({});

    const location = useLocation();
    const history = useHistory()

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }
    const handleSubmit = (e) => {
        console.log(loginData);
        signInUser(loginData.email, loginData.password, location, history);
        e.preventDefault()
    }


    const handleGoogleSignIn = () => {
        googleSignIn(location, history)
    }

    return (
        <div>
            <Navigation></Navigation>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ mt: 8 }} variant="body1" gutterBottom component="div">
                            Login
                        </Typography>
                        {!loading && <form onSubmit={handleSubmit}>
                            <TextField
                                onBlur={handleOnBlur}
                                name="email"
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
                            <NavLink to="/register">
                                <Button sx={{ width: "75%" }} type="submit">New user? Go for registration </Button>
                            </NavLink>
                            <Button style={{ backgroundColor: "#30b8aa", color: "white" }} sx={{ width: "75%" }} type="submit">Login </Button>
                            <br />
                            <Button onClick={handleGoogleSignIn} sx={{ color: "blue" }}><GoogleIcon /></Button>
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

export default Login;