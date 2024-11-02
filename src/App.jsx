import React from 'react';
import ForumMainPage from './pages/Forums/Forums';
import styles from './App.module.css';

export default function App() {
    return (
        <div className={styles.mainContainer}>
            <ForumMainPage />
        </div>
    );
}
