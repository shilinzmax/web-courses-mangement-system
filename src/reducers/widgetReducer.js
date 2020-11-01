import React from 'react';

// const swap = (widgets, up, down) => {
//
// }
const initialState = {
    widgets:[],
    editing: true,
    preview: false

}


export const widgetReducer = (state = initialState, action) => {
    switch (action.type) {

        case "ChangeEditing":
        return {
            ...state,
            editing: !state.editing

        }

        case "ChangePreview":
            return {
                ...state,
                preview: !state.preview

            }


        case "FIND_WIDGETS_FOR_TOPIC":
            return {
                ...state,
                widgets: action.widgets,
                topicId: action.topicId
            }

        case "CREATE_WIDGET_FOR_TOPIC":
            return {
                widgets: [
                    ...state.widgets,
                    action.widget
                ],
                topicId: action.topicId
            }

        // case "MOVE_UP":
        // {
        //     let index = state.widgets.indexOf(action.widget) - 1
        //     let reorderedwidgets = swap(state.widgets, index, index+1)
        //     return {
        //         ...state,
        //         widgets: reorderedwidgets,
        //         topicId: action.topicId
        //     }
        // }

        case "FIND_ALL_WIDGETS":
            return {
                ...state,
                widgets: action.widgets
            }


        case "UPDATE_WIDGET":
            let newWidgets = [...state.widgets]
            return {
                ...state,
                widgets: [...newWidgets.map(widget =>
                    widget.id === action.widget.id ? {...action.widget} : {...widget}
                )]
            }

        case "DELETE_WIDGET":
            return {
                ...state,
                widgets: state.widgets.filter(widget => widget.id !== action.widget.id)

            }
        default:
            return state
    }

    return state;
}
