import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";





export const Navbar = () => {

    const clasNam = (el: boolean) => el ? s.active : ""
    return (
            <nav className={s.nav}>
                <div className={s.item}><NavLink className={({isActive}) => clasNam(isActive)} to="/profile">Profile</NavLink></div>
                <div className={s.item}><NavLink className={({isActive}) => clasNam(isActive)} to="/dialogs">Message</NavLink></div>
                <div className={s.item}><NavLink className={({isActive}) => clasNam(isActive)} to="/news">News</NavLink></div>
                <div className={s.item}><NavLink className={({isActive}) => clasNam(isActive)} to="/music">Music</NavLink></div>
                <div className={s.item}><NavLink className={({isActive}) => clasNam(isActive)} to="/settings">Settings</NavLink></div>
                <div className={s.item}><NavLink className={({isActive}) => clasNam(isActive)} to="/users">Users</NavLink></div>
            </nav>
    );
};

