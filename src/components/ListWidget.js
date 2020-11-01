import React from "react";
import {connect} from "react-redux";
import WidgetService, {findWidgetById} from "../services/WidgetService";
import TopicService, {findTopicById} from "../services/TopicService";
import {widgetReducer} from "../reducers/widgetReducer";
import lessonService from "../services/LessonService";

class ListWidget extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    widget: {...this.props.widget},
                    randomText: null
                }
                this.changeFontSize = this.changeFontSize.bind(this)
            }

            changeFontSize() {
                console.log("size", this.state.widget.value)
                 let fontsize = parseInt(this.props.widget.value)*5 + 5
                 return <span style={{fontSize: fontsize + "px"}}>{this.props.widget.text}</span>
            }



            render() {
                return (
                    <div className="container">
                        <div className="col-md-12 text-right">

                            <button className="btn btn-info mr-3" onClick={() => this.props.deleteWidget(this.state.widget)
                                }>
                                Delete
                            </button>

                            {this.props.editing &&
                            <span>
                                <button className="btn btn-info mr-3" onClick={() =>
                                {this.props.changeEditing(); this.props.updateWidget(this.props.widget)}}>
                                    Save
                                </button>


                                {/*<button onClick={() => this.props.changePreview()}>Preview</button>*/}
                                <label className="switch"/>
                                    Preview
                                <input type="checkbox" onClick={() => this.props.changePreview()}/>

                            <span className="slider round"></span>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="col-md-12 mt-2 mb-2">
                                        <div className="row heading-widget">
                                            <div>
                                                <span className="widget-name">
                                                    List Widget
                                                </span>
                                            </div>

                                            <div className="col-md-4 col-5 text-md-right">
                                                <button className="btn btn-warning">
                                                    <i className="fa fa-arrow-up"></i>
                                                </button>

                                                <button className="btn btn-warning">
                                                    <i className="fa fa-arrow-down"></i>
                                                </button>
                                            </div>


                                            <div className="col-md-4 col-5">
                                                <select className="form-control" onChange = {(e) =>
                                                {
                                                    const newType = e.target.value;
                                                    this.setState(state => {
                                                        let newWidget = {
                                                            ...state.widget,
                                                            type: newType
                                                        }
                                                        this.props.updateWidget(newWidget)
                                                        return {
                                                            widget: newWidget
                                                        }
                                                    });
                                                    }}
                                                        defaultValue={this.props.widget.type}>
                                                    <option value="HEADING">HEADING</option>
                                                    <option value="LISTING">LISTING</option>
                                                </select>
                                            </div>

                                            {!this.props.preview &&
                                                <div>
                                            <input className="form-control wbdv-line" placeholder="Heading text"
                                                   defaultValue={this.props.widget.text}
                                                   onChange={(event) =>
                                                   {
                                                       this.props.updateWidgetOnlyClient({
                                                           ...this.props.widget,
                                                           text: event.target.value
                                                       })
                                                   }}/>

                                                <select className="form-control wbdv-line1" onChange = {(e) =>
                                                {
                                                    const newSize = e.target.value;
                                                    this.setState(state => {
                                                        let newWidget = {
                                                            ...state.widget,
                                                            value: newSize,
                                                        }
                                                        this.props.updateWidgetOnlyClient(newWidget)
                                                        return {
                                                            widget: newWidget
                                                        }
                                                    });
                                                }} defaultValue={this.props.widget.value}>
                                                    <option value="1">Heading 1</option>
                                                    <option value="2">Heading 2</option>
                                                    <option value="3">Heading 3</option>
                                                    <option value="4">Heading 4</option>

                                                </select>

                                                <input className="form-control wbdv-line" placeholder="Widget name"/>

                                                <div className="wbdv-preview">
                                                Preview
                                                </div>

                                                <div className="col-md-10 col-2"></div>

                                                <div className="wbdv-preview1">
                                                {this.changeFontSize()}
                                                </div></div>
                                            }

                                            {this.props.preview &&
                                            <div className="wbdv-preview1">
                                                {this.changeFontSize()}
                                            </div>
                                            }



                                        </div>

                                    </div>
                                </div>
                            </div>
                            </span>}

                            {!this.props.editing &&
                            <span>
                            <button className="btn btn-info mr-3" onClick={() =>
                                this.props.changeEditing()}>
                                Edit
                            </button>

                            <span className="slider round"></span>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="col-md-12 mt-2 mb-2">
                                            <div className="row heading-widget">
                                                <div>
                                                    <span className="widget-name">
                                                        List Widget
                                                    </span>
                                                </div>

                                                <div className="col-md-4 col-5 text-md-right">
                                                    <button className="btn btn-warning">
                                                        <i className="fa fa-arrow-up"></i>
                                                    </button>

                                                    <button className="btn btn-warning">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </button>
                                                </div>


                                                {this.props.widget.text}



                                    </div>
                                </div>
                            </div>
                        </div>
                        </span>
                            }

                        </div>
                    </div>

                )}
}



const stateToPropertyMapper = (state) => ({
    widgets: state.widgetReducer.widgets,
    editing: state.widgetReducer.editing,
    preview: state.widgetReducer.preview

    // widget: ownprops.widget
    //widget: state.widget
})

const propertyToDispatchMapper = (dispatch) => ({
    deleteWidget: (widget) =>
        WidgetService.deleteWidget(widget)
            .then(status=>dispatch({
                type:"DELETE_WIDGET",
                widget:widget
            })),

    changePreview: () =>
        dispatch({
            type: "ChangePreview",
        }),

    changeEditing: () =>
        dispatch({
            type:"ChangeEditing",
        }),

    updateWidgetOnlyClient: (widget) =>
        dispatch({
            type:"UPDATE_WIDGET",
            widget: widget
        }),

    findWidgetById: (widgetId) => {
        return WidgetService.findWidgetById(widgetId)
    },

    updateWidget: (newWidget) =>
        WidgetService.updateWidget(newWidget)
            .then(actualWidget => dispatch({
                type: "UPDATE_WIDGET",
                widget: actualWidget
            })),



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
(ListWidget)
