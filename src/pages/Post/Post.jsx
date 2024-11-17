import React, { useContext, useEffect, useState } from 'react';
import styles from './Post.module.css';
import PageNumberNavigation from '../../components/PageNumberNavigation/PageNumberNavigation';
import Comment from './components/Comment/Comment';
import { useParams } from 'react-router-dom';
import AuthContext from '../../auth/AuthProvider';
import { useGet } from '../../hooks/useGet';
import { usePost } from '../../hooks/usePost';

export default function Post() {
    const { postID } = useParams();
    const { auth } = useContext(AuthContext);
    const { getPostsData, getCommentsData } = useGet();
    const { createComment } = usePost();

    const [timeOfCreation, setTimeOfCreation] = useState('');
    const itemsPerPage = 10;

    const [thisPost, setThisPost] = useState({
        creationDateTime: 0,
        postTitle: 'Loading...',
        postAuthor: 'Unknown',
    });
    const [pageNumber, setPageNumber] = useState(1);
    const [commentsData, setCommentsData] = useState([]);
    const [loggedIn, setLoggedIn] = useState(auth.email === '' && localStorage.getItem('user') === null);
    const [newComment, setNewComment] = useState('');

    const totalItems = commentsData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = commentsData.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const getComments = async () => {
            const postsResponse = await getPostsData();
            if (postsResponse.error) {
                console.error(postsResponse.error);
                return;
            }
            const postsData = postsResponse.data;

            const post = Object.values(postsData).find((p) => {
                const postId = p.id || Object.keys(postsData).find((key) => postsData[key] === p);
                return postId === postID;
            });
            setThisPost(post || {});

            if (post) {
                const time = new Date(post.creationDateTime);
                setTimeOfCreation(
                    `${time.getDate()} ${time.getMonth() + 1} ${time.getFullYear()} ${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`,
                );
            }

            const commentsResponse = await getCommentsData();
            if (commentsResponse.error) {
                console.error(commentsResponse.error);
                return;
            }
            const commentsData = commentsResponse.data;

            const comments = Object.values(commentsData).filter((comment) => comment.postId === postID);
            setCommentsData(comments);
        };
        getComments();
    }, []);

    useEffect(() => {
        setLoggedIn(auth.email === '');
    }, [loggedIn]);

    const handleCreateComment = () => {
        createComment({
            newComment: newComment,
            authEmail: auth.email,
            postID: postID,
        });
    };

    return (
        <>
            <div className={styles.postInfo}>
                <span className={styles.postAuthor}>
                    Автор посту: {thisPost?.postAuthor?.substring(0, thisPost?.postAuthor?.indexOf('@')) || 'Unknown'}
                </span>
                <span className={styles.postTitle}>Назва посту: {thisPost?.postTitle || 'No Title'}</span>
                <span className={styles.postDate}>Дата створення: {timeOfCreation || 'Not Available'}</span>
                <span className={styles.commentCount}>Кількість коментарів: {commentsData.length}</span>
            </div>
            <PageNumberNavigation pageChange={setPageNumber} currentPage={pageNumber} maxPages={totalPages} />
            <div className={styles.comentsFrame}>
                {currentItems.map((item, i) => (
                    <Comment
                        key={indexOfFirstItem + i + 1}
                        authorName={item.commentAuthor.substring(0, item.commentAuthor.indexOf('@'))}
                        commentText={item.commentContent}
                        commentTime={item.creationDateTime}
                        commentNumber={indexOfFirstItem + i + 1}
                    />
                ))}
            </div>
            <PageNumberNavigation pageChange={setPageNumber} currentPage={pageNumber} maxPages={totalPages} />
            {loggedIn ? (
                <div className={styles.postCommentFrame}>Увійдіть щоб створювати пости.</div>
            ) : (
                <div className={styles.postCommentFrame}>
                    <input
                        className={styles.comment}
                        placeholder={'Коментар'}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className={styles.frame414} onClick={handleCreateComment}>
                        Додати
                    </button>
                </div>
            )}
        </>
    );
}
