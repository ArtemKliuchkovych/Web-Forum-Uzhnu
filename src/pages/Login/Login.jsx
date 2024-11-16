import React, { useState, useContext } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../auth/AuthProvider';
import { useAuth } from '../../hooks/useAuth';

export default function Main() {
    function emailInput(e) {
        setEmail(e.target.value);
    }

    function passwordInput(e) {
        setPassword(e.target.value);
    }

    const { auth } = useContext(AuthContext);
    const { error, response, login, logout } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(auth.email !== '');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        if (response === true) {
            setSuccess(auth.email !== '');
            navigate('/');
        } else setErrorMessage(error);
    };

    const logOut = () => logout();

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
