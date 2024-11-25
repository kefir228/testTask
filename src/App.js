import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Routes, Route, HashRouter, useLocation } from "react-router-dom";
import { MainComponent } from './components/MainPage/Main';
import { Registration } from './components/Registration/Registration';
import { PostPage } from './components/PostPage/PostPage';
import { Navigation } from './components/MainPage/Navigation/Nav';
import { ProtectedRoute } from './components/PostPage/privateRoute';
import { Box } from '@mui/material';

const navProps = [
  { id: 'home', label: 'Home', path: '/home' },
  { id: 'feature', label: 'Feature', path: '/feature' },
  { id: 'blog', label: 'Blog', path: '/blog' },
  { id: 'testimonials', label: 'Testimonials', path: '/testimonials' },
]


const contentData = [
  {
    title: "Absolutely FREE.",
    body: "No hidden charges, no credit card required.",
  },
  {
    title: "Fast & Easy.",
    body: "Get access instantly, no downloads required.",
  },
  {
    title: "Your Own Data.",
    body: "Enjoy the Free Trial with your company data.",
  },
  {
    title: "Call us at",
    body: "800 1301 448",
    isGreen: true,
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#00ff00',
    },
    secondary: {
      main: '#000000',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <LayOut>
            <div className="App">
              <Routes>
                <Route path='/' element={<MainComponent />} />
                <Route path='/login' element={<Registration isSignUpProp={false} contentData={contentData} />} />
                <Route path='/signup' element={<Registration isSignUpProp={true} />} />
                <Route
                  path='/infoPost'
                  element={
                    <ProtectedRoute>
                      <PostPage />
                    </ProtectedRoute>} />
              </Routes>
            </div>
          </LayOut>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
}

const LayOut = ({ children }) => {
  const location = useLocation()
  const noNavRoutes = ['/login', '/signup']

  const circleStyle = {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #00ff00, #00ff88)',
    zIndex: -1,
    
  };

  const circleLarge = {
    ...circleStyle,

    width: '700px',
    height: '700px',
    left: '-30%',
    filter: 'blur(50px)',
  };

  const circleSmall = {
    ...circleStyle,
    top: '200px',
    width: '540px',
    height: '540px',
    right: '-25%',
    filter:'blur(30px)'
  };

  return (
    <>
      <Box sx={{ overflowX: 'hidden' }}></Box>
      {!noNavRoutes.includes(location.pathname) && (
        <Box >
          <Navigation items={navProps} />
          <Box sx={circleLarge} />
          <Box sx={circleSmall} />
        </Box>
      )}
      {children}
      <Box/>
    </>
  )
}

export default App;
