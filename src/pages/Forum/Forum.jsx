import React from 'react';
import styles from './Forum.module.css';
import Header from '../../components/Header/Header';
import PageNumberNavigation from '../../components/PageNumberNavigation/PageNumberNavigation';
import PostInfo from './components/PostInfo/PostInfo';
import Sort from './components/Sort/Sort';

export default function Main() {
    let time = new Date().getTime();
    return (
        <>
            <Header />
            <div className={styles.flexrowe}>
                <div className={styles.regroup}>
                    <span className={styles.facultyforum}>
                        Хімічний факультет (Навчально-науковий інститут хімії та екології)
                    </span>
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
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
                />
                <PostInfo
                    postTitle={'Назва поста'}
                    authorName={'Ключкович Артем Михайлович'}
                    commentNumber={100}
                    creationTime={new Date(time).toString()}
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
