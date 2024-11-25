import React, { useEffect } from 'react';
import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../slices/postSlice';
import { selectIsAuthenticated } from '../../slices/authSlice';

export const Footer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { posts, status, error } = useSelector((state) => state.posts);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [dispatch, status]);

    const handlePostClick = (post) => {
        if (isAuthenticated) {
            navigate('/infoPost', { state: { post } })
        } else {
            navigate('/login')
        }
    }

    const publicationDate = new Date(2024, 2, 12)
    const formattedDate = publicationDate.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: '20px'
            }}
        >
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'space-between',
                        height:'310px',
                    }}
                >
                    {status === 'loading' && <Typography>Loading posts...</Typography>}
                    {error && <Typography color="error">{error}</Typography>}

                    {posts.slice(1, 6).map((post) => (
                        <Card
                            key={post.id}
                            sx={{
                                width: '200px',
                                height: 'auto',
                                borderRadius: '8px',
                                boxShadow: '10px 10px 14px 10px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '0',
                                paddingBottom: '0',
                            }}
                            onClick={() => handlePostClick(post)}
                        >

                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    paddingBottom: '0 !important',
                                }}
                            >

                                <img
                                    src={`https://via.placeholder.com/180x100?text=`}
                                    alt={'Post'}
                                    style={{ marginBottom: 2, borderRadius: '20px' }}
                                />
                                <p
                                style={{color:"textSecondary"}}
                                >
                                    {formattedDate}
                                </p>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    <Link
                                        to={'/infoPost'}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        {post.title.substring(0, 20)}...
                                    </Link>
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {post.body.substring(0, 50)}...
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}