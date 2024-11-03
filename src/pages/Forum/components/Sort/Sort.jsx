import React, { useState } from 'react';
import styles from './Sort.Module.css';

export default function Sort() {
    const [dateColor, setDateColor] = useState(true);
    const [commentColor, setCommentColor] = useState(false);
    const [ascColor, setAscColor] = useState(true);
    const [descColor, setDescColor] = useState(false);

    function commentSortClick() {
        setCommentColor(true);
        setDateColor(false);
    }
    function dateSortClick() {
        setCommentColor(false);
        setDateColor(true);
    }
    function ascClick() {
        setAscColor(true);
        setDescColor(false);
    }
    function descClick() {
        setAscColor(false);
        setDescColor(true);
    }

    return (
        <div className={styles.maincontainer}>
            <div
                className={styles.dateSort}
                style={{ background: dateColor ? '#bababa' : '#ffffff' }}
                onClick={dateSortClick}
            >
                За датою
            </div>
            <div
                className={styles.commentSort}
                style={{ background: commentColor ? '#bababa' : '#ffffff' }}
                onClick={commentSortClick}
            >
                За к-тю коментарів
            </div>
            <div className={styles.flexrow}>
                <div className={styles.asc} style={{ background: ascColor ? '#bababa' : '#ffffff' }} onClick={ascClick}>
                    Asc
                </div>
                <div
                    className={styles.desc}
                    style={{ background: descColor ? '#bababa' : '#ffffff' }}
                    onClick={descClick}
                >
                    Desc
                </div>
            </div>
        </div>
    );
}
