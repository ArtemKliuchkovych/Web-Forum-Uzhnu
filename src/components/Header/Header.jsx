import React from 'react';
import styles from './Header.module.css';

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
                    <div className={styles.main}>Головна</div>
                    <div className={styles.rules}>Правила</div>
                </div>
                <div className={styles.loginRegister}>Увійти/Зареєструватися</div>
            </div>
        </div>
    );
}
