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
    const isModal = useSelector((state: types.MainState)=> state.schedule.isModal);
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [isChanged, setIsChanged] = useState(false);
      
    
    useEffect(()=> {
        console.log(isModal)
    }, [isModal])
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
    
let entries;

    return <>
        {x!==0 && <Modal x={x} y={y} onSubmitClick = {onScheduleChanges} />}
        <div onClick={(e)=>onCoordinateChange(e.pageX, e.clientY)}>
            {loading && <h3>Loading...</h3>}
            {isChanged && isLogged && <button onClick={onSavingClick} className='submitButton'>Сохранить изменения</button>}
            {!loading && timetable.length && 
                <table className='schedule-table'>
                    <thead className='table-title'>
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
                        {timetable.map((item: types.Classroom, index: number)=> {
                            return <>
                                <tr>
                                    <td colSpan={7} key={index} className='header'>Classroom №{index+1}</td>
                                </tr>
                                {(Object.entries(item) as types.ArrayInClassroom[]).map((elem) => {
                                    return (
                                        <tr>
                                            <td className='side-header'>{elem[0]}</td>
                                            {elem[1].map((lesson: types.Lesson, ind: number)=>{
                                                if (Object.keys(lesson).length)
                                                return <td 
                                                className={handleClassName(lesson.teacher, lesson.groupID)} 
                                                key={ind} 
                                                onClick={()=>onCellClick([index, elem[0], ind, lesson.teacher, lesson.groupID])}>
                                                    <span className='bold-blue'>Учитель: </span> {lesson.teacher}<br/>
                                                    <span className='bold-green'>Уровень: </span>{lesson.level}<br/>
                                                    <span className='bold-red'>Ученики: </span>{lesson.numberOfStudents}<br/>
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