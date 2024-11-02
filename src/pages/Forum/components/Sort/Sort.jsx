import React from 'react';
import styles from './Sort.Module.css';

export default function Sort() {
    return (
        <div className={styles.maincontainer}>
            <div className={styles.frame}>
                <span className={styles.datesort}>За датою</span>
            </div>
            <div className={styles.frame1}>
                <span className={styles.commentcount}>За к-тю коментарів</span>
            </div>
            <div className={styles.flexrow}>
                <div className={styles.frame2}>
                    <span className={styles.asc}>Asc</span>
                </div>
                <div className={styles.frame3}>
                    <span className={styles.desc}>Desc</span>
                </div>
            </div>
        </div>
    );
}
