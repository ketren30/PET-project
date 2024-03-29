import { useDispatch, useSelector } from "react-redux";
import './modal.css';
import { EditSchedule, HideModal, DeleteLesson } from "../../../store/actionCreators";
import { useEffect, useState } from "react";
import * as types from '../../../type';

type Props = {
    x: number,
    y: number, 
    onSubmitClick: () => void
}

export const Modal: React.FC<Props> = ({x, y, onSubmitClick}) => {
    const dispatch: types.DispatchType = useDispatch();
    const isVisible = useSelector((state: types.MainState) => state.schedule.isModal);
    const timetable = useSelector((state: types.MainState) => state.schedule.timetable);
    const changingCell = useSelector((state: types.MainState) => state.schedule.changingCell);
    const width = useSelector((state: types.MainState) => state.version.width);
    const currentCellArray = Object.entries(timetable[changingCell[0]][changingCell[1]][changingCell[2]]);
    const [teacher, setTeacher] = useState<string>('');
    const [level, setLevel] = useState<string>('');
    const [numberOfStudents, setNumberOfStudents] = useState<number>(1);
    const [groupID, setGroupID] = useState<string>('');
    const [isgroupIDValid, setIsgroupIDValid] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    let lesson = {
        teacher: '',
        level: '',
        numberOfStudents: 0,
        groupID: 0
    };
    useEffect(()=> {
        if (currentCellArray.length) {
            setGroupID(currentCellArray[3][1]);
            setLevel(currentCellArray[1][1]);
            setTeacher(currentCellArray[0][1]);
            setNumberOfStudents(currentCellArray[2][1]);
        }
    }, [isVisible])
    

    const onTeacherChange = (e: React.FormEvent<HTMLSelectElement>) => {
        setTeacher(e.currentTarget.value);
    }
    const onLevelChange = (e: React.FormEvent<HTMLInputElement>) => {
        setLevel(e.currentTarget.value);
    }
    const onNumberChange = (e: React.FormEvent<HTMLSelectElement>) => {
        setNumberOfStudents(+e.currentTarget.value);
    }
    const onIDChange = (e: React.FormEvent<HTMLInputElement>) => {
        setGroupID(e.currentTarget.value);
    }

    useEffect(() => {
        if (+groupID>0 && typeof +groupID==='number' && level) setIsgroupIDValid(true)
        else setIsgroupIDValid(false);
    }, [level, groupID]);
    

    const onButtonClick = () => {
            lesson = {
                teacher: teacher,
                level: level,
                numberOfStudents: numberOfStudents,
                groupID: +groupID
            }
            dispatch(EditSchedule(lesson));
            dispatch(HideModal());
            setLevel('');
            setGroupID('');
            onSubmitClick();
    }
    const onDeleteClick = () => {
        dispatch(DeleteLesson());
        dispatch(HideModal());
        onSubmitClick();
    }
    const getModalStyle = () => {
        if (width>700) return {top:y, left:x}
        if (width<500) return {width: `${document.documentElement.scrollWidth - 44}px`}
    }
    
    if (isVisible) return (
        <div className="overlay" onClick={()=>dispatch(HideModal())} >
            <div className="modal" style={getModalStyle()} onClick={(e) => e.stopPropagation()}>
                <div className="flex">
                    <h4>Изменить расписание:</h4>
                </div>    
                <div className="close" onClick={()=>dispatch(HideModal())}>&#10006;</div>

                <div className="flex-space">    
                    <span>Учитель:</span>
                    <select className='select-css' onChange={onTeacherChange} value={teacher}>
                        <option value="Лилия Владимировна">Лилия Владимировна</option>
                        <option value="Аркадий Алексеевич">Аркадий Алексеевич</option>
                        <option value="Екатерина Юрьевна">Екатерина Юрьевна</option>
                        <option value="Алексей Константинович">Алексей Константинович</option>
                        <option value="Евгения Александровна">Евгения Александровна</option>
                    </select>
                </div>
                
                {isDirty && (typeof +groupID!=='number' || +groupID<=0)&& <h6>Код группы должен быть числом больше 0!</h6>}
                <div className="flex-space">   
                    <span>Код группы:</span>
                    <input 
                        type="number"
                        className="modalInput" 
                        onChange={onIDChange} 
                        onBlurCapture={()=>setIsDirty(true)} 
                        value={groupID}
                        onFocus={()=>setGroupID('')}
                    />
                </div>    


                <div className="flex-space"> 
                    <span>Уровень группы:</span>
                    <input 
                        className="modalInput" 
                        onChange={onLevelChange}
                        value={level}
                        onFocus={()=>setLevel('')}
                    />
                </div>

                <div className="flex-space">
                    <span>Количество учеников:</span>
                    <select className='select-css' onChange={onNumberChange} value={numberOfStudents}>
                        <option value='1'>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>

                <div className="flex-space-between">
                    <button 
                        className="submitButton"
                        disabled={(!isgroupIDValid || level==='')} 
                        onClick={onButtonClick}
                    >Сохранить</button>
                    <button onClick={onDeleteClick} className="delete-button">Удалить урок</button>
                </div>    
            </div>
        </div>   
    ) 
    else return null
}