import React from 'react';
import kate from '../../images/kate1.jpg';
import arkasha from '../../images/arkasha1.jpg';
import alex from '../../images/alex1.jpg';
import jenya from '../../images/jenya1.jpg';
import lilya from '../../images/lilya1.jpg';
import all from '../../images/all.jpg';
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
        photo: lilya,
        description: 'Имеет два высших педагогических образования по специальностям "Лингвист, преподаватель иностранных языков" и "Преподаватель культурологии". Окончила АГПА в 2013 году с двумя красными дипломами. В нашей школе Лилия владимировна преподает с 2016 года, готовит детей к экзаменам уровней Starters, Movers, Flyers и KEY for schools, готовит к ОГЭ по английскому языку. Знает и преподает французский язык, легко находит общий язык с детьми.'},
        {name: 'Андронников Аркадий Алексеевич',
        photo: arkasha,
        description: 'Имеет высшee педагогическое образование по специальности "Лингвист, преподаватель иностранных языков". Окончил АЛСИ в 2012 году, но начал преподавать в нашей школе еще во время учёбы. Имеет колоссальный опыт преподавания, более 10 лет. Готовит детей и взрослых к экзаменам уровней Starters, Movers, Flyers, KET, PET и FCE. Готовит к ОГЭ и ЕГЭ по английскому языку. Строгий, но справедливый, требовательный педагог.'},
        {name: 'Андронникова Екатерина Юрьевна',
        photo: kate,
        description: 'Имеет два высших педагогических образования по специальностям "Учитель математики и информатики" (АГПА, 2013г.) и "Лингвист, преподаватель иностранных языков"(АЛСИ, 2018г.) Окончила оба института с  красными дипломами. В нашей школе Екатерина Юрьевна преподает с 2018 года, готовит детей к экзаменам уровней Starters, Movers, Flyers и KEY for schools. Легко и непринужденно поддерживает вовлеченность учащихся на уроках, при этом поддерживая необходимую дисциплину.'},
        {name: 'Синяков Алексей Константинович',
        photo: alex,
        description: ''},
        {name: 'Головина Евгения Александровна',
        photo: jenya,
        description: ''}
    ];
    let slides=[];
    for (let i=0; i<teachers.length; i++) {
      console.log(slides);
      slides.push(
        <SwiperSlide key={`slide-${i}`} tag="li">
        <img src={teachers[i].photo} className="picture" alt={`Slide ${i}`}/>
        <h2 className='header'>{teachers[i].name}</h2>
        <div className='description'>{teachers[i].description}</div>
      </SwiperSlide>
      )
    }
    return (
       <>
        <Swiper
        id="main"
        //thumbs={{ swiper: thumbsSwiper }}
        //controller={{ control: controlledSwiper }}
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
        <img className='absolute-picture' src={all}/>
        <div className='text-around'>
        Все преподаватели Enjoy English School проходят специальную подготовку. 
        Мы обстоятельно знакомим наших учителей с методикой преподавания, 
        показываем, как наиболее эффективно делиться своими языковыми навыками со студентами. 
        Наша задача – сделать так, чтобы при взаимодействии с преподавателями Enjoy English School 
        студенты приобретали новые знания интуитивно и без стресса.
        </div>
      </div>
      </>
    )
}