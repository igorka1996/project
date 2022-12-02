import {createSelector} from "reselect";

export const getUsers = (state: any) => {
    return state.UsersReducer.users
}

export const getUsersSuperSelector = createSelector(getUsers, (users) => {

})

export const getPageSize = (state: any) => {
    return state.UsersReducer.pageSize
}


export const getPortionSize = (state: any) => {
    return state.UsersReducer.portionSize
}


export const getTotalUsersCount = (state: any) => {
    return state.UsersReducer.totalUsersCount
}

export const getCurrentPage= (state: any) => {
    return state.UsersReducer.currentPage
}

export const getIsFetching= (state: any) => {
    return state.UsersReducer.isFetching
}

export const getFollowingInProgress= (state: any) => {
    return state.UsersReducer.followingInProgress
}