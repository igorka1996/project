import {addActionCreator, ProfilePagetype} from "../../../redux/Profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {ReducersType} from "../../../redux/redux-store";
import {Dispatch} from "redux";


type MapStateToPropsType = {
    post: ProfilePagetype
}
type MapDispatchToPropsType = {
    addPost: (newText: string) => void
}

export type MyPostPropsType = MapStateToPropsType & MapDispatchToPropsType


const mapStateToProps = (state: ReducersType): MapStateToPropsType => {
    return {
        post: state.profileReducer
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newText: string) => {
            dispatch(addActionCreator(newText))
        }
    }
}


export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

