import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import login from '../../../images/login.png'
import { NavLink } from 'react-router-dom';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
      
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        console.log(newLoginData)
        setLoginData(newLoginData)
    }
    const handleSubmit = (e) => {
        if(loginData.password !== loginData.password2){
            alert('Your password didnt matched')
            return;
        }
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
                        <form onSubmit={handleSubmit}>
                            <TextField
                                onChange={handleOnChange}
                                name="email"
                                type = "email"
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
                            <TextField
                                onChange={handleOnChange}
                                name="password2"
                                sx={{ width: "75%" }}
                                id="outlined-basic"
                                type="password"
                                label="Confirm Password"
                                variant="standard" />
                            <NavLink to="/register">
                                <Button sx={{ width: "75%" }} type="submit">Already have an account? Go to login </Button>
                            </NavLink>
                            <Button style={{backgroundColor : "#30b8aa", color : "white"}} sx={{ width: "75%" }} type="submit">Sing Up </Button>
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

export default Register;