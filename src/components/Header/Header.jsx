import React from 'react';
import styles from './Header.module.css';
import { Link, Outlet } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <div className={styles.forumHeaderFrame}>
                <div className={styles.forumUzhnu}>
                    Форум
                    <br />
                    Ужгородського
                    <br />
                    Національного
                    <br />
                    Університету
                </div>
                <div className={styles.icon} />
            </div>
            <div className={styles.forumHeaderNavigation}>
                <div className={styles.mainAndRules}>
                    <Link to={'/'} className={styles.main}>
                        Головна
                    </Link>
                    <Link to={'/rules'} className={styles.rules}>
                        Правила
                    </Link>
                </div>
                <Link to={'/login'} className={styles.loginRegister}>
                    Увійти/Зареєструватися
                </Link>
            </div>
            <Outlet />
        </div>
    );
}
