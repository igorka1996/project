import React, {useEffect} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {ReducersType} from "./redux/redux-store";
import {authThunkAC} from "./redux/Auth-reducer";


const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));


type PropsType = {
    authThunkAC: any
    initialized: boolean
}

function App(props: PropsType) {
    useEffect(() => {
        props.authThunkAC()
    }, [])
    return (
        !props.initialized
            ? <img src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"/>
            : <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                        <Route path="/profile" element={<ProfileContainer/>}/>
                        <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/users" element={
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <UsersContainer/>
                            </React.Suspense>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </div>
    )
}


const MapStateToProps = (state: ReducersType) => ({
    initialized: state.AuthReducer.initialized
})

export default compose<React.ComponentType>(connect(MapStateToProps, {authThunkAC}))(App)
