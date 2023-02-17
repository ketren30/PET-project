import { useDispatch, useSelector } from "react-redux";
import './modal.css';
import { EditSchedule, ChangeVisibility } from "../../../store/actionCreators";
import { useEffect, useState } from "react";
import * as types from '../../../type'

type Props = {
    x: number,
    y: number
}

export const Modal: React.FC<Props> = ({x, y}) => {
    const dispatch: types.DispatchType = useDispatch();
    const isVisible = useSelector((state: types.MainState) => state.schedule.isVisible);
    const [teacher, setTeacher] = useState<string>('Лилия Владимировна');
    const [level, setLevel] = useState<string>('');
    const [numberOfStudents, setNumberOfStudents] = useState<number>(1);
    const [groupID, setGroupID] = useState<number>(0);
    const [isgroupIDValid, setIsgroupIDValid] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    let lesson = {
        teacher: '',
        level: '',
        numberOfStudents: 0,
        groupID: 0
    };

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
        setGroupID(+e.currentTarget.value);
    }

    useEffect(() => {
        if (groupID>0 && typeof groupID==='number') setIsgroupIDValid(true)
        else setIsgroupIDValid(false);
    }, [level, groupID]);
    

    const onButtonClick = () => {
            lesson = {
                teacher: teacher,
                level: level,
                numberOfStudents: numberOfStudents,
                groupID: groupID
            }
            dispatch(EditSchedule(lesson));
            dispatch(ChangeVisibility());
            setLevel('');
            setGroupID(0);
    }
    
    if (isVisible) return (
        <div className="modal" style={{top:y, left:x}}>
            <h4>Изменить расписание:</h4>
            <div className="close" onClick={()=>dispatch(ChangeVisibility())}>&#10006;</div>

            <span>Выберите учителя:</span>
            <select className='select-css' onChange={onTeacherChange}>
                <option value="Лилия Владимировна">Лилия Владимировна</option>
                <option value="Аркадий Алексеевич">Аркадий Алексеевич</option>
                <option value="Екатерина Юрьевна">Екатерина Юрьевна</option>
                <option value="Алексей Константинович">Алексей Константинович</option>
                <option value="Евгения Александровна">Евгения Александровна</option>
            </select><br/>

            {isDirty && !isgroupIDValid && <h6>Код группы должен быть числом больше 0!</h6>}
            <span>Укажите код группы:</span>
            <input className="modalInput" onChange={onIDChange} onBlurCapture={()=>setIsDirty(true)} /><br/>

            <span>Впишите уровень группы:</span>
            <input className="modalInput" onChange={onLevelChange}/><br/>

            <span>Выберите количество учеников:</span>
            <select className='select-css' onChange={onNumberChange}>
                <option value='1'>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select><br/>

            <button className="submitButton"
            disabled={(!isgroupIDValid || level==='')} 
            onClick={()=>onButtonClick()}>Подтвердить</button>
        </div>
    ); else return null
}