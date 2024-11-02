import React from 'react';
import styles from './Register.module.css';
import Header from '../../components/Header/Header';

export default function Main() {
    return (
        <>
            <Header />
            <div className={styles.loginFrame}>
                <div className={styles.text}>Email</div>
                <input className={styles.input} placeholder={'Введіть Email'}></input>
                <div className={styles.text}>Пароль</div>
                <input className={styles.input} placeholder={'Введіть пароль'} type={'password'}></input>
                <div className={styles.text}>Повторіть пароль</div>
                <input className={styles.input} placeholder={'Введіть пароль'} type={'password'}></input>
                <div className={styles.forgotAndSwapFrame}>
                    <div className={styles.register}>Ввійти</div>
                    <div className={styles.forgotpassword}>Забули пароль?</div>
                </div>
                <button className={styles.buttonframe}>Зареєструватися</button>
            </div>
        </>
    );
}
