import React from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

export default function Main() {
    return (
        <>
            <div className={styles.loginFrame}>
                <div className={styles.text}>Email</div>
                <input className={styles.input} placeholder={'Введіть Email'}></input>
                <div className={styles.text}>Пароль</div>
                <input className={styles.input} placeholder={'Введіть пароль'} type={'password'}></input>
                <div className={styles.forgotAndSwapFrame}>
                    <Link to={'/register'} className={styles.register}>
                        Зареєструватися
                    </Link>
                    <div className={styles.forgotpassword}>Забули пароль?</div>
                </div>
                <button className={styles.buttonframe}>Ввійти</button>
            </div>
        </>
    );
}
