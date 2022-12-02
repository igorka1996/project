import React, {useState} from 'react';
import s from "./Users.module.css";
import {UsersType} from "../../redux/Users-reducer";
import {NavLink} from "react-router-dom";

type PropsTYpe = {
    onPageChanged: (e: number) => void
    totalUsersCount: number
    pageSize: number
    usersPage: UsersType[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    ToggleIsFollowing: (isFollowing: boolean, userId: number) => void
    ToggleIsFollowingState: number[]
    portionSize: number
}

export const Users = (props: PropsTYpe) => {

    let pagesCount = Math.ceil((props.totalUsersCount / props.pageSize) / 100)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / props.portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    const rightPortionPageNumber = portionNumber * props.portionSize


    return (
        <div>
            <div>
                {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}
                {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return <span key={p} onClick={() => props.onPageChanged(p)}>{p}</span>
                    })}
                {portionCount > portionNumber &&
                    <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
            </div>
            {props.usersPage.map((e) => <div key={e.id}>
                <span>
                <div>
                    <NavLink to={'/profile/' + e.id}>
                    <img className={s.photo}
                         src={e.photos.small != null ? e.photos.small : 'https://avatarko.ru/img/kartinka/1/cherep_s_kostochkami.jpg'}
                         alt="Номер"/>
                    </NavLink>
                </div>
                <div>{e.followed
                    ? <button disabled={props.ToggleIsFollowingState.some(id => id === e.id)}
                              onClick={() => props.unFollow(e.id)}>UNFOLLOW</button>
                    : <button disabled={props.ToggleIsFollowingState.some(id => id === e.id)}
                              onClick={() => props.follow(e.id)}>FOLLOW</button>}</div>
                </span>
                <span>
                    <span>
                        <div>{e.name}</div>
                        <div>{e.status}</div>
                    </span>
                    <span>
                        <div>{e.uniqueUrlName}</div>
                    </span>
                </span>
            </div>)}
        </div>
    );
};

