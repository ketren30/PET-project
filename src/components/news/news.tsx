import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../type';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import { ThunkDispatch } from 'redux-thunk';
import { FetchNews } from '../../store/actionCreators';
import { AddNews } from '../../store/actionCreators';
import './news.css';

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

export const News: React.FC = () => {
    const isLogged = useSelector ((state: types.MainState) => state.logging.isLogged);
    const dispatch: ThunkDispatch<{}, void, types.MainAction> = useDispatch();
    const news = useSelector((state: types.MainState) => state.news.news);
    const loading = useSelector((state: types.MainState) => state.news.loading);
    const [isAdding, setIsAdding] = useState(false);
    const [currentNews, setCurrentNews] = useState<string>('');
    const [imgs, setImgs] = useState(void[]);
    
    useEffect(()=> {
        dispatch(FetchNews());
    }, [dispatch]);

    const onSubmit = () => {
        const news = {
            date: (new Date(2022, 4, 30)).toString(),
            photos: [],
            text: currentNews
        }
        setIsAdding(false);
        dispatch(AddNews(news))
    }
    
    const ourNews = news.map((elem: types.News, i: number)=>{
        return (
            <div className='news-wrapper' key={i}><>
                <div className='head-wrapper'>
                    <h3>{elem.date.slice(0, 16)}</h3>
                </div>
                <p>{elem.text}</p>
                {elem.photos.length!==0 && <Swiper className='swiper1'
                    navigation
                    id="thumbs"
                    spaceBetween={5}
                    slidesPerView={3}
                >
                    {elem.photos.map((item, index: number)=> {
                        return <SwiperSlide key={`slide-${index}`} tag="li">
                                   <img className='thumbs-image' src={item} alt={`Slide ${index+1}`}/>
                        </SwiperSlide> })}      
                </Swiper>}
            </></div>
        )
    })

    const imgToBlob = (src: any)=> {
        let img = new Image as HTMLImageElement;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        /* img.onload = function() {
        canvas.width = img.naturalWidth;     // update canvas size to match image
        canvas.height = img.naturalHeight;
        context!.drawImage(img, 0, 0);       // draw in image
        canvas.toBlob(function(blob) {        // get content as JPEG blob
        }, "image/jpeg", 0.75);
        };
        img.crossOrigin = "";              // if from different origin
        img.src = src;
        console.log(img); */
    }
    const getImages = (event:any) => {
        const file = event.currentTarget.files[0];
        const reader = new FileReader();
        reader.onloadend = function() {
                let data = reader.result as string;
                data = data.split(',')[0];
                const data1 = window.btoa(data);
                const binaryBlob = atob(data1);
                console.log(binaryBlob)
        }
        reader.readAsDataURL(file);
        
    }
        
    return <>
        {loading? <h3>Loading...</h3>
            :<> 
            {isLogged && !isAdding && <button 
            className='submitButton' 
            onClick = {()=>setIsAdding(true)}>Добавить новость</button>}
            {<div>
                <input className='news-input' onChange={(e)=>setCurrentNews(e.currentTarget.value)}/>
                <input type='file' multiple accept="image/*,image/jpeg" onChange={getImages}/>
                <button className='submitButton' disabled={currentNews===''} onClick={()=>onSubmit()}>Сохранить</button>
            </div>}

            {ourNews}
            
        </>}
    </>
}