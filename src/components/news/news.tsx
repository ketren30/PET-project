import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../type';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import { ThunkDispatch } from 'redux-thunk';
import { FetchNews, AddNews, DeleteNews } from '../../store/actionCreators';
import { Widget } from "@uploadcare/react-widget";
import './news.css';

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

export const News: React.FC = () => {
    const isLogged = useSelector ((state: types.MainState) => state.logging.isLogged);
    const dispatch: ThunkDispatch<{}, void, types.MainAction> = useDispatch();
    const news = useSelector((state: types.MainState) => state.news.news);
    const loading = useSelector((state: types.MainState) => state.news.loading);
    const [isAdding, setIsAdding] = useState(false);
    const [currentNews, setCurrentNews] = useState<string>('');
    const [imgs, setImgs] = useState<string[]>([]);
    const [imagesUuid, setImagesUuid] = useState<string|null>('');
    const [vidgetValue, setVidgetValue] = useState<string>();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(()=> {
        dispatch(FetchNews());
    }, [dispatch]);

    const handleClear = (e: any) => {
        e.preventDefault()
        setCurrentNews('')
    }
    const handleChange = (e: any) => {
        setCurrentNews(e.target.value)
    }
    
    const onSubmit = (e: any) => {
        const addingNews = {
            date: new Date().toString(),
            photos: imgs,
            text: currentNews
        }
        setIsAdding(false);
        dispatch(AddNews(addingNews));
        handleClear(e);
        setVidgetValue('');
    }
    
    let ourNews;
    if (news) ourNews=news.map((elem: types.News, i: number)=>{
        return (
            <div className='news-wrapper' key={i}><>
                {isLogged && <div className='closing-cross' onClick={()=>dispatch(DeleteNews(i))}>&#10006;</div>}
                <h3 className='news-date'>{elem.date.slice(0, 16)}</h3>
                <p>{elem.text}</p>
                {elem.photos.length!==0 && <Swiper className='swiper1'
                    navigation
                    id="thumbs"
                    spaceBetween={5}
                    slidesPerView={1}
                >
                    {elem.photos.map((item, index: number)=> {
                        return <SwiperSlide key={`slide-${index}`} tag="li">
                                   <img className='thumbs-image' src={item} alt={`Slide ${index+1}`}/>
                        </SwiperSlide> })}      
                </Swiper>}
            </></div>
        )
    })
    useEffect(()=> {
        if (imagesUuid) {
            let arrayOfPictures = [];
            for (let i=0; i<+imagesUuid[imagesUuid.length-1]; i++) {
                arrayOfPictures.push(`https://ucarecdn.com/${imagesUuid}/nth/${i}/`)
            }
            setImgs(arrayOfPictures)
        }
    }, [imagesUuid])

    useEffect(()=> {
        if (news.length) {    
            fetch('https://api.jsonbin.io/v3/b/63ff2b48ebd26539d0875ca1', {
                method: 'PUT',
                headers: {
                    'X-Master-Key': '$2b$10$oxBixTfm91bCooJQkMVgqe2pAnvfRW3.CENARse2lulF/f3HZB7gq',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(news)
            })}
    }, [news.length]);

    useEffect(() => {
        if (textareaRef.current) {textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";}
    }, [currentNews]);

    const alterLocale = () => ({
        buttons: {
          choose: {
            files: {
              one: 'Загрузите фото',
              other: 'Загрузите фото'
            }
          }
        }
      });
      
        
    return <>
        {loading? <h3>Loading...</h3>
            :<> 
            {isLogged && !isAdding && <button 
            className='submit-button' 
            onClick = {()=>setIsAdding(true)}>Добавить новость</button>}
            {isAdding && <div className='news-adding'>
                <textarea className='news-input'
                    ref={textareaRef} 
                    value={currentNews} 
                    onChange={handleChange} 
                    placeholder='Введите текст новости'
                />
                <Widget 
                    value= {vidgetValue}
                    publicKey="e47f57a572ecfb0df052"
                    localeTranslations={alterLocale()} 
                    multiple={true}
                    onChange={fileInfo=> setImagesUuid (fileInfo.uuid)}
                />
                <button className='submit-button' disabled={currentNews===''} onClick={(e)=>onSubmit(e)}>Сохранить</button>
            </div>}

            {ourNews}
            
        </>}
    </>
}