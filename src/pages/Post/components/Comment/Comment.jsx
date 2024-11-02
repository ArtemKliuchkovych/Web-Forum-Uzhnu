import React from 'react';
import styles from './Comment.module.css';
import PropTypes from 'prop-types';

export default function Comment({ authorName, commentText, commentTime }) {
    let time = new Date(Date.parse(commentTime));
    let year = time.getFullYear();
    let month = time.getMonth();
    let date = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;
    return (
        <>
            <div className={styles.commentFrame}>
                <div className={styles.innerFrame}>
                    <div className={styles.infoFrame}>
                        <span className={styles.commentAuthor}>{authorName}</span>
                        <span className={styles.commentDate}>
                            Дата коментаря: <br />
                            {date + ' ' + month + ' ' + year + ' ' + hour + ':' + minute + ':' + second}
                        </span>
                        <span className={styles.commentNumber}>N коментаря: 1</span>
                    </div>
                    <span className={styles.commentText}>
                        Перший коментар - це опис поста при створенні
                        <br />
                        {commentText}
                    </span>
                </div>
            </div>
        </>
    );
}

Comment.propTypes = {
    authorName: PropTypes.string.isRequired,
    commentText: PropTypes.string.isRequired,
    commentTime: PropTypes.string,
};
