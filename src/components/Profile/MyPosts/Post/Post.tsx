import React from 'react';
import style from './Post.module.css';


type PostType = {
    message: string
    like: number
}



export const Post = (props: PostType) => {
    return (
        <div>
            <div>
                <div>
                    <img
                        src='https://n1s2.starhit.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/445x460_0_6a5d57baf3fab914fdfcc2cc563ed893@480x496_0xac120003_4430520541578509619.jpg'
                        height={50}/>
                    {props.message}
                    <div>
                        <span>like {props.like}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
