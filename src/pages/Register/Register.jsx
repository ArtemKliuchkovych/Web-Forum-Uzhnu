import React, { useState } from 'react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';

export default function Main() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [checkPassword, setCheckPassword] = useState();
    function handleClick() {
        console.log(email);
        console.log(password);
        console.log(checkPassword);
    }

    function emailInput(e) {
        setEmail(e.target.value);
    }

    function passwordInput(e) {
        setPassword(e.target.value);
    }

    function checkPasswordInput(e) {
        setCheckPassword(e.target.value);
    }

    return (
        <>
            <div className={styles.loginFrame}>
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
                    <div className={styles.forgotpassword}>Забули пароль?</div>
                </div>
                <button className={styles.buttonframe} onClick={handleClick}>
                    Зареєструватися
                </button>
            </div>
        </>
    );
}
