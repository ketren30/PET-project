import React from 'react';
import './cambridge.css';


export const Cambridge: React.FC = () => {
    const imageLink='https://ucarecdn.com/2d31831b-aa6c-42f1-93b5-16b568e53f5b/download.png'
    return (
        <div className='cambridge-wrapper'>
            <img src='https://ucarecdn.com/dfb60b23-3d41-463f-b765-dbcf591899ca/exambanner.jpg' className='banner'/>
            <div className='exam-text'>
                <h3>
                    Школа английского языка Enjoy English является авторизованным экзаменационным центром 
                    Cambridge English. Экзамены Cambridge English – международные экзамены по английскому языку, 
                    разработанные Департаментом экзаменов по английскому языку Кембриджского университета.
                </h3>
                <h2>
                    6 причин сдавать экзамены Cambridge English:
                </h2>
                <h3>1. Развитие практических навыков владения английским языком</h3>
                <p>
                    Экзамены Cambridge English оценивают умение использовать английский язык в реальных ситуациях.
                    Преподаватели, ведущие подготовку к экзаменам, развивают у учащихся коммуникативные навыки, 
                    необходимые в повседневной жизни, работе и учебе.
                </p>
                <h3>2. Экзамены для разных уровней владения языком и групп пользователей</h3>
                <p>
                    Все экзамены соответствуют международным стандартам 
                    "Общеевропейской шкале языковых компетенций" (CEFR), 
                    которая используется для описания уровня владения иностранным языком.
                </p>
                <h3>3. Результаты экзаменов принимаются при устройстве на работу, иммиграции, поступлении 
                    в университеты по всему миру</h3>
                <p> 
                    20000 университетов, работодателей и государственных учреждений 
                    в разных странах признают сертификаты Cambridge English.
                    Экзамены открывают путь к получению высшего образования и расширяют возможности 
                    для выбора места учебы или работы. Многие сертификаты Cambridge English принимаются 
                    в целях получения визы и обучения в Великобритании, Австралии, США и Канаде.
                </p>
                <h3>4. Экзамены, признаваемые во множестве стран</h3>
                <p>
                    Экзамены Cambridge English составлены 
                    с учетом различных вариантов английского языка, включая американский и британский. 
                    Тесты на аудирование включают различные акценты из Австралии, Северной Америки и Британии.
                    В 130 странах мира насчитывается примерно 2800 авторизованных экзаменационных центров.
                </p>
                <h3>5. Защита персональных данных, безопасность, объективность. </h3>
                <p>
                    Экзамены Cambridge English обеспечивают объективный подход ко всем кандидатам, 
                    вне зависимости от возраста, пола, национальности, родного языка или этнической принадлежности. 
                    Организации могут проверить результаты кандидатов на сайте при помощи защищенного 
                    Сервиса верификации результатов. Все экзаменационные центры соблюдают строгие требования 
                    к качеству и безопасности и проходят регулярную проверку.странах мира насчитывается 
                    примерно 2800 авторизованных экзаменационных центров.
                </p>
                <h3>6. Экзамены разрабатываются на основе передовых исследований. </h3>
                <p>
                    Экзамены разрабатываются на основе научных исследований, которые проводятся 
                    крупнейшими специалистами в области лингвистики и языкового тестирования.
                </p>
            </div>
            <div className='picture-background'>
                Экзамены для детей
            </div>
            <div className='exam-text'>
            <p>
                Кембриджские экзамены для детей, Cambridge English: <span className='bold'>Starters, Movers 
                и Flyers</span> позволяют объективно оценивать насколько хорошо дети в возрасте 
                от 7 до 12 лет справляются с заданиями на аудирование, устную речь, чтение 
                и письмо и подготавливают их к сдаче более серьёзного экзамена для подростков с 13 лет – 
                <span className='bold'> Key (KET)</span>.
            </p>

            <p>
                Специалисты Cambridge English знают, что изучение языка не должно быть стрессом для ребёнка. 
                Экзамены Cambridge English: Starters, Movers, Flyers созданы с учётом интересов школьников, 
                их цель это повышение мотивации к изучению английского языка. Тесты основаны на знакомых темах и 
                ситуациях, они дают ребёнку уверенность использовать английский язык и вдохновляют их 
                заниматься ещё усерднее.
            </p>
            <p>
                Экзамены Movers и Flyers, используя занимательные материалы и задания, формируют 
                в детях реальные языковые навыки, которые с течением времени помогут им получить сертификаты, 
                признаваемые во всём мире, а также навыки практического английского, которые останутся с ними 
                на всю жизнь.
            </p>
            </div>
            <div className='center-block'>
                <div className='line'></div>
                <h2>Cambridge English: Starters (YLE Starters)</h2>
                <div className='line'></div>
                <h2>Cambridge English: Movers (YLE Movers)</h2>
                <div className='line'></div>
                <h2>Cambridge English: Flyers (YLE Flyers)</h2>
                <div className='line'></div>

                <div className='flex-wrapper'>
                    <div className='link'>
                        <img src={imageLink} className='pic-icon'></img>
                        <a href='https://www.cambridgeenglish.org/Images/153312-yle-information-for-candidates.pdf'>
                            Формат экзамена Starters
                        </a>
                    </div>
                    <div className='link'>
                        <img src={imageLink} className='pic-icon'></img>
                        <a href='https://www.cambridgeenglish.org/images/153312-yle-information-for-candidates.pdf'>
                            Формат экзамена Movers
                        </a>
                    </div>
                    <div className='link'>
                        <img src={imageLink} className='pic-icon'></img>
                        <a href='https://www.cambridgeenglish.org/images/153312-yle-information-for-candidates.pdf'>
                            Формат экзамена Flyers
                        </a>
                    </div>
                </div>
            </div>

            <div className='picture-background'>
                Экзамены для взрослых
            </div>
            <div className='center-block'>
                <div className='line'></div>
                <h2>Cambridge English: Key (KET)</h2>
                <div className='line'></div>
                <h2>Cambridge English: Preliminary (PET)</h2>
                <div className='line'></div>
                <h2>Cambridge English: First (FCE)</h2>
                <div className='line'></div>

                <div className='flex-wrapper'>
                    <div className='link'>
                        <img src={imageLink} className='pic-icon'></img>
                        <a href='https://drive.google.com/file/d/1lXzD-9gkwQ3J-C5buhHrDIjcP7q-DO4c/view?usp=share_link'>Формат экзамена Key</a>
                    </div>
                    <div className='link'>
                        <img src={imageLink} className='pic-icon'></img>
                        <a href='https://drive.google.com/file/d/1Lpgy6tCBoTwfc-6k_Jln6WiqwDWkzGcj/view'>Формат экзамена Preliminary</a>
                    </div>
                    <div className='link'>
                        <img src={imageLink} className='pic-icon'></img>
                        <a href='https://drive.google.com/file/d/1vyeIu_xnN-tlyf31-TEu-ax3qiPMUeM5/view?usp=share_link'>Формат экзамена First</a>
                    </div>
                </div>
            </div>
        </div>
    )
}