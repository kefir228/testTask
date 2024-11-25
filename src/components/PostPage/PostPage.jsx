import React, { useEffect } from 'react';
import { Box, Typography, Container, Card, Avatar, Button } from '@mui/material';
import { fetchPosts, setSelectedPost } from '..//slices/postSlice';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '..//slices/commentSlice';
import img from "../MainPage/img/media.png";
import file from '../MainPage/img/file.png'
import { Link } from 'react-router-dom';

export const PostPage = () => {
    const dispatch = useDispatch();
    const { posts, selectedPost, status: postsStatus, error: postsError } = useSelector((state) => state.posts);
    const { comments, status: commentsStatus, error: commentsError } = useSelector((state) => state.comments);
    const { currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [dispatch, postsStatus]);

    useEffect(() => {
        if (!selectedPost && posts.length > 0) {
            dispatch(setSelectedPost(posts[0]));
        }
    }, [dispatch, selectedPost, posts]);

    useEffect(()=>{
        if(selectedPost){
            dispatch(fetchComments(selectedPost.id))
        }
    },[dispatch,selectedPost])

    const handlePostClick = (post) => {
        dispatch(setSelectedPost(post));
    };

    const postToDisplay = selectedPost || posts[0];

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    gap: 4,
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    {postToDisplay && (
                        <>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                                {postToDisplay.title}
                            </Typography>

                            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
                                {postToDisplay.body}
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    mt: 4,
                                }}
                            >
                                <Typography variant="body2" color="textSecondary">
                                    Wednesday 12, March 2024
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    { }
                                    <Avatar
                                        src={`https://i.pravatar.cc/150?img=${postToDisplay.userId}`}
                                        alt="Author Avatar"
                                        sx={{ width: 48, height: 48 }}
                                    />
                                    <Typography variant="subtitle1">
                                        {currentUser ? currentUser.name : 'Loading...'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    width: '100%',
                                    height: '300px',
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    src={'https://via.placeholder.com/600x100?text='}
                                    alt="Post"
                                    style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    mt: 3,
                                }}
                            >
                                <img src={img} alt={img} />
                            </Box>

                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Comments
                                </Typography>

                                {commentsStatus === 'loading' && <Typography>Loading comments...</Typography>}
                                {commentsError && <Typography color="error">{commentsError}</Typography>}

                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <Box key={comment.id} sx={{ mt: 2, padding: 2, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                {comment.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {comment.email}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                {comment.body}
                                            </Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        No comments available.
                                    </Typography>
                                )}
                            </Box>
                        </>
                    )}
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        paddingLeft: '200px'
                    }}
                >
                    {postsStatus === 'loading' && <Typography>Loading posts...</Typography>}
                    {postsError && <Typography color="error">{postsError}</Typography>}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        maxWidth: '430px'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src={file} alt="file" style={{ objectFit: 'cover' }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, marginBottom: '0' }}>
                                Related Articles
                            </Typography>
                        </Box>

                        <Button
                            component={Link}
                            to="/"
                            variant="outlined"
                            color="primary"
                            style={{ textTransform: 'none', borderRadius: '40px' }}

                        >
                            Read more
                        </Button>
                    </Box>

                    {posts.slice(0,6).map((post) => (

                        <Card
                            key={post.id}
                            sx={{
                                cursor: 'pointer',
                                boxShadow:
                                    selectedPost && selectedPost.id === post.id
                                        ? '0 4px 12px rgba(0, 0, 0, 0.2)'
                                        : '0 2px 8px rgba(0, 0, 0, 0.1)',
                                backgroundColor:
                                    selectedPost && selectedPost.id === post.id
                                        ? '#e8f5e9'
                                        : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 2,
                                maxWidth: 400,
                                width: '100%',
                            }}
                            onClick={() => handlePostClick(post)}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100px',
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    src={'https://via.placeholder.com/200x100?text='}
                                    alt='post'
                                    style={{ width: '200px', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }} noWrap>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" noWrap>
                                    {post.body}
                                </Typography>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

