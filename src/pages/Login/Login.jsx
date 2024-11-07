import React, { useState, useContext } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/posts';
import AuthContext from '../../Auth/AuthProvider';

export default function Main() {
    function emailInput(e) {
        setEmail(e.target.value);
    }

    function passwordInput(e) {
        setPassword(e.target.value);
    }

    const { auth, setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(auth.email !== '');
    const [errorMessage, setErrorMessage] = useState('Забули пароль?');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', JSON.stringify({ email, password }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            const accessToken = response.data.accessToken;
            setAuth({ email, accessToken });
            localStorage.setItem(
                'user',
                JSON.stringify({
                    token: response.data.accessToken,
                    ...response.data,
                }),
            );
            setSuccess(auth.email !== '');
            navigate('/');
        } catch (err) {
            console.log(err);
            setErrorMessage('error/wrong password/email');
        }
    };

    const logOut = () => {
        setAuth({
            email: '',
        });
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <div>
            {success ? (
                <div className={styles.loginFrame}>
                    <div className={styles.text}>You are logged in</div>
                    <button className={styles.buttonframe} onClick={logOut}>
                        Вийти
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.loginFrame}>
                    <div className={styles.text}>Email</div>
                    <input
                        className={styles.input}
                        onChange={emailInput}
                        value={email}
                        placeholder={'Введіть Email'}
                    ></input>
                    <div className={styles.text}>Пароль</div>
                    <input
                        className={styles.input}
                        onChange={passwordInput}
                        value={password}
                        placeholder={'Введіть пароль'}
                        type={'password'}
                    ></input>
                    <div className={styles.forgotAndSwapFrame}>
                        <Link to={'/register'} className={styles.register}>
                            Зареєструватися
                        </Link>
                        <div className={styles.forgotpassword}>{errorMessage}</div>
                    </div>
                    <button className={styles.buttonframe}>Ввійти</button>
                </form>
            )}
        </div>
    );
}
