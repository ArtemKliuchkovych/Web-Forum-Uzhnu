import React, { useEffect, useState } from 'react';
import styles from './Forum.module.css';
import PageNumberNavigation from '../../components/PageNumberNavigation/PageNumberNavigation';
import PostInfo from './components/PostInfo/PostInfo';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../api/posts';

export default function Main() {
    useEffect(() => {
        const filterPosts = (forum, posts) => {
            const forumPostIds = forum.map((item) => item.postId);
            return posts.filter((post) => forumPostIds.includes(post.id));
        };

        const comparePosts = async () => {
            try {
                const forumResponse = await api.get(`/${forumName}`);
                const postsResponse = await api.get('/posts');

                const forumData = forumResponse.data;
                const postsData = postsResponse.data;

                const filteredPosts = filterPosts(forumData, postsData);
                console.log('test');
                console.log(filteredPosts);
                setPostsData(filteredPosts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        comparePosts();
    }, []);

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
        sortResult();
    }
    function descClick() {
        setAscColor(false);
        setDescColor(true);
        sortResult();
        postsData.reverse();
    }

    function sortResult() {
        if (dateColor) postsData.sort((a, b) => (a.creationDateTime > b.creationDateTime ? 1 : -1));
        if (commentColor) postsData.sort((a, b) => (a.id > b.id ? 1 : -1));
    }

    function sortStart() {
        setPostsData(postsData);
    }

    let time = new Date().getTime();
    let { forumName } = useParams();
    const itemsPerPage = 10;

    const [pageNumber, setPageNumber] = useState(1);
    const [postsData, setPostsData] = useState([]);

    const totalItems = postsData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = postsData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div className={styles.flexrowe}>
                <div className={styles.regroup}>
                    <span className={styles.facultyforum}>{useLocation().state.name}</span>
                    <div>
                        <button className={styles.buttonSort} onClick={sortStart}>
                            Сортувати
                        </button>
                        <div>
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
                                <div
                                    className={styles.asc}
                                    style={{ background: ascColor ? '#bababa' : '#ffffff' }}
                                    onClick={ascClick}
                                >
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
                    </div>
                </div>
            </div>
            <PageNumberNavigation pageChange={setPageNumber} currentPage={pageNumber} maxPages={totalPages} />
            <div className={styles.postInfoFrame}>
                {currentItems.map((item) => (
                    <PostInfo
                        key={item.id}
                        postTitle={item.postName}
                        authorName={item.postAuthor}
                        commentNumber={100}
                        creationTime={item.creationDateTime}
                        postId={item.id}
                        forumName={forumName}
                    />
                ))}
            </div>
            <PageNumberNavigation pageChange={setPageNumber} currentPage={pageNumber} maxPages={totalPages} />
            <div className={styles.newPostFrame}>
                <div className={styles.newPostFrameHeader}>
                    <input className={styles.newPostName} placeholder={'Назва поста'}></input>
                    <button className={styles.button}>Створити</button>
                </div>

                <textarea className={styles.input} placeholder={'Опис поста'} />
            </div>
        </>
    );
}
