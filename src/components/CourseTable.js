import CourseRow from "./CourseRow";
import CourseManager from "./CourseManager";
import React from "react";
import CourseGrid from "./CourseGrid";


class CourseTable extends React.Component {

    render() {
        return (
            <table className="table">
                <tbody>
                {
                    this.props.courses.map(course =>
                        <CourseRow
                            deleteCourse={this.props.deleteCourse}
                            updateCourses={this.props.updateCourses}
                            course={course}
                            selectCourse={this.props.selectCourse}
                            key={course._id}/>
                    )
                }
                </tbody>
            </table>
        )
    }

}

export default CourseTable