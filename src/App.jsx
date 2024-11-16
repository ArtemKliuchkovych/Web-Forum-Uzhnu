import React from 'react';
import ForumMainPage from './pages/Forums/Forums';
import ForumPage from './pages/Forum/Forum';
import RulesPage from './pages/Rules/Rules';
import RegisterPage from './pages/Register/Register';
import LoginPage from './pages/Login/Login';
import PostPage from './pages/Post/Post';
import styles from './App.module.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <div className={styles.mainContainer}>
                    <Routes>
                        <Route path={'/'} element={<Header />}>
                            <Route index element={<ForumMainPage />} />
                            <Route path={'/rules'} element={<RulesPage />} />
                            <Route path={'/login'} element={<LoginPage />} />
                            <Route path={'/register'} element={<RegisterPage />} />
                            <Route path={'/:forumName'} element={<ForumPage />} />
                            <Route path={'/:forumName/:postID'} element={<PostPage />} />
                        </Route>
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}
