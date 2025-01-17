import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const validateUserUrl = import.meta.env.VITE_APP_USER_VALIDATE;


const GradientBackground = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)', // Soft grey gradient
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const GlassmorphismContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(6),
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        color: 'black',
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(0, 0, 0, 0.6)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.3)',
        },
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
    },
}));

const CustomButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    borderRadius: '50px',
    background: 'linear-gradient(135deg, #616161, #9e9e9e)',  // Grey gradient button
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    '&:hover': {
        background: 'linear-gradient(135deg, #9e9e9e, #616161)',  // Inverted gradient on hover
    },
}));

const Login = () => {


    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(validateUserUrl); // Log the URL to ensure it's correct

            const response = await axios.post(validateUserUrl, {
                username: formData.username,
                password: formData.password,
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token); // Store the token
            navigate('/orders'); // Redirect to orders page after successful login
        } catch (error) {
            console.error(error);
            alert('Invalid credentials');
        }
    };

    return (
        <GradientBackground>
            <Container component="main" maxWidth="xs">
                <GlassmorphismContainer>
                    <Typography component="h1" variant="h4" sx={{ color: 'black', fontWeight: 'bold', mb: 2 }}>
                        RimFolio
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <StyledTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <CustomButton
                            type="submit"
                            fullWidth
                        >
                            Login
                        </CustomButton>
                    </Box>
                </GlassmorphismContainer>
            </Container>
        </GradientBackground>
    );
};

export default Login;
