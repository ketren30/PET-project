import React, { useEffect, useState } from 'react';
import './schedule.css';
import * as types from '../../type';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSchedule, ChooseCell, ShowModal } from '../../store/actionCreators';
import { ThunkDispatch } from 'redux-thunk';
import { Modal } from './modal/modal';


export const Schedule: React.FC = () => {
    const dispatch: ThunkDispatch<{}, void, types.MainAction> = useDispatch();
    const isLogged = useSelector((state: types.MainState)=> state.logging.isLogged);
    const activeUser = useSelector((state: types.MainState)=> state.logging.activeUser);
    const changingCell = useSelector((state: types.MainState)=> state.schedule.changingCell);
    const loading = useSelector((state: types.MainState)=> state.schedule.loading);
    const timetable = useSelector((state: types.MainState)=> state.schedule.timetable);
    const isMobile = useSelector((state: types.MainState)=> state.version.isMobile);
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [isChanged, setIsChanged] = useState(false);
      
    const onCellClick = (array: types.changingCell) => {
        dispatch(ChooseCell(array))
        if (isLogged && activeUser?.name==="Екатерина") {
        dispatch(ShowModal());
        } 
    }
    const onCoordinateChange = (left: number, top:number) => {
        if ((left+450)>innerWidth) setX(innerWidth-460) 
        else setX(left);
        if ((top+260)>innerHeight) setY(innerHeight-270)
        else setY(top);
    }
    
    useEffect(()=>{
        dispatch(FetchSchedule()); 
    }, [dispatch]);

    const handleClassName = (teacher?:string, code?: number) => {
        if (teacher!==undefined && teacher===changingCell[3] && code===changingCell[4]) return "active-cell" 
        else return ''
    }
    const onScheduleChanges = () => {
        setIsChanged(true);
    }
    const onSavingClick = () => {
        setIsChanged(false);
        fetch('https://api.jsonbin.io/v3/b/6400a25face6f33a22e826d4', {
                method: 'PUT',
                headers: {
                    'X-Master-Key': '$2b$10$oxBixTfm91bCooJQkMVgqe2pAnvfRW3.CENARse2lulF/f3HZB7gq',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(timetable)
        });
    }
    const getInitials = (name: string) => {
        return `${name.split(' ')[0][0]}. ${name.split(' ')[1][0]}.`
    }
    

    return <>
        {x!==0 && <Modal x={x} y={y} onSubmitClick = {onScheduleChanges} />}
        <div onClick={(e)=>onCoordinateChange(e.pageX, e.clientY)} className='table-wrapper'>
            {loading && <h3>Loading...</h3>}
            {isChanged && isLogged && <button onClick={onSavingClick} className='submitButton'>Сохранить изменения</button>}
            {!loading && timetable.length && 
                <table className='schedule-table'>
                    <thead className='table-title'>
                        <tr>
                            <th className='week-days'>{!isMobile && 'Time'}</th>
                            <th className='week-days'>{isMobile? 'Mon': 'Monday'}</th>
                            <th className='week-days'>{isMobile? 'Tue': 'Tuesday'}</th>
                            <th className='week-days'>{isMobile? 'Wed': 'Wednesday'}</th>
                            <th className='week-days'>{isMobile? 'Thu': 'Thursday'}</th>
                            <th className='week-days'>{isMobile? 'Fri': 'Friday'}</th>
                            <th className='week-days'>{isMobile? 'Sat': 'Saturday'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable.map((item: types.Classroom, index: number)=> {
                            return <>
                                <tr>
                                    <td colSpan={7} key={index} className='header'>Classroom №{index+1}</td>
                                </tr>
                                {(Object.entries(item) as types.ArrayInClassroom[]).map((elem) => {
                                    return (
                                        <tr>
                                            <th className='side-header'>{elem[0]}</th>
                                            {elem[1].map((lesson: types.Lesson, ind: number)=>{
                                                if (Object.keys(lesson).length)
                                                return <td 
                                                className={handleClassName(lesson.teacher, lesson.groupID)} 
                                                key={ind} 
                                                onClick={()=>onCellClick([index, elem[0], ind, lesson.teacher, lesson.groupID])}>
                                                    {!isMobile && <span className='bold-blue'>Учитель: </span>} 
                                                    {isMobile? <span className='bold-blue'>{getInitials(lesson.teacher)}</span>:<span>{lesson.teacher}</span>}
                                                    <br/>
                                                    {!isMobile && <span className='bold-green'>Уровень: </span>} 
                                                    {isMobile? <span className='bold-green'>{lesson.level}</span>:<span>{lesson.level}</span>}
                                                    <br/>
                                                    {!isMobile && <span className='bold-red'>Ученики: </span>} 
                                                    {isMobile? <span className='bold-red'>{lesson.numberOfStudents} чел.</span>:<span>{lesson.numberOfStudents}</span>}
                                                    </td>
                                                else return <td 
                                                className={handleClassName()} 
                                                onClick={()=>onCellClick([index, elem[0], ind])}/>    
                                            })}
                                        </tr>
                                    )
                                })}
                            </>                   
                        })}
                    </tbody>
                </table>
            }
        </div>
    </>
}