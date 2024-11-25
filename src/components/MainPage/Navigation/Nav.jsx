import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import img from '../img/img.png'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

export const Navigation = ({ items }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout());
    };

    return (
        <Box
            component="nav"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 20px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                flexWrap: 'wrap'
            }}
        >

            <Box sx={{
                display: 'flex',
                gap: 2
            }}
            >
                {items.map((item) => (
                    <Button
                        key={item.id}
                        component={Link}
                        to={"/"}
                        variant="text"
                        color="secondary"
                        style={{ textTransform: 'none' }}
                    >
                        {item.label}
                    </Button>
                ))}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: '180px'
                }}>
                <img
                    src={img}
                    alt="Logo"
                />
            </Box>

            <Box sx={{
                display: 'flex',
                gap: 2
            }}
            >
                {isAuthenticated ? (
                    <Button variant="contained" color="primary"
                        onClick={handleLogout}
                    >
                        Log Out
                    </Button>
                ) : (
                    <>
                        <Button
                            component={Link}
                            to="/login"
                            variant="outlined"
                            color="primary"
                            style={{ textTransform: 'none', borderRadius: '40px' }}
                        >
                            Log in
                        </Button>
                        <Button
                            component={Link}
                            to="/signup"
                            variant="contained"
                            color="primary"
                            style={{ textTransform: 'none', borderRadius: '40px' }}
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};
