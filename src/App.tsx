import React from 'react';
import flag from './images/flag.jpg';
import call from './images/call.jpg';
import male from './images/male.jpg';
import female from './images/female.jpg'
import logout from './images/logout.png';
import instagram from './images/instagram.jpg';
import telegram from './images/telegram.jpg';
import whatsapp from './images/whatsapp.jpg';
import './App.css';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Enter } from './components/enter/enter';
import { News } from './components/news/news';
import { Schedule } from './components/schedule/schedule';
import { Teachers } from './components/teachers/teachers';
import { Cambridge } from './components/cambridge/cambridge';
import { Main } from './components/main/main';
import {About} from './components/about/about';

import * as types from './type';
import { LogOut } from './store/actionCreators';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate
} from "react-router-dom";


export default function App() {
  const dispatch: types.DispatchType = useDispatch();
  const navigate = useNavigate();
  const isLogged: boolean = useSelector((state: types.MainState) => state.logging.isLogged);
  const LoggedUser: types.User| undefined = useSelector((state: types.MainState) => state.logging.activeUser);
  const getClassName = (navData: any) => {
    if (navData.isActive) return 'activeMenu'
    else return 'menu'
  }

const isShowName = useMemo(() => {
  const menu = 
    <div className='menu-wrapper'>
      <NavLink className={getClassName} to="/" >Главная</NavLink>
      <NavLink className={getClassName} to="/about" >О нас</NavLink>
      <NavLink className={getClassName} to="/cambridge" >Кембриджские экзамены</NavLink>
      <NavLink className={getClassName} to="/teachers" >Наши учителя</NavLink>
      <NavLink className={getClassName} to="/schedule" >Расписание</NavLink>
      <NavLink className={getClassName} to="/news" >Новости</NavLink>
      {!isLogged && <NavLink className={(navData) => navData.isActive ? "activeMenu" : "menu" } to="/enter" >Войти</NavLink>}
    </div>
  if (isLogged) { 
    const link=LoggedUser!.male==='male'? male:female;
      return (
        <div className='wrapper-menu-and-user'>
          {menu}
          <div className='loggedUser'>
            <div className='big-right-margin'>
            <img src={link} className='pic-icon' alt=''/>
              <div>{LoggedUser!.name}</div>
            </div>
            <div className='image-wrapper'>
              <img src={logout} alt='' className='log-out' onClick={()=>{dispatch(LogOut()); setTimeout(()=> console.log(isLogged), 1500)}}/>
            </div>
          </div>
        </div>
    )} 
    if (!isLogged) {
      return (<div>{menu}</div>)
    }
  }, [isLogged]); 



  return (
      <div className='app'>
        <div className='main'>
          <div className='wrap'>
            <div className='wrap-fit-content'>
              <img src={flag} className='pic-logo' alt='' onClick={()=> navigate('/')} />
              <h1>Enjoy English school</h1>
            </div>
            <div className='wrap-fit-content'>
              <img src={call} className='pic-icon' alt=''/>
              <div>
                <h4>Позвоните сейчас</h4>
                <h2>
                  <a href='tel:+79284224291'>928-422-42-91</a>
                </h2>
              </div>
            </div>
          </div>
          <div className='line'/>
          {isShowName}

          <Routes>
            <Route path='/' element={<Main/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/cambridge' element={<Cambridge/>} />
            <Route path='/teachers' element={<Teachers/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/news' element={<News/>} />
            <Route path='/enter' element={<Enter/>} />
          </Routes>
        </div>

        <div className='footer'>
          <div className='line-margin'/>
          <div className='inline'>
            <h3>Мы в социальных сетях: </h3>
            <a href='https://instagram.com/enjoy_english__school?igshid=YmMyMTA2M2Y='><img className='logos' src={instagram}></img></a>
            <a href='https://t.me/Enjoy_english_school'><img className='logos' src={telegram}></img></a>
            <a href='https://wa.me/+79284224291'><img className='logos' src={whatsapp}></img></a>
          </div>
          <div className='blue-backgound'>
            <h4>Наш адрес: Армавир, ул. Гоголя, 117А</h4>
          </div>
          <div className='line-margin'/><br/>
        </div>        
      </div>
  );
}


