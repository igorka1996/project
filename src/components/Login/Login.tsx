import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../commons/FormsControll/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginIn} from "../../redux/Auth-reducer";
import {Navigate} from "react-router-dom";
import {ReducersType} from "../../redux/redux-store";

 const Login = (props: any) => {
    const onSubmit = (formData: any) => {
        props.loginIn(formData.Login, formData.Password, formData.RememberMe)
    }

    if(props.isAuth){
        return <Navigate to="/profile"/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};



type FormDataType = {
    Login: string
    Password: string
    RememberMe: boolean
}

let max = maxLengthCreator(30)
 const LoginForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field validate={[required, max]} component={Input} name='Login' placeholder='Login'/></div>
            <div><Field validate={[required, max]} component={Input} name='Password' placeholder='Password'/></div>
            <div><Field component={'input'} name='RememberMe' type='checkbox'/></div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)

const mapStateToProps = (state: ReducersType) => ({isAuth: state.AuthReducer.isAuth})




export default connect(mapStateToProps, {loginIn})(Login)