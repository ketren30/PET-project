import React from 'react';
import { useState } from 'react';
import './main.css';
import { useSelector } from 'react-redux';
import EmailContactForm from './form';
import { MainState } from '../../type';

type Props = {
    height: number
}


export const Main: React.FC<Props> = ({height}) => {
    const isMobile = useSelector((state: MainState)=> state.version.isMobile);
    const [isForAdults, setIsForAdults] = useState(false);
    
    const getButtonClass = (who: string) => {
        if ((who==='child' && isForAdults) || (who==='adult' && !isForAdults)) return 'call-form-button-dis'
        return 'call-form-button'

    }

    return (
        <div className='main'>
            {!isMobile && <div className='background-picture'></div>}
            <div className='left-margin'>
                <h1>Индивидуальные и групповые занятия</h1>
                <h4>Для всей семьи</h4>
            </div>

            <div className='application-wrapper'>
                {isMobile && <img 
                    style={{height: height}} 
                    src='https://ucarecdn.com/b2be70bf-0dfb-46f6-a30e-ab07247edc1b/Untitled_design__20.png' 
                    className='abs-img'
                />}
                <div className='buttons'>
                    <button     
                        onClick={()=>setIsForAdults(false)} 
                        className={getButtonClass('child')}>Детям</button> 
                    <button onClick={()=>setIsForAdults(true)} className={getButtonClass('adult')}>Взрослым</button>
                </div>
                <div className='application-form'>
                    <EmailContactForm isForAdults={isForAdults}/>
                    {!isMobile && <div className='describing'>
                        <p>Оставьте заявку и мы перезвоним вам в течение дня</p>
                    </div>}
                    <h6>Отправляя заявку, вы соглашаетесь на обработку ваших персональных данных</h6>
                </div>
            </div>
            
        </div>
    )
}