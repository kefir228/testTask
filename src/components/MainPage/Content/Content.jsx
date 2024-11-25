import React, { useEffect } from 'react';
import { Typography, Box, Container, Avatar, Card,CircularProgress, CardContent } from '@mui/material';
import img from '../img/Icon.png'
import media from '../img/media.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../slices/postSlice';
import { selectIsAuthenticated } from '../../slices/authSlice';
import { fetchUsers } from '../../slices/userSlice';

export const Content = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { posts, status: postsStatus } = useSelector((state) => state.posts);
    const { users, status: usersStatus } = useSelector((state) => state.users);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
        if (usersStatus === 'idle') {
            dispatch(fetchUsers());
        }
    }, [dispatch, postsStatus, usersStatus]);

    const post = posts.length > 0 ? posts[0] : null;
    const user = post ? users.find((user) => user.id === post.userId) : null;


    const publicationDate = new Date(2024, 2, 12)
    const formattedDate = publicationDate.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const handlePostClick = (post) => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/infoPost');
        }
    };

    if (!post) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Container>
            <Box sx={{ marginTop: '20px' }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    marginBottom: '20px'
                }}
                >
                    <img
                        src={img}
                        alt="Featured"
                        style={{ objectFit: 'cover' }}
                    />
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            margin: '0 !important'
                        }}
                    >
                        Featured
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                        onClick={()=>handlePostClick(post)}
                    >

                        {post.title}

                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {post.body}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                }}
                >
                    <Typography variant="body2" color="textSecondary">
                        {formattedDate}
                    </Typography>
                    <Card
                        sx={{
                            borderRadius: '16px',
                            padding: '0',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            maxWidth: '400px',
                            width: 'auto',
                            maxHeight: 'auto',
                            margin: '0',
                            overflow: 'hidden',
                        }}
                    >
                        <CardContent
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                padding: '0 !important',
                                marginBottom: '0'
                            }}>
                            <Avatar src={`https://i.pravatar.cc/150?img=${post.userId}`} sx={{ marginRight: 2 }} />
                            <Typography variant="h5">
                                {user?.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginBottom: '20px',
                    width: '100%'
                }}
                >
                    <img
                        src={`https://via.placeholder.com/900x340?text=`}
                        alt="Post"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                    <img
                        style={{ paddingTop: '5px' }}
                        src={media}
                        alt='media'
                    />
                </Box>
            </Box>
        </Container>
    )
}



