import { checkUser, logOut } from './actionTypes';
import * as types from '../type';

const userFromStorage = localStorage.getItem('userID');
const teachersLogins = [
    {
        "login": "arkadii",
        "password": "9181632716",
        "name": "Аркадий",
        "lastName": "Алексеевич",
        "id": 1,
        "male": 'male'
    },
    {
        "login": "ekaterina",
        "password": "9002435991",
        "name": "Екатерина",
        "lastName": "Юрьевна",
        "id": 2,
        "male": 'female'
    },
    {
        "login": "aleksey",
        "password": "9817346457",
        "name": "Алексей",
        "lastName": "Константинович",
        "id": 3,
        "male": 'male'
    },
    {
        "login": "evgeniya",
        "password": "9530806270",
        "name": "Евгения",
        "lastName": "Александровна",
        "id": 4,
        "male": 'female'
    },
    {
        "login": "liliya",
        "password": "9182322272",
        "name": "Лилия",
        "lastName": "Владимировна",
        "id": 5,
        "male": 'female'
    },
    {
        
        "login": "sample",
        "password": "sample",
        "name": "Неизвестный",
        "lastName": "",
        "id": 6,
        "male": 'male'
    }
];
let activeUser;
let isSmbdLogged;
if (userFromStorage!==null) {
    activeUser=teachersLogins.find((elem) => elem.id===+userFromStorage);
    isSmbdLogged=true;
} else {
    activeUser=undefined;
    isSmbdLogged=false;
}

const initialState: types.LogState = {
    users: teachersLogins,
    activeUser: activeUser,
    isSmbdLogged: isSmbdLogged
}

const logReducer = (
    state: types.LogState = initialState,
    action: types.MainAction
): types.LogState => {
    switch (action.type) {
        case checkUser:
            state.users.map((item: types.User)  => {
                if (item.login===action.payload.login && item.password===action.payload.password) {
                    state.activeUser=item;
                    state.isSmbdLogged=true;
                    localStorage.setItem('userID', item.id.toString());
                }
                return item
            });
            return state
        case logOut: 
            localStorage.removeItem('userID');
            return {...state, activeUser: undefined, isSmbdLogged: false}
    }
    return state
}

export default logReducer