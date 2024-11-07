import React from 'react';
import styles from './PostInfo.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function PostInfo({ postTitle, authorName, commentNumber, creationTime, postId, forumName }) {
    let time = new Date(creationTime);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;
    return (
        <div className={styles.postInfo}>
            <div className={styles.frameInner}>
                <div className={styles.leftColumn}>
                    <Link to={`/${forumName}/${postId}`} state={{ name: postTitle }} className={styles.postTitle}>
                        {postTitle}
                    </Link>
                    <span className={styles.authoName}>Автор посту: {authorName}</span>
                </div>
                <div className={styles.rightColumn}>
                    <span className={styles.comentCount}>Кількість коментарів: {commentNumber}</span>
                    <span className={styles.creationDate}>
                        Дата створення: {date + ' ' + month + ' ' + year + ' ' + hour + ':' + minute + ':' + second}
                    </span>
                </div>
            </div>
        </div>
    );
}

PostInfo.propTypes = {
    postTitle: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    commentNumber: PropTypes.number.isRequired,
    creationTime: PropTypes.number.isRequired,
    postId: PropTypes.string.isRequired,
    forumName: PropTypes.string.isRequired,
};
