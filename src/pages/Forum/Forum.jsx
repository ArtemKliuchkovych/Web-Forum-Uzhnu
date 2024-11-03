import React from 'react';
import styles from './Forum.module.css';
import PageNumberNavigation from '../../components/PageNumberNavigation/PageNumberNavigation';
import PostInfo from './components/PostInfo/PostInfo';
import Sort from './components/Sort/Sort';
import { useLocation, useParams } from 'react-router-dom';

export default function Main() {
    let time = new Date().getTime();
    let { forumName } = useParams();
    return (
        <>
            <div className={styles.flexrowe}>
                <div className={styles.regroup}>
                    <span className={styles.facultyforum}>{useLocation().state.name}</span>
                    <div>
                        <button className={styles.buttonSort}>Сортувати</button>
                        <Sort />
                    </div>
                </div>
            </div>
            <PageNumberNavigation />
            <div className={styles.postInfoFrame}>
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                    postId={1}
                    forumName={forumName}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                    postId={2}
                    forumName={forumName}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                    postId={3}
                    forumName={forumName}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                    postId={4}
                    forumName={forumName}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                    postId={5}
                    forumName={forumName}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                    postId={6}
                    forumName={forumName}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                    postId={7}
                    forumName={forumName}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                    postId={8}
                    forumName={forumName}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                    postId={9}
                    forumName={forumName}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                    postId={10}
                    forumName={forumName}
                />
            </div>
            <PageNumberNavigation />
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
