import React, { useContext, useEffect, useState } from 'react';
import styles from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../auth/AuthProvider';
import { useAuth } from '../../hooks/useAuth';

export default function Main() {
    const { auth } = useContext(AuthContext);
    const { error, response, register, logout } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [success, setSuccess] = useState(auth.email !== '');
    const [errorMessage, setErrorMessage] = useState('');

    console.log(auth);
    console.log(auth.email);
    console.log(success);

    const navigate = useNavigate();

    useEffect(() => {
        setSuccess(auth.email !== '');
    }, [auth]);

    function emailInput(e) {
        setEmail(e.target.value);
    }

    function passwordInput(e) {
        setPassword(e.target.value);
    }

    function checkPasswordInput(e) {
        setCheckPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.endsWith('@student.uzhnu.edu.ua') !== true && email.endsWith('@uzhnu.edu.ua') !== true)
            setErrorMessage('email not valid');
        else if (password.length < 6) setErrorMessage('password too short');
        else if (password !== checkPassword) setErrorMessage('passwords dont match');
        else {
            setErrorMessage('');
            await register(email, password);
            if (response === true) navigate('/');
            else setErrorMessage(error);
        }
    };

    const logOut = () => logout();

    return (
        <>
            {success ? (
                <div className={styles.loginFrame}>
                    <div className={styles.text}>You are logged in</div>
                    <button className={styles.buttonframe} onClick={logOut}>
                        Вийти
                    </button>
                </div>
            ) : (
                <form className={styles.loginFrame} onSubmit={handleSubmit}>
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
                    <div className={styles.text}>Повторіть пароль</div>
                    <input
                        className={styles.input}
                        onChange={checkPasswordInput}
                        value={checkPassword}
                        placeholder={'Повторіть пароль'}
                        type={'password'}
                    ></input>
                    <div className={styles.forgotAndSwapFrame}>
                        <Link to={'/login'} className={styles.register}>
                            Ввійти
                        </Link>
                        <div className={styles.forgotpassword}>{errorMessage}</div>
                    </div>
                    <button className={styles.buttonframe}>Зареєструватися</button>
                </form>
            )}
        </>
    );
}
