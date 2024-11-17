import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageNumberNavigation.module.css';

export default function PageNumberNavigation({ pageChange, currentPage, maxPages }) {
    const getPageRange = () => {
        let startPage, endPage;

        if (maxPages <= 5) {
            startPage = 1;
            endPage = maxPages;
        } else {
            startPage = Math.max(1, currentPage - 2);
            endPage = Math.min(maxPages, currentPage + 2);
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage >= maxPages - 2) {
                startPage = maxPages - 4;
                endPage = maxPages;
            }
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const pageNumbers = getPageRange();

    return (
        <div className={styles.frame}>
            <div className={styles.frame1} onClick={() => pageChange(1)}>
                &lt;&lt;
            </div>
            <div className={styles.frame1} onClick={() => pageChange(Math.max(1, currentPage - 1))}>
                &lt;
            </div>
            {pageNumbers.map((page) => (
                <div
                    key={page}
                    className={styles.frame1}
                    onClick={() => pageChange(page)}
                    style={{ background: currentPage === page ? '#bababa' : '#ffffff' }}
                >
                    {page}
                </div>
            ))}
            <div className={styles.frame1} onClick={() => pageChange(Math.min(maxPages, currentPage + 1))}>
                &gt;
            </div>
            <div className={styles.frame1} onClick={() => pageChange(maxPages)}>
                &gt;&gt;
            </div>
        </div>
    );
}

PageNumberNavigation.propTypes = {
    pageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    maxPages: PropTypes.number.isRequired,
};
