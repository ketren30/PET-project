import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn } from '../components/login/login';
import { News } from '../components/news/news';
import { Schedule } from '../components/schedule/schedule';
import { Teachers } from '../components/teachers/teachers';
import { Cambridge } from '../components/cambridge/cambridge';
import { Main } from '../components/main/main';
import {About} from '../components/about/about';
import * as types from '../type';
import { LogOut, ChangeVersion, ChangeWidth } from '../store/actionCreators';
import {useResize} from './useResize';
import flag from './flag.png'

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
  const isModal: boolean = useSelector((state: types.MainState) => state.schedule.isModal);
  const LoggedUser: types.User| undefined = useSelector((state: types.MainState) => state.logging.activeUser);
  const { width, height } = useResize();
  const [isMenu, setIsMenu] = useState(false);

  useEffect(()=>{
    navigate('/')
  }, []);
  
  useEffect(() => {
      dispatch(ChangeWidth(width))
      if (width<768) dispatch(ChangeVersion(true))
      else dispatch(ChangeVersion(false))
      if (width>=768 && isMenu) setIsMenu(false)
  }, [width])
  const getClassName = (navData: any) => {
    if (navData.isActive) return 'activeMenu'
    else return 'menu'
  }
  const handleMenu = () => {
    if (isMenu) setIsMenu(false)
  }

  let body = document.getElementById('body');
  if (body && (isModal||isMenu)) body.className='modal-open'
  else if (body) body.className='';

  const flagAndName = (
    <div className='flex-space-between-fit'>
      <img src={flag} 
        className='pic-logo' 
        alt='' 
        onClick={()=> navigate('/')} 
      />
      <h1 className={isMenu? 'font-1em' : 'font-16px'}>Enjoy English school</h1>
    </div>
  );

  const getMenu = function() {
    const getMaleImage = (male: string) => {
      return male==='male'? 'https://ucarecdn.com/865d0ac0-77b6-4bd5-b419-990fa767b348/male.png'
      :'https://ucarecdn.com/243f8c9e-5b53-47d8-b196-08d18534be19/female.png'
    }
    let logged;
    if (LoggedUser) {
      logged=<>
        <div className='big-right-margin'>
          <img src={getMaleImage(LoggedUser.male)} className='pic-icon' alt=''/>
          <div className='activeMenu'>{LoggedUser!.name}</div>
        </div>
        <div className='image-wrapper'>
          <img src='https://ucarecdn.com/1f6fe483-2989-4bae-b1a5-50c2fff46c19/logout.png' 
            className='log-out' 
            onClick={()=> dispatch(LogOut())}
          />
        </div>
      </>
    }

    const menu = <>
        <NavLink className={getClassName} to="/" onClick={handleMenu}>Главная</NavLink>
        <NavLink className={getClassName} to="/about" onClick={handleMenu}>О нас</NavLink>
        <NavLink className={getClassName} to="/cambridge" onClick={handleMenu}>Экзамены</NavLink>
        <NavLink className={getClassName} to="/teachers" onClick={handleMenu}>Наши учителя</NavLink>
        <NavLink className={getClassName} to="/schedule" onClick={handleMenu}>Расписание</NavLink>
        <NavLink className={getClassName} to="/news" onClick={handleMenu}>Новости</NavLink>
        {isLogged && logged}
        {!isLogged && <NavLink className={getClassName} to="/enter" >Войти</NavLink>}
    </>;

    const mobileMenu = <>
        <div className='flex-space-between'>
          {flagAndName}
          <div className='flex-space-between-fit'>
            {!isLogged && <NavLink className="menu" to="/enter" onClick={handleMenu}>Войти</NavLink>}
            {isLogged && <div className='big-right-margin'>
              <img src={getMaleImage(LoggedUser!.male)} className='pic-icon' alt=''/>
              <h2>{LoggedUser!.name}</h2>
            </div>}
            <div className="app-close" onClick={()=>setIsMenu(false)}>&#10006;</div>
          </div>
        </div>
        <NavLink className="menu" to="/" onClick={handleMenu}>Главная</NavLink>
        <NavLink className="menu" to="/about" onClick={handleMenu}>О нас</NavLink>
        <NavLink className="menu" to="/cambridge" onClick={handleMenu}>Экзамены</NavLink>
        <NavLink className="menu" to="/teachers" onClick={handleMenu}>Наши учителя</NavLink>
        <NavLink className="menu" to="/schedule" onClick={handleMenu}>Расписание</NavLink>
        <NavLink className="menu" to="/news" onClick={handleMenu}>Новости</NavLink>
        {isLogged && <NavLink className="menu" to="/" onClick={() => {handleMenu(); dispatch(LogOut())}}>Выйти</NavLink>}
    </>

    return isMenu? 
    <div className='menu-wrapper'>{mobileMenu}</div> 
    : <div className='menu-wrapper'>{menu}</div>
  } 


  if (!isMenu) return (
      <div className='app'>
        
        <div className='main'>
          <>
          <div className='flex-space-between'>
            {flagAndName}
            {(width>=993 || isMenu) && getMenu()}
            {width<993 && <div className='menu-icon' onClick={()=>setIsMenu(true)}>☰</div>}
          </div>
          
          <Routes>
            <Route path='/' element={<Main height={height}/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/cambridge' element={<Cambridge/>} />
            <Route path='/teachers' element={<Teachers/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/news' element={<News/>} />
            <Route path='/enter' element={<LogIn/>} />
          </Routes>
          </>
        </div>

        <div className='footer'>
          <div className='line-margin'/>
          <div className='inline'>
            <h3>Мы в социальных сетях: </h3>
            <a href='https://instagram.com/enjoy_english__school?igshid=YmMyMTA2M2Y='>
              <img className='logos' src='https://ucarecdn.com/9625085d-03c9-4d67-929d-911dea85dd0f/instagram.jpg'></img>
            </a>
            <a href='https://t.me/Enjoy_english_school'>
              <img className='logos' src='https://ucarecdn.com/0d2b80ec-9333-4ce2-9264-56d3c66071d8/telegram.jpg'></img>
            </a>
            <a href='https://wa.me/+79284224291'>
              <img className='logos' src='https://ucarecdn.com/3b5ca3a4-151b-49cc-b74b-8517845ea2ed/whatsapp.jpg'></img>
            </a>
          </div>
          <div className='blue-backgound'>
            <h4>Наш адрес: Армавир, ул. Гоголя, 117А</h4>
          </div>
          <div className='line-margin'/><br/>
        </div>        
      </div>
  );
  else return (
    <div>
    {getMenu()}
    </div>
  )
}


