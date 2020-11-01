import React from 'react';


const initialState = {
    communications: {
        title: "This is the communication",
        msg: "WebDev Rocks"
    },
    count: 123
}

const fsm = (state = initialState, action) => {
    switch (action.type) {
        case "UP":
            return ({
                ...state,
                count: state.count+1
            })
            break;
        case "DOWN":
            return ({
                ...state,
                count: state.count-1
            })
            break;
        default:
            return state
    }

    return state
}

export default fsm