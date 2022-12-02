import React, {ChangeEvent, useState} from 'react';
import {useLocation} from "react-router-dom";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatus = (props: PropsType) => {
    const [editMode, setEditMode] = useState(true)
    const [status, setStatus] = useState('')

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const activateMode = () => {
        setEditMode(false)
        setStatus(props.status)
    }

    const deActivateEditMode = () => {
        props.updateStatus(status)
        setEditMode(true)
    }
    return (
        <div>{ useLocation().pathname === '/profile' ?  editMode
            ? <div>
                <span onDoubleClick={activateMode}>{props.status ? props.status : '----'}</span>
            </div>
            : <div>
                <input onChange={onChangeStatus} autoFocus onBlur={deActivateEditMode} value={status}/>
            </div>
        : <div>
                <span>{props.status ? props.status : '----'}</span>
            </div>}
        </div>
    );
};