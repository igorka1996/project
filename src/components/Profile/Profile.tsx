import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsConatiner";
import {ProfileInfoType} from "../../redux/Profile-reducer";

type PropsType = {
    profile: ProfileInfoType | null
    status: string
    updateStatus: (status: string) => void
}


export const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo status={props.status} updateStatus={props.updateStatus} profile={props.profile} />
            <MyPostsContainer />
        </div>
    );
};
