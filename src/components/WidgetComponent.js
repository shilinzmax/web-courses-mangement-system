import React from "react";
import {connect} from "react-redux";
import WidgetService from "../services/WidgetService";
import HeadingWidget from "./HeadingWidget";
import ListWidget from "./ListWidget";

const WidgetList = ({
                        widgets=[],
                        deleteWidget,
                        createWidgetForTopic,
                        updateWidget,
                        editWidget,
                        topicId,
                        okWidget}) =>
    <div>

        <ul>
            {
                widgets.map(widget =>
                        <div key={widget.id}>
                            {widget.type === "HEADING" &&
                                <HeadingWidget widget={widget}/>
                            }
                            {widget.type === "LISTING" &&
                                <ListWidget widget={widget}/>
                            }
                            </div>
                )
            }
        </ul>
        <div className="col-md-1 col-2">
            <button className="btn btn-danger" onClick={() => createWidgetForTopic(topicId)}>
                <i className="fa fa-plus"></i>
            </button>
        </div>
        {/*<button onClick={() => createWidgetForTopic(topicId)}>Create</button>*/}
    </div>

// export default WidgetList

const stateToPropertyMapper = (state) => ({

    widgets:state.widgetReducer.widgets,
    topicId: state.widgetReducer.topicId
})

const propertyToDispatchMapper = (dispatch) => ({


    deleteWidget: (widget) =>
        WidgetService.deleteWidget(widget)
            .then(status=>dispatch({
                type:"DELETE_WIDGET",
            })),


    createWidgetForTopic: (topicId) =>{
        console.log("createWidgetForTopic",topicId)

        WidgetService.createWidgetForTopic(topicId, {
            title: "New Widget",
            topicId: topicId,
            // id: (new Date()).toString()
        })
            .then(actualWidget => dispatch({
                type: "CREATE_WIDGET_FOR_TOPIC",
                widget: actualWidget,
                topicId: topicId
            }))

    },

    findAllWidgets: () =>
        WidgetService.findAllWidgets()
            .then(actualWidgets => dispatch({
                type: "FIND_ALL_WIDGETS",
                widgets: actualWidgets
            }))


    // deleteWidget: (widget) => deleteWidget(dispatch, widget),
    //
    // createWidget: () => createWidget(dispatch),
    // updateWidget: (widget) => updateWidget(dispatch, widget),
    // editWidget: (widget) => editWidget(dispatch, widget),
    // okWidget: (widget) => okWidget(dispatch, widget)
})

export default connect
( stateToPropertyMapper,
    propertyToDispatchMapper)
(WidgetList)