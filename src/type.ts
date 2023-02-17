export interface User {
    login: string,
    password: string,
    name: string,
    lastName: string,
    id: number,
    male: string
}
 export interface PotUser {
    login: string,
    password: string
}
export interface MainState {
    logging: LogState,
    schedule: ScheduleState,
    news: NewsState
}

export type LogState = {
    users: User[],
    activeUser: User | undefined,
    isLogged: boolean
} 

export type ScheduleState = {
    timetable: Classroom[],
    loading: boolean,
    isVisible: boolean
    changingCell: (number|Keys)[]
}

export type NewsState = {
    news: News[],
    loading: boolean,
    isVisible: boolean
}
export type MainAction = {
    type: string;
    payload?: any 
} 

export interface Lesson {
    teacher: string
    level: string,
    numberOfStudents: number,
    groupID: number
}

export interface Classroom {
    '09-00': (Lesson|{})[],
    '10-00': (Lesson|{})[],
    '11-00': (Lesson|{})[],
    "12-00": (Lesson|{})[],
    "13-00": (Lesson|{})[],
    "14-00": (Lesson|{})[],
    "15-00": (Lesson|{})[],
    "16-00": (Lesson|{})[],
    "17-00": (Lesson|{})[],
    "18-00": (Lesson|{})[]
}

export type Keys = keyof Classroom;

export interface News {
    date: string,
    photos: string[],
    text: string
}

type thunkAction = (thunk: (dispath: DispatchType) => void | Promise<void>) => void;
type standartAction = (args: MainAction) => MainAction;

export type DispatchType = thunkAction | standartAction;
