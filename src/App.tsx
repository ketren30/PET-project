import './App.css';
import { useEffect, useMemo } from 'react';
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
  const isModal: boolean = useSelector((state: types.MainState) => state.schedule.isModal);
  const LoggedUser: types.User| undefined = useSelector((state: types.MainState) => state.logging.activeUser);
  useEffect(()=>{
    navigate('/')
  }, [])
  const getClassName = (navData: any) => {
    if (navData.isActive) return 'activeMenu'
    else return 'menu'
  }

  let body = document.getElementById('body');
  if (body && isModal) body.className='modal-open'
  else if (body) body.className='';

const getMenu = useMemo(() => {
  const getMaleImage = (male: string) => {
    if (male==='male') return 'https://ucarecdn.com/940f11b0-dd86-48d4-9888-21124917d1c5/male.jpg'
    return 'https://ucarecdn.com/65e8b3a7-2bff-47a3-af1a-f4963f1668b5/female.jpg'
  }
  let logged;
  if (LoggedUser) {
    logged=<>
      <div className='big-right-margin'>
        <img src={getMaleImage(LoggedUser.male)} className='pic-icon' alt=''/>
        <div>{LoggedUser!.name}</div>
      </div>
      <div className='image-wrapper'>
        <img src='https://ucarecdn.com/a2f66f8b-5a5a-4162-a33c-9064e9957c78/logout.png' 
          className='log-out' 
          onClick={()=>{dispatch(LogOut()); setTimeout(()=> console.log(isLogged), 1500)}}
        />
      </div>
    </>
  }
  const menu = 
    <>
      <NavLink className={getClassName} to="/" >Главная</NavLink>
      <NavLink className={getClassName} to="/about" >О нас</NavLink>
      <NavLink className={getClassName} to="/cambridge" >Cambridge exams</NavLink>
      <NavLink className={getClassName} to="/teachers" >Наши учителя</NavLink>
      <NavLink className={getClassName} to="/schedule" >Расписание</NavLink>
      <NavLink className={getClassName} to="/news" >Новости</NavLink>
      {isLogged && logged}
      {!isLogged && <NavLink className={(navData) => navData.isActive ? "activeMenu" : "menu" } to="/enter" >Войти</NavLink>}
    </>;
    return <div className='menu-wrapper'>{menu}</div>
 
  }, [isLogged]); 



  return (
      <div className='app'>
        <div className='main'>
          <>
          <div className='wrap'>
            <div className='wrap-fit-content'>
              <img src='https://ucarecdn.com/53ce1d6b-8c2b-4fda-a2fb-d7ff2a0724ba/flag.jpg' 
                className='pic-logo' 
                alt='' 
                onClick={()=> navigate('/')} 
              />
              <h1>Enjoy English school</h1>
            </div>
            <div className='wrap-fit-content'>
              <img src='https://ucarecdn.com/ac8df919-6552-4297-9b61-9651f746e221/call.jpg' 
                className='pic-icon' 
                alt=''
              />
              <div>
                <h4>Позвоните сейчас</h4>
                <h2>
                  <a href='tel:+79284224291'>928-422-42-91</a>
                </h2>
              </div>
            </div>
          </div>
          <div className='line'/>
          {getMenu}

          <Routes>
            <Route path='/' element={<Main/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/cambridge' element={<Cambridge/>} />
            <Route path='/teachers' element={<Teachers/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/news' element={<News/>} />
            <Route path='/enter' element={<Enter/>} />
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
}


