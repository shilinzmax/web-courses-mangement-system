import React from "react";
import '../style/course-editor.templete.client.css'
import '../style/style.css'
import {findCourseById} from "../services/CourseService";

class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course:this.props.course,
            key:0
        }

        // this.state.module1 = this.props.course.modules[0]
    }




    render() {
        if (this.state.course === null) {
            return null;
        }

        return(
            <div className="col-md-3 wbdv-module-list text-center">
                <ul className="nav flex-column nav-pills module-list-pill">

                        {this.state.course.modules.map(module => {
                            this.state.key++;
                            return<div>
                                <a className=" nav-link wbdv-module-item-title mr-2 mb-4" href="#">
                                <div key={this.state.key}>
                                {module}
                                    <i className="fa fa-times float-right mt-1 ml-1 wbdv-module-item-delete-btn"></i>
                                </div>
                                </a>
                            </div>
                        })}

                <button className="btn btn-success wbdv-lesson-add-btn wbdv-module-item-add-btn" type="submit">
                    <i className="fa fa-plus"></i>
                </button>
                </ul>
            </div>
        )
    }
}

export default ModuleList