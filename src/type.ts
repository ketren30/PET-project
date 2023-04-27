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
    news: NewsState,
    version: VersionState
}

export type LogState = {
    users: User[],
    activeUser: User | undefined,
    isLogged: boolean
} 
export type changingCell = [number, Keys, number, string?, number?];

export type ScheduleState = {
    timetable: Classroom[],
    loading: boolean,
    isModal: boolean
    changingCell: changingCell|never[]
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
    '9 a.m.': (Lesson|{})[],
    '10 a.m.': (Lesson|{})[],
    '11 a.m.': (Lesson|{})[],
    "12 p.m.": (Lesson|{})[],
    "1 p.m.": (Lesson|{})[],
    "2 p.m.": (Lesson|{})[],
    "3 p.m.": (Lesson|{})[],
    "4 p.m.": (Lesson|{})[],
    "5 p.m.": (Lesson|{})[],
    "6 p.m.": (Lesson|{})[]
}
export type ArrayInClassroom = [Keys, (Lesson)[]];

export type Keys = keyof Classroom;

export interface News {
    date: string,
    photos: string[],
    text: string
}
export type VersionState = {
    isMobile: boolean,
    width: number
}
type thunkAction = (thunk: (dispath: DispatchType) => void | Promise<void>) => void;
type standartAction = (args: MainAction) => MainAction;

export type DispatchType = thunkAction | standartAction;
