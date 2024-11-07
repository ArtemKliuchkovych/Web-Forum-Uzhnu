import React, { useEffect, useState } from 'react';
import styles from './Forums.module.css';
import ForumInfo from './components/ForumInfo/ForumInfo';
import api from '../../api/posts';

export default function Main() {
    const [fakults, setFakults] = useState([
        { id: 'biology', postNumber: 0, lastUpdate: 0 },
        { id: 'geography', postNumber: 0, lastUpdate: 0 },
        { id: 'economy', postNumber: 0, lastUpdate: 0 },
        { id: 'engineering', postNumber: 0, lastUpdate: 0 },
        { id: 'medicineone', postNumber: 0, lastUpdate: 0 },
        { id: 'medicintwo', postNumber: 0, lastUpdate: 0 },
        { id: 'stomatology', postNumber: 0, lastUpdate: 0 },
        { id: 'physicalhealth', postNumber: 0, lastUpdate: 0 },
        { id: 'foreinfilology', postNumber: 0, lastUpdate: 0 },
        { id: 'informationtechnology', postNumber: 0, lastUpdate: 0 },
        { id: 'history', postNumber: 0, lastUpdate: 0 },
        { id: 'math', postNumber: 0, lastUpdate: 0 },
        { id: 'internationaleconomy', postNumber: 0, lastUpdate: 0 },
        { id: 'aftergrad', postNumber: 0, lastUpdate: 0 },
        { id: 'socialsciences', postNumber: 0, lastUpdate: 0 },
        { id: 'tourism', postNumber: 0, lastUpdate: 0 },
        { id: 'physics', postNumber: 0, lastUpdate: 0 },
        { id: 'philology', postNumber: 0, lastUpdate: 0 },
        { id: 'chemistry', postNumber: 0, lastUpdate: 0 },
        { id: 'law', postNumber: 0, lastUpdate: 0 },
    ]);

    const [fakultsNames] = useState({
        biology: 'Біологічний факультет',
        geography: 'Географічний факультет',
        econome: 'Економічний факультет',
        engineering: 'Інженерно-технічний факультет',
        medicineone: 'Медичний факультет',
        medicintwo: 'Медичний факультет №2',
        stomatology: 'Стоматологічний факультет',
        physicalhealth: "Факультет здоров'я та фізичного виховання",
        foreinfilology: 'Факультет іноземної філології',
        informationtechnology: 'Факультет інформаційних технологій',
        history: 'Факультет історії та міжнародних відносин',
        math: 'Факультет математики та цифрових технологій',
        internationaleconomy: 'Факультет міжнародних економічних відносин',
        aftergrad: 'Факультет післядипломної освіти та доуніверситетської підготовки',
        socialsciences: 'Факультет суспільних наук',
        tourism: 'Факультет туризму та міжнародних комунікацій',
        physics: 'Фізичний факультет',
        philology: 'Філологічний факультет',
        chemistry: 'Хімічний факультет (Навчально-науковий інститут хімії та екології)',
        law: 'Юридичний факультет',
    });

    useEffect(() => {
        const filterPosts = (forum, posts) => {
            const forumPostIds = forum.map((item) => item.postId.toString());
            return posts.filter((post) => forumPostIds.includes(post.id));
        };

        const getPostData = async (forumName) => {
            try {
                const forumResponse = await api.get(`/${forumName}`);
                const postsResponse = await api.get('/posts');
                const forumData = forumResponse.data;
                const postsData = postsResponse.data;

                const filteredPosts = filterPosts(forumData, postsData);
                const postNumber = filteredPosts.length;
                const lastUpdate = filteredPosts.reduce((max, post) => Math.max(max, post.creationDateTime), 0);

                return { id: forumName, postNumber, lastUpdate };
            } catch (error) {
                console.error('Error fetching data:', error);
                return { id: forumName, postNumber: 0, lastUpdate: 0 };
            }
        };

        const updateFakultsData = async () => {
            const updatedFakults = await Promise.all(
                fakults.map(async (fakult) => {
                    const data = await getPostData(fakult.id);
                    return {
                        ...data,
                        name: fakultsNames[fakult.id] || 'No name available',
                    };
                }),
            );
            setFakults(updatedFakults);
        };

        updateFakultsData();
    }, []);

    return (
        <div>
            <div className={styles.forums}>Форуми</div>
            <div className={styles.forumsDisplay}>
                <div className={styles.forumsDisplayHeader}>
                    <div className={styles.forumsDisplayHeaderText}>Форуми Факультетів</div>
                </div>
                {fakults.map((item) => (
                    <ForumInfo
                        key={item.id}
                        lastUpdate={item.lastUpdate}
                        name={item.name}
                        linkName={item.id}
                        postsNumber={item.postNumber}
                    />
                ))}
            </div>
        </div>
    );
}
