import React, {useEffect} from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfileThunkAC, ProfileInfoType, updateStatusThunk} from "../../redux/Profile-reducer";
import {ReducersType} from "../../redux/redux-store";
import {useParams} from "react-router-dom";
import {AuthRedirectComponent} from "../../hoc/AuthRedirectComponent";
import {compose} from "redux";

type PropsType = {
    authorizedId: string
    isAuth: boolean
    status: string
    profile: ProfileInfoType | null
    getUserProfileThunkAC: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}
// "25447"
const ProfileContainer = (props: PropsType) => {
    const url = useParams()
    useEffect(() => {
        let userId = url.userId
        if (!userId) {
            userId = props.authorizedId
        }
        props.getUserProfileThunkAC(userId)
        props.getStatus(userId)
    }, [])






    return (
        <div>
            <Profile updateStatus={props.updateStatus} status={props.status} profile={props.profile}/>
        </div>
    );
};

type MapStateToPropsType = {
    profile: ProfileInfoType | null
    status: string
    authorizedId: string | undefined
    isAuth: boolean
}

let mapStateToProps = (state: ReducersType): MapStateToPropsType => ({
    profile: state.profileReducer.profile,
    status: state.profileReducer.status,
    authorizedId: state.AuthReducer.id,
    isAuth: state.AuthReducer.isAuth
})

export default compose<React.ComponentType>(connect(mapStateToProps, {updateStatus: updateStatusThunk, getUserProfileThunkAC: getUserProfileThunkAC, getStatus: getStatus}), AuthRedirectComponent)(ProfileContainer)