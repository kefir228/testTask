import { useEffect } from "react"
import { selectIsAuthenticated, login, logout } from "../slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
export const useAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user && !isAuthenticated) {
            dispatch(login(JSON.parse(user)));
        }
    }, [dispatch, isAuthenticated]);

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('users')) || []
        const existingUsers = users.find((user) => user.email === userData.email)
        if (existingUsers) {
            console.error('User with this email already exists!')
            return false;
        }
        users.push(userData)
        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('currentUser', JSON.stringify(userData))
        dispatch(login(userData))
        return true
    }

    const loginUser = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || []
        const user = users.find((user) => user.email === email && user.password === password)
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user))
            dispatch(login(user))
            return true
        }
        return false
    }
    const logoutUser = () => {
        localStorage.removeItem('currentUser')
        dispatch(logout)
    }
    return { isAuthenticated, currentUser, register, login: loginUser, logout: logoutUser }
}