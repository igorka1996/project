import {connect} from "react-redux";
import {ReducersType} from "../../redux/redux-store";
import {
    CurrentPageAC, followThunkAC, getUsersThunkCreator,
    ToogleIsFollowing, unfollowThunkAC,
    UsersType
} from "../../redux/Users-reducer";
import React, {useEffect} from "react";
import {Users} from "./Users";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {compose} from "redux";


const UsersContainer = (props: UsersPropsType) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize);
    }, [])

    const onPageChanged = (e: number) => {
        props.getUsers(e, props.pageSize)
    }

    return (
        <>
            {props.isFetching ? <img src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"/> : null}
            <Users portionSize={props.portionSize} ToggleIsFollowingState={props.ToogleIsFollowingState}
                   ToggleIsFollowing={props.ToggleIsFollowing}
                   unFollow={props.unFollow} follow={props.follow} usersPage={props.usersPage}
                   onPageChanged={onPageChanged} totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}/>
        </>
    )
};

type MapStateToPropsTYpe = {
    usersPage: UsersType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    portionSize: number,
    isFetching: boolean,

    ToogleIsFollowingState: number[]
}

type MapDispatchToProps = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    CurrentPage: (num: number) => void
    ToggleIsFollowing: (isFollowing: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}


export type UsersPropsType = MapStateToPropsTYpe & MapDispatchToProps;

// const mapStateToProps = (state: ReducersType): MapStateToPropsTYpe => {
//     return {
//         usersPage: state.UsersReducer.users,
//         pageSize: state.UsersReducer.pageSize,
//         totalUsersCount: state.UsersReducer.totalUsersCount,
//         currentPage: state.UsersReducer.currentPage,
//         isFetching: state.UsersReducer.isFetching,
//         ToogleIsFollowingState: state.UsersReducer.followingInProgress
//     }
// }


const mapStateToProps = (state: ReducersType): MapStateToPropsTYpe => {
    return {
        usersPage: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        portionSize: getPortionSize(state),
        ToogleIsFollowingState: getFollowingInProgress(state)
    }
}


export default compose<React.ComponentType>(connect(mapStateToProps, {
    follow: followThunkAC,
    unFollow: unfollowThunkAC,
    CurrentPage: CurrentPageAC,
    ToggleIsFollowing: ToogleIsFollowing,
    getUsers: getUsersThunkCreator
}))(UsersContainer)

