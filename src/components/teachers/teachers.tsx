import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './teachers.css';

SwiperCore.use([Navigation, Pagination]);

interface Teacher {
    name: string,
    photo: string,
    description: string
} 

export const Teachers: React.FC = () => {
    const teachers: Teacher[] = [
        {name: 'Митюнина Лилия Владимировна',
        photo: 'https://ucarecdn.com/a45cbcbb-a61b-471c-8282-39f529a386c4/lilya.jpg',
        description: 'Имеет два высших педагогических образования по специальностям "Лингвист, преподаватель иностранных языков" и "Преподаватель культурологии". Окончила АГПА в 2013 году с двумя красными дипломами. В нашей школе Лилия владимировна преподает с 2016 года, готовит детей к экзаменам уровней Starters, Movers, Flyers и KEY for schools, готовит к ОГЭ по английскому языку. Знает и преподает французский язык, легко находит общий язык с детьми.'},
        {name: 'Андронников Аркадий Алексеевич',
        photo: 'https://ucarecdn.com/edfaea92-c453-4cbe-817b-1a12e130ac42/arkadii.jpg',
        description: 'Имеет высшee педагогическое образование по специальности "Лингвист, преподаватель иностранных языков". Окончил АЛСИ в 2012 году, но начал преподавать в нашей школе еще во время учёбы. Имеет колоссальный опыт преподавания, более 10 лет. Готовит детей и взрослых к экзаменам уровней Starters, Movers, Flyers, KET, PET и FCE. Готовит к ОГЭ и ЕГЭ по английскому языку. Строгий, но справедливый, требовательный педагог.'},
        {name: 'Андронникова Екатерина Юрьевна',
        photo: 'https://ucarecdn.com/50e00b7d-354c-41a1-8550-18688ef2e0ce/kate.jpg',
        description: 'Имеет два высших педагогических образования по специальностям "Учитель математики и информатики" (АГПА, 2013г.) и "Лингвист, преподаватель иностранных языков"(АЛСИ, 2018г.) Окончила оба института с  красными дипломами. В нашей школе Екатерина Юрьевна преподает с 2018 года, готовит детей к экзаменам уровней Starters, Movers, Flyers и KEY for schools. Легко и непринужденно поддерживает вовлеченность учащихся на уроках, при этом поддерживая необходимую дисциплину.'},
        {name: 'Синяков Алексей Константинович',
        photo: 'https://ucarecdn.com/f4c9c157-3ca1-45ff-915a-ce23f0fe4352/alexei.jpg',
        description: 'Имеет высшee педагогическое образование по специальности "Лингвист, преподаватель иностранных языков". Окончил АЛСИ в 2018 году, прекрасный преподаватель для детей дошкольного возраста, работает с учениками от 3-х лет.  Готовит детей к экзаменам уровней Starters, Movers, Flyers.'},
        {name: 'Головина Евгения Александровна',
        photo: 'https://ucarecdn.com/06901624-cc26-4bc4-96a4-5104e15dca4d/evgeniya.jpg',
        description: 'Евгения Александровна молодой педагог, в данныый момент получает высшее образование, однако уже сейчас имеет большой ппедагогический опыт. Она работала вожатым, преподавала английский язык в детских садах и проходила обучение в Ставрополе в языковом центре. Готовит детей к экзаменам уровней Starters, Movers, Flyers.'}
    ];
    
    let slides=[];
    for (let i=0; i<teachers.length; i++) {
      console.log(slides);
      slides.push(
        <SwiperSlide key={`slide-${i}`} tag="li">
        <img src={teachers[i].photo} className="picture" alt={`Slide ${i}`}/>
        <div className='header'>{teachers[i].name}</div>
        <div className='description'>{teachers[i].description}</div>
      </SwiperSlide>
      )
    }


    return (
       <div className='teachers'>
        <Swiper
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation
          pagination
          spaceBetween={0}
          slidesPerView={1}
          onInit={(swiper) => console.log('Swiper initialized!', swiper)}
          onSlideChange={(swiper) => {
            console.log('Slide index changed to: ', swiper.activeIndex);
          }}
          onReachEnd={() => console.log('Swiper end reached')}
        >
        {slides}
        </Swiper>
      <div className='pink-back'>
        <img className='absolute-picture' src='https://ucarecdn.com/5772b987-a42e-4fda-89ca-fc13739990cc/all.jpg'/>
        <div className='text-around'>
        Все преподаватели Enjoy English School проходят специальную подготовку. 
        Мы обстоятельно знакомим наших учителей с методикой преподавания, 
        показываем, как наиболее эффективно делиться своими языковыми навыками со студентами. 
        Наша задача – сделать так, чтобы при взаимодействии с преподавателями Enjoy English School 
        студенты приобретали новые знания интуитивно и без стресса.
        </div>
      </div>
      </div>
    )
}