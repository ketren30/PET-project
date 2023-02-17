import React, { useEffect, useState, useRef } from 'react';
import './schedule.css';
import * as types from '../../type';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSchedule, ChooseCell, ChangeVisibility } from '../../store/actionCreators';
import { ThunkDispatch } from 'redux-thunk';
import { Modal } from './modal/modal';


export const Schedule: React.FC = () => {
    const dispatch: ThunkDispatch<{}, void, types.MainAction> = useDispatch();
    const isLogged = useSelector((state: types.MainState)=> state.logging.isLogged);
    const activeUser = useSelector((state: types.MainState)=> state.logging.activeUser);
    const changingCell = useSelector((state: types.MainState)=> state.schedule.changingCell);
    const loading = useSelector((state: types.MainState)=> state.schedule.loading);
    const timetable = useSelector((state: types.MainState)=> state.schedule.timetable);
    const isVisible = useSelector((state: types.MainState)=> state.schedule.isVisible);
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
       
    const onCellClick = (array: (number|string)[]) => {
        dispatch(ChooseCell(array))
        if (isLogged && activeUser?.name==="Екатерина") {
        if (!isVisible) dispatch(ChangeVisibility());
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

    const handleClassName = (teacher:string, code: number) => {
        if (teacher!==undefined && teacher===changingCell[3] && code===changingCell[4]) return "active-td" 
        else return ''
    }

    return <>
        {x!==0 && <Modal x={x} y={y}/>}
        <div onClick={(e)=>onCoordinateChange(e.pageX, e.clientY)}>
            {loading && <h3>Loading...</h3>}
            {!loading && timetable.length!==0 && 
                <table className='tablica'>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable.map((item, index: number)=> {
                            return <>
                                <tr>
                                    <td colSpan={7} key={index} className='header'>Classroom №{index+1}</td>
                                </tr>
                                {Object.entries(item).map((elem)=>{
                                    return (
                                        <tr>
                                            <td className='side-header'>{elem[0]}</td>
                                            {elem[1].map((lesson: types.Lesson, ind: number)=>{
                                                if (Object.keys(lesson).length !== 0)
                                                return <td 
                                                className={handleClassName(lesson.teacher, lesson.groupID)} 
                                                key={ind} 
                                                onClick={()=>onCellClick([index, elem[0], ind, lesson.teacher, lesson.groupID])}>
                                                    <span className='bold-blue'>Учитель: </span> {lesson.teacher}<br/>
                                                    <span className='bold-green'>Уровень: </span>{lesson.level}<br/>
                                                    <span className='bold-red'>Ученики: </span>{lesson.numberOfStudents}<br/>
                                                    </td>
                                                else return <td 
                                                className={handleClassName(lesson.teacher, lesson.groupID)} 
                                                onClick={()=>onCellClick([index, elem[0], ind])}></td>    
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