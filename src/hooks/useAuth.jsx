import AuthContext from '../auth/AuthProvider';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { authFirebase } from '../api/firebase';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [response, setResponse] = useState(false);
    const [error, setError] = useState('');
    const { auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            console.log(password);
            await signInWithEmailAndPassword(authFirebase, email, password);
            const user = authFirebase.currentUser;
            setAuth(user);
            localStorage.setItem('user', JSON.stringify(user));
            setResponse(auth.email !== '');
            setError('');
            navigate('/');
        } catch (err) {
            console.log(err);
            setError('error/wrong password/email');
            setResponse(false);
        }
    };

    const register = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(authFirebase, email, password);
            const user = authFirebase.currentUser;
            console.log(user);
            setAuth(user);
            localStorage.setItem('user', JSON.stringify(user));
            setResponse(auth.email !== '');
            setError('');
        } catch (err) {
            console.log(err);
            setError('error/user already exists');
            setResponse(false);
        }
    };

    const logout = () => {
        authFirebase.signOut();
        setAuth({
            email: '',
        });
        localStorage.removeItem('user');
        window.location.reload();
        setResponse(false);
        setError('');
    };

    return { error, response, login, register, logout };
};
