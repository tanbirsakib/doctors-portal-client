import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Navigation from '../Shared/Navigation/Navigation';
import login from '../../images/login.png'
import { NavLink } from 'react-router-dom';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        console.log(field, value)
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
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
                        <form onsSubmit={handleSubmit}>
                            <TextField
                                onChange={handleOnChange}
                                name="email"
                                sx={{ width: "75%" }}
                                id="outlined-basic"
                                label="Your Email"
                                variant="standard" />
                            <TextField
                                onChange={handleOnChange}
                                name="password"
                                sx={{ width: "75%" }}
                                id="outlined-basic"
                                type="password"
                                label="Password"
                                variant="standard" />
                            <NavLink to="/register">
                                <Button sx={{ width: "75%" }} type="submit">New user? Go for registration </Button>
                            </NavLink>
                            <Button style={{backgroundColor : "#30b8aa", color : "white"}} sx={{ width: "75%" }} type="submit">Login </Button>
                        </form>
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