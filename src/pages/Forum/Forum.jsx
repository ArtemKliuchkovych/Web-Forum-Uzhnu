import React from 'react';
import styles from './Forum.module.css';
import Header from '../../components/Header/Header';
import PageNumberNavigation from '../../components/PageNumberNavigation/PageNumberNavigation';
import PostInfo from './components/PostInfo/PostInfo';

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
                    <button className={styles.buttonSort}>
                        <span className={styles.sort}>Сортувати</span>
                    </button>
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
            <div className={styles.frame310}>
                <div className={styles.frame40}>
                    <input className={styles.span41} placeholder={'Назва поста'}></input>
                    <button className={styles.button}>Створити</button>
                </div>

                <textarea className={styles.input} placeholder={'Опис поста'} />
            </div>
        </>
    );
}
