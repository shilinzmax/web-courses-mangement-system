import React from 'react'
import CourseCard from "./CourseCard";


class CourseGrid extends React.Component {
    render() {
        return (
            // <div className="card-deck">{
            //     this.props.courses.map((course) =>
            //     <CourseCard deleteCourse={this.props.deleteCourse}
            //                 course={course}
            //                 updateCourses={this.props.updateCourses}
            //                 selectCourse={this.props.selectCourse}
            //                 key={course._id}/>)}
            // </div>
            <div className="row row-cols-1 row-cols-sm-2
        row-cols-md-3 row-cols-lg-4 row-cols-xl-5">{
                this.props.courses.map((course) =>
                    <CourseCard deleteCourse={this.props.deleteCourse}
                                course={course}
                                updateCourses={this.props.updateCourses}
                                selectCourse={this.props.selectCourse}
                                key={course._id}/>)}

            </div>
        )
    }
}

export default CourseGrid