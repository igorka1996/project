import React from 'react';
import style from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {MyPostPropsType} from "./MyPostsConatiner";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../commons/FormsControll/FormControls";


export const MyPosts = (props: MyPostPropsType) => {
    let postsElement = props.post.posts.map(el => <Post key={el.id} message={el.message} like={el.like}/>)


    const addPost = (values: any) => {
        props.addPost(values.ProfileAddNewPostForm)
    }

    return (
        <div>
            <h3>Мои посты</h3>
            <AddNewPostFomRedux onSubmit={addPost}/>
            {postsElement}
        </div>
    );
};

let max = maxLengthCreator(10)
const AddNewPostForm = (props: InjectedFormProps) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required, max]} placeholder={'Post message'} component={TextArea} name={'ProfileAddNewPostForm'} />
            </div>
            <div>
                <button>Добавить пост</button>
            </div>
        </form>
    )
}

const AddNewPostFomRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)