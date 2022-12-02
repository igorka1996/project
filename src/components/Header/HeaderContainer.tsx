import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AuthType, logout} from "../../redux/Auth-reducer";
import {ReducersType} from "../../redux/redux-store";


type PropsType = {
    auth: AuthType
    logout: () => void
}
const HeaderContainer = (props: PropsType) => {

    return (
        <Header logout={props.logout} isAuth={props.auth.isAuth} login={props.auth.login}/>
    );
};

type mapStateToPropsType = {
    auth: AuthType
}

const mapStateToProps = (state: ReducersType): mapStateToPropsType => {
    return {
        auth: state.AuthReducer
    }

}


export default connect(mapStateToProps, {logout})(HeaderContainer)