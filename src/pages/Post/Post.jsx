import React, { useContext, useEffect, useState } from 'react';
import styles from './Post.module.css';
import PageNumberNavigation from '../../components/PageNumberNavigation/PageNumberNavigation';
import Comment from './components/Comment/Comment';
import { useParams } from 'react-router-dom';
import api from '../../api/posts';
import AuthContext from '../../Auth/AuthProvider';

export default function Main() {
    const { postID } = useParams();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const getComments = async () => {
            try {
                const commentsResponse = await api.get(`/comments`);
                const postResponse = await api.get('/posts');

                const postsData = postResponse.data;
                const commentsData = commentsResponse.data;

                const filtered = commentsData.filter((comment) => comment.postId === postID);
                const post = postsData.filter((post) => post.id === postID);

                console.log(post);
                setThisPost(post[0]);
                console.log(thisPost);
                setCommentsData(filtered);
                setLoggedIn(auth.email === '');

                let time = new Date(post.creationDateTime);
                let year = time.getFullYear();
                let month = time.getMonth() + 1;
                let date = time.getDate();
                let hour = time.getHours();
                let minute = time.getMinutes();
                let second = time.getSeconds();
                if (minute < 10) minute = '0' + minute;
                if (second < 10) second = '0' + second;
                setTimeOfCreation(date + ' ' + month + ' ' + year + ' ' + hour + ':' + minute + ':' + second);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getComments();
        setLoggedIn(auth.email === '');
    }, []);

    const [timeOfCreation, setTimeOfCreation] = useState('');

    const itemsPerPage = 10;

    const [thisPost, setThisPost] = useState({ creationDateTime: 0, postTitle: '', postAuthor: '' });
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
        setLoggedIn(auth.email === '');
    }, [loggedIn]);

    useEffect(() => {
        setThisPost(thisPost);
        console.log(thisPost);
        let time = new Date(thisPost.creationDateTime);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        if (minute < 10) minute = '0' + minute;
        if (second < 10) second = '0' + second;
        setTimeOfCreation(date + ' ' + month + ' ' + year + ' ' + hour + ':' + minute + ':' + second);
    }, [thisPost]);

    const createComment = () => {
        //console.log(auth.user.email)
        const time = new Date().getTime();
        const info = {
            creationDateTime: time,
            commentContent: newComment,
            commentAuthor: auth.user.email,
            postId: postID,
        };

        api.post(`/comments`, info)
            .then(() => window.location.reload())
            .catch((e) => console.log(e));
    };

    return (
        <>
            <div className={styles.postInfo}>
                <span className={styles.postAuthor}>
                    Автор посту: {thisPost.postAuthor.substring(0, thisPost.postAuthor.indexOf('@'))}
                </span>
                <span className={styles.postTitle}>Назва посту: {thisPost.postTitle}</span>
                <span className={styles.postDate}>Дата створення: {timeOfCreation}</span>
                <span className={styles.commentCount}>Кількість коментарів: {commentsData.length}</span>
            </div>
            <PageNumberNavigation pageChange={setPageNumber} currentPage={pageNumber} maxPages={totalPages} />
            <div className={styles.comentsFrame}>
                {currentItems.map((item, i) => (
                    <Comment
                        key={item.id}
                        authorName={item.commentAuthor.substring(0, item.commentAuthor.indexOf('@'))}
                        commentText={item.commentContent}
                        commentTime={item.creationDateTime}
                        commentNumber={indexOfFirstItem + i + 1}
                    />
                ))}
            </div>
            <PageNumberNavigation pageChange={setPageNumber} currentPage={pageNumber} maxPages={totalPages} />
            {loggedIn ? (
                <div className={styles.postCommentFrame}>
                    Увійдіть щоб створювати пости. Якщо ви вже зайшли перезайдіть на форум оновлення сторінки немпрацює
                </div>
            ) : (
                <div className={styles.postCommentFrame}>
                    <input
                        className={styles.comment}
                        placeholder={'Коментар'}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className={styles.frame414} onClick={createComment}>
                        Додати
                    </button>
                </div>
            )}
        </>
    );
}
