import React, { useEffect, useState } from 'react';
import styles from './Forums.module.css';
import ForumInfo from './components/ForumInfo/ForumInfo';
import { useGet } from '../../hooks/useGet';

export default function Main() {
    const [fakults, setFakults] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingForums, setLoadingForums] = useState(true);
    const { getForumsData, getPostsData } = useGet();

    const fakultsNames = {
        biology: 'Біологічний факультет',
        geography: 'Географічний факультет',
        economy: 'Економічний факультет',
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
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await getPostsData();
            if (!error) {
                const formattedPosts = Object.entries(data || {}).map(([key, post]) => ({
                    ...post,
                    id: post.id || key,
                }));
                setPosts(formattedPosts);
            } else {
                console.error(error);
            }
            setLoadingPosts(false);
        };
        fetchPosts();
    }, [getPostsData]);

    useEffect(() => {
        if (!loadingPosts && loadingForums) {
            const fetchForums = async () => {
                const forumNames = Object.keys(fakultsNames);
                let updatedFakults = [];

                for (const forumName of forumNames) {
                    const { data, error } = await getForumsData(forumName);
                    if (!error) {
                        const forumPostIds = Object.values(data || {}).map((forum) => forum.postId.toString());
                        const filteredPosts = posts.filter((post) => forumPostIds.includes(post.id));
                        const postNumber = filteredPosts.length;
                        const lastUpdate = filteredPosts.reduce(
                            (max, post) => Math.max(max, post.creationDateTime || 0),
                            0,
                        );

                        updatedFakults.push({
                            id: forumName,
                            postNumber,
                            lastUpdate,
                            name: fakultsNames[forumName],
                        });
                    } else {
                        console.error(error);
                    }
                }

                setFakults(updatedFakults);
                setLoadingForums(false);
            };

            fetchForums();
        }
    }, [loadingPosts, posts, getForumsData, fakultsNames]);

    return (
        <div>
            <div className={styles.forums}>Форуми</div>
            <div className={styles.forumsDisplay}>
                <div className={styles.forumsDisplayHeader}>
                    <div className={styles.forumsDisplayHeaderText}>Форуми Факультетів</div>
                </div>
                {!loadingForums &&
                    fakults.map((item) => (
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
