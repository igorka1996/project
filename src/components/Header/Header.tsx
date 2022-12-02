import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";


type PropsType = {
    isAuth: boolean
    login: string | undefined
    logout: () => void
}

export const Header = (props: PropsType) => {
    return (
        <header className={style.header}>
            <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/2560px-Playstation_logo_colour.svg.png'/>
            <div className={style.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}

            </div>
        </header>
    );
};
