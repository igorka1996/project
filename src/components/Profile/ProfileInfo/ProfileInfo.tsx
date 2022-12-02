import React from 'react';
import style from "./ProfileInfo.module.css";
import {ProfileInfoType} from "../../../redux/Profile-reducer";
import {ProfileStatus} from "./ProfileStatus";

type PropsType = {
    profile: ProfileInfoType | null
    status: string
    updateStatus: (status: string) => void
}
export const ProfileInfo = (props: PropsType) => {

    return (
        <div>
            <img className={style.img} src='https://printwalls.ru/assets/images/products/2187/fotooboi-priroda-lesa-kupit-0027.jpg'/>
            <div>
                <img src={props.profile?.photos.large ? props.profile?.photos.large : 'https://avatarko.ru/img/kartinka/1/cherep_s_kostochkami.jpg'}/>
                <div>{props.profile?.fullName}</div>
                <div>{props.profile?.aboutMe}</div>
                <div>{props.profile?.lookingForAJobDescription}</div>
                <ProfileStatus updateStatus={props.updateStatus} status={props.status}/>
            </div>
        </div>
    );
};

