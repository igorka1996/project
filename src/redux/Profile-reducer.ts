import {PostType} from "./store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../API/API";


type ContactsType =
    {
        facebook: string | null
        website: string | null
        vk: string | null
        twitter: string | null
        instagram: string | null
        youtube: string | null
        github: string | null
    }


type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileInfoType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}


export type ProfilePagetype = {
    newText: string
    posts: Array<PostType>
    profile: ProfileInfoType | null
    status: string
}

const initialState: ProfilePagetype = {
    newText: '',
    posts: [
        {id: 1, message: 'Здарова молодой', like: 11},
        {id: 2, message: 'ВСем Удачи', like: 122}
    ],
    profile: null,
    status: ''
}


type addActionCreatorType = ReturnType<typeof addActionCreator>
type setUsersProfileType = ReturnType<typeof setUsersProfile>
type setUserStatusType = ReturnType<typeof setUserStatusAC>


type ActionType = addActionCreatorType | setUsersProfileType | setUserStatusType


export const profileReducer = (state: ProfilePagetype = initialState, action: ActionType): ProfilePagetype => {
    switch (action.type) {
        case "ADD-POST": {
            return {...state, posts: [...state.posts, {id: 5, message: action.newText, like: 0}]}
        }
        case "SET-USER-PROFILE": {
            return {...state, profile: action.profile}
        }
        case "SET-USER-STATUS": {
            return {...state, status: action.status}
        }
        default: {
            return state
        }
    }

}

export const addActionCreator = (newText: string) => {
    return {type: "ADD-POST", newText} as const
}
export const setUsersProfile = (profile: ProfileInfoType) => {
    return {type: "SET-USER-PROFILE", profile} as const
}
export const setUserStatusAC = (status: string) => {
    return {type: "SET-USER-STATUS", status} as const
}


export const getStatus = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getStatus(userId).then(response => dispatch(setUserStatusAC(response.data)))
    }
}
export const updateStatusThunk = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.updateStatus(status).then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserStatusAC(status))
                }
            }
        )
    }
}


export const getUserProfileThunkAC = (userId: string) => {
    return (dispatch: Dispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUsersProfile(response.data))
            })
    }
}