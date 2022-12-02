import {ActionType} from "./store";
import {usersAPI} from "../API/API";
import {Dispatch} from "redux";



const initialState: InitialType = {
    users: [],
    pageSize: 5,
    portionSize: 10,
    totalUsersCount: 0,
    currentPage: 3,
    isFetching: false,
    followingInProgress: []
}

export type UsersType = {
    name: string,
    id: number,
    uniqueUrlName: string | null,
    photos: {
        small: string | null,
        large: string | null
    },
    status: string,
    followed: boolean
}

export type InitialType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    portionSize: number,
    isFetching: boolean
    followingInProgress: number[]
}


export const UsersReducer = (state: InitialType = initialState, action: ActionType): InitialType => {
    switch (action.type) {
        case "FOLLOW": {
            return {...state, users: state.users.map(e => e.id === action.userId ? {...e, followed: true} : e)}
        }
        case "UN-FOLLOW": {
            return {...state, users: state.users.map(e => e.id === action.userId ? {...e, followed: false} : e)}
        }
        case "SET-USER": {
            return {...state, users: [...action.users]}
        }
        case "CURRENT-PAGE": {
            return {...state, currentPage: action.num}
        }
        case "TOTAL-COUNT": {
            return {...state, totalUsersCount: action.total}
        }
        case "TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "TOGGLE-IS-FOLLOWING": {
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] : [...state.followingInProgress.filter(id => id !== action.userId)]
            }
        }
        default: {
            return state
        }
    }

}

export const FollowAC = (userId: number) => {
    return {type: "FOLLOW", userId} as const
}
export const UnFollowAC = (userId: number) => {
    return {type: "UN-FOLLOW", userId} as const
}
export const SetUsersAC = (users: Array<UsersType>) => {
    return {type: "SET-USER", users} as const
}
export const CurrentPageAC = (num: number) => {
    return {type: "CURRENT-PAGE", num} as const
}
export const TotalCountAC = (total: number) => {
    return {type: "TOTAL-COUNT", total} as const
}
export const ToogleIsFetching = (isFetching: boolean) => {
    return {type: "TOGGLE-IS-FETCHING", isFetching} as const
}
export const ToogleIsFollowing = (isFetching: boolean, userId: number,) => {
    return {type: "TOGGLE-IS-FOLLOWING", userId, isFetching} as const
}



export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(ToogleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(ToogleIsFetching(false))
            dispatch(SetUsersAC(data.items))
            dispatch(TotalCountAC(data.totalCount))
        })
    }
}
export const followThunkAC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(ToogleIsFollowing(true, userId))
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(FollowAC(userId))
                }
                dispatch(ToogleIsFollowing(false, userId))
            })
    }
}
export const unfollowThunkAC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(ToogleIsFollowing(true, userId))
        usersAPI.Unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(UnFollowAC(userId))
                }
                dispatch(ToogleIsFollowing(false, userId))
            })
    }
}