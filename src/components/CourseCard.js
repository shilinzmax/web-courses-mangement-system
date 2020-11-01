import React from 'react'
import {updateCourse} from "../services/CourseService";
import {Link} from "react-router-dom";


class CourseCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: props.course,
            courseBeingEdited: false,
            currID: props.course._id
        }
    }

    render() {
        return(
            // <div className="container">
            //     <div className="card-deck">
            //         <div className="row course">
            //             <div className="col-md-1 col-sm-11 col-11">
            //                 {
            //                     this.state.courseBeingEdited &&
            //                     <input
            //                         onChange={(e) => this.setState({
            //                             course: {title: e.target.value}
            //
            //                         })}
            //                     />
            //                 }
            //
            //                 {
            //                     !this.state.courseBeingEdited &&
            //                     // <label>{this.state.course.title}</label>
            //                     <Link to={`/course/edit/${this.state.course._id}`}
            //                           onClick={() => this.props.selectCourse(this.state.course)}>
            //                         {this.state.course.title}
            //                     </Link>
            //                 }
            //             </div>
            //
            //             <div className="col-md-2 d-sm-none d-none d-md-block">
            //                 {this.props.course.owner}
            //             </div>
            //             <div className="col-md-4 d-sm-none d-none d-md-block">
            //                 {this.props.course.modified}
            //             </div>
            //
            //             <div className="col-md-1 col-sm-1 col-1">
            //                 <button
            //                     onClick={() =>
            //                     {
            //                         this.props.deleteCourse(this.state.course)
            //                     }}>
            //                     {/*Delete*/}
            //                     <i className="fa fa-trash-o"></i>
            //                 </button>
            //             </div>
            //             <div className="col-md-1 col-sm-1 col-1">
            //                 <button
            //                     onClick={() => {
            //                         this.setState({
            //                             courseBeingEdited: true
            //                         })
            //                     }}>
            //                     <i className="fa fa-pencil"></i>
            //                 </button>
            //             </div>
            //             <div className="col-md-1 col-sm-1 col-1">
            //                 <button
            //                     onClick={() => {
            //                         this.setState({
            //                             courseBeingEdited: false
            //                         })
            //                         {this.props.updateCourses()}
            //                         updateCourse(this.state.currID, this.state.course)
            //                     }}
            //                 >
            //                     <i className="fa fa-check"></i>
            //                 </button>
            //             </div>
            //
            //         </div>
            //
            //
            //     </div>
            // </div>

            <div className="col mb-4">
                <div className="card">
                    {
                        this.state.courseBeingEdited &&
                        <input
                            onChange={(e) => this.setState({
                                course: {title: e.target.value}

                            })}
                        />
                    }
                    {
                        !this.state.courseBeingEdited &&
                        // <label>{this.state.course.title}</label>
                        <Link to={`/course/edit/${this.state.course._id}`}
                              onClick={() => this.props.selectCourse(this.state.course)}>
                            <h3>{this.state.course.title}</h3>
                        </Link>
                    }

                    <div className="card-body">
                        <p className="card-title">{this.props.course.owner}</p>
                        <p className="card-title">{this.props.course.modified}</p>
                        <button
                            onClick={() =>
                            {
                                this.props.deleteCourse(this.state.course)
                            }}>
                            <i className="fa fa-trash-o"></i>
                        </button>
                        <button
                            onClick={() => {
                                this.setState({
                                    courseBeingEdited: true
                                })
                            }}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button
                            onClick={() => {
                                this.setState({
                                    courseBeingEdited: false
                                })
                                {this.props.updateCourses()}
                                updateCourse(this.state.currID, this.state.course)
                            }}
                        >
                            <i className="fa fa-check"></i>
                        </button>

                    </div>


                </div>
            </div>
        )
    }
}


export default CourseCard