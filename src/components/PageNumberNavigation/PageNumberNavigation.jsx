import React from 'react';
import styles from './PageNumberNavigation.module.css';

export default function PageNumberNavigation() {
    return (
        <div className={styles.frame}>
            <div className={styles.frame1}>
                <span className={styles.singlearrow}>&lt;</span>
            </div>
            <div className={styles.frame2}>
                <span className={styles.doublearrow}>&lt;&lt;</span>
            </div>
            <div className={styles.frame3}>
                <span className={styles.number1}>1</span>
            </div>
            <div className={styles.frame4}>
                <span className={styles.number2}>2</span>
            </div>
            <div className={styles.frame5}>
                <span className={styles.number3}>3</span>
            </div>
            <div className={styles.frame6}>
                <span className={styles.ellipsis}>...</span>
            </div>
            <div className={styles.frame7}>
                <span className={styles.number10}>10</span>
            </div>
            <div className={styles.frame8}>
                <span className={styles.singlearrowright}>&gt;</span>
            </div>
            <div className={styles.frame9}>
                <span className={styles.doublearrowright}>&gt;&gt;</span>
            </div>
        </div>
    );
}
