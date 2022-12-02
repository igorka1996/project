import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {profileReducer} from "./Profile-reducer";
import {dialogsReducer} from "./Dialogs-Reducer";
import {UsersReducer} from "./Users-reducer";
import {AuthReducer} from "./Auth-reducer";
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
    profileReducer: profileReducer,
    dialogsReducer: dialogsReducer,
    UsersReducer: UsersReducer,
    AuthReducer: AuthReducer,
    form: formReducer
} as const)

export type ReducersType = ReturnType<typeof reducers>

export const store = legacy_createStore(reducers, compose(applyMiddleware(ReduxThunk)));

