import React, { useEffect, useState } from 'react';
import styles from './Post.module.css';
import PageNumberNavigation from '../../components/PageNumberNavigation/PageNumberNavigation';
import Comment from './components/Comment/Comment';
import { useParams } from 'react-router-dom';
import api from '../../api/posts';

export default function Main() {
    let { forumName, postID } = useParams();
forumName;
    useEffect(() => {
        const comparePosts = async () => {
            try {
                const commentsResponse = await api.get(`/comments`);

                const commentsData = commentsResponse.data;

                const filtered = commentsData.filter((comment) => comment.postId == postID);
                console.log('test');
                console.log(postID);
                console.log(filtered);
                setCommentsData(filtered);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        comparePosts();
    }, []);



    const itemsPerPage = 10;


    const [pageNumber, setPageNumber] = useState(1);
    const [commentsData, setCommentsData] = useState([]);

    const totalItems = commentsData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = commentsData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div className={styles.postInfo}>
                <span className={styles.postAuthor}>Автор посту</span>
                <span className={styles.postTitle}>Назва посту</span>
                <span className={styles.postDate}>Дата створення: 11.10.2024 11:13</span>
                <span className={styles.commentCount}>Кількість коментарів: 100</span>
            </div>
            <PageNumberNavigation pageChange={setPageNumber} currentPage={pageNumber} maxPages={totalPages} />
            <div className={styles.comentsFrame}>
                {currentItems.map((item) => (
                    <Comment
                        key={item.id}
                        authorName={item.commentAuthor}
                        commentText={item.commentContent}
                        commentTime={item.creationDateTime}
                    />
                ))}
            </div>
            <PageNumberNavigation pageChange={setPageNumber} currentPage={pageNumber} maxPages={totalPages} />
            <div className={styles.postCommentFrame}>
                <input className={styles.comment} placeholder={'Коментар'} />
                <button className={styles.frame414}>Додати</button>
            </div>
        </>
    );
}
