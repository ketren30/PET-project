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

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
  useLocation
} from "react-router-dom";
import { Footer } from './footer';


export default function App() {
  const dispatch: types.DispatchType = useDispatch();
  const navigate = useNavigate();
  const isSmbdLogged: boolean = useSelector((state: types.MainState) => state.logging.isSmbdLogged);
  const isModal: boolean = useSelector((state: types.MainState) => state.schedule.isModal);
  const LoggedUser = useSelector((state: types.MainState) => state.logging.activeUser)
  const { width } = useResize();
  const [isMenu, setIsMenu] = useState(false);
  const loc = useLocation();
  
  useEffect(() => {
      dispatch(ChangeWidth(width))
      if (width<768) dispatch(ChangeVersion(true))
      else dispatch(ChangeVersion(false))
      if (width>=768 && isMenu) setIsMenu(false)
  }, [width])
  

  let body = document.getElementById('body');
  if (body && (isModal||isMenu)) body.className='modal-open'
  else if (body) body.className='';

  const flagAndName = (
    <div className='flex-space-between-fit'>
      <img src='https://ucarecdn.com/7375215a-c42e-4bcb-9e7c-1ab4a0d113cb/flag.png' 
        className='pic-logo' 
        alt='' 
        onClick={()=> navigate(`${process.env.PUBLIC_URL}/`)} 
      />
      <h1 className={isMenu? 'font-1em' : 'font-16px'}>Enjoy English school</h1>
    </div>
  );

  const getMenu = () => {

    
    const getClassName = (navData: any) => {
        if (loc.pathname==='/') {
          return navData.isActive? 'mainPageMenu-active':'mainPageMenu'
        } else return navData.isActive? 'menu-active' : 'menu'
    }
      
    const handleMenu = () => {
      if (isMenu) setIsMenu(false)
    }

    const getMaleImageSrc = () => {
      if (LoggedUser) {
        return LoggedUser.male==='male'? 
          'https://ucarecdn.com/ceac0e5b-2dc1-4da6-83ad-248081c26890/male.png'
          :'https://ucarecdn.com/6a82b401-574e-4627-b773-043b6889a3e5/female.png'
      }
    }

    const fullScreenMenu = <>
        <NavLink className={getClassName} to={`${process.env.PUBLIC_URL}/`} onClick={handleMenu}>Главная</NavLink>
        <NavLink className={getClassName} to={`${process.env.PUBLIC_URL}/about`} onClick={handleMenu}>О нас</NavLink>
        <NavLink className={getClassName} to={`${process.env.PUBLIC_URL}/cambridge`} onClick={handleMenu}>Экзамены</NavLink>
        <NavLink className={getClassName} to={`${process.env.PUBLIC_URL}/teachers`} onClick={handleMenu}>Наши учителя</NavLink>
        <NavLink className={getClassName} to={`${process.env.PUBLIC_URL}/schedule`} onClick={handleMenu}>Расписание</NavLink>
        <NavLink className={getClassName} to={`${process.env.PUBLIC_URL}/news`} onClick={handleMenu}>Новости</NavLink>
        {isSmbdLogged && <>
            <div className='loggedUser'>
              <h1>{LoggedUser!.name}</h1>
              <img src={getMaleImageSrc()} className='pic-icon'/>
            </div>
            <div className='image-wrapper'>
              <img src='https://ucarecdn.com/25c13ed5-a8f9-48b9-ac1a-6241d7b148dd/logout.png' 
                className='log-out' 
                onClick={()=> dispatch(LogOut())}
              />
            </div>
        </>}
        {!isSmbdLogged && <NavLink className={getClassName} to={`${process.env.PUBLIC_URL}/login`} >Войти</NavLink>}
    </>;

    const mobileMenu = <>
        <div className='flex-space-between'>
          <div className='flex-space-between-fit'>
            <img src='https://ucarecdn.com/7375215a-c42e-4bcb-9e7c-1ab4a0d113cb/flag.png' 
              className='pic-logo' 
              alt='' 
              onClick={()=> navigate(`${process.env.PUBLIC_URL}/`)} 
            />
            <h1 className={isMenu? 'font-1em' : 'font-16px'}>Enjoy English school</h1>
          </div>
  
          <div className='flex-space-between-fit'>
            {!isSmbdLogged && <NavLink className="menu" to={`/login`} onClick={handleMenu}>Войти</NavLink>}
            {isSmbdLogged && <div className='flex-space-between-fit'>
              <h3>{LoggedUser?.name}</h3> 
              <img className='pic-logo' src={getMaleImageSrc()}/>
            </div>}
            <div className="app-close" onClick={() => setIsMenu(false)}>&#10006;</div>
          </div>
        </div>
        <NavLink className="menu" to={`${process.env.PUBLIC_URL}/`} onClick={handleMenu}>Главная</NavLink>
        <NavLink className="menu" to={`${process.env.PUBLIC_URL}/about`} onClick={handleMenu}>О нас</NavLink>
        <NavLink className="menu" to={`${process.env.PUBLIC_URL}/cambridge`} onClick={handleMenu}>Экзамены</NavLink>
        <NavLink className="menu" to={`${process.env.PUBLIC_URL}/teachers`} onClick={handleMenu}>Наши учителя</NavLink>
        <NavLink className="menu" to={`${process.env.PUBLIC_URL}/schedule`} onClick={handleMenu}>Расписание</NavLink>
        <NavLink className="menu" to={`${process.env.PUBLIC_URL}/news`} onClick={handleMenu}>Новости</NavLink>
        {isSmbdLogged && <NavLink 
          className="menu" 
          to={`${process.env.PUBLIC_URL}/`} 
          onClick={() => {handleMenu(); dispatch(LogOut())}}
        >Выйти</NavLink>}
    </>

    return isMenu? 
      <div className='menu-wrapper'>{mobileMenu}</div> 
      : <div className='menu-wrapper'>{fullScreenMenu}</div> 
  } 


  if (!isMenu) return (
      <div className='app'>
        <div className='middle'>
          <div className='flex-space-between'>
            {flagAndName}
            {(width>=993 || isMenu) && getMenu()}
            {width<993 && <div className='menu-icon' onClick={()=>setIsMenu(true)}>☰</div>}
          </div>
          
          <Routes >
            <Route path={`${process.env.PUBLIC_URL}/`} element={<Main/>} />
            <Route path={`${process.env.PUBLIC_URL}/about`} element={<About/>} />
            <Route path={`${process.env.PUBLIC_URL}/cambridge`} element={<Cambridge/>} />
            <Route path={`${process.env.PUBLIC_URL}/teachers`} element={<Teachers/>} />
            <Route path={`${process.env.PUBLIC_URL}/schedule`} element={<Schedule/>} />
            <Route path={`${process.env.PUBLIC_URL}/news`} element={<News/>} />
            <Route path={`${process.env.PUBLIC_URL}/login`} element={<LogIn/>} />
          </Routes>
        </div>

        <Footer/>        
      </div>
  )
  else return (
    <>
    {getMenu()}
    </>
    
  )
}


