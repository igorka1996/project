import {addActionCreator} from "./Profile-reducer";
import {dialogsReducer, sendMessageBodyActionCreator} from "./Dialogs-Reducer";

type MessageType = {
    id: number
    message: string
}
export type ActionType = {
    type: string
    [key: string]: any
}
type DialogsType = {
    id: number
    name: string
}
export type PostType = {
    id: number
    message: string
    like: number
}
export type ProfilePagetype = {
    newText: string
    posts: Array<PostType>
}
export type DialogPagetype = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
}
export type RootStateType = {
    profilePage: ProfilePagetype
    dialogsPage: DialogPagetype
}
export type StoreType = {
    _state: RootStateType,
    _onChanges: () => void,
    subscribe: (callback: () => void) => void,
    getState: () => RootStateType,
    dispatch: (action: ReturnType<typeof sendMessageBodyActionCreator> | ReturnType<typeof addActionCreator>) => void
}
export type ActionsTYpe = ReturnType<typeof sendMessageBodyActionCreator> | ReturnType<typeof addActionCreator>;

export let store: StoreType = {
    _state: {
        profilePage: {
            newText: '',
            posts: [
                {id: 1, message: 'Здарова молодой', like: 11},
                {id: 2, message: 'ВСем Удачи', like: 122}
            ]
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'igor'},
                {id: 2, name: 'Sasha'},
                {id: 3, name: 'Masha'},
                {id: 4, name: 'Dasha'}
            ],
            messages: [
                {id: 1, message: 'Hi pido'},
                {id: 2, message: 'Hello man'},
                {id: 3, message: 'Hayshki'}
            ]
        }

    },
    _onChanges() {
        console.log('привет')
    },
    subscribe(callback: () => void) {
        this._onChanges = callback;
    },
    getState() {
        return this._state
    },
    dispatch(action) {

        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._onChanges();
    }
}




