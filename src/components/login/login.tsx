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
    const isLogged: boolean = useSelector((state: types.MainState)=> state.logging.isLogged);
    const loggedUser: types.User | undefined = useSelector((state: types.MainState) => state.logging.activeUser);
    
    const onLoginChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPotentialUserLogin(event.currentTarget.value.toLowerCase());
    }
    const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPotentialUserPassword(event.currentTarget.value.toLowerCase());
    }

    useEffect(()=> {
        if (isLogged) setTimeout(()=> navigate('/'), 1500);
    }, [isLogged]);

    useEffect(()=> {
        if (potentialUserLogin && potentialUserPassword) setIsValid(true)
        else setIsValid(false)
    }, [potentialUserLogin, potentialUserPassword]);

    useEffect(()=> {
        if (loginInput.current!==null) loginInput.current.focus()
    }, [])

    const onButtonClick = () => {
        dispatch(CheckUser({login: potentialUserLogin, password: potentialUserPassword}));
        if (!isLogged) {
            setError("Логин или пароль неверны! Попытайтесь еще раз.")
            setTimeout(()=> {
                setError('')
            }, 2000)
        }
    }
    
    return (
        <div className='logging-wrapper'>
            {isLogged?
            <h3>Добро пожаловать, {loggedUser!.name +' '+ loggedUser!.lastName}</h3>
            :<div className='form'>
                <input ref={loginInput} className='logging-input' onChange={onLoginChange} placeholder='Введите логин'/><br/>
                <input className='logging-input' onChange={onPasswordChange} placeholder='Введите пароль'/><p/>
                <button className='logging-button' onClick={onButtonClick} disabled={!isValid}>Войти</button>
                {error!! && <h4>{error}</h4>}
            </div>}
        </div>
    )
}