import React from 'react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';

export default function Main() {
    return (
        <>
            <div className={styles.loginFrame}>
                <div className={styles.text}>Email</div>
                <input className={styles.input} placeholder={'Введіть Email'}></input>
                <div className={styles.text}>Пароль</div>
                <input className={styles.input} placeholder={'Введіть пароль'} type={'password'}></input>
                <div className={styles.text}>Повторіть пароль</div>
                <input className={styles.input} placeholder={'Введіть пароль'} type={'password'}></input>
                <div className={styles.forgotAndSwapFrame}>
                    <Link to={'/login'} className={styles.register}>
                        Ввійти
                    </Link>
                    <div className={styles.forgotpassword}>Забули пароль?</div>
                </div>
                <button className={styles.buttonframe}>Зареєструватися</button>
            </div>
        </>
    );
}
