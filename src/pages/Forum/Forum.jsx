import React, { useContext, useEffect, useState } from 'react';
import styles from './Forum.module.css';
import PageNumberNavigation from '../../components/PageNumberNavigation/PageNumberNavigation';
import PostInfo from './components/PostInfo/PostInfo';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../api/posts';
import AuthContext from '../../Auth/AuthProvider';

export default function Main() {
    useEffect(() => {
        const filterPosts = (forum, posts, comments) => {
            const forumPostIds = forum.map((item) => item.postId.toString());
            const filtered = posts.filter((post) => forumPostIds.includes(post.id));

            for (let i = 0; i < filtered.length; i++) {
                let num = 0;
                for (let j = 0; j < comments.length; j++) {
                    if (filtered[i].id === comments[j].postId) num++;
                }
                Object.assign(filtered[i], { commentsNumber: num });
            }
            return filtered;
        };

        const comparePosts = async () => {
            try {
                const forumResponse = await api.get(`/${forumName}`);
                const postsResponse = await api.get('/posts');
                const commentsResponse = await api.get('/comments');
                const forumData = forumResponse.data;
                const postsData = postsResponse.data;
                const commentsData = commentsResponse.data;
                const filteredPosts = filterPosts(forumData, postsData, commentsData);
                setPostsData(filteredPosts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        comparePosts();
    }, []);

    const { auth } = useContext(AuthContext);
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

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedIn(auth.email === '');
    }, [loggedIn]);

    const createPost = () => {
        const time = new Date().getTime();
        const info = { creationDateTime: time, postTitle: newPostName, postAuthor: auth.user.email };

        api.post(`/posts`, info)
            .then(
                (r) => (
                    api
                        .post(`/comments`, {
                            creationDateTime: time,
                            commentContent: newPostText,
                            commentAuthor: r.data.postAuthor,
                            postId: r.data.id,
                        })
                        .then()
                        .catch((e) => console.log(e)),
                    api.post(`/${forumName}`, { postId: r.data.id }),
                    navigate(`/${forumName}/${r.data.id}`)
                ),
            )
            .catch((e) => console.log(e));
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
                    //console.log(item),

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
                <div className={styles.newPostFrame}>
                    Увійдіть щоб створювати пости. Якщо ви вже зайшли перезайдіть на форум оновлення сторінки немпрацює
                </div>
            ) : (
                <div className={styles.newPostFrame}>
                    <div className={styles.newPostFrameHeader}>
                        <input
                            className={styles.newPostName}
                            placeholder={'Назва поста'}
                            value={newPostName}
                            onChange={(e) => setNewPostName(e.target.value)}
                        ></input>
                        <button className={styles.button} onClick={createPost}>
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
