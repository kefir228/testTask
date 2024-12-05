import React, { useState } from "react"
import { Typography, Box, Card, TextField, Button, Link } from "@mui/material"
import img from '../MainPage/img/img.png'
import { useAuth } from "./CustomHook"
import { useNavigate } from "react-router-dom"

export const Registration = ({ isSignUpProp, contentData }) => {

    const [isSignUp, setIsSignUp] = useState(isSignUpProp);
    const { register, login } = useAuth()
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const toggleForm = () => {
        setIsSignUp((prev) => !prev)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        if (isSignUp) {
            if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
                setError("Please fill all fields!")
                return
            }
            const registrationSuccess = register(formData)
            if (registrationSuccess) {
                alert("Registration successful!")
                navigate("/");
            } else {
                setError("User with this email already exists!")
            }
        } else {
            const loginSuccess = login(formData.email, formData.password)
            if (loginSuccess) {
                alert("Login successful!");
                navigate("/");
            } else {
                setError("Invalid credentials!");
            }
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: '100vh',
                padding: "0 16px",
            }}
        >
            <Box
                component="img"
                src={img}
                alt="Logo"
                sx={{
                    marginBottom: "16px",
                    width: "150px",
                    height: "auto",
                }}
            />
            <Card
                sx={{
                    display: "flex",
                    width: "751px",
                    height: "100%",
                    border: "1px solid #000000",
                    borderRadius: "25px",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        flex: 2,
                        padding: "32px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h5" gutterBottom fontWeight='bold'>
                        {isSignUp ? 'Sign up' : 'Sign in'}
                    </Typography>
                    <Typography>
                        Email Address
                    </Typography>
                    <TextField
                        label="Your email address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {isSignUp && (
                        <>
                            <Typography>
                                First Name
                            </Typography>
                            <TextField
                                label="First name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <Typography>
                                Last Name
                            </Typography>
                            <TextField
                                label="Last name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </>
                    )}
                    <Typography>
                        Password
                    </Typography>
                    <TextField
                        label="Enter password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Link href="#" underline='none' sx={{ marginBottom: "16px" }}>
                        Forgot password?
                    </Link>
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={handleSubmit}
                        sx={{
                            textTransform: "none",
                            height: "48px",
                            fontSize: "16px",
                            marginBottom: "16px",
                        }}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Typography variant="body2">
                        <Link
                            onClick={toggleForm}
                            sx={{
                                marginTop: "16px",
                                display: "block",
                                cursor: "pointer",
                                textDecoration: 'none',
                            }}
                        >
                            {isSignUp
                                ? "Already have an account? Log In"
                                : "Don't have an account? Sign Up"}
                        </Link>
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "#000000",
                        color: "#FFFFFF",
                        padding: "32px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {isSignUp ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                flexDirection: "column",
                                height: "100%",
                                textAlign: "left",
                            }}
                        >
                            <Typography variant="h5" gutterBottom>
                                Get Your FREE <span style={{ color: "green" }}>30-Days Trial Now!</span>
                            </Typography>
                            {contentData && contentData.map((item, index) => (
                                <Typography
                                    key={index}
                                    variant="body2"
                                    sx={{ marginBottom: index < contentData.length - 1 ? "15px" : "0" }}
                                >
                                    <Typography variant="body1" fontWeight="bold">
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#484848",
                                        }}
                                    >
                                        {item.body}
                                    </Typography>

                                </Typography>
                            ))}
                        </Box>

                    ) : (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            height: '100%',
                            textAlign: "center",
                        }}>
                            <Typography variant="h5" gutterBottom>
                                Kodix <span style={{
                                    color: "green",
                                    border: "2px solid green",
                                    borderRadius: "8px",
                                    padding: "4px 8px",
                                    display: "inline-block",
                                }}>
                                    PRO
                                </span>
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: "16px", color: '#484848' }}>
                                Unlimited traffic, strategic support, and AI-driven upsells.
                            </Typography>
                            <Link href="#" sx={{ color: "secondary", fontWeight: "bold" }}>
                                Learn More
                            </Link>
                        </Box>
                    )}
                </Box>
            </Card>
        </Box>
    )
}
