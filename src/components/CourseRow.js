import React from "react";
import {updateCourse} from "../services/CourseService";
import 'font-awesome/css/font-awesome.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
class CourseRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: props.course,
            courseBeingEdited: false,
            currID: props.course._id
        }
    }


    render() {
        return (

            <tr className="row course">
                <td className="col-md-1 col-sm-11 col-11">
                             {
                                this.state.courseBeingEdited &&
                                <input
                                    onChange={(e) => this.setState({
                                        course: {title: e.target.value}}
                                    )}

                                />
                             }

                            {
                                !this.state.courseBeingEdited &&
                                <Link to={`/course/edit/${this.state.course._id}`}
                                onClick={() => this.props.selectCourse(this.props.course)}>
                                <h3>{this.state.course.title}</h3>
                                </Link>
                            }
                </td>

                <td className="col-md-2 d-sm-none d-none d-md-block">
                    {this.props.course.owner}
                </td>
                <td className="col-md-4 d-sm-none d-none d-md-block">
                    {this.props.course.modified}
                </td>
                <td className="col-md-1 d-sm-none d-none d-md-block"></td>
                <td className="col-md-1 col-sm-1 col-1">

                    <button
                        onClick={() =>
                        {
                            this.props.deleteCourse(this.state.course)
                        }}>
                        <i className="fa fa-trash-o"></i>
                    </button>
               </td>
                <td className="col-md-1 col-sm-1 col-1">
                    <button
                        onClick={() => {
                            this.setState({
                                courseBeingEdited: true
                            })
                        }}>
                        <i className="fa fa-pencil"></i>
                    </button>
                </td>

                <td className="col-md-1 col-sm-1 col-1">

                    <button
                        onClick={() => {
                            this.setState({
                                courseBeingEdited: false
                            })
                            {this.props.updateCourses()}
                            updateCourse(this.state.currID, this.state.course)
                        }}
                        ><i className="fa fa-check"></i>
                    </button>
                </td>


            </tr>
        )
     }
 }
 export default CourseRow

