import React from 'react';
import styles from './Forums.module.css';
import ForumInfo from './components/ForumInfo/ForumInfo';

export default function Main() {
    return (
        <div>
            <div className={styles.forums}>Форуми</div>
            <div className={styles.forumsDisplay}>
                <div className={styles.forumsDisplayHeader}>
                    <div className={styles.forumsDisplayHeaderText}>Форуми Факультетів</div>
                </div>
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Біологічний факультет'}
                    postsNumber={1000}
                    linkName={'biology'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Географічний факультет'}
                    postsNumber={1000}
                    linkName={'geography'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Економічний факультет'}
                    postsNumber={1000}
                    linkName={'economy'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Інженерно-технічний факультет'}
                    postsNumber={1000}
                    linkName={'engineering'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Медичний факультет'}
                    postsNumber={1000}
                    linkName={'medicalone'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Медичний факультет №2'}
                    postsNumber={1000}
                    linkName={'medicaltwo'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Стоматологічний факультет'}
                    postsNumber={1000}
                    linkName={'stomatology'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={"Факультет здоров'я та фізичного виховання"}
                    postsNumber={1000}
                    linkName={'physicalhealth'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Факультет іноземної філології'}
                    postsNumber={1000}
                    linkName={'foreinfilology'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Факультет інформаційних технологій'}
                    postsNumber={1000}
                    linkName={'informationtechnology'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Факультет історії та міжнародних відносин'}
                    postsNumber={1000}
                    linkName={'history'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Факультет математики та цифрових технологій'}
                    postsNumber={1000}
                    linkName={'math'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Факультет міжнародних економічних відносин'}
                    postsNumber={1000}
                    linkName={'internationaleconomy'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Факультет післядипломної освіти та доуніверситетської підготовки'}
                    postsNumber={1000}
                    linkName={'aftergrad'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Факультет суспільних наук'}
                    postsNumber={1000}
                    linkName={'socialsciences'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Факультет туризму та міжнародних комунікацій'}
                    postsNumber={1000}
                    linkName={'tourism'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Фізичний факультет'}
                    postsNumber={1000}
                    linkName={'physics'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Філологічний факультет'}
                    postsNumber={1000}
                    linkName={'philology'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Хімічний факультет (Навчально-науковий інститут хімії та екології)'}
                    postsNumber={1000}
                    linkName={'chemistry'}
                />
                <ForumInfo
                    lastUpdate={new Date(2024, 10, 11, 12, 2).toString()}
                    name={'Юридичний факультет'}
                    postsNumber={1000}
                    linkName={'law'}
                />
            </div>
        </div>
    );
}
