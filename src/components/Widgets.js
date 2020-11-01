import React from "react";
import '../style/course-editor.templete.client.css'
import '../style/style.css'

class Widgets extends React.Component{
    render() {
        return(
            <div className="container">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="col-md-12 mt-2 mb-2">
                            <div className="row heading-widget">
                                <div>
                                        <span className="widget-name">
                                            Heading Widget
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
                                    <select className="form-control">
                                        <option>Heading</option>
                                    </select>
                                </div>




                                <input className="form-control wbdv-line" placeholder="Heading text"/>

                                    <select className="form-control wbdv-line1">
                                        <option>Heading</option>
                                    </select>

                                    <input className="form-control wbdv-line" placeholder="Widget name"/>

                                        <div className="wbdv-preview">
                                            Preview
                                        </div>

                                        <div className="col-md-10 col-2"></div>

                                        <div className="wbdv-preview1">
                                            Heading Text
                                        </div>

                            </div>
                            <div className="row">
                                <div className="col-md-10 col-2"></div>
                                <div className="col-md-1 col-2">
                                    <button className="btn btn-danger">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}



export default Widgets