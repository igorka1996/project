import {sendMessageBodyActionCreator} from "../../redux/Dialogs-Reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {ReducersType} from "../../redux/redux-store";
import {DialogPagetype} from "../../redux/store";
import {compose, Dispatch} from "redux";
import {AuthRedirectComponent} from "../../hoc/AuthRedirectComponent";
import React from "react";


type MapStateToPropsType = {
    dialogsPage: DialogPagetype
}


type MapDispatchToPropsType = {
    onSendMessageClick: (message: string) => void
}

export type DialogsPageType = MapStateToPropsType & MapDispatchToPropsType;


const mapStateToProps = (state: ReducersType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsReducer
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        onSendMessageClick: (message: string) => {
            dispatch(sendMessageBodyActionCreator(message))
        }
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps), AuthRedirectComponent)(Dialogs)