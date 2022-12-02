import React from 'react';
import s from './FormControls.module.css'

export const TextArea = ({input, meta, ...props}: any) => {
    return (
        <div >
            <div >
        <textarea className={s.formControl + ' ' + (meta.touched && meta.error ? s.error : '')} {...input} {...props} />
            </div>
            {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
    );
};

export const Input = ({input, meta, ...props}: any) => {
    return (
        <div >
            <div >
                <input className={s.formControl + ' ' + (meta.touched && meta.error ? s.error : '')} {...input} {...props} />
            </div>
            {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
    );
};
