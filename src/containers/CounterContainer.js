import React from "react";
import Counter from "../components/Counter";
import {connect} from "react-redux";

const stateToPropertyMapper = (state) => ({
    count: state.fsm.count
})

const propertyToDispatchMapper = (dispatch) => ({
    up: () => dispatch({type: "UP"}),
    down: () => dispatch({type: "DOWN"})
})


export default connect
(stateToPropertyMapper,
    propertyToDispatchMapper)
(Counter)