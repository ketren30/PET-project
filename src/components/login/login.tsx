import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { CheckUser } from '../../store/actionCreators';
import * as types from '../../type';
import {useNavigate} from 'react-router-dom';
import './login.css';


export const LogIn = () => {
    const [potentialUserLogin, setPotentialUserLogin] = useState<string>('');
    const [potentialUserPassword, setPotentialUserPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const loginInput = useRef<HTMLInputElement>(null);
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    const isSmbdLogged: boolean = useSelector((state: types.MainState)=> state.logging.isSmbdLogged);
    const loggedUser: types.User | undefined = useSelector((state: types.MainState) => state.logging.activeUser);
    
    const onLoginChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPotentialUserLogin(event.currentTarget.value.toLowerCase().trim());
    }
    const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPotentialUserPassword(event.currentTarget.value.toLowerCase().trim());
    }

    useEffect(()=> {
        if (isSmbdLogged) setTimeout(()=> navigate(`${process.env.PUBLIC_URL}/`), 1500);
    }, [isSmbdLogged]);

    useEffect(()=> {
        if (potentialUserLogin && potentialUserPassword) setIsValid(true)
        else setIsValid(false)
    }, [potentialUserLogin, potentialUserPassword]);

    useEffect(()=> {
        if (loginInput.current!==null) loginInput.current.focus()
    }, [])

    const onButtonClick = () => {
        dispatch(CheckUser({login: potentialUserLogin, password: potentialUserPassword}));
        if (!isSmbdLogged) {
            setError("Логин или пароль неверны! Попытайтесь еще раз.")
            setTimeout(()=> {
                setError('')
            }, 2000)
        }
    }
    
    return (
        <div className='logging-wrapper'>
            {isSmbdLogged?
            <h3 className='loading'>Добро пожаловать, {loggedUser!.name +' '+ loggedUser!.lastName}</h3>
            :<div className='form'>
                <input ref={loginInput} className='main-input' onChange={onLoginChange} placeholder='Введите логин'/><br/>
                <input type='password' className='main-input' onChange={onPasswordChange} placeholder='Введите пароль'/><p/>
                <button className='main-button' onClick={onButtonClick} disabled={!isValid}>Войти</button>
                {error!! && <h4>{error}</h4>}
            </div>}
        </div>
    )
}