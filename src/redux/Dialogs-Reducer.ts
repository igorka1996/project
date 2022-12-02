import {ActionType, DialogPagetype} from "./store";

const initialState: DialogPagetype = {
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


export const dialogsReducer = (state: DialogPagetype = initialState, action: ActionType): DialogPagetype => {
    switch (action.type) {
        case "SEND-MESSAGE-BODY": {
            return {...state, messages: [...state.messages, {id: 4, message: action.message}]}
        }
        default: {
            return state
        }
    }

}



export const sendMessageBodyActionCreator = (message: string) => {
    return {type: "SEND-MESSAGE-BODY", message} as const
}