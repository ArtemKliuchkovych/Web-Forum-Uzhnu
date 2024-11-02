import PropTypes from 'prop-types';
import React from 'react';
import styles from './ForumInfo.module.css';

export default function ForumInfo({ name, postsNumber, lastUpdate }) {
    let time = new Date(Date.parse(lastUpdate));
    let year = time.getFullYear();
    let month = time.getMonth();
    let date = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;
    return (
        <div className={styles.forumFrame}>
            <div className={styles.forumColumn}>
                <div className={styles.forumName}>{name}</div>
                <div className={styles.forumPostNumber}>{postsNumber} Постів</div>
            </div>
            <div className={styles.forumLastUpdate}>
                Останнє оновлення:
                <br />
                {date + ' ' + month + ' ' + year + ' ' + hour + ':' + minute + ':' + second}
            </div>
        </div>
    );
}

ForumInfo.propTypes = {
    name: PropTypes.string.isRequired,
    postsNumber: PropTypes.number.isRequired,
    lastUpdate: PropTypes.string,
};
