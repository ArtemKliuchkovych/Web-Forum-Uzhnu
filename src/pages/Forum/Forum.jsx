import React, { useContext, useEffect, useState } from 'react';
import styles from './Forum.module.css';
import PageNumberNavigation from '../../components/PageNumberNavigation/PageNumberNavigation';
import PostInfo from './components/PostInfo/PostInfo';
import { useLocation, useParams } from 'react-router-dom';
import AuthContext from '../../auth/AuthProvider';
import { useGet } from '../../hooks/useGet';
import { usePost } from '../../hooks/usePost';

export default function Main() {
    const { auth } = useContext(AuthContext);
    const { getForumsData, getPostsData, getCommentsData } = useGet();
    const { createPost } = usePost();

    const [dateColor, setDateColor] = useState(true);
    const [commentColor, setCommentColor] = useState(false);
    const [ascColor, setAscColor] = useState(true);
    const [descColor, setDescColor] = useState(false);
    const { forumName } = useParams();
    const itemsPerPage = 10;

    const [pageNumber, setPageNumber] = useState(1);
    const [postsData, setPostsData] = useState([]);
    const [loggedIn, setLoggedIn] = useState(auth.email === '' && localStorage.getItem('user') === null);
    const totalItems = postsData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = postsData.slice(indexOfFirstItem, indexOfLastItem);
    const [newPostName, setNewPostName] = useState('');
    const [newPostText, setNewPostText] = useState('');

    useEffect(() => {
        const filterPosts = (forum, posts, comments) => {
            const forumPostIds = Object.values(forum).map((item) => item.postId.toString());

            const processedPosts = Object.values(posts).map((post) => {
                const postId = post.id || Object.keys(posts).find((key) => posts[key] === post);
                const commentsNumber = Object.values(comments).filter((comment) => comment.postId === postId).length;
                return { ...post, id: postId, commentsNumber };
            });

            return processedPosts.filter((post) => forumPostIds.includes(post.id));
        };

        const comparePosts = async () => {
            const forumResponse = await getForumsData(forumName);
            if (forumResponse.error) {
                console.error(forumResponse.error);
                return;
            }
            const forumData = forumResponse.data;
            const postsResponse = await getPostsData();
            if (postsResponse.error) {
                console.error(postsResponse.error);
                return;
            }
            const postsData = postsResponse.data;
            const commentsResponse = await getCommentsData();
            if (commentsResponse.error) {
                console.error(commentsResponse.error);
                return;
            }
            const commentsData = commentsResponse.data;
            const filteredPosts = filterPosts(forumData, postsData, commentsData);
            setPostsData(filteredPosts);
        };

        comparePosts();
    }, []);

    useEffect(() => {
        setLoggedIn(auth.email === '');
    }, [loggedIn]);

    const handleCreatePost = async () => {
        if (newPostText === '') {
            setNewPostText('Input here first');
            return;
        }
        if (newPostName === '') {
            setNewPostName('Input here first');
            return;
        }

        await createPost({ forumName, postTitle: newPostName, postText: newPostText, authEmail: auth.email });
    };

    const [sortParams, setSortParams] = useState({ keyToSort: 'creationDateTime', direction: 'asc' });
    let currentDirection = sortParams.direction;
    let currentKey = sortParams.keyToSort;
    function commentSortClick() {
        setCommentColor(true);
        setDateColor(false);
        currentKey = 'commentsNumber';
        setSortParams({
            keyToSort: 'commentsNumber',
            direction: sortParams.direction,
        });
    }
    function dateSortClick() {
        setCommentColor(false);
        setDateColor(true);
        currentKey = 'creationDateTime';
        setSortParams({
            keyToSort: 'creationDateTime',
            direction: sortParams.direction,
        });
    }
    function ascClick() {
        setAscColor(true);
        setDescColor(false);
        currentDirection = 'asc';
        setSortParams({
            keyToSort: sortParams.keyToSort,
            direction: 'asc',
        });
    }
    function descClick() {
        setAscColor(false);
        setDescColor(true);
        currentDirection = 'desc';
        setSortParams({
            keyToSort: sortParams.keyToSort,
            direction: 'desc',
        });
    }

    function sortResult() {
        setSortParams({
            keyToSort: currentKey,
            direction: currentDirection,
        });
        if (sortParams.direction === 'asc') {
            return postsData.sort((a, b) => (a[sortParams.keyToSort] > b[sortParams.keyToSort] ? 1 : -1));
        } else return postsData.sort((a, b) => (a[sortParams.keyToSort] > b[sortParams.keyToSort] ? -1 : 1));
    }

    return (
        <>
            <div className={styles.flexrowe}>
                <div className={styles.regroup}>
                    <span className={styles.facultyforum}>{useLocation().state.name}</span>
                    <div>
                        <button className={styles.buttonSort} onClick={sortResult}>
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
                        postTitle={item.postTitle}
                        authorName={item.postAuthor.substring(0, item.postAuthor.indexOf('@'))}
                        commentNumber={item.commentsNumber}
                        creationTime={item.creationDateTime}
                        postId={item.id}
                        forumName={forumName}
                    />
                ))}
            </div>
            <PageNumberNavigation pageChange={setPageNumber} currentPage={pageNumber} maxPages={totalPages} />
            {loggedIn ? (
                <div className={styles.newPostFrame}>Увійдіть щоб створювати пости.</div>
            ) : (
                <div className={styles.newPostFrame}>
                    <div className={styles.newPostFrameHeader}>
                        <input
                            className={styles.newPostName}
                            placeholder={'Назва поста'}
                            value={newPostName}
                            onChange={(e) => setNewPostName(e.target.value)}
                        ></input>
                        <button className={styles.button} onClick={handleCreatePost}>
                            Створити
                        </button>
                    </div>
                    <textarea
                        className={styles.input}
                        placeholder={'Опис поста'}
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                    />
                </div>
            )}
        </>
    );
}
