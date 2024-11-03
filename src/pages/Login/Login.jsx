import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import api from '../../api/posts'
import AuthContext from '../../Auth/AuthProvider';

export default function Main() {
    function handleClick() {
        console.log(email);
        console.log(password);
    }

    function emailInput(e) {
        setEmail(e.target.value);
    }

    function passwordInput(e) {
        setPassword(e.target.value);
    }

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState(false);
    const { setAuth } = useContext(authContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        try {
            const response = await api.post(JSON.stringify({ email, password }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken });
            setPassword('');
            setEmail('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <div className={styles.loginFrame}>
            {success ? (
                <div className={styles.text}>You are logged in</div>
            ) : (
                <form onSubmit={handleSubmit}>
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
                        <div className={styles.forgotpassword}>Забули пароль?</div>
                    </div>
                    <button className={styles.buttonframe} onClick={handleClick}>
                        Ввійти
                    </button>
                </form>
            )}
        </div>
    );
}
