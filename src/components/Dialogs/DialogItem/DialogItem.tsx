import React from 'react';
import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";

type dialogType = {
    name: string
    id: number
}


export const DialogItem = (props: dialogType) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    );
};

