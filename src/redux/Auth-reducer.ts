import {Dispatch} from "redux";
import {authAPI} from "../API/API";
import {stopSubmit} from "redux-form";

export type AuthType = {
    id: string | undefined
    email: string | undefined
    login: string | undefined
    isAuth: boolean
    initialized: boolean
}


const initialState = {
    id: undefined,
    email: undefined,
    login: undefined,
    isAuth: false,
    initialized: false
}

export type SetUserDataACType = ReturnType<typeof SetUserDataAC> | ReturnType<typeof SetAuthInitializedAC>

type ActionType = SetUserDataACType

export const AuthReducer = (state: AuthType = initialState, action: ActionType): AuthType => {
    switch (action.type) {
        case "SET-USER-DATA": {
            return {...state, ...action.data}
        }
        case "SET-USER-INITIALIZED":{
            return {...state, initialized: action.initialized}
        }
        default: {
            return state
        }
    }
}
export const SetUserDataAC = (id: string | undefined, email: string | undefined, login: string | undefined, isAuth: boolean, initialized: boolean) => {
    return {type: "SET-USER-DATA", data: {id, email, login, isAuth, initialized}} as const
}
export const SetAuthInitializedAC = (initialized: boolean) => {
    return {type: "SET-USER-INITIALIZED", initialized} as const
}


export const authThunkAC = () => {
    return (dispatch: Dispatch) => {
        authAPI.login()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(SetUserDataAC(data.data.id, data.data.email, data.data.login, true, true))
                }
                if(data.resultCode === 1)
                dispatch(SetAuthInitializedAC(true) as any)
            })
    }
}


export const loginIn = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {

        authAPI.log(email, password, rememberMe)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(authThunkAC() as any)
                } else {
                   let message = res.data.messages.length > 0 ? res.data.messages[0] : 'some error'
                    dispatch(stopSubmit('login', {_error: message}))
                }
            })
    }
}


export const logout = () => {
    return (dispatch: Dispatch) => {
        authAPI.logOut()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(SetUserDataAC(undefined, undefined, undefined, false, true) as any)
                }
            })
    }
}